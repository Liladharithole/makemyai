import React, { useState } from "react";
import { Edit, SparkleIcon, HashIcon } from "lucide-react";

const BlogTitles = () => {
  const BlogCategories = [
    "General",
    "Business",
    "Health",
    "Technology",
    "Entertainment",
    "Sports",
    "Travel",
    "Food",
    "Fashion",
    "Beauty",
    "Music",
    "Lifestyle",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-auto min-h-screen p-6 flex flex-col lg:flex-row items-start justify-start gap-6 text-slate-700 overflow-x-hidden">
      {/* right col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:w-1/2 xl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-4">
          <SparkleIcon className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">AI title generator</h2>
        </div>
        <p>Keyword</p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="example: The Future of AI is ...."
          required
        />
        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:ax-w-9/11">
          {BlogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 rounded-full border border-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 ${
                selectedCategory === item
                  ? "bg-[var(--color-secondary)] text-white"
                  : ""
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-4 py-2.5 rounded-full hover:scale-102 active:scale-95 transition-all duration-300 text-sm cursor-pointer mt-6">
          <HashIcon className="w-5" />
          Generate Title
        </button>
      </form>
      {/* left col */}
      <div className="w-full lg:w-1/2 xl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <Edit className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Generated Title</h2>
        </div>
        <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-center items-center min-h-96 max-h-[600px]">
          <HashIcon className="w-9 h-9 text-gray-500" />
          <p className="text-sm text-gray-500">
            Enter a Topic and click "Generate Title" to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
