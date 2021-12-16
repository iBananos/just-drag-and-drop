import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user';
import HttpException from '../utils/httpException';
import type { RequestHandler, Request, Response, NextFunction } from "express";


/**
 * Interface Token
 */
interface Token {
    xsrfToken?: string;
    userId?: string;
}


/**
 * Middleware d'authentification : décode le token d'accès et le token XSRF pour vérifier si l'utilisateur est bien connecté
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const auth : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { cookies, headers } = req;

        /* On vérifie que le JWT est présent dans les cookies de la requête */
        if (!cookies || !cookies.access_token)
            throw new HttpException(401, "middleware/auth.ts", "Token non trouvé.");

        const accessToken = cookies.access_token;

        /* On vérifie que le token XSRF est présent dans les en-têtes de la requête */
        if (!headers || !headers['x-xsrf-token'])
            throw new HttpException(401, "middleware/auth.ts", "Token XSRF non trouvé.");

        const xsrfToken = headers['x-xsrf-token'];


        /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
        const decodedToken = jwt.verify(accessToken, `${process.env.TOKEN_SECRET}`) as Token;

        /* On vérifie que le token XSRF correspond à celui présent dans le JWT  */
        if (xsrfToken !== decodedToken.xsrfToken)
            throw new HttpException(401, "middleware/auth.ts", "Token XSRF invalide.");

        /* On vérifie l'userId du JWT */
        let id = new mongoose.Types.ObjectId(decodedToken.userId);
        const user : any = await User.findOne({ _id: id }).lean();

        if (!user) {
            throw new HttpException(401, "middleware/auth.ts", "L'authentification a échoué.");
        }

        if (user.isVerified == false) {
            throw new HttpException(401, "middleware/auth.ts", "Vous devez d'abord confirmer votre adresse email.");
        }
        
        req.body.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        next(err);
    }
}