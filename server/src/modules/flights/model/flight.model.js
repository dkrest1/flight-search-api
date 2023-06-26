import mongoose from "mongoose";

const BookingSchema = mongoose.Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, },
        bookId: { type: String, required: true, unique: true },
        queueOfficeId: { type: String, required: true },
        reference: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    },

    {
        timestamps: true
    }
)

export default mongoose.model("Booking", BookingSchema)