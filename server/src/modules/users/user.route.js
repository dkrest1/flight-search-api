import express from "express";
import auth from "../middleware/auth.middleware.js"
import {
    createUser,
    loginUser,
    getMe,
    updatedUser,
    deleteUser

} from "./user.controller.js"

const router = new express.Router()



//DTO (Data Model)
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - usernaame
 *         - email 
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was registered
 *       example:
 *         id: d5fE_asz
 *         username: Oluwatosin
 *         email: oluwatosin@gmail.com
 *         createdAt: 2023-06-14T04:05:06.157Z
 */

//required Data

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The create user API
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *          description: User existed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */

router.post("/create", createUser);

/**
 * @swagger
 * tags:
 *   name: User Login
 *   description: The Login user API
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *          description: User existed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */

router.post("/login", loginUser);
router.get("/me", auth, getMe);
router.patch("/me", auth, updatedUser);
router.delete("/me", auth, deleteUser);

export default router
