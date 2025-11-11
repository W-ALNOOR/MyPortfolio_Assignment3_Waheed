import express from "express";
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    deleteAllProjects,
   
} from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.get ("/", getAllProjects);
router.get ("/:id", getProjectById);
router.post ("/", authCtrl.requireSignin, authCtrl.isAdmin, createProject);
router.put ("/:id", authCtrl.requireSignin, authCtrl.isAdmin, updateProject);
router.delete ("/:id", authCtrl.requireSignin, authCtrl.isAdmin, deleteProject);
router.delete ("/", authCtrl.requireSignin, authCtrl.isAdmin, deleteAllProjects);

export default router;
