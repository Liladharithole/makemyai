import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  genrateArticle,
  generateBlogTitles,
  generateImages,
  removeBackground,
  removeObject,
  resumeReview,
} from "../controllers/aiController.js";
import upload from "../middlewares/multer.js";
const aiRouter = express.Router();

// Generate article
aiRouter.post("/generate-article", auth, genrateArticle);

// Generate blog titles
aiRouter.post("/generate-blog-titles", auth, generateBlogTitles);

// Generate images
aiRouter.post("/generate-images", auth, generateImages);

//Remove image background
aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  removeBackground
);

//Remove object from image
aiRouter.post(
  "/remove-image-object",
  upload.single("image"),
  auth,
  removeObject
);

// Generate resume review
aiRouter.post(
  "/generate-resume-review",
  upload.single("resume"),
  auth,
  resumeReview
);

export default aiRouter;
