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
    var filename = "uploads/"+req.body.userId +"/database/"+req.body.database ;
    exec('python3 python/datavisu.py '+filename+' "'+req.body.firstOne+'" "'+req.body.secondOne+'" "'+req.body.thirdOne+'" '+req.body.sample, (error:any, stdout:any, stderr:any) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        var data = {"name": req.body.path,"file":stdout}
        res.send(data)
    });
}

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



