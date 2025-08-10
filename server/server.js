import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import axios from "axios";
// Initialize dotenv
dotenv.config();
import { clerkMiddleware } from "@clerk/express";
import { requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import cloudinary from './config/cloudinary.js';


// Initialize express
const app = express();

// Initialize cloudinary
cloudinary;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for Clerk
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the AI API");
});

app.use(requireAuth());
app.use("/api/ai", aiRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
