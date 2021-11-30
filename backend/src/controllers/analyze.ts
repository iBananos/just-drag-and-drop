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
    req.body.nameAnalyze = nomFichier;
    req.body.type = "prediction";
    fs.writeFile('uploads/' + req.body.userId + '/analyseInfo/' + nomFichier+".json",JSON.stringify(req.body), async function (err) {
        if (err){
            res.send('error'); 
        }else{
            var analyze_choice = req.body.category;
            var algo_choice = req.body.algo;
            var list_param : string[] = [];
            var filename= 'uploads/' + req.body.userId + '/database/' + req.body.database
            var features = req.body.feature;
            console.log(req.body.feature)
            var pred = req.body.pred;
            Object.entries(req.body.params).forEach(([key,value])=>{list_param.push(value as string)}) ;
            //var resultats :any = await  Utils.default.callPython(filename,features,pred,list_param,analyze_choice,algo_choice)
            exec('python3 python/script.py '+filename+" "+features+" "+pred+" "+list_param+" "+analyze_choice+" "+algo_choice, (error:any, stdout:any, stderr:any) => {
                if (error) {
                  console.error(`error: ${error.message}`);
                  return;
                }
              
                if (stderr) {
                  console.error(`stderr: ${stderr}`);
                  return;
                }
                
                fs.writeFile('uploads/' + req.body.userId + '/analyse/' + nomFichier+".csv",stdout, function (err) {
                    if (err){
                        res.send('error'); 
                    }else{
                        res.send(nomFichier+".csv")
                    }
                });
              });
            
            
        }
    });
};

export const databases : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getDataFiles('uploads/' + req.body.userId + '/databaseInfo/')});
};

export const informations : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send({"liste" : Utils.default.getInformations('uploads/' + req.body.userId )});
};

export const downloadAnalyze : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    var type = req.body.type
    if(type=="prediction"){
        var data = {"name": req.body.path,"file":fs.readFileSync("uploads/"+req.body.userId +"/analyse/"+req.body.path, 'utf8')}
        res.send(data);
    }else if(type=="dataVisu"){
        var file = JSON.parse(fs.readFileSync("uploads/"+req.body.userId +"/dataVisuInfo/"+req.body.path+".json", 'utf8'));
        var filename = "uploads/"+req.body.userId +"/database/"+file.database ;
        
        exec('python3 python/datavisu.py '+filename+" "+file.firstOne+" "+file.secondOne+" "+file.thirdOne, (error:any, stdout:any, stderr:any) => {
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
    
};



