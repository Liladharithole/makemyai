import React, { useEffect, useRef, useState } from "react";
import {
  SparkleIcon,
  EraserIcon,
  X,
  ScissorsIcon,
  SparklesIcon,
} from "lucide-react";

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [object, setObject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
  };

  return (
    <div className="h-auto min-h-screen p-6 flex flex-col lg:flex-row items-start justify-start gap-6 text-slate-700 overflow-x-hidden">
      {/* right col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:w-1/2 xl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-4">
          <SparklesIcon className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Object Removal</h2>
        </div>
        <p className="text-sm font-medium">Upload Image</p>
        <div className="relative">
          {imagePreview && (
            <div className="relative mb-4">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -right-2 -top-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-full max-h-[500px] overflow-hidden flex items-center justify-center bg-gray-50 rounded-md border border-gray-200 p-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-[480px] object-contain"
                />
              </div>
            </div>
          )}
          <input
            id="file-upload"
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
            required={!imagePreview}
          />
        </div>
        <p className="text-xs text-gray-600 font-light mt-2">
          Support formats: .jpg, .jpeg, .png, .gif, .webp
        </p>
        <p className="mt-4 text-sm font-medium">
          Describe Object Name to remove
        </p>
        <textarea
          value={object}
          onChange={(e) => setObject(e.target.value)}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe the object to remove"
          required
        />
        <button
          type="submit"
          disabled={!input}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-4 py-2.5 rounded-full hover:scale-102 active:scale-95 transition-all duration-300 text-sm cursor-pointer mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ScissorsIcon className="w-5" />
          {input ? "Remove Object" : "Select an Image First"}
        </button>
      </form>
      {/* right col - Results */}
      <div className="w-full lg:w-1/2 xl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <SparklesIcon className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Object Removal</h2>
        </div>
        <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[500px]">
          <ScissorsIcon className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Your Processed Image Will Appear Here</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Upload an image and describe the object you want to remove to see the magic happen!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
