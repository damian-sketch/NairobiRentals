import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//function to get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export const getUserInfo = asyncHandler(async (req, res) => {
  let username = req.query.name;
  console.log(req.query);
  let user = await User.findOne({ email: username });
  console.log(user);
  if (!user) {
    res.status(400).json("User not found");
  } else {
    let seller = user.isSeller;
    res.json(seller);
  }
});
