import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "No text provided." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Enhanced prompt with detailed instructions
    const prompt = `
      You are an expert educational content creator specializing in creating assessment questions. 
      Your task is to analyze the provided study notes and generate high-quality questions that:

      1. Test different cognitive levels (using Bloom's Taxonomy):
         - At least one knowledge/recall question
         - At least one comprehension/understanding question
         - At least one application/analysis question
         - At least one higher-order thinking question (evaluation/synthesis)

      2. Follow these question-writing principles:
         - Use clear, unambiguous language
         - Focus on important concepts rather than trivial details
         - Avoid leading questions or obvious answers
         - Include scenario-based questions where appropriate
         - Ensure questions are directly related to the core content
         - Make answers comprehensive but concise

      3. Question types to include:
         - Conceptual understanding questions
         - Problem-solving questions
         - Critical thinking questions
         - Real-world application questions
         - Relationship/comparison questions

      Study Notes:
      "${text}"

      Generate exactly 5 questions with their detailed answers in the following JSON format only.
      Each answer should be thorough enough to serve as a learning tool.
      Do not include any explanatory text, markdown, or additional formatting.
      Strictly return only valid JSON in this exact structure:

      [
        {
          "question": "Clear, specific question text ending with a question mark?",
          "answer": "Comprehensive, accurate answer that explains the reasoning",
          "type": "One of: Knowledge, Comprehension, Application, Analysis, Evaluation, or Synthesis",
          "difficulty": "One of: Basic, Intermediate, or Advanced"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();

    // Enhanced cleanup
    responseText = responseText.replace(/```json|```/g, "").trim();

    // Validate JSON structure
    try {
      const questions = JSON.parse(responseText);

      // Validate required fields and format
      if (
        !Array.isArray(questions) ||
        questions.length !== 5 ||
        !questions.every(
          (q) => q.question && q.answer && q.type && q.difficulty
        )
      ) {
        throw new Error("Invalid response format");
      }

      return NextResponse.json({ questions }, { status: 200 });
    } catch (jsonError) {
      console.error("Error parsing AI response:", jsonError);
      return NextResponse.json(
        { error: "Invalid response format from AI. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions. Please try again later." },
      { status: 500 }
    );
  }
}
