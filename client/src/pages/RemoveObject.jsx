import React, { useEffect, useRef, useState } from "react";
import { 
  Image as ImageIcon,
  X, 
  Upload, 
  Download,
  Scissors as ScissorsIcon,
  Sparkles as SparklesIcon,
  Wand2 as Wand2Icon
} from "lucide-react";

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [object, setObject] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  // Clean up object URLs when the component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    // Revoke the object URL to prevent memory leaks
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setInput(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input || !object) return;

    setIsProcessing(true);

    try {
      // TODO: Replace this with actual API call to process the image
      // For now, we'll just simulate a delay and use the same image
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, you would get the processed image URL from your API
      // For now, we'll use the same image for demonstration
      setProcessedImage(imagePreview);
    } catch (error) {
      console.error("Error processing image:", error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            AI Object Remover
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Easily remove unwanted objects from your photos with AI precision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-blue-600" />
                Remove Object from Image
              </h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image File <span className="text-red-500">*</span>
                </label>
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        Drag & drop an image, or click to select
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports JPG, PNG up to 10MB
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer inline-flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Select Image
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-auto max-h-80 object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to remove? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={object}
                  onChange={(e) => setObject(e.target.value)}
                  rows={3}
                  className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the object to remove (e.g., 'red car', 'person on the left')"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Be specific for better results. Example: "red car on the left" or "person in the background"
                </p>
              </div>

              <button
                type="button"
                onClick={onSubmitHandler}
                disabled={!imagePreview || !object || isProcessing}
                className={`w-full flex justify-center items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all ${
                  !imagePreview || !object || isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Removing Object...
                  </>
                ) : (
                  <>
                    <ScissorsIcon className="w-5 h-5" />
                    Remove Object
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Wand2Icon className="w-5 h-5 text-blue-600" />
                Result Preview
              </h2>
            </div>

            <div className="p-6">
              {!processedImage ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {isProcessing ? 'Processing...' : 'Your Result Awaits'}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {isProcessing 
                      ? `Removing "${object}" from your image...` 
                      : 'Upload an image and describe what to remove to see the magic happen.'
                    }
                  </p>
                  {isProcessing && (
                    <div className="mt-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">This may take a moment</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative w-full bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <img
                      src={processedImage}
                      alt="Object removed result"
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = processedImage;
                          link.download = `object-removed-${new Date().getTime()}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = processedImage;
                        link.download = `object-removed-${new Date().getTime()}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download Result
                    </button>
                    <button
                      onClick={() => setProcessedImage(null)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear Result
                    </button>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for Best Results</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Be specific about the object's location and appearance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>For multiple objects, remove them one at a time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Use the brush tool to refine edges if needed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
