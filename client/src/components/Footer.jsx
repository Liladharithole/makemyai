import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LiladharFooter from "./LiladharFooter.jsx";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show footer on the home page
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="border-t border-gray-200">
        <footer className="mx-auto max-w-7xl overflow-hidden px-6 pb-6 pt-1 sm:pt-2 lg:px-8 lg:pt-24">
          <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
            <div className="md:max-w-96">
              {/* <img
                className="h-9"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
                alt="dummyLogoDark"
              /> */}
              <h2
                onClick={() => navigate("/")}
                className="text-[var(--color-primary)] font-semibold text-2xl cursor-pointer"
              >
                MakeMyAI
              </h2>
              <p className="mt-6 text-sm">
                MakeMyAI is a platform that provides AI tools to generate
                content with ease and optimize your content creation workflow
                with cutting edge AI technology.
              </p>
            </div>
            <div className="flex-1 flex items-start md:justify-end gap-20">
              <div>
                <h2 className="font-semibold mb-5 text-gray-800">Resources</h2>
                <ul className="text-sm space-y-2">
                  <li>
                    <a onClick={() => navigate("/")} href="#">
                      Home
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/about")} href="#">
                      About us
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/contact")} href="#">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/privacy")} href="#">
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 mb-5">
                  Subscribe to our newsletter
                </h2>
                <div className="text-sm space-y-2">
                  <p>
                    The latest news, articles, and resources, sent to your inbox
                    weekly.
                  </p>
                  <div className="flex items-center gap-2 pt-4">
                    <input
                      className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <button className="bg-[var(--color-primary)] w-24 h-9 text-white rounded">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="pt-4 text-center text-xs md:text-sm pb-5">
            Copyright 2025 MakeMyAI. All Right Reserved.
          </p>
          <LiladharFooter />
        </footer>
      </div>
    </div>
  );
};

export default Footer;
