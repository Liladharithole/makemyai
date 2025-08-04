import React, { useState, useRef } from "react";
import { Image, Upload, SparkleIcon } from "lucide-react";

const RemoveBackground = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    // TODO: Implement background removal API call
    console.log('Removing background for:', selectedFile.name);
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
          <h2 className="text-xl font-semibold">Remove Background</h2>
        </div>
        
        <div 
          className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
          <p className="text-sm text-gray-600 mb-1">
            {selectedFile ? selectedFile.name : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-xs text-gray-400">
            Supports JPG, PNG up to 10MB
          </p>
        </div>

        <button 
          type="submit"
          disabled={!selectedFile}
          className={`w-full flex justify-center items-center gap-2 mt-6 text-white px-4 py-2.5 rounded-full hover:scale-102 active:scale-95 transition-all duration-300 text-sm cursor-pointer ${
            selectedFile 
              ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <Image className="w-5" />
          Remove Background
        </button>
      </form>

      {/* left col */}
      <div className="w-full lg:w-1/2 xl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <Image className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Preview</h2>
        </div>
        <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center min-h-96 max-h-[600px]">
          {preview ? (
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-full max-h-[500px] object-contain"
            />
          ) : (
            <>
              <Image className="w-9 h-9 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                Upload an image to see the preview
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;