import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "No text provided." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate questions based on the extracted text
    const prompt = `
      You are a helpful AI tutor. Based on the following study notes, generate a list of 5 questions 
      along with their correct answers in valid JSON format.

      Study Notes:
      "${text}"

      Strictly format the output as JSON only, without any extra text or formatting:
      [
        { "question": "Question 1?", "answer": "Answer 1" },
        { "question": "Question 2?", "answer": "Answer 2" },
        { "question": "Question 3?", "answer": "Answer 3" },
        { "question": "Question 4?", "answer": "Answer 4" },
        { "question": "Question 5?", "answer": "Answer 5" }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();

    // Cleanup: Remove Markdown formatting (```json ... ```)
    responseText = responseText.replace(/```json|```/g, "").trim();

    // Parse the cleaned-up response
    const questions = JSON.parse(responseText);

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions. Please try again later." },
      { status: 500 }
    );
  }
}
