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
            console.log("IL SE PASSE UN TRUC ")
            var analyze_choice = req.body.category;
            var algo_choice = req.body.algo;
            var list_param : string[] = [];
            var filename= 'uploads/' + req.body.userId + '/database/' + req.body.database
            Object.entries(req.body.params).forEach(([key,value])=>{listName.push(value as string)}) ;
            Utils.default.callPython(filename,"features","pred",list_param,analyze_choice,algo_choice)
            
        }
      });
};

export const databases : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log("ICI")
    res.send({"liste" : Utils.default.getDataFiles('uploads/' + req.body.userId + '/database/')});
};

export const informations : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log("ICI")
    res.send({"liste" : Utils.default.getInformations('uploads/' + req.body.userId + '/analyseInfo/')});
};


