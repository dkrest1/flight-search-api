import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const generateTokenFromPayload = (payload) => {
    const salt = process.env.JWT_SECRET
    const token = jwt.sign({ payload }, salt, { expiresIn: "1h" })
    return token;
}

export const generatePayloadFromToken = (token) => {
    const salt = process.env.JWT_SECRET
    const payload = jwt.verify(token, salt)
    return payload;
}

export const passwordToHash = async (password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export const compareBcryptPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

//manual pagination
export const pagination = (page = 1, limit = 250) => {
    page = parseInt(page);
    limit = parseInt(limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    return { startIndex, lastIndex }

}