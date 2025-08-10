import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import FormData from "form-data";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
//
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Generate article
export const genrateArticle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { topic, selectedLength } = req.body || {};

    if (!topic || !selectedLength || typeof selectedLength.words !== "number") {
      return res.status(400).json({
        message: "Bad Request",
        error:
          "Missing required fields: topic and selectedLength.words (number) are required",
      });
    }

    // adding validation
    if (!topic || !selectedLength || typeof selectedLength.words !== "number") {
      return res.status(400).json({
        message: "Bad Request",
        error:
          "Missing required fields: topic and selectedLength.words (number) are required",
      });
    }

    const plan = req.plan;
    const freeUsage = req.free_usage;

    if (plan === "free" && freeUsage >= 50) {
      return res.status(403).json({
        message:
          "Free users are not allowed to generate articles upgrade to premium plan",
      });
    }

    //Google Gemini API call
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: `Write an article about ${topic} with ${selectedLength.words} words,`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content = response.choices[0].message.content;

    //Save to database
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${topic}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: freeUsage + 1,
        },
      });
    }
    res.status(200).json({
      content,
      message: "Article generated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Internal Server Error",
    });
  }
};

// Generate blog titles
export const generateBlogTitles = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { keyword, selectedCategory } = req.body || {};

    if (!keyword || !selectedCategory) {
      return res.status(400).json({
        message: "Bad Request",
        error:
          "Missing required fields: keyword and selectedCategory are required",
      });
    }

    // adding validation
    if (!keyword || !selectedCategory) {
      return res.status(400).json({
        message: "Bad Request",
        error:
          "Missing required fields: keyword and selectedCategory are required",
      });
    }

    const plan = req.plan;
    const freeUsage = req.free_usage;

    if (plan === "free" && freeUsage >= 50) {
      return res.status(403).json({
        message:
          "Free users are not allowed to generate articles upgrade to premium plan",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: `Write an blog title about ${keyword} with ${selectedCategory} category,`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${keyword}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: freeUsage + 1,
        },
      });
    }
    res.status(200).json({
      content,
      message: "Blog titles generated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Internal Server Error",
    });
  }
};

