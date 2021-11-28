import type HttpException from "../utils/httpException";
import type { Request, Response, NextFunction } from "express";


export default function middlewareError(error : HttpException, req : Request, res : Response, next : NextFunction) {
    /* Affichage de l'erreur */
    console.log(`${error}`);

    /* Personalisation du message d'erreur si le code est 500 */
    let { status, message } = error;
    if (status === 500 || !message) {
        message = "Oups un problème est survenu.";
    }

    /* Envoie de l'erreur au client */
    res.status(status).json({ message: message });
}