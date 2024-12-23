import React, { useState } from "react";

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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/ai/file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResponse(data.msg);
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
          {response.split('\n\n').map((qa, index) => {
            const [question, answer] = qa.split('\n');
            if (!question || !answer) return null;
            
            return (
              <div key={index} className={`${index > 0 ? 'mt-6 pt-6 border-t border-blue-200' : ''}`}>
                <h3 className="text-lg font-semibold text-blue-800">
                  {question.replace('Q' + (index + 1) + ': ', '')}
                </h3>
                <p className="mt-2 text-gray-700">
                  {answer.replace('A' + (index + 1) + ': ', '')}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
