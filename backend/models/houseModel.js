import mongoose from "mongoose";

const houseSchema = mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, "Enter a location"],
    },
    price: {
      type: String,
      required: [true, "Enter a price"],
    },
    description: {
      type: String,
      required: [true, "Enter a description"],
    },
    isAdmin: {
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
