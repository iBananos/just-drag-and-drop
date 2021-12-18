import multer from 'multer';
import express from "express";
import { auth } from '../middleware/auth';
import * as dataVisuCtrl from '../controllers/dataVisu';

// Création du router
const router = express.Router();

/**
 * Route Upload
 */
router.post("/parameters", auth, dataVisuCtrl.parameters);

router.post("/matrix", auth, dataVisuCtrl.matrix);

// Exportation du router
export default router;