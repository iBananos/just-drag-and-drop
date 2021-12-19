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
    const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);

    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.database);
    let filename = "uploads/" + req.body.userId + "/database/" + targetBase;
    let extension = req.body.database.split(".")[1];
    exec('python python/datavisu.py "' + filename + '" ' + extension + ' ' + req.body.firstOne + ' ' + req.body.secondOne + ' ' + req.body.thirdOne + ' ' + req.body.sample + ' false ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
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

export const  parametersDemo : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let filename = "uploads/" + "demo" + "/database/" + req.body.database;
    let extension = req.body.database.split(".")[1];
    exec('python python/datavisu.py "' + filename + '" ' + extension + ' ' + req.body.firstOne + ' ' + req.body.secondOne + ' ' + req.body.thirdOne + ' ' + req.body.sample + ' ' + 'true' , (error:any, stdout:any, stderr:any) => {
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

export const  matrix : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);

    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.database);
    let filename = "uploads/" + req.body.userId + "/database/" + targetBase;
    let extension = req.body.database.split(".")[1];
    exec('python python/correlation.py "' + filename + '" ' + extension + ' false ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
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

export const  matrixDemo : RequestHandler = (req : Request, res : Response, next : NextFunction) => {

    let filename = "uploads/" + 'demo' + "/database/" + req.body.database;
    let extension = req.body.database.split(".")[1];
    exec('python python/correlation.py "' + filename + '" ' + extension + ' true ' , (error:any, stdout:any, stderr:any) => {
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

export const downloadAnalyze : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var data = {"name": req.body.path,"file":fs.readFileSync("uploads/"+req.body.userId +"/analyse/"+req.body.path, 'utf8')}
    res.send(data);
};



