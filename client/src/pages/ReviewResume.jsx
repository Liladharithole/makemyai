import React, { useEffect, useRef, useState } from "react";
import { SparklesIcon, X, FileText, Download } from "lucide-react";

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const fileInputRef = useRef(null);

  // Clean up object URLs when the component unmounts
  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileType(selectedFile.type);
      
      // Create a preview URL for the file
      const fileURL = URL.createObjectURL(selectedFile);
      setFilePreview(fileURL);
    }
  };

  const handleRemoveFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setFile(null);
    setFilePreview(null);
    setFileName('');
    setFileType('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
          <h2 className="text-xl font-semibold">Resume Review</h2>
        </div>
        <p className="text-sm font-medium">Upload Resume</p>
        <div className="relative">
          {filePreview ? (
            <div className="relative mb-4">
              <div className="w-full p-4 bg-gray-50 rounded-md border border-gray-200 flex flex-col items-center">
                <FileText className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700 truncate max-w-full">{fileName}</p>
                <p className="text-xs text-gray-500 uppercase">{fileType}</p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={filePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    download={fileName}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
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
              <FileText className="w-10 h-10 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Drag and drop your resume here, or click to select
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports: PDF, DOC, DOCX (Max 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required={!filePreview}
              />
            </div>
          )}
        </div>
        <p className="text-xs text-gray-600 font-light mt-2">
          Support formats: .pdf, .doc, .docx (Max 5MB)
        </p>
        <p className="mt-4 text-sm font-medium">
          Additional Notes (Optional)
        </p>
        <textarea
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Any specific areas you'd like us to focus on?"
        />
        <button
          type="submit"
          disabled={!file}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-4 py-2.5 rounded-full hover:scale-102 active:scale-95 transition-all duration-300 text-sm cursor-pointer mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-5" />
          {file ? "Review My Resume" : "Upload a Resume First"}
        </button>
      </form>
      {/* left col */}
      <div className="w-full lg:w-1/2 xl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <SparklesIcon className="w-6 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold">Resume Review</h2>
        </div>
        <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[500px]">
          <FileText className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Your Review Will Appear Here</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Upload your resume and click "Review My Resume" to get detailed feedback and suggestions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
