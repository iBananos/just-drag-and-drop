import fs from 'fs';
import "dotenv/config";
import type { RequestHandler, Request, Response, NextFunction } from "express";
import * as Utils from "../utils";

/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
export const saveFile : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log(req.file!.path)
    var src = fs.createReadStream(req.file!.path);
    var listName = Utils.default.getNameFiles('uploads/' + req.body.userId + '/database/');
    var nomFichier = req.body.name;
    var acc= 1; 
    while(listName.includes(nomFichier)){
        if(acc>1){
            nomFichier = nomFichier.split('(')[0]
        }
        nomFichier= nomFichier+"("+acc+")";
        acc++;
    }
    createInfoDatabase(req.body.userId,nomFichier,req.body.date,req.file?.size,req.file?.originalname.split(".")[1])
    var dest = fs.createWriteStream('uploads/' + req.body.userId + '/database/' + nomFichier+"."+req.file?.originalname.split(".")[1]);
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


function createInfoDatabase(userId : string, name:string,date:string, size :any, extension : any){
    var doc = JSON.stringify({"name":name,"date":date,"size":size,"extension":extension});
    fs.writeFile('uploads/' + userId + '/databaseInfo/' + name+".json",doc, function (err) {});
}

export const getInfoDatabase : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getInformations('uploads/' + req.body.userId + '/dataBaseInfo/')});
};

export const deleteData : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log(req.body.path);
    fs.unlink("uploads/"+req.body.userId +"/database/"+req.body.path, function (err) {
        if (err) {
          console.error(err);
          res.send("Erreur lors de la suppression");
        } else {
          console.log("File removed:", req.body.path);
        }
    })
    fs.unlink("uploads/"+req.body.userId +"/databaseInfo/"+req.body.path.split(".")[0]+".json", function (err) {
        if (err) {
          console.error(err);
          res.send("Erreur lors de la suppression");
        } else {
          console.log("File removed:", req.body.path);
          res.send("Base supprimée");
        }
    })
};

export const downloadData : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log(req.body.path);

    var data = {"name": req.body.path,"file":fs.readFileSync("uploads/"+req.body.userId +"/database/"+req.body.path, 'utf8')}
    res.send(data);
};