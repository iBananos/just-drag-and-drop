import express from "express";
import * as userCtrl from '../controllers/user';

// Création du router
const router = express.Router();




/**
 * Route Signup
 */
router.post("/signup", userCtrl.signup);


/**
 * Route Login
 */
router.post("/login", userCtrl.login);


/**
 * Route Refresh Token
 */
router.post('/refresh', userCtrl.refreshToken);



// Exportation du router
export default router;