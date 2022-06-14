import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//function to register a user
export const registerUser = asyncHandler(async (req, res) => {
  const user = req.body;

  //check if userame or email have been taken
  const takenUsername = await User.findOne({ userName: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenUsername || takenEmail) {
    res.json({ message: "Username or email has already been taken" });
  } else {
    // this needs to be done before user is saved
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      fullNames: user.fullnames,
      userName: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    });

    dbUser.save(function (err) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({ message: "User registered successfully" });
      }
    });
  }
});

export const LoginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // check if user exists
  const user = await User.findOne({ userName: username });

  if (!user) res.status(400).json({ msg: "This user is not registered!" });

  // check if provided password matches user pass
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ msg: "Invalid credentials!" });

  // create JWT and store it as a cookie in browser
  const token = jwt.sign({ id: user._id, type: "user" }, process.env.JWT, {
    expiresIn: "2h",
  });
  res.cookie("token", token, { maxAge: 7200000, httpOnly: true, path: "/" });
  res.status(200).json({ msg: "token created" });
});
