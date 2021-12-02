import fs from 'fs';
import "dotenv/config";
import type { RequestHandler, Request, Response, NextFunction } from "express";
import * as Utils from '../utils';
import { exec, spawn } from "child_process";
/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
export const  parameters : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var listName = Utils.default.getNameFiles('uploads/' + req.body.userId + '/dataVisuInfo/');
    var nomFichier = "dataVisu";
    if(nomFichier==="") nomFichier ="dataVisu";
    var acc= 1; 
    while(listName.includes(nomFichier)){
        if(acc>1){
            nomFichier = nomFichier.split('(')[0]
        }
        nomFichier = nomFichier+"("+acc+")";
        acc++;
    }
    req.body.nameAnalyze = nomFichier;
    req.body.type = "dataVisu";
    fs.writeFile('uploads/' + req.body.userId + '/dataVisuInfo/' + nomFichier+".json",JSON.stringify(req.body), async function (err) {
        if (err){
            res.send('error'); 
        }else{
            var filename ='uploads/' + req.body.userId + '/database/' + req.body.database;
            req.body.nameAnalyze = nomFichier;
            exec('python3 python/getcolumn.py ' + filename, (error:any, stdout:any, stderr:any) => {
                if (error) {
                  console.error(`error: ${error.message}`);
                  return;
                }
                if (stderr) {
                  console.error(`stderr: ${stderr}`);
                  return;
                }
                fs.writeFile('uploads/' + req.body.userId + '/dataVisu/' + nomFichier+".csv",stdout, function (err) {
                    if (err){
                        res.send('error'); 
                    }else{
                        res.send(nomFichier)
                    }
                });
              });
        }
    });
    
    
};

export const databases : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getDataFiles('uploads/' + req.body.userId + '/databaseInfo/')});
};

export const informations : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getInformations('uploads/' + req.body.userId + '/analyseInfo/')});
};

export const downloadAnalyze : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var data = {"name": req.body.path,"file":fs.readFileSync("uploads/"+req.body.userId +"/analyse/"+req.body.path, 'utf8')}
    res.send(data);
};



