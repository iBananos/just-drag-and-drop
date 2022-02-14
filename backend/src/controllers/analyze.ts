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

    if (newCurrentAnalyse > limitedAnalyse) {
        res.status(200).json({ "status": "401", "message": "Vous ne disposez plus d’assez d'analyse, veuillez passer à un abonnement supérieur ou alors supprimer des analyses dans l'historique." }); 
        return;
    }

    let reponse = checkAnalyze(req,false);
    if (reponse !== 'ok' && reponse !== "Automatic" && reponse !== "Automatic2") {
        res.status(200).json({ "status" : "401", "message": reponse});
        return;
    }
    let listName = Utils.default.getNameFiles(req.body.userId, 'uploads/' + req.body.userId + '/analyseInfo/',false);
    let nomFichier = req.body.nameAnalyze;
    nomFichier = nomFichier.replace(/ /g,"-").replace(/_/g,"-").replace(/\//g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/"/g,"").replace(/'/g,"").replace(/\./g,"");
    if (nomFichier === "") nomFichier = "analyze";
    let acc = 1; 
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
            let analyze_choice = req.body.category;
            let algo_choice = req.body.algo;
            

            let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.database);
            let filename = 'uploads/' + req.body.userId + '/database/' + targetBase;
            let features = req.body.feature;
            let pred = req.body.pred;
            let extension = req.body.database.split(".")[1];
            let algo;
            if(reponse === "Automatic" ){
                algo = "python_script/autoselectionalgo.py"
            }else if ( reponse === "Automatic2"){
                algo = "python_script/autoselection_class.py"
            }
            let separator = Utils.default.getSeparator(req.body.userId,req.body.database.split(".")[0]+".json")
            if (reponse === "Automatic" || reponse === "Automatic2") {
                console.log('python '+algo+' "' + filename + '" ' + extension + ' "' + features + '" "' + pred + '" false "'+ separator +'" '+ aesCipher.getKey() + ' ' + aesCipher.getToEncrypt())
                exec('python '+algo+' "' + filename + '" ' + extension + ' "' + features + '" "' + pred + '" false "'+ separator +'" '+ aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return;
                    }
                    
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                //    return console.log(stdout);
                    if(stdout.split("\n")[0].includes("Error_")){
                        fs.unlink('uploads/' + req.body.userId + '/analyseInfo/' + nom, function (err) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("File removed:", req.body.path);
                            }
                            res.status(200).json({ "status" : "401", "message": stdout.split("_")[1], "name": "a", "category": "b"});
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
                let list_param : string[] = [];
                Object.entries(req.body.params).forEach(([key,value])=>{list_param.push(value as string)});
                let separator = Utils.default.getSeparator(req.body.userId,req.body.database.split(".")[0]+".json")
                console.log('python python_script/script.py "' + filename + '" ' + extension + ' "' + features + '" "' + pred + '" ' + list_param + ' ' + analyze_choice + ' ' + algo_choice + ' false ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt())
                exec('python python_script/script.py "' + filename + '" ' + extension + ' "' + features + '" "' + pred + '" ' + list_param + ' ' + analyze_choice + ' ' + algo_choice + ' false "'+separator +'" ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return;
                    }
                  
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    if(stdout.split("\n")[0].includes("Error_")){
                        fs.unlink('uploads/' + req.body.userId + '/analyseInfo/' + nom, function (err) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("File removed:", req.body.path);
                            }
                            res.status(200).json({ "status" : "401", "message": stdout.split("_")[1], "name": "a", "category": "b"});
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
                });
            }
        }
    });

    // Update des analyse utilisée
    await UserLimit.updateOne({ userId: objectId }, { currentAnalyse: newCurrentAnalyse });
};

