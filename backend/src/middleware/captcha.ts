import Captcha from "../utils/captcha";
import type { RequestHandler, Request, Response, NextFunction } from "express";


export const captcha : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        if (req.session.captcha === req.body.captcha) {
            next();
        }
        else {
            /* En production : !!!!!!
            */const captcha = new Captcha();
            req.session.captcha = captcha.getResponse();
            res.status(401).json({"message": "Captcha invalide !", "captcha": captcha.getData()});
            
            //next();
        }
    }
    catch (err) {
        next(err);
    }
}