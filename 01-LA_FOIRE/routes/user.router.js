
import express from "express"
import { verifieToken } from "../middlewares/auth.js";
import { signup, getUsers, getUserById, deleteUser, updateUser, desactivateUser, updateUserProfile, sign} 
from "../controllers/user.controller.js"

const router = express.Router()

router.post("/signup", signup)

router.post("/sign", sign)

router.get("/get", getUsers)

router.get("/get/:id", getUserById)

router.delete("/delete/:id", verifieToken, deleteUser)

router.put("/update/:id",verifieToken, updateUser)
router.put('/updateProfile/:id', verifieToken, updateUserProfile);
// Route pour désactiver un utilisateur
router.put('/desactivateAccount/:id', verifieToken, desactivateUser);

export default router
