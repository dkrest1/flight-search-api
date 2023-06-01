import Joi from "joi";
import UserModal from "./model/user.model.js";;
import {
    passwordToHash,
    compareBcryptPassword,
    generateTokenFromPayload
} from "../utils/helper.utils.js";


//@description: create user
//@route : /user/create
//@access: public
export const createUser = async (req, res) => {
    // user input
    const { username, email, password } = req.body;
    //parameter validation
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    // validate user input
    const { error } = schema.validate({ username, email, password });
    if (error) {
        return res
            .status(400)
            .json({ message: error.message });
    }

    try {
        //check if user exist
        const oldUser = await UserModal.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "user already exist" });
        }

        //hashed password
        const hashedPassword = await passwordToHash(password);

        // create user
        const user = await UserModal.create({
            username,
            email,
            password: hashedPassword,
        });

        return await res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        return res.status(501).json({ message: "Something went wrong!" });
    }
};

//@description: login user 
//@route : /user/login
//@access: public
export const loginUser = async (req, res) => {
    //get user input
    const { email, password } = req.body;
    //parameter validation
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    //validate user input
    const { error } = schema.validate({ email, password });
    if (error) {
        return res.status(400).json({ message: `${error.message}` });
    }

    try {
        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        //validate password
        const ispasswordCorrect = await compareBcryptPassword(password, user.password);
        if (!ispasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.status(200).json({
            access_token: generateTokenFromPayload(user._id),
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


//@description: get user profile controller
//@route : /users/me
//@access: private
export const getMe = async (req, res) => {
    return res.status(200).json(req.user)
}


//@description: Update user controller
//@route : /users/upadte
//@access: private 
export const updatedUser = async (req, res) => {
    //validate the update input
    const updates = Object.keys(req.body)
    const allowedUpdates = ["username", "fullname", "email", "password"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).json({ message: "Invalid Updates" })
    }

    try {
        const user = req.user
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        return res.status(201).json({
            _id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        })
    } catch (error) {
        return res.status(400).json({ message: "Invalid Updates!" })
    }

}

//@description: delete user controller
//@route : /users/me/delete
//@access: private 
export const deleteUser = async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(400).json({ message: "User not found!" })
    }
}