export const  parametersDemo : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {

    let reponse = checkAnalyze(req,true);
    if (reponse !== 'ok' && reponse !== "Automatic" && reponse !== "Automatic2") {
        res.status(200).json({ "status" : "401", "message": reponse});
        return;
    }
    let listName = Utils.default.getNameFiles("demo", 'uploads/' + "demo" + '/analyseInfo/',true);
    let nomFichier = req.body.nameAnalyze;
    nomFichier = nomFichier.replace(/ /g,"-").replace(/_/g,"-").replace(/\//g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/"/g,"").replace(/'/g,"").replace(/\./g,"");
    if (nomFichier === "") nomFichier = "analyze";
    let acc = 1; 
    while (listName.includes(nomFichier)) {
        if (acc > 1) {
            nomFichier = nomFichier.split('(')[0];
        }
        nomFichier = nomFichier+"("+acc+")";
        acc++;
    }
    req.body.nameAnalyze = nomFichier;
    nomFichier =nomFichier ;
    req.body.type = "prediction";
    fs.writeFile('uploads/' + "demo" + '/analyseInfo/' + nomFichier + ".json" , JSON.stringify(req.body), async function (err) {
        if (err) {
            res.send('error'); 
        } else {
            let analyze_choice = req.body.category;
            let algo_choice = req.body.algo;
            
            let filename = 'uploads/' + "demo" + '/database/' + req.body.database;
            let features = req.body.feature;
            let pred = req.body.pred;
            let extension = req.body.database.split(".")[1];
            let algo;
            if(reponse === "Automatic" ){
                algo = "python_script/autoselectionalgo.py"
            }else if ( reponse === "Automatic2"){
                algo = "python_script/autoselection_class.py"
            }
             
            if (reponse === "Automatic" || reponse === "Automatic2") {
                console.log('python '+algo+' "' + filename + '" ' + extension + ' "' + features + '" "' + pred + '" true ","')
                exec('python '+algo+' "' + filename + '" ' + extension + ' "' + features + '" "' + pred + '" true ","', (error:any, stdout:any, stderr:any) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return;
                    }
                  
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    if(stdout.split("\n")[0].includes("Error_")){
                        fs.unlink('uploads/' + "demo" + '/analyseInfo/' + nomFichier +'.json', function (err) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("File removed:", req.body.path);
                            }
                            res.status(200).json({ "status" : "401", "message": stdout.split("_")[1], "name": "a", "category": "b"});
                            return;
                        });
                    }else{
                        fs.writeFile('uploads/' + "demo" + '/analyse/' + nomFichier + ".csv", stdout, function (err) {
                            if (err) {
                                res.send('error'); 
                            } else {
                                res.status(200).json({ "status" :"ok", "name": nomFichier, "category": req.body.category});
                            }
                        });
                      }   
                    })            
            } else {
                let list_param : string[] = [];
                Object.entries(req.body.params).forEach(([key,value])=>{list_param.push(value as string)});
                console.log('python python_script/script.py "' + filename + '" ' + extension + ' "' + features + '" "' + pred + '" ' + list_param + ' ' + analyze_choice + ' ' + algo_choice + ' true' )

                exec('python python_script/script.py "' + filename + '" ' + extension + ' "' + features + '" "' + pred + '" ' + list_param + ' ' + analyze_choice + ' ' + algo_choice + ' true ","', (error:any, stdout:any, stderr:any) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
                        return;
                    }
                  
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
                        return;
                    }
                    if(stdout.split("\n")[0].includes("Error_")){
                        fs.unlink('uploads/' + "demo" + '/analyseInfo/' + nomFichier +'.json', function (err) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("File removed:", req.body.path);
                            }
                            res.status(200).json({ "status" : "401", "message": stdout.split("_")[1], "name": "a", "category": "b"});
                            return;
                        });
                    }else{
                    fs.writeFile('uploads/' + "demo" + '/analyse/' + nomFichier + ".csv", stdout, function (err) {
                        if (err) {
                            res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});

                        } else {
                            res.status(200).json({ "status" :"ok", "name": nomFichier, "category": req.body.category});
                        }
                    });
                }
                });
            }
        }
    });

};

