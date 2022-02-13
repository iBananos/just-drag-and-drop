import express from "express";
import rateLimit from "express-rate-limit";
import { captcha } from '../middleware/captcha';
import * as userCtrl from '../controllers/user';

// Limite de débit
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false
});


// Création du router
const router = express.Router();



/**
 * Route Signup
 */
router.post("/signup", captcha, userCtrl.signup);


/**
 * Route Login
 */
router.post("/login", limiter, userCtrl.login);


/**
 * Route vérification
 */
router.post("/verification", userCtrl.verification);


/**
 * Route Refresh Token
 */
router.post('/refresh', userCtrl.refreshToken);


/**
 * Route Captcha
 */
router.post('/captcha', userCtrl.getCaptcha);



// Exportation du router
export default router;