// Generate Images
export const generateImages = async (req, res) => {
  let form;
  try {
    const { userId } = await req.auth();
    const { prompt, selectedStyle, publish = false } = req.body || {};

    if (!prompt?.trim() || !selectedStyle) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        error: "Prompt and selectedStyle are required fields",
      });
    }

    const plan = req.plan || "free";
    const freeUsage = req.free_usage || 0;

    if (plan === "free" && freeUsage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Please upgrade to premium plan.",
      });
    }

    const fullPrompt = `${prompt} in ${selectedStyle} style`;
    form = new FormData();
    form.append("prompt", fullPrompt.slice(0, 500));

    const requestId = uuidv4();
    console.log(`[${requestId}] Generating image for prompt:`, fullPrompt);
    // Clipdrop API call
    const response = await axios({
      method: "post",
      url: "https://clipdrop-api.co/text-to-image/v1",
      data: form,
      headers: {
        ...form.getHeaders(),
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
      timeout: 30000,
    });

    console.log(`[${requestId}] Received response from Clipdrop API`);

    // Convert to base64
    const base64Image = `data:image/png;base64,${Buffer.from(
      response.data
    ).toString("base64")}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "ai-generations",
      resource_type: "image",
      public_id: `${userId}_${Date.now()}`,
      overwrite: true,
    });

    // Save to database
    await sql`
      INSERT INTO creations(user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${publish})
    `;

    // Update usage for free tier
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: freeUsage + 1 },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        url: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
      },
      message: "Image generated successfully",
    });
  } catch (error) {
    console.error("Error in generateImages:", error);

    // Clean up any resources
    if (form?.getBoundary) {
      form = null;
    }

    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to generate image";

    return res.status(statusCode).json({
      success: false,
      message: "Failed to generate image",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : errorMessage,
    });
  }
};

//Remove Background
export const removeBackground = async (req, res) => {
  let form;
  try {
    const { userId } = await req.auth();
    const { image } = req.file || {};

    if (!image?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        error: "Image is required field",
      });
    }

    const plan = req.plan || "free";
    const freeUsage = req.free_usage || 0;

    if (plan === "free" && freeUsage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Please upgrade to premium plan.",
      });
    }

    const fullPrompt = `${image}`;
    form = new FormData();
    form.append("prompt", fullPrompt.slice(0, 500));

    const requestId = uuidv4();
    console.log(`[${requestId}] Generating image for prompt:`, fullPrompt);

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove the background",
        },
      ],
      folder: "remove-background",
      resource_type: "image",
      public_id: `${userId}_${Date.now()}`,
      overwrite: true,
    });

    // Save to database
    await sql`
      INSERT INTO creations(user_id, prompt, content, type )
      VALUES (${userId}, "remove the background", ${uploadResult.secure_url}, 'remove-background-image')
    `;

    // Update usage for free tier
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: freeUsage + 1 },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        url: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
      },
      message: "Image generated successfully",
    });
  } catch (error) {
    console.error("Error in generateImages:", error);

    // Clean up any resources
    if (form?.getBoundary) {
      form = null;
    }

    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to generate image";

    return res.status(statusCode).json({
      success: false,
      message: "Failed to generate image",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : errorMessage,
    });
  }
};

//Remove Object from any image
export const removeObject = async (req, res) => {
  let form;
  try {
    const { userId } = await req.auth();
    const { object } = req.body || {};
    const { image } = req.file || {};

    if (!image?.trim() || !object?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        error: "Image and object are required fields",
      });
    }

    const plan = req.plan || "free";
    const freeUsage = req.free_usage || 0;

    if (plan === "free" && freeUsage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Please upgrade to premium plan.",
      });
    }

    const fullPrompt = `${image} remove ${object}`;
    form = new FormData();
    form.append("prompt", fullPrompt.slice(0, 500));

    const requestId = uuidv4();
    console.log(`[${requestId}] Generating image for prompt:`, fullPrompt);

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      folder: "remove-background",
      resource_type: "image",
      public_id: `${userId}_${Date.now()}`,
      overwrite: true,
    });

    const imageurl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
    });

    // Save to database
    await sql`
      INSERT INTO creations(user_id, prompt, content, type )
      VALUES (${userId}, ${`Remove ${object} from image`}, ${imageurl}, 'remove-background-image')
    `;

    // Update usage for free tier
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: freeUsage + 1 },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        url: imageurl,
        width: uploadResult.width,
        height: uploadResult.height,
      },
      message: "Image generated successfully",
    });
  } catch (error) {
    console.error("Error in generateImages:", error);

    // Clean up any resources
    if (form?.getBoundary) {
      form = null;
    }

    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to generate image";

    return res.status(statusCode).json({
      success: false,
      message: "Failed to generate image",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : errorMessage,
    });
  }
};

//Resume Review
export const resumeReview = async (req, res) => {
  let form;
  try {
    const { userId } = await req.auth();
    const resume = req.file || {};

    if (!resume?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        error: "Resume is required field",
      });
    }

    const plan = req.plan || "free";
    const freeUsage = req.free_usage || 0;

    if (plan === "free" && freeUsage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Please upgrade to premium plan.",
      });
    }

    if (resume.size > 1024 * 1024 * 5) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds limit of 5MB",
      });
    }
    // read the file converting pdf in readable format
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Please review the following resume and provide constructive feedback on its strenghts and areas for improvement. Resume Content:\n\n${pdfData.text} `;

    //Google Gemini API call
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content = response.choices[0].message.content;

    // Save to database
    await sql`
      INSERT INTO creations(user_id, prompt, content, type )
      VALUES (${userId}, Resume Review, ${content}, 'resume-review')
    `;

    // Update usage for free tier
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: freeUsage + 1 },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        url: content,
        width: uploadResult.width,
        height: uploadResult.height,
      },
      message: "Image generated successfully",
    });
  } catch (error) {
    console.error("Error in generateImages:", error);

    // Clean up any resources
    if (form?.getBoundary) {
      form = null;
    }

    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to generate image";

    return res.status(statusCode).json({
      success: false,
      message: "Failed to generate image",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : errorMessage,
    });
  }
};
