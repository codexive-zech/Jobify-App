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
    avatar: {
      type: String,
    }, // field for image
    avatarPublicId: {
      type: String,
    }, // field for image public ID from cloudinary (so i can use it to check if that avatar is added already so i can use it to remove the profile image when i want to add a new profile image )
  },
  { timestamps: true }
);

userSchema.methods.excludePassword = function () {
  let userObj = this.toObject(); // convert the entire user schema into an object
  delete userObj.password; // deleting the password field from the user object
  return userObj;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
