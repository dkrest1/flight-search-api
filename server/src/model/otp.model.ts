import mongoose from "mongoose";
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, expires: 3600 },
});

export default mongoose.model("Otp", otpSchema);
