import React, { useState } from "react";
import { Sparkle, Hash, Copy, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const PromptGenerator = () => {
  const PromptCategories = [
    { id: "ChatGPT", name: "ChatGPT" },
    { id: "Claude", name: "Claude" },
    { id: "Gemini", name: "Gemini" },
    { id: "Grok", name: "Grok" },
    { id: "Perplexity", name: "Perplexity" },
  ];

  // Get token from Clerk
  const { getToken } = useAuth();
  const token = getToken();

  const [selectedCategory, setSelectedCategory] = useState("ChatGPT");
  const [keyword, setKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generatePrompt = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      toast.error("Please enter a keyword");
      return;
    }

    try {
      setIsGenerating(true);
      const token = await getToken();

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/ai/generate-prompt`,
        {
          keyword: keyword.trim(),
          selectedCategory: selectedCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Prompt generated successfully");

      setPrompt(data.content);
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Failed to generate prompt");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            AI Prompt Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate AI prompts that can understand by AI and generate by AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-blue-600" />
                Prompt Details
              </h2>
            </div>

            <form onSubmit={generatePrompt} className="p-6 space-y-6">
              <div>
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter your Prompt in Your Language in English, Hindi, Marathi,
                  Gujarati, etc in Your words.
                </label>
                <input
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="e.g., How to make social media app in React with Node.js"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select AI Model
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PromptCategories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !keyword.trim()}
                className={`w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-white transition-all duration-200 ${
                  isGenerating || !keyword.trim()
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
                    Generate Prompt
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col max-h-[calc(100vh-200px)]">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-600" />
                Generated Prompt
              </h2>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center py-12">
                  <div className="relative w-16 h-16">
                    <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                  </div>
                  <p className="mt-6 text-lg font-medium text-gray-700">
                    Generating your prompt
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    This usually takes a few seconds
                  </p>
                </div>
              ) : prompt.length > 0 ? (
                <div className="relative">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(prompt);
                        toast.success("Prompt copied to clipboard!");
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="prose max-w-none pr-10">
                    <Markdown
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc pl-6 space-y-2 mb-4"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal pl-6 space-y-2 mb-4"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="text-gray-800 mb-1" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            className="text-gray-800 mb-4 leading-relaxed"
                            {...props}
                          />
                        ),
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-2xl font-bold text-gray-900 mt-6 mb-4"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-xl font-semibold text-gray-900 mt-5 mb-3"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-lg font-medium text-gray-900 mt-4 mb-2"
                            {...props}
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong
                            className="font-semibold text-gray-900"
                            {...props}
                          />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="italic text-gray-700" {...props} />
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono"
                            {...props}
                          />
                        ),
                        a: ({ node, ...props }) => (
                          <a
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {prompt}
                    </Markdown>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <Hash className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Your AI-Generated Prompt
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Enter a Prompt and select a Model to generate creative
                    Prompt. The results will appear here once generated.
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

export default PromptGenerator;
