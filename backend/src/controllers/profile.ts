import "dotenv/config";
import User from '../models/user';
import HttpException from '../utils/httpException';
import type { RequestHandler, Request, Response, NextFunction } from "express";

/**
 * Fonction qui réceptionne le fichier (la base de donnée) et l'enregistre dans le serveur.
 * @param req 
 * @param res 
 * @param next 
 */

export const getInformation : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user : any = await User.findOne({ _id: req.body.userId }).lean();
        if(user){
            res.send({"mail" :user.email , "name" : user.name, "surname" : user.surname});
        }

        
    }
    catch (err) {
        const error = new HttpException(500, 'controllers/profile.ts', err.toString());
        next(error);
    }
}
