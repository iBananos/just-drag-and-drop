import fs from 'fs';
import "dotenv/config";
import type { RequestHandler, Request, Response, NextFunction } from "express";
import * as Utils from "../utils"

/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
export const saveFile : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var src = fs.createReadStream(req.file!.path);
    var listName = Utils.default.getNameFiles('uploads/' + req.body.userId + '/database/');
    var nomFichier = req.file!.originalname.split(".");
    var acc= 1; 
    while(listName.includes(nomFichier[0])){
        if(acc>1){
            nomFichier[0] = nomFichier[0].split('(')[0]
        }
        nomFichier[0] = nomFichier[0]+"("+acc+")";
        acc++;
    }
    var dest = fs.createWriteStream('uploads/' + req.body.userId + '/database/' + nomFichier[0]+"."+nomFichier[1]);
    src.pipe(dest);
    src.on('end', () => {
        fs.unlink(req.file!.path, (err) => { 
            if (err) throw err; 
        });
        res.send('complete'); 
    });
    src.on('error', (err) => { 
        res.send('error'); 
    });
};


