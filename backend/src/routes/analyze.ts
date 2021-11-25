import multer from 'multer';
import express from "express";
import { auth } from '../middleware/auth';
import * as analyzeCtrl from '../controllers/analyze';

// Création du router
const router = express.Router();


router.post("/parameters", auth, analyzeCtrl.parameters);

router.post("/databases", auth, analyzeCtrl.databases);

// Exportation du router
export default router;