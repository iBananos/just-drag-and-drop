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
    let separator = Utils.default.getSeparator(req.body.userId,req.body.database.split(".")[0]+".json")
    exec('python python_script/datavisu.py "' + filename + '" ' + extension + ' "' + req.body.firstOne + '" "' + req.body.secondOne + '" "' + req.body.thirdOne + '" ' + req.body.sample + ' false "'+separator+'" ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
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
        let data = {"name": req.body.path,"file":stdout}
        res.send(data)
    });
}

export const  parametersDemo : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let filename = "uploads/" + "demo" + "/database/" + req.body.database;
    let extension = req.body.database.split(".")[1];
    exec('python python_script/datavisu.py "' + filename + '" ' + extension + ' "' + req.body.firstOne + '" "' + req.body.secondOne + '" "' + req.body.thirdOne + '" ' + req.body.sample + ' ' + 'true ","' , (error:any, stdout:any, stderr:any) => {
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
        let data = {"name": req.body.path,"file":stdout}
        res.send(data)
    });
}

export const  matrix : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);

    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.database);
    let filename = "uploads/" + req.body.userId + "/database/" + targetBase;
    let extension = req.body.database.split(".")[1];
    let separator = Utils.default.getSeparator(req.body.userId,req.body.database.split(".")[0]+".json")
    exec('python python_script/correlation.py "' + filename + '" ' + extension + ' false "' +separator+'" ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error:any, stdout:any, stderr:any) => {
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
        let data = {"name": req.body.path,"file":stdout}
        res.send(data)
    });
}

export const  matrixDemo : RequestHandler = (req : Request, res : Response, next : NextFunction) => {

    let filename = "uploads/" + 'demo' + "/database/" + req.body.database;
    let extension = req.body.database.split(".")[1];
    exec('python python_script/correlation.py "' + filename + '" ' + extension + ' true ","' , (error:any, stdout:any, stderr:any) => {
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
            
            res.status(200).json({ "status" : "401", "message": stdout.split("_")[1], "name": "a", "category": "b"});
               
        }else{
            let data = {"name": req.body.path,"file":stdout}
            res.send(data)
        }
    });
}
export const  fullOverview : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    
    let filename : string = req.body.database.split(".")[0]+".html";

    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/databaseHTML", filename);

    let data = {"name": req.body.database,"file":fs.readFileSync("uploads/"+req.body.userId+"/databaseHTML/" + targetBase, 'utf8')}
    
    //let data = {"name": req.body.database,"file":fs.readFileSync("uploads/"+req.body.userId+"/databaseHTML/" + filename, 'utf8')}
    res.send(data)

    
}

export const  fullOverviewDemo : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log(req.body.database)
    let filename = req.body.database.split(".")[0]+".html";
    
    let data = {"name": req.body.database,"file":fs.readFileSync("uploads/demo/databaseHTML/" + filename, 'utf8')}
    res.send(data)
    
}

export const downloadAnalyze : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let data = {"name": req.body.path,"file":fs.readFileSync("uploads/"+req.body.userId +"/analyse/"+req.body.path, 'utf8')}
    res.send(data);
};



