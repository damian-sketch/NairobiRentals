import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Enter a username"],
      unique: [true, "That username is taken"],
    },
    email: {
      type: String,
      required: [true, "Enter an email"],
      unique: [true, "That email is taken"],
      minlength: 8,
      maxlength: 255,
    },
    password: {
      type: String,
      required: [true, "Enter a password"],
      minlength: [8, "Password should be at least 8 characters"],
      maxlength: 260,
    },
    isSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
