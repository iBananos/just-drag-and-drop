import fs from 'fs';
import "dotenv/config";
import path from "path";
import mongoose from 'mongoose';
import * as Utils from "../utils";
import { exec } from 'child_process';
import AESCipher from "../utils/aesCipher";
import UserLimit from '../models/userLimit';

import type { RequestHandler, Request, Response, NextFunction } from "express";


/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
export const saveFile : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    // Vérification si l'user dispose d'assez de stockage
    const objectId = new mongoose.Types.ObjectId(req.body.userId);
    const userLimit : any = await UserLimit.findOne({ userId: objectId }).lean();
    const limitedStorage = userLimit.limitedStorage;
    const currentStorage = Utils.default.getTotalSize(req.body.userId, 'uploads/' + req.body.userId+"/databaseInfo/");
    const newCurrentStorage = currentStorage + req.file!.size;
    console.log(limitedStorage,currentStorage,req.file!.size,newCurrentStorage)

    if (newCurrentStorage > limitedStorage) {
        res.status(200).json({ "status": "401", "message": "You have no storage left. Please upgrade to a higher subscription or delete already saved databases." }); 
        return;
    }

    let extension = verifFileName(req.file?.originalname);
    if (extension === false) {
        res.status(200).json({ "status": "401", "message": "File extension not valid." }); 
        return;
    }
    

    let userId : string = req.body.userId;

    let listName = Utils.default.getNameFiles(userId, 'uploads/' + userId + '/database/',false);
    let nomFichier : string = req.body.name;
    nomFichier = nomFichier.replace(/ /g,"-").replace(/_/g,"-").replace(/\//g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/"/g,"").replace(/'/g,"").replace(/\./g,"");
    let acc = 1; 
    while (listName.includes(nomFichier)) {
        if (acc > 1) {
            nomFichier = nomFichier.split('(')[0]
        }
        nomFichier = nomFichier + "(" + acc + ")";
        acc++;
    }
    

    const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
    let nom = aesCipher.encrypt(Buffer.from(nomFichier + "." + extension));
    let fileName = 'uploads/' + userId + '/database/' + nom;
    let nomHTML = aesCipher.encrypt(Buffer.from(nomFichier + "." + "html"));
    let fileNameHTML2='uploads/' + userId + '/databaseHTML/'+nomHTML+"2";
    let fileNameHTML='uploads/' + userId + '/databaseHTML/'+nomHTML+"2";
    if (extension === "xlsx") {        
        let nomCSV = aesCipher.encrypt(Buffer.from(nomFichier + "." + "csv"));
        
        let fileNameCSV = 'uploads/' + userId + '/database/' + nomCSV;
        
        Utils.default.xlsxToCSV(req.file!.buffer, fileNameCSV, aesCipher);
        fileName = fileNameCSV
        extension = 'csv'
    }else{
        //fs.writeFileSync(fileName, aesCipher.encrypt(req.file!.buffer));
        fs.writeFileSync(fileName, aesCipher.encryptToBuffer(req.file!.buffer));
    }
    
    let overviewPath : string = fileNameHTML;
    let overviewPath2 : string =fileNameHTML2;
    let name : string =nomFichier;
    let date : string =req.body.date;
    let size : any = req.file?.size;
    let separator:string =req.body.separator;
    let colonnes : string[] = getColonneFromCSV(userId, fileName,separator);



    console.log('python python_script/getColumn.py "' + fileName + '" ' + extension + ' "'+separator+'" ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt())
    exec('python python_script/getColumn.py "' + fileName + '" ' + extension + ' "'+separator+'" ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), async (error : any, stdout : any, stderr : any) => {
        
        if (error) {
            console.error(`error: ${error.message}`);
            res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please retry.", "name": "a", "category": "b"});
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please retry.", "name": "a", "category": "b"});
            return;
        }
        if(stdout.split("\n")[0].includes("Error_")||stdout.includes("error: Command failed:")){
            
            res.status(200).json({ "status" : "401", "message": stdout.split("_")[1], "name": "a", "category": "b"});
            return
        }else{
            let resultat = stdout.replace(/\n+/g,'').replace(/\r+/g,'').replace(/' '+/g,"','")
            let colonnesString = resultat.replace(/'+/g,'').replace("]",'').replace("[",'').replace(/\r\n+/g,'').split(",")
            console.log(colonnesString)
            let doc = JSON.stringify({"name":name, "date":date, "size":size, "extension":extension, "colonnes":colonnes, "colonnesString":colonnesString,"separator":separator});
    
            let nomFichier = aesCipher.encrypt(Buffer.from(name + ".json"));
            fs.writeFile('uploads/' + userId + '/databaseInfo/' + nomFichier, aesCipher.encrypt(Buffer.from(doc)), function (err) {});
            exec('python python_script/fullOverview.py "' + fileName + '" ' + extension + ' "'+separator+'" "'+overviewPath2 +'" '+ aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), {maxBuffer: 1024 * 100000}, async (error : any, stdout : any, stderr : any) => {
                if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                
            }); 
            await UserLimit.updateOne({ userId: objectId }, { currentStorage: newCurrentStorage });
            res.status(200).json({ "status": "200", "message": "complete" }); 
            return
        }
        
    });
    
    
};


