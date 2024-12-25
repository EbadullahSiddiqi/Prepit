import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Tesseract from "tesseract.js";


export default function AI() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Read the file
      const fileBuffer = await file.arrayBuffer();
      let extractedText = "";

      // Handle PDF files
      if (file.type === "application/pdf") {
        try {
          const pdfDoc = await PDFDocument.load(fileBuffer);
          const pages = pdfDoc.getPages();
          for (const page of pages) {
            const textContent = await page.getTextContent();
            extractedText +=
              textContent.items.map((item) => item.str).join(" ") + "\n";
          }
        } catch (parseError) {
          console.warn("PDF parsing failed, falling back to OCR");
          // Perform OCR for PDF
          const result = await Tesseract.recognize(file, "eng", {
            logger: (m) => console.log(m),
          });
          extractedText = result.data.text;
        }
      }
      // Handle image files
      else if (file.type.startsWith("image/")) {
        const result = await Tesseract.recognize(file, "eng", {
          logger: (m) => console.log(m),
        });
        extractedText = result.data.text;
      } else {
        throw new Error("Unsupported file type");
      }

      // Clean the extracted text
      const cleanedText = extractedText
        .replace(/taleemcity\.com/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!cleanedText) {
        throw new Error("No meaningful content found in file");
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Prepare the prompt
      const prompt = `
        Extract text from this file and create study questions and answers from it. 
        Format them as:

        Q1: [Question]
        A1: [Answer]

        Q2: [Question]
        A2: [Answer]

        Here is the extracted text: ${cleanedText}
      `;

      // Generate response using AI
      const result = await model.generateContent([prompt]);
      const responseText = result.response.text();

      setResponse(responseText);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 pt-20">
      <div className="text-blue-600 text-4xl md:text-5xl lg:text-7xl font-semibold text-center">
        Upload Your Study Material
      </div>

      <p className="text-blue-600 pt-4 text-xl md:text-2xl font-medium mt-3 text-center">
        We'll help you prepare for your exam
      </p>

      <form onSubmit={handleFileUpload} className="mt-10 w-full max-w-md">
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,image/*"
            className="w-full p-2 border-2 border-blue-600 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="home-btn w-full px-6 py-3 rounded-3xl bg-blue-600 hover:bg-white border-2 border-blue-600 text-white hover:text-blue-600 font-semibold transition-all duration-200 text-sm md:text-base"
          >
            {loading ? "Processing..." : "Upload and Analyze"}
          </button>
        </div>
      </form>

      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

      {response && (
        <div className="mt-8 mb-8 w-full max-w-2xl p-6 border-2 border-blue-600 rounded-lg bg-white shadow-lg">
          {response.split("\n\n").map((qa, index) => {
            const [question, answer] = qa.split("\n");
            if (!question || !answer) return null;

            return (
              <div
                key={index}
                className={`${
                  index > 0 ? "mt-6 pt-6 border-t border-blue-200" : ""
                }`}
              >
                <h3 className="text-lg font-semibold text-blue-800">
                  {question.replace("Q" + (index + 1) + ": ", "")}
                </h3>
                <p className="mt-2 text-gray-700">
                  {answer.replace("A" + (index + 1) + ": ", "")}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
