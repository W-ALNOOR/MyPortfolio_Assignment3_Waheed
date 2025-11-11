import express from "express";
import {
    getAllQualifications,
    getQualificationById,
    createQualification,
    updateQualification,
    deleteQualification,
    deleteAllQualifications,
   
} from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.get ("/", getAllQualifications);
router.get ("/:id", getQualificationById);
router.post ("/", authCtrl.requireSignin, authCtrl.isAdmin, createQualification);
router.put ("/:id", authCtrl.requireSignin, authCtrl.isAdmin, updateQualification);
router.delete ("/:id", authCtrl.requireSignin, authCtrl.isAdmin, deleteQualification);
router.delete ("/", authCtrl.requireSignin, authCtrl.isAdmin, deleteAllQualifications);

export default router;
