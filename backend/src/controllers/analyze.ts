import fs from 'fs';
import "dotenv/config";
import type { RequestHandler, Request, Response, NextFunction } from "express";
import * as Utils from '../utils';


/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
export const parameters : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var listName = Utils.default.getNameFiles('uploads/' + req.body.userId + '/analyseInfo/');
    var nomFichier = req.body.nameAnalyze;
    if(nomFichier==="") nomFichier ="analyze";
    var acc= 1; 
    while(listName.includes(nomFichier)){
        if(acc>1){
            nomFichier = nomFichier.split('(')[0]
        }
        nomFichier = nomFichier+"("+acc+")";
        acc++;
    }
    fs.writeFile('uploads/' + req.body.userId + '/analyseInfo/' + nomFichier+".json",JSON.stringify(req.body), function (err) {
        if (err){
            res.send('error'); 
        }else{
            res.send('complete');
        }
      });
};

export const databases : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log("ICI")
    res.send({"liste" : Utils.default.getNameFiles('uploads/' + req.body.userId + '/database/')});
};

export const informations : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log("ICI")
    res.send({"liste" : Utils.default.getInformations('uploads/' + req.body.userId + '/analyseInfo/')});
};


