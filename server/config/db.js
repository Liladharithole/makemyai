import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const cleanDatabaseUrl = (url) => {
  if (!url) return "";
  // Remove any whitespace and clean up the URL
  let cleaned = url.replace(/\s+/g, "").trim();

  // Remove channel_binding parameter as it's not supported by Neon serverless
  cleaned = cleaned.replace(/[?&]channel_binding=[^&]*/g, "");

  // Ensure the URL starts with postgresql://
  if (!cleaned.startsWith("postgresql://")) {
    cleaned = `postgresql://${cleaned}`;
  }

  // Ensure sslmode is set to require
  if (cleaned.includes("?")) {
    if (!cleaned.includes("sslmode=")) {
      cleaned += "&sslmode=require";
    }
  } else {
    cleaned += "?sslmode=require";
  }

  return cleaned;
};

// Get database URL from environment and clean it
let databaseUrl = cleanDatabaseUrl(process.env.DATABASE_URL);

// For debugging - log the URL without the password
const urlObj = new URL(databaseUrl);
const safeUrl = `${urlObj.protocol}//${urlObj.username}:***@${urlObj.host}${urlObj.pathname}${urlObj.search}`;
console.log(`Connecting to database: ${safeUrl}`);

// Initialize the Neon database connection
const sql = neon(databaseUrl, {
  ssl: {
    rejectUnauthorized: true,
    require: true,
  },
  connection: {
    options: `-c statement_timeout=30000`,
  },
  // Add connection pooling for better performance
  pool: {
    min: 1,
    max: 5,
  },
});

// Test the connection
async function testConnection() {
  try {
    await sql`SELECT 1`;
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    // Re-throw to ensure the app fails to start if DB connection fails
    throw err;
  }
}

// Run the connection test
testConnection().catch(console.error);

export default sql;
