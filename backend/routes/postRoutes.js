import express from "express";
import { addHouse } from "../controllers/houseControllers.js";
const router = express.Router();

// route to submit a new post
router.post("/submit-post", addHouse);

export default router;
