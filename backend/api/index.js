import express from "express";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.js";
import { connectDB } from "../config/db.js";
import cors from 'cors'
import base64Routes from '../routes/base64.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use('/api/base64', base64Routes);

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});