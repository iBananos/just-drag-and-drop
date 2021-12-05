import "dotenv/config";
import path from "path";
import fs from 'fs';
import type { RequestHandler, Request, Response, NextFunction } from "express";
import * as Utils from "../utils";
import { exec } from 'child_process';
import AESCipher from "../utils/aesCipher";

/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
export const saveFile : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let userId : string = req.body.userId;

    var listName = Utils.default.getNameFiles(userId, 'uploads/' + userId + '/database/');
    var nomFichier : string = req.body.name;
    var acc = 1; 
    while (listName.includes(nomFichier)) {
        if (acc > 1) {
            nomFichier = nomFichier.split('(')[0]
        }
        nomFichier = nomFichier + "(" + acc + ")";
        acc++;
    }

    const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
    let nom = aesCipher.encrypt(Buffer.from(nomFichier + "." + req.file?.originalname.split(".")[1]));
    let fileName = 'uploads/' + userId + '/database/' + nom;
    fs.writeFileSync(fileName, aesCipher.encrypt(req.file!.buffer));

    console.log(fileName);

    var colonnes : string[] = getColonneFromCSV(userId, fileName)
    createInfoDatabase(userId, fileName, nomFichier, req.body.date, req.file?.size, req.file?.originalname.split(".")[1], colonnes)

    res.send('complete'); 
};


export const saveEncryptedFile = (file : Express.Multer.File) => {
    const aesCipher = new AESCipher("userId", `${process.env.KEY_ENCRYPT}`);
    if (!fs.existsSync(path.dirname("./userId"))) {
        fs.mkdirSync(path.dirname("./userId"));
      }
    
    fs.writeFileSync("./userId", aesCipher.encrypt(file.buffer));
}

function getColonneFromCSV(userId : string, path : any) {
    const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
    var colonnes : string[] = aesCipher.decrypt(fs.readFileSync(path, "utf8")).split('\n')[0].replace(/"/g, '').split(",");
    return colonnes;
}


function createInfoDatabase(userId : string, fileName : string, name : string, date : string, size : any, extension : any, colonnes : string[]){
    const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
    exec('python3 python/getcolumn.py "' + fileName + '" ' + extension + ' ' + aesCipher.getKey() + ' ' + aesCipher.getToEncrypt(), (error : any, stdout : any, stderr : any) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        var colonnesString = stdout.replace(/'+/g,'').replace("]",'').replace("[",'').replace('\r\n','').split(" ")
        var doc = JSON.stringify({"name":name, "date":date, "size":size, "extension":extension, "colonnes":colonnes, "colonnesString":colonnesString});

        let nomFichier = aesCipher.encrypt(Buffer.from(name + ".json"));
        fs.writeFile('uploads/' + userId + '/databaseInfo/' + nomFichier, aesCipher.encrypt(Buffer.from(doc)), function (err) {});
    });
}

export const getInfoDatabase : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getDataFiles(req.body.userId, 'uploads/' + req.body.userId + '/dataBaseInfo/')});
};

export const deleteData : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.path);
    if (targetBase != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/database/" + targetBase, function (err) {
            if (err) {
                console.error(err);
                res.send("Erreur lors de la suppression");
            } else {
                console.log("File removed:", req.body.path);
            }
        });
    }

    let targetInfo = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/databaseInfo/", req.body.path.split(".")[0] + ".json");
    if (targetInfo != undefined) {
        fs.unlink("uploads/" + req.body.userId + "/databaseInfo/" + targetInfo, function (err) {
            if (err) {
                console.error(err);
                res.send("Erreur lors de la suppression");
            } else {
                res.send("Base supprimée");
            }
        });
    }
};

export const downloadData : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    const aesCipher = new AESCipher(req.body.userId, `${process.env.KEY_ENCRYPT}`);
    let targetBase = Utils.default.findEncryptedFile(req.body.userId, "uploads/" + req.body.userId + "/database/", req.body.path);
    if (targetBase != undefined) {
        var data = {"name": req.body.path, "file": aesCipher.decrypt(fs.readFileSync("uploads/" + req.body.userId + "/database/" + targetBase, 'utf8'))}
        res.send(data);
    }
};