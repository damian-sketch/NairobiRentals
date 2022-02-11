import express from 'express'
import { registerUser } from '../controllers/authControllers.js'
const router = express.Router()

//route to register a user
router.post('/', registerUser)

export default router