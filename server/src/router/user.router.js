import express from "express";
import auth from "../middlewares/auth.js"
import {
    createUser,
    verifyEmail,
    loginUser,
    resetpasswordRequest,
    resetPasswordController,
    getMe,
    updatedUser,
    deleteUser

} from "../controllers/userController.js"

const router = new express.Router()

router.post("/signup", createUser)
router.post("/signin", loginUser)
router.post("/verify", verifyEmail)
router.post("/password-reset-request", resetpasswordRequest)
router.post("/password-reset", resetPasswordController)
router.get("/me", auth, getMe)
router.patch("/me", auth, updatedUser)
router.delete("/me", auth, deleteUser)


export default router





