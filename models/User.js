import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    lastName: {
      type: String,
      default: "last name",
    },
    location: {
      type: String,
      default: "my city",
    },
    role: {
      type: String,
      enum: ["admin", "role"],
      default: "role",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
