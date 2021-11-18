import "dotenv/config";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { argon2i } from 'argon2-ffi';
import type { RequestHandler, Request, Response, NextFunction } from "express";


/**
 * Fonction qui permet d'enregistrer un nouvel utilisateur dans la BD,
 * ou de renvoyer une erreur si l'adresse l'email est déja utilisée.
 * @param req 
 * @param res 
 * @param next 
 */
export const signup : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    crypto.randomBytes(32, function(err, salt) {
        if(err) throw new Error(err.toString());

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
            user.save()
            .then(() => res.status(200).json({ message: "Votre compte a bien été créé !" }))
            .catch(() => res.status(400).json({ message: "Cette adresse e-mail est déjà utilisée" }));
        });
    });
};


/**
 * Fonction qui permet de vérifier les informations de l'utilisateur lorsqu'il se connecte sur l'application.
 * Si informations vérifié, alors un token jwt est lui est envoyé.
 * @param req 
 * @param res 
 * @param next 
 */
export const login : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    User.findOne({ email: req.body.email })
        .then((user: any) => {
            if (!user) {
                return res.status(200).json({ error: "Nom d'utilisateur ou mot de passe incorrect !" });
            }
            argon2i.verify(user.password, req.body.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(200).json({ error: "Nom d'utilisateur ou mot de passe incorrect !" });
                    }
                    
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.TOKEN_SECRET}`,
                            { expiresIn: `${process.env.TOKEN_EXPIRES}` }
                        )
                    });
                })
            .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
};