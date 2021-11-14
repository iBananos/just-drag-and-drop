import crypto from 'crypto';
import User from '../models/user';
import { argon2i } from 'argon2-ffi';
import type { RequestHandler } from "express";


export const signup : RequestHandler = (req, res, next) => {
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
            .then(() => res.status(201).json({ message: "Votre compte a bien été créé !" }))
            .catch(() => res.status(400).json({ message: "Cette adresse e-mail est déjà utilisée" }));
        });
    });
};