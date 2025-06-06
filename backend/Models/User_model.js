import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["admin", "comum"],
      default: "comum",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);