export const deleteData : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log(req.body.userId+ " uploads/" + req.body.userId + "/analyse/", req.body.path + ".csv")
    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/analyse/", req.body.path + ".csv");
    console.log(targetBase)
    if (targetBase != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/analyse/" + targetBase, function (err) {
            if (err) {
                console.error(err);
                res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
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
                res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
            } else {
                // Update des analyses utilisées
                const objectId = new mongoose.Types.ObjectId(req.body.userId);
                const userLimit : any = await UserLimit.findOne({ userId: objectId }).lean();
                const currentAnalyse = userLimit.currentAnalyse;
                await UserLimit.updateOne({ userId: objectId }, { currentAnalyse: currentAnalyse - 1 });
      
            }
        });
    }

    let targetPreview = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/analysePreview/", req.body.path + ".txt");
    if (targetPreview != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/analysePreview/" + targetPreview, async function (err) {
            if (err) {
                console.error(err);
                res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
            } else {
                // Update des analyse utilisée
                const objectId = new mongoose.Types.ObjectId(req.body.userId);
                const userLimit : any = await UserLimit.findOne({ userId: objectId }).lean();
                const currentAnalyse = userLimit.currentAnalyse;
                await UserLimit.updateOne({ userId: objectId }, { currentAnalyse: currentAnalyse - 1 });
                
            }
        });
    }
    res.send("Database deleted");
};

function checkAnalyze(req:any,demo:boolean){
    let filename :any;
    let userID :any;
    if(!demo){
        userID = req.body.userId;
    }else{
        userID = "demo";
    }
    const aesCipher =  new AESCipher(userID, `${process.env.KEY_ENCRYPT}`);
    if(!demo){
        let targetBase = Utils.default.findEncryptedFile(userID, "uploads/" + userID + "/database/", req.body.database);
        filename  = targetBase;
        filename = aesCipher.decrypt(filename);
    }else{
        
        filename = req.body.database
    }
    
    let analyze_choice = req.body.category;
    let algo_choice = req.body.algo;
    let features = req.body.feature;
    let list_param :any= [];
    Object.entries(req.body.params).forEach(([key,value])=>{list_param.push(value)}); // PROBLEME A CETTE LIGNE  TypeError: Cannot convert undefined or null to object
    let pred = req.body.pred;
    let listName = Utils.default.getNameFiles(userID, 'uploads/' + userID + '/database/',demo);
    // verif database
    if(typeof filename !== 'string') return "database name is not a file name"
    filename = filename.split(".")[0]
    if(!listName.includes(filename)) return "database does not exist"

    // verif pred
    let data :any;
    if(!demo){
        let targetAnalyse :any= Utils.default.findEncryptedFile(userID, "uploads/" + userID + "/databaseInfo/", req.body.database.split(".")[0] + ".json");  
        data= JSON.parse(aesCipher.decrypt(fs.readFileSync("uploads/" + userID + "/databaseInfo/" + targetAnalyse, 'utf8')));
    }else{
        data = JSON.parse(fs.readFileSync("uploads/" + userID + "/databaseInfo/" +  req.body.database.split(".")[0] + ".json", 'utf8'));
    }
    
    if(typeof pred !== 'string') return "pred has no column name"
    if(!data.colonnes.includes(pred)) return "prediction column does not exist"
    // vérif feature
    if(typeof features !== 'object') return "features is not a list"
    let acc :number = 0 
    for(let i:number =0;i<features.length;i++){
        acc++
        if(typeof features[i] !== 'string') return "a feature column is not a column name"
        if(!data.colonnes.includes(features[i])){ return "a feature column does not exist";}
    }
    if(acc ===0 ) return "features is empty"

    // vérif category
    if(typeof analyze_choice !== 'string') return "analyze_choice is not a string"
    if(analyze_choice !== 'Regression' && analyze_choice !== 'Classification') return "analyze_choice is not a valid analysis"
    if(data.colonnesString.includes(pred) && analyze_choice === 'Regression') return "the prediction column is not valid for a regression"

    // vérif algo
    if(typeof algo_choice !== 'string') return "algo_choice is not a string"
    if(analyze_choice === 'Regression' && !['Automatic','GradientBoosting','RandomForest','Ridge'].includes(algo_choice)) return "algo_choice is not a valid algo for regression"
    if(analyze_choice === 'Classification' && !['Automatic2','LinearSVC','AdaBoost','GradientBoosting2','RandomForest2','LogisticRegression'].includes(algo_choice)) return "algo_choice is not a valid algo for classification"
    if(algo_choice === "Automatic" || algo_choice === "Automatic2") return algo_choice;
    // vérif params
    if(verifParams(req.body.params,algo_choice,analyze_choice)) return "params are not valid for the choosen algo"

    return "ok"
}

