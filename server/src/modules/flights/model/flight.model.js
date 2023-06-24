import mongoose from "mongoose";

const BookingSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
)


export default mongoose.model("Booking", BookingSchema)