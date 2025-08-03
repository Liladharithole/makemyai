import React, { useState } from "react";
import { SparkleIcon, HashIcon, Edit, Image } from "lucide-react";

const GenerateImages = () => {
  const imageStyles = [
    "Realistic",
    "Gibli style",
    "Cartoon style",
    "Anime style",
    "Line Art style",
    "3D style",
    "Photo style",
    "Pencil style",
    "Watercolor style",
    "Portrait style",
  ];

  const [input, setInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [publish, setPublish] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-auto overflow-y-scroll p-6 flex item-start flex-wrap gap-4 text-slate-700">
      {/* right col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <SparkleIcon className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">AI Image generator</h2>
        </div>
        <p className="mt-4 text-sm font-medium">Describe Your Image</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe your image what kind of image you want to generate"
          required
        />
        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:ax-w-9/11">
          {imageStyles.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 rounded-full border border-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 ${
                selectedStyle === item
                  ? "bg-[var(--color-secondary)] text-white"
                  : ""
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="my-6 flex item-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.value)}
              checked={publish}
              className="sr-only peer"
            />

            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-[var(--color-primary)] transition-all duration-300"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-4 transition-all duration-300"></span>
          </label>
          <p className="text-sm font-medium">Publish Image</p>
        </div>

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-4 py-2.5 rounded-full hover:scale-102 active:scale-95 transition-all duration-300 text-sm cursor-pointer mt-6">
          <Image className="w-5" />
          Generate Image
        </button>
      </form>
      {/* left col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-center items-center min-h-96 ">
        <div className="flex items-center gap-3 mb-4">
          <Edit className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Generated Image</h2>
        </div>
        <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-center items-center min-h-96 max-h-[600px]">
          <Image className="w-9 h-9 text-gray-500" />
          <p className="text-sm text-gray-500">
            Enter a Topic and click "Generate Image" to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
