import express from "express";
import { addHouse, getHouse } from "../controllers/houseControllers.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

// route to submit a new post
router.post("/submit-post", addHouse);

// router to get posts
router.get("/", getHouse);

export default router;
