import fs from 'fs';
import "dotenv/config";
import type { RequestHandler, Request, Response, NextFunction } from "express";
import * as Utils from '../utils';
import { exec, spawn } from "child_process";
import AESCipher from '../utils/aesCipher';
/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
 export const  parameters : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var listName = Utils.default.getNameFiles(req.body.userId, 'uploads/' + req.body.userId + '/analyseInfo/');
    var nomFichier = req.body.nameAnalyze;
    if (nomFichier === "") nomFichier = "analyze";
    var acc = 1; 
    while(listName.includes(nomFichier)){
        if(acc > 1){
            nomFichier = nomFichier.split('(')[0]
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
        } else{
            var analyze_choice = req.body.category;
            var algo_choice = req.body.algo;
            var list_param : string[] = [];

            let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.database);
            var filename = 'uploads/' + req.body.userId + '/database/' + targetBase;
            var features = req.body.feature;
            console.log(req.body.feature);
            var pred = req.body.pred;
            Object.entries(req.body.params).forEach(([key,value])=>{list_param.push(value as string)});
            //var resultats :any = await  Utils.default.callPython(filename,features,pred,list_param,analyze_choice,algo_choice)

            let extension = req.body.database.split(".")[1];
            exec('python python/script.py ' + filename + " " + extension + " " + features + " " + pred + " " + list_param + " " + analyze_choice + " " + algo_choice + " " + aesCipher.getKey() + " " + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
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
                        res.send(nomFichier)
                    }
                });
              });
            
            
        }
    });
};

export const databases : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getDataFiles(req.body.userId, 'uploads/' + req.body.userId + '/databaseInfo/')});
};

export const informations : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    //res.send({"liste" : Utils.default.getInformations('uploads/' + req.body.userId )});
    res.send({"liste" : Utils.default.getDataFiles(req.body.userId, 'uploads/' + req.body.userId + '/analyseInfo/')});
};

export const downloadAnalyze : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var type = req.body.type
    if (type == "prediction") {
        const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);
        let targetAnalyse = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/analyse/", req.body.path + ".csv");
        var data = {"name": req.body.path, "file": aesCipher.decrypt(fs.readFileSync("uploads/" + req.body.userId + "/analyse/" + targetAnalyse, 'utf8'))};
        res.send(data);
    }

};



