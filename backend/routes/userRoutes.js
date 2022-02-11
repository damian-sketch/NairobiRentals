import { getUsers, getUserById } from "../controllers/userControllers.js";
import express from 'express'
const router = express.Router()

// route to get all users
router.route('/').get(getUsers)

// route to get user by id
router.route('/:id').get(getUserById)

export default router