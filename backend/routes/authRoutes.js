import express from "express";
import {
  LoginUser,
  registerUser,
  fetchVariable,
  loginWithGoogle,
  sellersLoginWithGoogle,
} from "../controllers/authControllers.js";
const router = express.Router();

//route to register a user
router.post("/register", registerUser);

router.post("/login", LoginUser);

router.get("/variables", fetchVariable);

router.post("/auth/google", loginWithGoogle);

router.post("/seller/auth/google", sellersLoginWithGoogle);
export default router;
