import Usermodal from "../models/userModel.js"
import {
    generatePayloadFromToken,
} from "../utils/helper.utils.js"

const auth = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = generatePayloadFromToken(token)
            // get user from token 
            req.user = await Usermodal.findById(decoded.payload).select("-password")
            next()

        } catch (error) {
            return res.status(401).json({ message: "Not Authorized" })
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

export default auth