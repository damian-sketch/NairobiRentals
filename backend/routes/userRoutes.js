import { getUserInfo, getUsers } from "../controllers/userControllers.js";
import express from "express";
const router = express.Router();

// route to get all users
router.route("/").get(getUsers);

router.get("/getInfo", getUserInfo);

export default router;
