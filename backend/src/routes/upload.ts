import multer from 'multer';
import express from "express";
import { auth } from '../middleware/auth';
import * as uploadCtrl from '../controllers/upload';

// Création du router
const router = express.Router();

// Création du multer
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Route Upload
 */
router.post("/", upload.single('file'), auth, uploadCtrl.saveFile);

router.post("/getInfo",  auth, uploadCtrl.getInfoDatabase);

router.post("/deleteData",  auth, uploadCtrl.deleteData);

router.post("/downloadData",  auth, uploadCtrl.downloadData);


// Exportation du router
export default router;