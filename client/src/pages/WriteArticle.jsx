import React, { useState } from "react";
import { SparkleIcon } from "lucide-react";

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short 500-800 words" },
    { length: 1200, text: "Medium 800-1200 words" },
    { length: 1600, text: "Long 1600+ words" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");

  return (
    <div className="h-auto overflow-y-scroll p-6 flex item-start flex-wrap gap-4 text-slate-700">
      {/* right col */}
      <form className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <SparkleIcon className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Article Configuration</h2>
        </div>
        <p>Article Topic</p>
        <input
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="example: The Future of AI is ...."
          required
        />
        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:ax-w-9/11">
          {articleLength.map((item, index) => (
            <span
              className="text-xs px-4 py-1 rounded-full border border-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>
      </form>
      {/* left col */}
      <div></div>
    </div>
  );
};

export default WriteArticle;
