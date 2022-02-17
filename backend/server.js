import connectDB from './config/db.js'
import dotenv  from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import bodyParser from 'body-parser'
import cors from 'cors';

//connect db
connectDB()

dotenv.config()

const app =express()

app.use(cors())
app.use(bodyParser.json())
//routes
app.use('/users', userRoutes)
app.use('/register', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`App is runnning in ${process.env.NODE_ENV} mode on port ${PORT}`))