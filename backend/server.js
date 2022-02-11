import connectDB from './config/db.js'
import dotenv  from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import express from 'express'



//connect db
connectDB()

dotenv.config()

const app =express()

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`App is runnning in ${process.env.NODE_ENV} mode on port ${PORT}`))