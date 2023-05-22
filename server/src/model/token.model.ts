import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, expires: 300 },
});

export default mongoose.model("Token", tokenSchema);
