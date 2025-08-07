import React, { useEffect, useRef, useState } from "react";
import {
  SparkleIcon,
  EraserIcon,
  X,
  ScissorsIcon,
  SparklesIcon,
  Image,
} from "lucide-react";

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [object, setObject] = useState('');
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would get the processed image URL from your API
      // For now, we'll use the same image for demonstration
      setProcessedImage(imagePreview);
    } catch (error) {
      console.error('Error processing image:', error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-auto min-h-screen p-6 flex flex-col lg:flex-row items-start justify-start gap-6 text-slate-700 overflow-x-hidden">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:w-1/2 xl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-4">
          <SparklesIcon className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Remove Object</h2>
        </div>
        <p className="text-sm font-medium">Upload Image</p>
        <div className="relative">
          {imagePreview ? (
            <div className="relative mb-4">
              <div className="w-full p-4 bg-gray-50 rounded-md border border-gray-200 flex flex-col items-center">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-40 max-w-full object-contain mb-2"
                />
                <div className="mt-3 flex gap-2">
                  <a
                    href={imagePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    download="object-removed"
                  >
                    <span>Download</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Image className="w-10 h-10 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Drag and drop your image here, or click to select
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports: JPG, PNG, WEBP (Max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required={!imagePreview}
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium mb-2">
            What do you want to remove?
          </p>
          <textarea
            value={object}
            onChange={(e) => setObject(e.target.value)}
            rows={3}
            className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the object to remove (e.g., 'red car', 'person on the left')"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Be specific for better results
          </p>
        </div>

        <button
          type="submit"
          disabled={!input || !object || isProcessing}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-6 py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-sm font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <ScissorsIcon className="w-5 h-5" />
              {input ? "Remove Object" : "Select an Image First"}
            </>
          )}
        </button>
      </form>

      {/* Right column - Result area */}
      <div className="w-full lg:w-1/2 xl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <SparklesIcon className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Result</h2>
        </div>
        <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[500px]">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)] mb-4"></div>
              <p className="text-gray-600">Removing object...</p>
            </div>
          ) : processedImage ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <img
                src={processedImage}
                alt="Processed result"
                className="max-w-full max-h-[480px] object-contain mb-4"
              />
              <div className="flex gap-3 mt-4">
                <a
                  href={processedImage}
                  download="object-removed.png"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setProcessedImage(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <ScissorsIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Your Processed Image Will Appear Here
              </h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Upload an image and describe what to remove to see the result
              </p>
            </div>
          )}
        </div>

        {processedImage && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Tip:</span> If the result isn't perfect, try being more specific about the object you want to remove or adjust your description.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
