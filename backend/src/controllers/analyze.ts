import fs from 'fs';
import "dotenv/config";
import mongoose from 'mongoose';
import * as Utils from '../utils';
import AESCipher from '../utils/aesCipher';
import UserLimit from '../models/userLimit';
import { exec, spawn } from "child_process";
import { RequestHandler, Request, Response, NextFunction, response } from "express";

/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
 export const  parameters : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    // Vérification si l'user dispose d'assez d'analyse disponible'
    const objectId = new mongoose.Types.ObjectId(req.body.userId);
    const userLimit : any = await UserLimit.findOne({ userId: objectId }).lean();
    const limitedAnalyse = userLimit.limitedAnalyse;
    const currentAnalyse = userLimit.currentAnalyse;
    const newCurrentAnalyse = Utils.default.getNbFiles(req.body.userId, 'uploads/' + req.body.userId+"/analyse/");
    console.log(newCurrentAnalyse)

    if (newCurrentAnalyse > limitedAnalyse) {
        res.status(200).json({ "status": "401", "message": "Vous ne disposez plus d’assez d'analyse, veuillez passer à un abonnement supérieur ou alors supprimer des analyses dans l'historique." }); 
        return;
    }

    var reponse = checkAnalyze(req);
    if (reponse !== 'ok' && reponse !== "Automatic" && reponse !== "Automatic2") {
        res.status(200).json({ "status" : "401", "message": response, "name": "a", "category": "b"});
        return;
    }
    var listName = Utils.default.getNameFiles(req.body.userId, 'uploads/' + req.body.userId + '/analyseInfo/');
    var nomFichier = req.body.nameAnalyze;
    nomFichier = nomFichier.replace(/ /g,"_").replace(/\//g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/"/g,"").replace(/'/g,"").replace(/\./g,"");
    if (nomFichier === "") nomFichier = "analyze";
    var acc = 1; 
    while (listName.includes(nomFichier)) {
        if (acc > 1) {
            nomFichier = nomFichier.split('(')[0];
        }
        nomFichier = nomFichier+"("+acc+")";
        acc++;
    }
    const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);
    let nom = aesCipher.encrypt(Buffer.from(nomFichier + ".json"));
    req.body.nameAnalyze = nomFichier;
    req.body.type = "prediction";
    fs.writeFile('uploads/' + req.body.userId + '/analyseInfo/' + nom, aesCipher.encrypt(Buffer.from(JSON.stringify(req.body))), async function (err) {
        if (err) {
            res.send('error'); 
        } else {
            var analyze_choice = req.body.category;
            var algo_choice = req.body.algo;
            

            let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.database);
            var filename = 'uploads/' + req.body.userId + '/database/' + targetBase;
            var features = req.body.feature;
            var pred = req.body.pred;
            let extension = req.body.database.split(".")[1];
            if (reponse === "Automatic" || reponse === "Automatic2") {
                exec('python python/autoselectionalgo.py "' + filename + '" ' + extension + ' ' + features + ' ' + pred + ' ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return;
                    }
                  
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    if(stdout.split("\n")[0].includes("You will not getting good prediction with your dataset")){
                        fs.unlink('uploads/' + req.body.userId + '/analyseInfo/' + nom, function (err) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("File removed:", req.body.path);
                            }
                            res.status(200).json({ "status" : "401", "message": stdout, "name": "a", "category": "b"});
                            return;
                        });
                        
                    }else{
                        fs.writeFile('uploads/' + req.body.userId + '/analyse/' + aesCipher.encrypt(Buffer.from(nomFichier + ".csv")), aesCipher.encrypt(Buffer.from(stdout)), function (err) {
                            if (err) {
                                res.send('error'); 
                            } else {
                                res.status(200).json({ "status" :"ok", "name": nomFichier, "category": req.body.category});
                            }
                        });
                      }   
                    })            
            } else {
                var list_param : string[] = [];
                Object.entries(req.body.params).forEach(([key,value])=>{list_param.push(value as string)});
                exec('python python/script.py "' + filename + '" ' + extension + ' ' + features + ' ' + pred + ' ' + list_param + ' ' + analyze_choice + ' ' + algo_choice + ' ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return;
                    }
                  
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    
                    fs.writeFile('uploads/' + req.body.userId + '/analyse/' + aesCipher.encrypt(Buffer.from(nomFichier + ".csv")), aesCipher.encrypt(Buffer.from(stdout)), function (err) {
                        if (err) {
                            res.send('error'); 
                        } else {
                            res.status(200).json({ "status" :"ok", "name": nomFichier, "category": req.body.category});
                        }
                    });
                });
            }
        }
    });

    // Update des analyse utilisée
    await UserLimit.updateOne({ userId: objectId }, { currentAnalyse: newCurrentAnalyse });
};