export const saveEncryptedFile = (file : Express.Multer.File) => {
    const aesCipher = new AESCipher("userId", `${process.env.KEY_ENCRYPT}`);
    if (!fs.existsSync(path.dirname("./userId"))) {
        fs.mkdirSync(path.dirname("./userId"));
      }
    
    fs.writeFileSync("./userId", aesCipher.encrypt(file.buffer));
}

function verifFileName(name : any) {
    const nameSplit = name.split('.');
    if (nameSplit.length === 1) {
        return false;
    }

    const extension = nameSplit[nameSplit.length - 1];
    if (extension == "csv" || extension == "xlsx" || extension == "json" || extension == "txt") {
        return extension;
    }
    return false;
}


function getColonneFromCSV(userId : string, path : any,separator:any) {
    const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
    let colonnes : string[] = aesCipher.decrypt(fs.readFileSync(path, "utf8")).split('\n')[0].replace(/"/g, '').split(separator);
    return colonnes;
}



export const getInfoDatabase : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getDataFiles(req.body.userId, 'uploads/' + req.body.userId + '/databaseInfo/',false)});
};

export const deleteData : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.path);
    if (targetBase != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/database/" + targetBase, function (err) {
            if (err) {
                console.error(err);
                res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
            } else {
                console.log("File removed:", req.body.path);
            }
        });
    }

    let targetBaseHTML = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/databaseHTML/", req.body.path.split(".")[0] + ".html");
    if (targetBaseHTML != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/databaseHTML/" + targetBaseHTML, function (err) {
            if (err) {
                console.error(err);
                res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
            } else {
                console.log("File removed:", req.body.path.split(".")[0] + ".html");
            }
        });
    }


    let targetInfo = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/databaseInfo/", req.body.path.split(".")[0] + ".json");

    let size = Utils.default.getSizeFile(req.body.userId, "uploads/" + req.body.userId + "/databaseInfo/" + targetInfo);
    if (targetInfo != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/databaseInfo/" + targetInfo, async function (err) {
            if (err) {
                console.error(err);
                res.status(200).json({ "status" : "401", "message": "Oops an error occurred, please refresh and retry.", "name": "a", "category": "b"});
            } else {
                console.log("File removed:", req.body.path.split(".")[0] + ".json");
                // Update du stockage de l'utilisateur
                const objectId = new mongoose.Types.ObjectId(req.body.userId);
                const userLimit : any = await UserLimit.findOne({ userId: objectId }).lean();
                const currentStorage = userLimit.currentStorage;
                const newCurrentStorage = currentStorage - parseInt(size, 10);
                await UserLimit.updateOne({ userId: objectId }, { currentStorage: newCurrentStorage });

                res.send("Database deleted");
            }
        });
    }
};

export const downloadData : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);
    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.path);
    if (targetBase != undefined) {
        let data = {"name": req.body.path, "file": aesCipher.decrypt(fs.readFileSync("uploads/" + req.body.userId + "/database/" + targetBase, 'utf8'))}
        res.send(data);
    }
};