function verifParams(list_param:any,algo_choice:any,analyze_choice:any){
    if(analyze_choice === "Regression"){
        if(algo_choice === 'GradientBoosting'){
            if(isNaN(parseFloat(list_param.learning_rate)) || parseFloat(list_param.learning_rate) < 0 ) return true
            if(isNaN(parseInt(list_param.n_estimators)) || parseInt(list_param.n_estimators ) < 0 ) return true
            if(isNaN(parseInt(list_param.max_depth)) || parseInt(list_param.max_depth) < 0 ) return true
            if(isNaN(parseInt(list_param.min_samples_split)) || parseInt(list_param.min_samples_split) < 0 ) return true
        }else if(algo_choice === 'RandomForest'){
            if(isNaN(parseInt(list_param.n_estimators)) || parseInt(list_param.n_estimators ) < 0 ) return true
            if(isNaN(parseInt(list_param.max_depth)) || parseInt(list_param.max_depth) < 0 ) return true
            if(isNaN(parseInt(list_param.min_samples_split)) || parseInt(list_param.min_samples_split) < 0 ) return true
        }else if(algo_choice === 'Ridge'){
            if(isNaN(parseFloat(list_param.tol)) || parseFloat(list_param.tol ) < 0 ) return true
            if(!["auto","svd","cholesky",'lsqr',"sparse_cg","sag","saga","lbfgs"].includes(list_param.solver)) return true
            if(isNaN(parseInt(list_param.alpha)) || parseInt(list_param.alpha) < 0 ) return true
        }
    }else{
        if(algo_choice === 'LinearSVC'){
            if(isNaN(parseFloat(list_param.tol)) || parseFloat(list_param.tol) < 0 ) return true
            if(!["l1","l2"].includes(list_param.penalty)) return true
            if(isNaN(parseInt(list_param.C)) || parseInt(list_param.C) < 0 ) return true
            if(!["none","dict","balanced"].includes(list_param.class_weight )) return true
        }else if(algo_choice === 'AdaBoost'){
            if(isNaN(parseInt(list_param.n_estimators)) || parseInt(list_param.n_estimators ) < 0 ) return true
            if(isNaN(parseInt(list_param.learning_rate)) || parseInt(list_param.learning_rate) < 0 ) return true
        }else if(algo_choice === 'GradientBoosting2'){
            if(isNaN(parseFloat(list_param.learning_rate)) || parseFloat(list_param.learning_rate) < 0 ) return true
            if(isNaN(parseInt(list_param.n_estimators)) || parseInt(list_param.n_estimators ) < 0 ) return true
            if(isNaN(parseInt(list_param.max_depth)) || parseInt(list_param.max_depth) < 0 ) return true
            if(isNaN(parseInt(list_param.min_samples_split)) || parseInt(list_param.min_samples_split) < 0 ) return true
        }else if(algo_choice === 'RandomForest2'){
            if(isNaN(parseInt(list_param.n_estimators)) || parseInt(list_param.n_estimators ) < 0 ) return true
            if(isNaN(parseInt(list_param.max_depth)) || parseInt(list_param.max_depth) < 0 ) return true
            if(isNaN(parseInt(list_param.min_samples_split)) || parseInt(list_param.min_samples_split) < 0 ) return true
            if(!["none","balanced_subsample","balanced"].includes(list_param.class_weight )) return true
        }else if(algo_choice === 'LogisticRegression'){
            if(!["l1","l2","elasticnet","none"].includes(list_param.penalty)) return true
            if(isNaN(parseFloat(list_param.tol)) || parseFloat(list_param.tol) < 0 ) return true
            if(isNaN(parseInt(list_param.c)) || parseInt(list_param.c) < 0 ) return true
            if(!["none","dict","balanced"].includes(list_param.class_weight )) return true
            if(isNaN(parseInt(list_param.max_iter)) || parseInt(list_param.max_iter  ) < 0 ) return true
        }
    }

    return false;
}


export const databases : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getDataFiles(req.body.userId, 'uploads/' + req.body.userId + '/databaseInfo/',false)});
};

export const databasesDemo : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getDataFiles(req.body.userId, 'uploads/' + "demo"+ '/databaseInfo/',true)});
};


