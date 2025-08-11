import React, { useState } from "react";
import { Sparkle, Image as ImageIcon, Download, Loader2 } from "lucide-react";
import Mainteance from "../components/Mainteance";

const GenerateImages = () => {
  const imageStyles = [
    { id: "realistic", name: "Realistic" },
    { id: "gibli", name: "Ghibli Style" },
    { id: "cartoon", name: "Cartoon" },
    { id: "anime", name: "Anime" },
    { id: "lineart", name: "Line Art" },
    { id: "3d", name: "3D Render" },
    { id: "photo", name: "Photographic" },
    { id: "pencil", name: "Pencil Sketch" },
    { id: "watercolor", name: "Watercolor" },
    { id: "portrait", name: "Portrait" },
  ];

  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [publish, setPublish] = useState(false);

  const generateImage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, you would call your AI image generation API here
    // For now, we'll just simulate a successful response
    setGeneratedImage({
      url: `https://source.unsplash.com/random/800x600/?${encodeURIComponent(
        prompt
      )}`,
      prompt: prompt,
      style:
        imageStyles.find((style) => style.id === selectedStyle)?.name ||
        "Custom",
      timestamp: new Date().toISOString(),
    });

    setIsGenerating(false);
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage.url;
    link.download = `ai-generated-${prompt
      .toLowerCase()
      .replace(/\s+/g, "-")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <Mainteance name="Image Generation" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            AI Image Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create stunning AI-generated images with just a text prompt
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-blue-600" />
                Image Details
              </h2>
            </div>

            <form onSubmit={generateImage} className="p-6 space-y-6">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Describe your image
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="A beautiful sunset over mountains with a lake in the foreground..."
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Be as descriptive as possible for best results
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {imageStyles.map((style) => (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedStyle === style.id
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {style.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={publish}
                    onChange={(e) => setPublish(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">
                  Publish to gallery
                </span>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className={`w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-white transition-all duration-200 ${
                  isGenerating || !prompt.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkle className="w-5 h-5" />
                    Generate Image
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Generated Image
              </h2>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center justify-center">
              {isGenerating ? (
                <div className="h-full w-full flex flex-col items-center justify-center py-16">
                  <div className="relative w-16 h-16 mb-6">
                    <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-lg font-medium text-gray-700">
                    Creating your image
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    This usually takes 10-30 seconds
                  </p>
                </div>
              ) : generatedImage ? (
                <div className="w-full space-y-4">
                  <div className="relative group">
                    <img
                      src={generatedImage.url}
                      alt={generatedImage.prompt}
                      className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                    />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={downloadImage}
                        className="p-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
                        title="Download image"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Prompt:</span>{" "}
                      {generatedImage.prompt}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Style:</span>{" "}
                      {generatedImage.style} •{" "}
                      {new Date(generatedImage.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Your AI-Generated Image
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Describe your vision and select a style to generate a unique
                    AI-created image. The result will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
