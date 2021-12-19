import multer from 'multer';
import express from "express";
import { auth } from '../middleware/auth';
import * as analyzeCtrl from '../controllers/analyze';

// Création du router
const router = express.Router();


router.post("/parameters", auth, analyzeCtrl.parameters);
router.post("/parametersDemo",  analyzeCtrl.parametersDemo);

router.post("/databases", auth, analyzeCtrl.databases);
router.post("/databasesDemo", analyzeCtrl.databasesDemo);

router.post("/informations", auth, analyzeCtrl.informations);

router.post("/deleteData", auth, analyzeCtrl.deleteData);

router.post("/downloadAnalyze", auth, analyzeCtrl.downloadAnalyze);
router.post("/downloadAnalyzeDemo", analyzeCtrl.downloadAnalyzeDemo);



// Exportation du router
export default router;