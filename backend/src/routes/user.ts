import express from "express";
import { captcha } from '../middleware/captcha';
import * as userCtrl from '../controllers/user';

// Création du router
const router = express.Router();




/**
 * Route Signup
 */
router.post("/signup", captcha, userCtrl.signup);


/**
 * Route Login
 */
router.post("/login", userCtrl.login);


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