export const deleteData : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/analyse/", req.body.path + ".csv");
    if (targetBase != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/analyse/" + targetBase, function (err) {
            if (err) {
                console.error(err);
                res.send("Erreur lors de la suppression");
            } else {
                console.log("File removed:", req.body.path);
            }
        });
    }

    let targetInfo = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/analyseInfo/", req.body.path + ".json");
    if (targetInfo != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/analyseInfo/" + targetInfo, async function (err) {
            if (err) {
                console.error(err);
                res.send("Erreur lors de la suppression");
            } else {
                // Update des analyse utilisée
                const objectId = new mongoose.Types.ObjectId(req.body.userId);
                const userLimit : any = await UserLimit.findOne({ userId: objectId }).lean();
                const currentAnalyse = userLimit.currentAnalyse;
                await UserLimit.updateOne({ userId: objectId }, { currentAnalyse: currentAnalyse - 1 });
                res.send("Base supprimée");
            }
        });
    }
};

function checkAnalyze(req:any){
    
    //var name = file.split(".")
    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.database);
    var filename :any = targetBase;
    const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);
    filename = aesCipher.decrypt(filename);
    filename = filename.split(".")[0]
    var analyze_choice = req.body.category;
    var algo_choice = req.body.algo;
    var features = req.body.feature;
    var list_param :any= [];
    Object.entries(req.body.params).forEach(([key,value])=>{list_param.push(value)}); // PROBLEME A CETTE LIGNE  TypeError: Cannot convert undefined or null to object
    var pred = req.body.pred;
    var listName = Utils.default.getNameFiles(req.body.userId, 'uploads/' + req.body.userId + '/database/');
    // verif database
    if(typeof filename !== 'string') return "le nom de la database n'est pas un nom de fichier"
    if(!listName.includes(filename)) return "la database est inexistante"

    // verif pred
    let targetAnalyse :any = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/databaseInfo/", req.body.database.split(".")[0] + ".json");    
    var data = JSON.parse(aesCipher.decrypt(fs.readFileSync("uploads/" + req.body.userId + "/databaseInfo/" + targetAnalyse, 'utf8')));
    if(typeof pred !== 'string') return "pred n'a pas une nom de colonne"
    if(!data.colonnes.includes(pred)) return "la colonne prédiction est inexistante"
    // vérif feature
    if(typeof features !== 'object') return "features n'est pas une liste"
    var acc :number = 0 
    features.forEach((element:any) => {
        acc++
        if(typeof element !== 'string') return "une colonne de feature n'est pas une nom de colonne"
        if(!data.colonnes.includes(element)) return "une colonne de feature est inexistante"
    });
    if(acc ===0 ) return "features est vide"

    // vérif category
    if(typeof analyze_choice !== 'string') return "analyze_choice n'est pas une string"
    if(analyze_choice !== 'Regression' && analyze_choice !== 'Classification') return "analyze_choice n'est pas une analyse valide"
    if(data.colonnesString.includes(pred) && analyze_choice === 'Regression') return "la colonne prédiction n'est pas valide pour une Regression"

    // vérif algo
    if(typeof algo_choice !== 'string') return "algo_choice n'est pas une string"
    if(analyze_choice === 'Regression' && !['Automatic','GradientBoosting','RandomForest','Ridge'].includes(algo_choice)) return "algo_choice n'est pas un algo valide pour une régression"
    if(analyze_choice === 'Classification' && !['Automatic2','LinearSVC','AdaBoost','GradientBoosting2','RandomForest2','LogisticRegression'].includes(algo_choice)) return "algo_choice n'est pas un algo valide pour une classification"
    if(algo_choice === "Automatic" || algo_choice === "Automatic2") return algo_choice;
    // vérif params
    if(verifParams(req.body.params,algo_choice,analyze_choice)) return "les params ne sont pas valide pour l'algo choisit"

    return "ok"
}

