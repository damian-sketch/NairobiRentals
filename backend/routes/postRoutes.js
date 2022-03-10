import { getPosts } from "../controllers/postControllers.js";
import express from 'express'
const router = express.Router()

// route to get all posts
router.route('/').get(getPosts)

// // route to get post by id
// router.route('/:id').get(getPostById)

export default router