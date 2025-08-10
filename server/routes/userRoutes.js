import express from "express";
import { auth } from "../middlewares/auth.js";
import { getUserCreations, getPublishedCreations, toggleLikeCreation } from "../controllers/userController.js";

// Get user creations
const userRouter = express.Router();
userRouter.get("/get-user-creations", auth, getUserCreations);

// Get public creations
userRouter.get("/get-published-creations", getPublishedCreations);

// Toggle like creation
userRouter.post("/toggle-like-creation", auth, toggleLikeCreation);


export default userRouter;

