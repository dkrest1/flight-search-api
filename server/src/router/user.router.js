import express from "express";
import auth from "../middleware/auth.middleware.js"
import {
    createUser,
    loginUser,
    getMe,
    updatedUser,
    deleteUser

} from "../controller/user.controller.js"

const router = new express.Router()

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/me", auth, getMe);
router.patch("/me", auth, updatedUser);
router.delete("/me", auth, deleteUser);


export default router





