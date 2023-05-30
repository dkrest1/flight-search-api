import Joi from "joi";
import UserModal from "../model/user.model.js";
import OtpModel from "../model/otp.model.js";
import {
    passwordToHash,
    compareBcryptPassword,
    generateTokenFromPayload
} from "../utils/helper.utils.js";
// import generateOTP from "../service/otp.service.js";
// import sendMail from "../service/email.service.js";
// import {
//     requestPasswordReset,
//     resetPassword
// } from "../service/auth.service.js";


//@description: create user
//@route : /users/signup
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
        // const otpGenerated = generateOTP()
        // const hashedOTP = passwordToHash(otpGenerated)

        // create user
        const user = await UserModal.create({
            username,
            email,
            password: hashedPassword,
            verified: false
        });

        // create otp
        // await new OtpModel({
        //     userId: user._id,
        //     otp: hashedOTP,
        //     createdAt: Date.now(),
        //     expireAt: new Date()
        // }).save()

        //send OTP to user
        // await sendMail({
        //     to: email,
        //     subject: "Email Verification",
        //     html: `<p>Please enter the code <b>${otpGenerated}</b> to complete your SignUp</p>`
        // })

        return await res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            verified: user.verified,
            token: generateTokenFromPayload(user.id),
        });
    } catch (error) {
        console.log(error)
        return res.status(501).json({ message: "Something went wrong!" });
    }
};

//@description: login user 
//@route : /users/signin
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
        const ispasswordCorrect = compareBcryptPassword(password, user.password);
        if (!ispasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.status(200).json({
            token: generateTokenFromPayload(user._id),
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//@description: email verification
//@route : /users/verify
//@access: public
// export const verifyEmail = async (req, res) => {
//     const { email, otp } = req.body
//     const user = await validateUserSignUp(email, otp)
//     return res.status(200).json(user[1])

// }
// validate user signup  
// const validateUserSignUp = async (email, otp) => {
//     const user = await UserModal.findOne({ email })
//     const userOtp = await OtpModel.findOne({ userId: user._id })
//     if (!user) {
//         return [false, {
//             message: "User not found"
//         }]
//     }
//     const validOTP = compareBcryptPassword(otp, userOtp.otp)
//     if (user && !validOTP) {
//         return [false, {
//             message: "Invalid OTP!"
//         }]
//     }
//     //update the user
//     await UserModal.findByIdAndUpdate(user._id, {
//         verified: true
//     })

//     // get the updated user 
//     const updatedUser = await UserModal.findById(user.id).select("-password")

//     return [true, updatedUser]
// };


//@description: password reset request
//@route : /users/password-reset-request
//@access: public
// export const resetpasswordRequest = async (req, res) => {
//     const requestPasswordResetService = await requestPasswordReset(req.body.email)
//     return res.json(requestPasswordResetService)
// }

//@description: reset password
//@route : /users/password-reset
//@access: public
// export const resetPasswordController = async (req, res) => {
//     const resetPasswordService = await resetPassword(
//         req.body.userId,
//         req.body.token,
//         req.body.password
//     )

//     return res.json(resetPasswordService)
// }


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