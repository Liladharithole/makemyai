import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  FileText,
  X,
  Upload,
  Download,
  Star,
  Check,
  AlertCircle,
  FileType,
} from "lucide-react";
import Mainteance from "../components/Mainteance";

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [notes, setNotes] = useState("");
  const [review, setReview] = useState(null);
  const fileInputRef = useRef(null);

  // Clean up object URLs when the component unmounts
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
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
      setReview(null); // Reset any previous review
    }
  };

  const handleRemoveFile = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFile(null);
    setFilePreview(null);
    setFileName("");
    setFileType("");
    setReview(null);
    setNotes("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsProcessing(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock review data - in a real app, this would come from your API
      setReview({
        overallScore: 4.2,
        strengths: [
          "Clear and concise work experience section",
          "Strong action verbs used throughout",
          "Good use of metrics to quantify achievements",
        ],
        improvements: [
          "Could include more relevant skills for the target role",
          "Consider adding a professional summary at the top",
          "Some work experiences could use more detail",
        ],
        atsScore: 78,
        keywords: [
          "JavaScript",
          "React",
          "Node.js",
          "Team Leadership",
          "Project Management",
        ],
        missingKeywords: ["TypeScript", "Docker", "AWS"],
        lastUpdated: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.error("Error processing resume:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-300 fill-current" />
        );
      }
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-2 text-sm font-medium text-gray-700">
          {score.toFixed(1)}/5.0
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <Mainteance name="Review Resume" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            AI-Powered Resume Review
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant feedback on your resume and improve your chances of
            landing interviews
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Upload Resume
              </h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume File <span className="text-red-500">*</span>
                </label>
                {!filePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        Drag & drop your resume, or click to select
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports PDF, DOC, DOCX (Max 5MB)
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer inline-flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Select File
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                        <FileType className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileName}
                        </p>
                        <p className="text-xs text-gray-500 uppercase">
                          {fileType.split("/")[1] || "DOCUMENT"}
                        </p>
                        <div className="mt-2 flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = filePreview;
                              link.download = fileName;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-xs font-medium text-red-600 hover:text-red-800 flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any specific areas you'd like us to focus on? (e.g., formatting, content, ATS optimization)"
                  disabled={isProcessing}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Help us tailor the review to your needs
                </p>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!filePreview || isProcessing}
                className={`w-full flex justify-center items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all ${
                  !filePreview || isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]"
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
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Review My Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Resume Analysis
              </h2>
            </div>

            <div className="p-6">
              {!review ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your Analysis Awaits
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Upload your resume and click "Review My Resume" to get
                    detailed feedback and improvement suggestions.
                  </p>
                </div>
              ) : isProcessing ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Analyzing your resume...</p>
                  <p className="text-sm text-gray-500 mt-1">
                    This may take a moment
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-blue-800 mb-1">
                          Overall Score
                        </h3>
                        <p className="text-sm text-blue-700">
                          {review.overallScore >= 4
                            ? "Great job!"
                            : review.overallScore >= 3
                            ? "Good start!"
                            : "Needs improvement"}
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        {renderStars(review.overallScore)}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                          style={{
                            width: `${(review.overallScore / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        ATS Score:{" "}
                        <span className="font-medium">
                          {review.atsScore}/100
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                      <Check className="w-4 h-4 text-green-500" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {review.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-green-500">
                            <Check className="h-5 w-5" />
                          </div>
                          <p className="ml-2 text-sm text-gray-700">
                            {strength}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {review.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-yellow-500">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <p className="ml-2 text-sm text-gray-700">
                            {improvement}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Keywords */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Keyword Analysis
                    </h3>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        Strong Keywords Found:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {review.keywords.slice(0, 8).map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {review.missingKeywords.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">
                          Consider Adding:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {review.missingKeywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 text-right mt-2">
                    Last updated: {review.lastUpdated}
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

export default ReviewResume;
