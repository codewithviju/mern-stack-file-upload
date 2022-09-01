import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    age: {
      type: Number,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