function verifParams(list_param:any,algo_choice:any,analyze_choice:any){
    if(analyze_choice === "Regression"){
        if(algo_choice === 'GradientBoosting'){
            if(parseFloat(list_param.learning_rate) === NaN || parseFloat(list_param.learning_rate) < 0 ) return true
            if(parseInt(list_param.n_estimators) === NaN || parseInt(list_param.n_estimators ) < 0 ) return true
            if(parseInt(list_param.max_depth) === NaN || parseInt(list_param.max_depth) < 0 ) return true
            if(parseInt(list_param.min_samples_split) === NaN || parseInt(list_param.min_samples_split) < 0 ) return true
        }else if(algo_choice === 'RandomForest'){
            if(parseInt(list_param.n_estimators) === NaN || parseInt(list_param.n_estimators ) < 0 ) return true
            if(parseInt(list_param.max_depth) === NaN || parseInt(list_param.max_depth) < 0 ) return true
            if(parseInt(list_param.min_samples_split) === NaN || parseInt(list_param.min_samples_split) < 0 ) return true
        }else if(algo_choice === 'Ridge'){
            if(parseFloat(list_param.n_estimators ) === NaN || parseFloat(list_param.n_estimators ) < 0 ) return true
            if(!["auto","svd","cholesky",'lsqr',"sparse_cg","sag","saga","lbfgs"].includes(list_param.solver)) return true
            if(parseInt(list_param.alpha) === NaN || parseInt(list_param.alpha) < 0 ) return true
        }
    }else{
        if(algo_choice === 'LinearSVC'){
            if(parseFloat(list_param.tol) === NaN || parseFloat(list_param.tol) < 0 ) return true
            if(!["l1","l2"].includes(list_param.penalty)) return true
            if(parseInt(list_param.C) === NaN || parseInt(list_param.C) < 0 ) return true
            if(!["none","dict","balanced"].includes(list_param.class_weight )) return true
        }else if(algo_choice === 'AdaBoost'){
            if(parseInt(list_param.n_estimators ) === NaN || parseInt(list_param.n_estimators ) < 0 ) return true
            if(parseInt(list_param.learning_rate) === NaN || parseInt(list_param.learning_rate) < 0 ) return true
        }else if(algo_choice === 'GradientBoosting2'){
            if(parseFloat(list_param.learning_rate) === NaN || parseFloat(list_param.learning_rate) < 0 ) return true
            if(parseInt(list_param.n_estimators) === NaN || parseInt(list_param.n_estimators ) < 0 ) return true
            if(parseInt(list_param.max_depth) === NaN || parseInt(list_param.max_depth) < 0 ) return true
            if(parseInt(list_param.min_samples_split) === NaN || parseInt(list_param.min_samples_split) < 0 ) return true
        }else if(algo_choice === 'RandomForest2'){
            if(parseInt(list_param.n_estimators) === NaN || parseInt(list_param.n_estimators ) < 0 ) return true
            if(parseInt(list_param.max_depth) === NaN || parseInt(list_param.max_depth) < 0 ) return true
            if(parseInt(list_param.min_samples_split) === NaN || parseInt(list_param.min_samples_split) < 0 ) return true
            if(!["none","balanced_subsample","balanced"].includes(list_param.class_weight )) return true
        }else if(algo_choice === 'LogisticRegression'){
            if(!["l1","l2","elasticnet","none"].includes(list_param.penalty)) return true
            if(parseFloat(list_param.tol) === NaN || parseFloat(list_param.tol) < 0 ) return true
            if(parseInt(list_param.c) === NaN || parseInt(list_param.c) < 0 ) return true
            if(!["none","dict","balanced"].includes(list_param.class_weight )) return true
            if(parseInt(list_param.max_iter ) === NaN || parseInt(list_param.max_iter  ) < 0 ) return true
        }
    }

    return false;
}


export const databases : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getDataFiles(req.body.userId, 'uploads/' + req.body.userId + '/databaseInfo/')});
};

export const informations : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    //res.send({"liste" : Utils.default.getInformations('uploads/' + req.body.userId )});
    res.send({"liste" : Utils.default.getDataFiles(req.body.userId, 'uploads/' + req.body.userId + '/analyseInfo/')});
};

export const downloadAnalyze : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var type = req.body.type
    if (type == "Classification" ||type == "Regression"  ) {
        const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);
        let targetAnalyse = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/analyse/", req.body.path + ".csv");
        var data = {"name": req.body.path, "file": aesCipher.decrypt(fs.readFileSync("uploads/" + req.body.userId + "/analyse/" + targetAnalyse, 'utf8'))};
        res.send(data);
    }

};



