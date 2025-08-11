# 🚀 MakeMyAI - AI-Powered Content Creation Suite that can generate articles, blog titles, images, and review your resume.

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## ✨ Features

### 🖋️ AI-Powered Content Generation

- Generate articles and blog titles
- Generate engaging blog titles and outlines
- Create high-quality articles with AI assistance
- Multiple writing styles and tones

### 🖼️ Image Generation & Editing

- Generate images from text prompts
- Remove backgrounds with precision
- Object removal from images
- Style customization options

### 📄 Resume Enhancement

- AI-powered resume review
- Content optimization suggestions
- ATS compliance checking

### 🔒 Secure Authentication

- Role-based access control
- Secure user sessions
- Social login options

## 🛠️ Tech Stack

### Frontend

- **React** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **Clerk** - Authentication
- **React Router** - Routing
- **React Markdown** - Markdown Rendering
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend

- **Node.js** - Runtime
- **Express** - Web Framework
- **Clerk** - Authentication
- **Clipdrop API** - Image Processing
- **Google Gemini API** - AI Processing
- **Neon** - PostgreSQL Database
- **Cloudinary** - Image Storage
- **Multer** - File Upload Middleware
- **Axios** - HTTP Client

## 🚀 Getting Started

### Prerequisites

- React
- Node.js (v16+)
- npm or yarn
- PostgreSQL (or Neon database)

### Installation

1. **Clone the repository**

   ```bash
   git clone "https://github.com/Liladharithole/makemyai.git"
   cd makemyai
   ```

2. **Set up the frontend**

   ```bash
   cd ../client
   npm install
   create .env file first
   and create credentials on clerk
   add clerk credentials to .env file
   cp .env.example .env
   # Update .env with your API endpoints
   ```

3. **Set up the backend**

   ```bash
   cd server
   npm install
   create .env file first
   and create credentials on clerk, neon, clipdrop, googlestudio, cloudinary
   add all credentials to .env file
   cp .env.example .env
   # Update .env with your credentials
   ```

4. **Start the development servers**

   ```bash
   # In server directory
   npm run dev

   # In client directory (new terminal)
   npm run dev
   ```

## 🔧 Environment Variables

## For setting up Environment Variables you need to create on platform clerk, neon, clipdrop, googlestudio, cloudinary Then generate API keys and all credentials and add them to the .env file

- [Clerk](https://clerk.dev/) for authentication
- [Neon](https://neon.tech/) for serverless Postgres
- [Clipdrop](https://clipdrop.co/) for image processing
- [Google Studio](https://studio.google.com/) for AI Generation Content
- [Cloudinary](https://cloudinary.com/) for image storage

### Server (`.env`)

```env
PORT=3000
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_database_url
CLIPDROP_API_KEY=your_clipdrop_api_key
# Add other required environment variables
```

### Client (`.env`)

```env
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 📂 Project Structure

```
makemyai/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   └── vite.config.js      # Vite configuration
│
└── server/                 # Backend Node.js application
    ├── config/             # Configuration files
    ├── controllers/        # Request handlers
    ├── middlewares/        # Custom middlewares
    ├── routes/             # API routes
    └── server.js           # Entry point
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is not under any license

## 🙏 Acknowledgments
