import express from "express";
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    deleteAllContacts,
    
} from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.get ("/", getAllContacts);
router.get ("/:id", getContactById);
// Allow public contact submissions
router.post ("/", createContact);
router.put ("/:id", authCtrl.requireSignin, authCtrl.isAdmin, updateContact);
router.delete ("/:id", authCtrl.requireSignin, authCtrl.isAdmin, deleteContact);
router.delete ("/", authCtrl.requireSignin, authCtrl.isAdmin, deleteAllContacts);

export default router;
