import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const cleanDatabaseUrl = (url) => {
    if (!url) return '';
    return url.replace(/\s+/g, '').trim();
  }; 

const sql = neon(cleanDatabaseUrl(process.env.DATABASE_URL));

// Test the connection
sql`SELECT 1`
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

export default sql;
