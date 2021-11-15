import fs from 'fs';
import "dotenv/config";
import type { RequestHandler, Request, Response, NextFunction } from "express";


/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
export const saveFile : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var src = fs.createReadStream(req.file!.path);
    var dest = fs.createWriteStream('uploads/' + req.file!.originalname);
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


