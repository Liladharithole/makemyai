import express from "express";
import { auth } from "../middlewares/auth.js";
import { genrateArticle, generateBlogTitles, generateImages } from "../controllers/aiController.js";
const aiRouter = express.Router();

// Generate article
aiRouter.post("/generate-article", auth, genrateArticle);
 
// Generate blog titles
aiRouter.post("/generate-blog-titles", auth, generateBlogTitles);

// Generate images
  
aiRouter.post("/generate-images", auth, generateImages);

export default aiRouter;
