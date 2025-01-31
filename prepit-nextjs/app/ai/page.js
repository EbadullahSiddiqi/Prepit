"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import {
  CloudArrowUpIcon,
  SparklesIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile) => {
    setError(null);
    setQuestions(null);

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG)");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Extract text using Tesseract.js
      const { data } = await Tesseract.recognize(file, "eng");

      if (!data.text.trim()) {
        throw new Error("No readable text found in the image.");
      }
      // console.log(data);

      // Send extracted text to backend
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: data.text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate questions");
      }

      const result = await response.json();
      setQuestions(result.questions);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setQuestions(null);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setQuestions(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your Study Notes
          </h1>
          <p className="text-xl text-gray-600">
            Drop your notes below and watch as AI transforms them into practice
            questions
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {/* Upload Section */}
        {!questions && (
          <div className="max-w-3xl mx-auto">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed rounded-xl p-12 text-center ${
                preview
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-500"
              } transition-colors duration-200`}
            >
              {!preview ? (
                <div className="space-y-4">
                  <CloudArrowUpIcon className="h-16 w-16 mx-auto text-blue-600" />
                  <div className="text-gray-600">
                    <p className="text-lg font-semibold">
                      Drop your notes here
                    </p>
                    <p className="text-sm">or</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFile(e.target.files[0])}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      Browse Files
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={resetForm}
                    className="absolute top-2 right-2 p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-red-600" />
                  </button>
                  <Image
                    src={preview}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="mx-auto rounded-lg"
                  />
                </div>
              )}
            </div>

            {preview && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                    ${
                      loading
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    } 
                    transition-colors inline-flex items-center`}
                >
                  {loading ? (
                    <>
                      <SparklesIcon className="animate-spin h-5 w-5 mr-2" />
                      Analyzing Notes...
                    </>
                  ) : (
                    "Generate Questions"
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Questions Section */}
        {questions && (
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Your Practice Questions
            </h2>
            <div className="space-y-6">
              {questions.map((qa, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {index + 1}. {qa.question}
                  </h3>
                  <p className="text-gray-700">{qa.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Upload New Notes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
