import multer from 'multer';
import express from "express";
import { auth } from '../middleware/auth';
import * as uploadCtrl from '../controllers/upload';

// Création du router
const router = express.Router();

// Création du multer
const upload = multer({ dest: 'uploads/' });


/**
 * Route Upload
 */
router.post("/", upload.single('file'), auth, uploadCtrl.saveFile);



// Exportation du router
export default router;