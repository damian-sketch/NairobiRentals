import express from "express";
import {
  LoginUser,
  registerUser,
  fetchVariable,
} from "../controllers/authControllers.js";
const router = express.Router();

//route to register a user
router.post("/register", registerUser);

router.post("/login", LoginUser);

router.get("/variables", fetchVariable);
export default router;
