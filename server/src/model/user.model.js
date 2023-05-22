import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
        verified: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)


export default mongoose.model("User", userSchema)