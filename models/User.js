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
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods.excludePassword = function () {
  let userObj = this.toObject();
  delete userObj.password;
  return userObj;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
