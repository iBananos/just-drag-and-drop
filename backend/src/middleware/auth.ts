import jwt from 'jsonwebtoken';
import User from '../models/user';
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
export const auth : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    try {
        const { cookies, headers } = req;

        console.log(cookies);
        console.log(req);

        /* On vérifie que le JWT est présent dans les cookies de la requête */
        if (!cookies || !cookies.access_token)
            return res.status(401).json({ message: 'Token non trouvé' });

        const accessToken = cookies.access_token;

        /* On vérifie que le token XSRF est présent dans les en-têtes de la requête */
        if (!headers || !headers['x-xsrf-token'])
            return res.status(401).json({ message: 'Token XSRF non trouvé' });

        const xsrfToken = headers['x-xsrf-token'];


        /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
        const decodedToken = jwt.verify(accessToken, `${process.env.TOKEN_SECRET}`) as Token;

        /* On vérifie que le token XSRF correspond à celui présent dans le JWT  */
        if (xsrfToken !== decodedToken.xsrfToken) 
            return res.status(401).json({ message: 'Token XSRF invalide' });

        /* On vérifie l'userId du JWT */
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) 
            return res.status(401).json({ message: 'UserID invalide'});
        

        return next();
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal error' });
    }
}