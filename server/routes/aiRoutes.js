import express from "express";
import { auth } from "../middlewares/auth.js";
import { genrateArticle, generateBlogTitles } from "../controllers/aiController.js";
const aiRouter = express.Router();

// Generate article
aiRouter.post("/generate-article", auth, genrateArticle);

// Generate blog titles
aiRouter.post("/generate-blog-titles", auth, generateBlogTitles);

export default aiRouter;
