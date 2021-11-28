import "dotenv/config";
import fs from 'fs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { argon2i } from 'argon2-ffi';
import RefreshToken from '../models/refreshToken'
import HttpException from '../utils/httpException';

import type { ObjectId } from 'mongoose';
import type { RequestHandler, Request, Response, NextFunction } from "express";



/**
 * Fonction qui permet d'enregistrer un nouvel utilisateur dans la BD,
 * ou de renvoyer une erreur si l'adresse l'email est déja utilisée.
 * @param req 
 * @param res 
 * @param next 
 */
export const signup : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    try {
        if (!checkMailAvailable(req.body.email)) {
            throw new HttpException(401, "controllers/user.ts", "Veuillez entrer une adresse mail valide.");
        }

        if (!checkPassword(req.body.password)) {
            throw new HttpException(401, "controllers/user.ts", "Le mot de passe n'est pas assez complexe.");
        }

        crypto.randomBytes(32, function(err, salt) {
            if (err) throw new HttpException(500, "controllers/user.ts", err.toString());

            const options = {
                timeCost: 10,
                memoryCost: 16384,
                parallelism: 2,
                hashLength: 64,
            };
        
            argon2i.hash(req.body.password, salt, options).then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save().then(async () => {
                    res.status(200).json({ message: "Votre compte a bien été créé !" });

                    const userId : any = await User.findOne({ email: req.body.email }).lean();
                    let dir = 'uploads/' + userId._id;
                    fs.mkdirSync(dir);
                    fs.mkdirSync(dir + '/database');
                    fs.mkdirSync(dir + '/analyse');
                    fs.mkdirSync(dir + '/analyseInfo');
                    fs.mkdirSync(dir + '/databaseInfo');
                })
                .catch(() => { throw new HttpException(401, "controllers/user.ts", "Cette adresse e-mail est déjà utilisée."); });
            });
        });
    }
    catch (err) {
        next(err);
    }
};


/**
 * Fonction qui permet de vérifier les informations de l'utilisateur lorsqu'il se connecte sur l'application.
 * Si informations vérifié, alors un token jwt est lui est envoyé.
 * @param req 
 * @param res 
 * @param next 
 */
export const login : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user : any = await User.findOne({ email: req.body.email }).lean();
        if (!user) {
            throw new HttpException(401, "controllers/user.ts", "Nom d'utilisateur ou mot de passe incorrect !");
        }

        const valid = await argon2i.verify(user.password, req.body.password);
        if (!valid) {
            throw new HttpException(401, "controllers/user.ts", "Nom d'utilisateur ou mot de passe incorrect !");
        }

        /* Création des token */
        const {xsrfToken, accessToken, refreshToken} = generateToken(user._id);

        /* Envoie des token */
        sendToken(res, xsrfToken, accessToken, refreshToken);
    }
    catch (err) {
        next(err);
    }
};



/**
 * Fonction permettant de régénérer les token à partir d’un refresh token valide.
 * @param req 
 * @param res 
 * @param next 
 */
export const refreshToken : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { cookies } = req;

        /* On vérifie que le JWT est présent dans les cookies de la requête */
        if (!cookies || !cookies.refresh_token)
            throw new HttpException(401, "controllers/user.ts", "Token Expires");
        
        const oldRefreshToken : any = await RefreshToken.findOne({ refreshToken: cookies.refresh_token }).lean();
        if (oldRefreshToken!.expires < Date.now())
            throw new HttpException(401, "controllers/user.ts", "Token Expires");
        else {
            /* Création des token */
            const {xsrfToken, accessToken, refreshToken} = generateToken(oldRefreshToken.userId);

            /* Envoie des token */
            sendToken(res, xsrfToken, accessToken, refreshToken);
        }
    }
    catch (err) {
        next(err);
    }
}


function generateToken(user_id : ObjectId) {
    /* On créer le token CSRF */
    const xsrfToken = crypto.randomBytes(64).toString('hex');

    /* On créer le JWT avec le token CSRF dans le payload */
    const accessToken = jwt.sign(
        { userId: user_id, xsrfToken },
        `${process.env.TOKEN_SECRET}`,
        { expiresIn: parseInt(`${process.env.TOKEN_EXPIRES}`, 10) * 1000 }
    );


    /* On créer le refresh token et on le stocke en BDD */
    const refreshToken = crypto.randomBytes(128).toString('base64');
    const refreshTokenExpires = Date.now() + (parseInt(`${process.env.REFRESH_TOKEN_EXPIRES}`, 10) * 1000);
    
    RefreshToken.findOne({ userId: user_id })
        .then((refresh) => {
            if (refresh == null) {
                new RefreshToken({
                    refreshToken: refreshToken,
                    expires: refreshTokenExpires,
                    userId: user_id
                }).save();
            }
            else {
                RefreshToken.updateOne({ userId: user_id }, {refreshToken: refreshToken, expires: refreshTokenExpires})
                    .then(() => {})
                .catch(error => { throw new HttpException(500, "controllers/user.ts", error); });
            }
        })
    .catch(error => { throw new HttpException(500, "controllers/user.ts", error); });

    return {xsrfToken, accessToken, refreshToken};
}


/**
 * Fonction permettant d'envoyer les tokens
 * @param res 
 * @param xsrfToken 
 * @param accessToken 
 * @param refreshToken 
 */
function sendToken(res : Response, xsrfToken : string, accessToken : string, refreshToken : string) {
    /* On créer le cookie contenant le JWT */
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,      /*!!!!!! True quand https !!!!!!*/
        maxAge: parseInt(process.env.TOKEN_EXPIRES!, 10) * 1000
    });


    /* On créer le cookie contenant le refresh token */
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,      /*!!!!!! True quand https !!!!!!*/
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES!, 10) * 1000,
        path: 'api/auth/refresh'
    });


    /* On envoie une reponse JSON contenant les durées de vie des tokens et le token CSRF */
    res.status(200).json({
        accessTokenExpires: Date.now() + (parseInt(`${process.env.TOKEN_EXPIRES}`, 10) * 1000),
        refreshTokenExpires: Date.now() + (parseInt(`${process.env.REFRESH_TOKEN_EXPIRES}`, 10) * 1000),
        xsrfToken
    });
}



function checkPassword(pwd : string) {
    if (pwd.match( /[0-9]/g) && pwd.match( /[A-Z]/g) && 
    pwd.match(/[a-z]/g) && pwd.match( /[^a-zA-Z\d]/g) && pwd.length >= 10) {
        return true;
    }
    return false;
}


function checkMailAvailable(mail : string){
    var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (expressionReguliere.test(mail)) {
        return true;
    }
    return false;
}