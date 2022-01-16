import multer from 'multer';
import express from "express";
import { auth } from '../middleware/auth';
import * as profileCtrl from '../controllers/profile';
// Création du router
const router = express.Router();


 router.post("/getInformation", auth ,  profileCtrl.getInformation);
 router.post("/isVerified", auth , profileCtrl.isVerified);

// Exportation du router
export default router;