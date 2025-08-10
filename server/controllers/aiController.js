import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
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

    const plane = req.plan;
    const freeUsage = req.free_usage;

    if (plane === "free" && freeUsage >= 50) {
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
          content: `Write an article about ${topic} with ${selectedLength.words} words,`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${topic}, ${content}, 'article')`;

    if (plane !== "premium") {
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

    const plane = req.plan;
    const freeUsage = req.free_usage;

    if (plane === "free" && freeUsage >= 50) {
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

    if (plane !== "premium") {
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
