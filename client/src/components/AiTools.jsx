import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-800 mb-3 sm:mb-4">
          Powerful AI Tools
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg px-2 sm:px-4">
          Explore our AI tools and generate content with ease. Optimize your
          content creation workflow with cutting-edge AI technology.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 md:p-8 rounded-xl bg-white shadow-md hover:shadow-lg border border-gray-100 
                       active:scale-[0.98] transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
            onClick={() => user ? navigate(tool.path) : openSignIn()}
          >
            <div className="flex items-center">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              >
                <tool.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 ml-3 sm:ml-4">
                {tool.title}
              </h3>
            </div>
            <p className="text-gray-500 text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
