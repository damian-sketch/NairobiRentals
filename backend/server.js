import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";

//connect db
connectDB();

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
//routes
app.use("/users", userRoutes);
app.use("/", authRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`App is runnning in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
