import fs from 'fs';
import "dotenv/config";
import type { RequestHandler, Request, Response, NextFunction } from "express";


/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */
export const parameters : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    console.log("param recu")
    res.send("ok");
};


