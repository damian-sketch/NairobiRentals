import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import envVariables from "../middlewares/envVariables.js";
import { OAuth2Client } from "google-auth-library";

//function to register a user
export const registerUser = asyncHandler(async (req, res) => {
  const user = req.body;

  //check if userame or email have been taken
  const takenUsername = await User.findOne({ userName: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenUsername) {
    res.status(401).json({ message: "Username has already been taken" });
  } else if (takenEmail) {
    res
      .status(401)
      .json({ message: "An account for this email already exists!" });
  } else {
    // this needs to be done before user is saved
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      userName: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
      isSeller: user.seller,
    });

    dbUser.save(function (err) {
      if (err) {
        res.status(500).json(err.message);
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

  if (!isMatch) return res.status(401).json({ msg: "Invalid password!" });

  // create JWT and store it as a cookie in browser
  const token = jwt.sign({ id: user._id, type: "user" }, process.env.JWT, {
    expiresIn: "2h",
  });
  res.cookie("token", token, { maxAge: 7200000, httpOnly: true, path: "/" });
  res.status(200).json({ msg: "token created" });
});

export const fetchVariable = asyncHandler(async (req, res) => {
  const requested = req.query.name;
  let variableValue = envVariables(requested);
  res.send(variableValue);
});

export const loginWithGoogle = asyncHandler(async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const { credential } = req.body.token;
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name } = ticket.getPayload();
  // check if user exists
  const user = await User.findOne({ email: email });
  if (!user) res.status(400).json({ msg: "This user is not registered!" });

  //check if user is a buyer
  if (!user.isSeller)
    res.status(400).json({ msg: "Please register as a buyer!" });
  // create JWT and store it as a cookie in browser
  const token = jwt.sign({ id: user._id, type: "user" }, process.env.JWT, {
    expiresIn: "2h",
  });
  res.cookie("token", token, { maxAge: 7200000, httpOnly: true, path: "/" });
  res.status(200).json({ msg: "Success", name: name });
});

export const sellersLoginWithGoogle = asyncHandler(async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  // Verify the ID token against the google token
  const { credential } = req.body.token;
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name } = ticket.getPayload();
  // check if user exists
  const user = await User.findOne({ email: email });
  if (!user) res.status(400).json({ msg: "This user is not registered!" });

  //check if user is a seller
  if (!user.isSeller)
    res.status(400).json({ msg: "Please register as a seller!" });
  // create JWT and store it as a cookie in browser
  const token = jwt.sign({ id: user._id, type: "user" }, process.env.JWT, {
    expiresIn: "2h",
  });
  res.cookie("token", token, { maxAge: 7200000, httpOnly: true, path: "/" });
  res.status(200).json({ msg: "Success", name: name });
});
