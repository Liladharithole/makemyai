import React from "react";
import gradientBackground from "../assets/gradientBackground.png"; // Import the image
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center min-h-screen"
      style={{
        backgroundImage: `url(${gradientBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Create AI Generated Content <br /> with{" "}
          <span className="text-[var(--color-primary)]">MakeMyAI</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Get started with our AI tools today and experience the power of AI for
          content creation.
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-[var(--color-primary)] text-white mt-6 px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 text-sm cursor-pointer "
        >
          Get Started
        </button>
        <button className="bg-white text-black border border-[var(--color-primary)] mt-6 px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 text-sm cursor-pointer ">
          Watch Demo
        </button>
      </div>
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="" className="h-8" />
        <p className="text-md">Trusted by 100+ users</p>
      </div>
    </div>
  );
};

export default Hero;
