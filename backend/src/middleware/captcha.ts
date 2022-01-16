import Captcha from "../utils/captcha";
import HttpException from '../utils/httpException';
import type { RequestHandler, Request, Response, NextFunction } from "express";


export const captcha : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        if (req.session.captcha === req.body.captcha) {
            next();
        }
        else {
            const captcha = new Captcha();
            req.session.captcha = captcha.getResponse();
            res.status(401).json({"message": "Captcha invalide !", "captcha": captcha.getData()});
        }
    }
    catch (err) {
        const error = new HttpException(500, 'middleware/captcha.ts', 'Erreur dans captcha');
        next(error);
    }
}