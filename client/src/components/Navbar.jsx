import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-5 w-full background-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer">
      <img  alt={assets.logo} onClick={() => navigate("/")} />
      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={() => openSignIn()}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-[var(--color-primary)] text-white px-10 py-2.5"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
