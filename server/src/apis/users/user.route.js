import express from "express";
import auth from "../middleware/auth.middleware.js"
import {
    createUser,
    loginUser,
    getUser,
    getUsers,
    updatedUser,
    deleteUser

} from "./user.controller.js"

const router = new express.Router()

// ================================================================================
//  Swagger Documentation for the User Resorce
// =================================================================================


// User Model or User Entity
/**
 * @swagger
 * components:
 *   schemas:
 *     UserEntity:
 *       type: object
 *       required:
 *         - username
 *         - email 
 *         - password
 *       properties:
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
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated
 */


// DTO for create user
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDTO:
 *       type: object
 *       required:
 *         - username
 *         - email 
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 */

// request and response for create user 
/**
 * @swagger
 * tags:
 *   name: User 
 *   description: The User resource endpoint
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       201:
 *         description: User created successsfully.
 *       400:
 *          description: User existed.
 *         
 *       500:
 *         description: server error, please try again later.
 *
 */
router.post("/create", createUser);

// DTO for login user
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUserDTO:
 *       type: object
 *       required:
 *         - email 
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 */

// request response for login user
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserDTO'
 *     responses:
 *       200:
 *         description: Login successfully and get token response.
 *       401:
 *          description: Unauthorized.
 *       500:
 *         description: Server error, please try again later.
 *
 */

router.post("/login", loginUser);

// request response to get user
/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: get a user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: get user profile detail.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEntity'
 *       401:
 *          description: Unauthorized.
 *       500:
 *         description: Server error, please try again later.
 *
 */

router.get("/me", auth, getUser);

// request response to get users
/**
 * @swagger
 * user:
 *   get:
 *     summary: get users profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: get users profile detail.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEntity'
 *       401:
 *          description: Unauthorized.
 *       500:
 *         description: Server error, please try again later.
 *
 */

router.get("/", auth, getUsers)

// DTO for update user
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 */


// request response to update user
/**
 * @swagger
 * /user/me:
 *   patch:
 *     summary: update a user profile
 *     tags: [User]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDTO'
 *     responses:
 *       200:
 *         description: update a user profile detail.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEntity'
 *       401:
 *          description: Unauthorized.
 *       500:
 *         description: Server error, please try again later.
 *
 */
router.patch("/me", auth, updatedUser);

// request response to update user
/**
 * @swagger
 * /user/me:
 *   delete:
 *     summary: delete a user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description:  user profile deleted successfully.
 *       401:
 *          description: Unauthorized.
 *       500:
 *         description: Server error, please try again later.
 *
 */
router.delete("/me", auth, deleteUser);

export default router
