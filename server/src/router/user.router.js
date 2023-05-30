import express from "express";
import auth from "../middleware/auth.middleware.js"
import {
    createUser,
    // verifyEmail,
    loginUser,
    // resetpasswordRequest,
    // resetPasswordController,
    getMe,
    updatedUser,
    deleteUser

} from "../controller/user.controller.js"

const router = new express.Router()

router.post("/create", createUser)
router.post("/login", loginUser)
// router.post("/verify", verifyEmail)
// router.post("/password-reset-request", resetpasswordRequest)
// router.post("/password-reset", resetPasswordController)
router.get("/me", auth, getMe)
router.patch("/me", auth, updatedUser)
router.delete("/me", auth, deleteUser)


export default router





