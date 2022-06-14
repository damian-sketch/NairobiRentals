import express from "express";
import {
  addHouse,
  getHouse,
  houseDetails,
} from "../controllers/houseControllers.js";
const router = express.Router();

// route to submit a new post
router.post("/submit-post", addHouse);

// router to get posts
router.get("/", getHouse);

// router to get post details
router.get("/post-details", houseDetails);

export default router;