export const informations : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    //res.send({"liste" : Utils.default.getInformations('uploads/' + req.body.userId )});
    res.send({"liste" : Utils.default.getDataFilesForHistory(req.body.userId, 'uploads/' + req.body.userId + '/analyseInfo/',false),"images":Utils.default.getPreviewFiles(req.body.userId, 'uploads/' + req.body.userId + '/analysePreview/',false)});
};

export const sendPreview : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let nomFichier = req.body.path ;
    const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);
    let acc = 1; 
    //nomFichier = nomFichier.replace(/ /g,"-").replace(/_/g,"-").replace(/\//g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/"/g,"").replace(/'/g,"").replace(/\./g,"");
    let listName = Utils.default.getNameFiles(req.body.userId, 'uploads/' + req.body.userId + '/analyse/',false);
    while (listName.includes(nomFichier)) {
        if (acc > 1) {
            nomFichier = nomFichier.split('(')[0];
        }
        nomFichier = nomFichier+"("+acc+")";
        acc++;
    }
    req.body.path = nomFichier;
    let dataAnalyse = JSON.parse(req.body.param)
    dataAnalyse.nameAnalyze= nomFichier;
    fs.writeFile('uploads/' + req.body.userId + '/analysePreview/' + aesCipher.encrypt(Buffer.from(req.body.path + ".txt")), aesCipher.encrypt(Buffer.from(req.body.image)), function (err) {
        if (err) { 
            res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
            return
        } else {
            console.log("image saved")
            fs.writeFile('uploads/' + req.body.userId + '/analyse/' + aesCipher.encrypt(Buffer.from(req.body.path + ".csv")), aesCipher.encrypt(Buffer.from(req.body.file)), function (err) {
                if (err) {
                    res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
                    return
                } else {
                    console.log("analyse saved")
                    fs.writeFile('uploads/' + req.body.userId + '/analyseInfo/' + aesCipher.encrypt(Buffer.from(req.body.path + ".json")), aesCipher.encrypt(Buffer.from(JSON.stringify(dataAnalyse))), function (err) {
                        if (err) {
                            res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
                            return
                        } else {
                            console.log("analyse info saved")
                            res.send({"message":"ok"})
                        }
                    });
                }
            });
        }
    });
    
    
    
};


export const downloadAnalyze : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let type = req.body.type
    if (type == "Classification" ||type == "Regression"  ) {
        const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);
        let targetAnalyseCSV = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/analyse/", req.body.path + ".csv");
        let targetAnalyseJSON = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/analyseInfo/", req.body.path + ".json");
        let data = {"name": req.body.path,"param":aesCipher.decrypt(fs.readFileSync("uploads/" + req.body.userId + "/analyseInfo/" + targetAnalyseJSON, 'utf8')), "file": aesCipher.decrypt(fs.readFileSync("uploads/" + req.body.userId + "/analyse/" + targetAnalyseCSV, 'utf8'))};
        res.send(data);
        if(req.body.fromHistory === "false"){
            console.log("uploads/" + req.body.userId + "/analyse/" + targetAnalyseCSV )
            console.log("uploads/" + req.body.userId + "/analyseInfo/" + targetAnalyseJSON )
            fs.unlink("uploads/" + req.body.userId + "/analyseInfo/" + targetAnalyseJSON , async function (err) {
                if (err) {
                
                }
            });
            fs.unlink("uploads/" + req.body.userId + "/analyse/" + targetAnalyseCSV , async function (err) {
                if (err) {
                
                }
            });
        }
        
    }
};

export const downloadAnalyzeDemo : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let type = req.body.type
    if (type == "Classification" ||type == "Regression"  ) {
        let data = {"name": req.body.path, "file": fs.readFileSync("uploads/" + "demo" + "/analyse/" + req.body.path + ".csv", 'utf8')};
        res.send(data);
        fs.unlink("uploads/" + "demo"+ "/analyseInfo/" + req.body.path + ".json", async function (err) {
            if (err) {
            
            } else {
            }
        });
        fs.unlink("uploads/" + "demo"+ "/analyse/" + req.body.path + ".csv", async function (err) {
            if (err) {
            
            } else {
            }
        });
    }

};