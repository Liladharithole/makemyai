import React from "react";
import { useLocation } from "react-router-dom";
import { Heart } from "lucide-react";

const LiladharFooter = () => {
  const location = useLocation();

  // Only render on home page
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="w-full bg-white border-t border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-xs text-gray-500">
          <span>
            Project created by{" "}
            <a
              href="https://liladhar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-md hover:text-blue-600 transition-colors"
            >
              Liladhar
            </a>
          </span>
          <Heart className="w-3.5 h-3.5 mx-1.5 text-red-500 fill-current" />
          <span>
            Maintained by{" "}
            <a
              href="https://liladhar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-md hover:text-blue-600 transition-colors"
            >
              Liladhar
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiladharFooter;
