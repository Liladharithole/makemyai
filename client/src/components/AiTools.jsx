import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24 ">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          {" "}
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Explore our AI tools and generate content with ease. and optimize your
          content creation workflow with cutting edge AI technology.
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-sm max-sm:text-xs">
        {AiToolsData.map((tool, index) => {
          return (
            <div
              key={index}
              className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:translate-y-1 active:translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => user && navigate(tool.path)}
            >
              <tool.Icon
                className="w-12 h-12 p-3 text-white rounded-full bg-[var(--color-primary)]"
                style={{
                  background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              />
              <h3 className="text-lg font-semibold mt-6 mb-3">{tool.title}</h3>
              <p className="text-gray-400 text-sm max-w-[95%]">
                {tool.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AiTools;
