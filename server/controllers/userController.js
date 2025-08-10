import sql from "../config/db.js";
import { auth } from "../middlewares/auth.js";


// Get user creations
export const getUserCreations = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
    return res.status(200).json({
      success: true,
      data: creations,
      message: "User creations fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Get public creations
export const getPublishedCreations = async (req, res) => {
  try {
    const creations =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
    return res.status(200).json({
      success: true,
      data: creations,
      message: "Public creations fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Toggle like creation
export const toggleLikeCreation = async (req, res) => {
    try {
      const { userId } = await req.auth();
      const { creationId } = req.body;


      const [creation] = await sql`SELECT * FROM creations WHERE id = ${creationId}`;

      if(!creation){
        return res.status(404).json({
          success: false,
          message: "Creation not found",
        });
      }

      const currentUserLike = creation.likes;
      const userIdStr = userId.toString();
      let updatedLikes;
      let message;

      if(currentUserLike.includes(userIdStr)){
        updatedLikes = currentUserLike.filter((user) => user !== userIdStr);
        message = "Creation unliked successfully";
      }else{
        updatedLikes = [...currentUserLike, userIdStr];
        message = "Creation liked successfully";
      }

      const formattedArray = updatedLikes.join(",");

      await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${creationId}`;
        



      const creations =
        await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
      return res.status(200).json({
        success: true,
        data: creations,
        message: "User creations fetched successfully",
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
