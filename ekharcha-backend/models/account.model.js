import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["credit", "checking", "savings", "investment"],
    required: true,
  },
  balance: { type: Number, required: true },
  institution: { type: String, required: true },
  accountNumber: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // You can add timestamps if you want:
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Account", AccountSchema);
