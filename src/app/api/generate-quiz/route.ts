import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
if (!process.env.GOOGLE_API_KEY) {
  throw new Error('Missing GOOGLE_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req: Request) {
  try {
    const { topic, subject, grade, numQuestions, difficulty } = await req.json();

    // Input validation
    if (!topic || !subject || !grade || !numQuestions || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (numQuestions < 1 || numQuestions > 10) {
      return NextResponse.json(
        { error: 'Number of questions must be between 1 and 10' },
        { status: 400 }
      );
    }

    // Create a detailed prompt for the Gemini API
    const prompt = `You are an expert quiz generator. Create a ${numQuestions}-question multiple-choice quiz about ${topic} in ${subject} for ${grade} level students with ${difficulty} difficulty.

Instructions:
1. Each question should be clear, focused, and appropriate for the grade level
2. Provide exactly 4 options labeled as A, B, C, D
3. Include one correct answer
4. Add a brief explanation for the correct answer
5. Make sure the questions and answers are accurate and educational
6. Vary the question types and difficulty based on the specified difficulty level
7. For easy questions, focus on basic facts and definitions
8. For medium questions, include application and analysis
9. For hard questions, include synthesis and evaluation

Return the response in this exact JSON format:
{
  "questions": [
    {
      "question": "What is the question?",
      "options": [
        "A) First option",
        "B) Second option",
        "C) Third option",
        "D) Fourth option"
      ],
      "correctAnswer": "A",
      "explanation": "Explanation for why A is correct"
    }
  ]
}

Important: Return ONLY the JSON object, no other text or formatting.`;

    // Use the correct model name for Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Generate content with the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response || !response.text()) {
      throw new Error('Empty response from Gemini');
    }

    const responseText = response.text();
    console.log('Raw Gemini response:', responseText); // Debug log

    let quiz;
    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedResponse = responseText.trim().replace(/```json\n?|\n?```/g, '');
      quiz = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.error('Raw response:', responseText);
      return NextResponse.json(
        { error: 'Invalid response format from Gemini' },
        { status: 500 }
      );
    }

    // Validate quiz structure
    if (!quiz.questions || !Array.isArray(quiz.questions)) {
      console.error('Invalid quiz structure:', quiz);
      return NextResponse.json(
        { error: 'Invalid quiz format received' },
        { status: 500 }
      );
    }

    // Validate each question
    for (const question of quiz.questions) {
      if (!question.question || !Array.isArray(question.options) || 
          question.options.length !== 4 || !question.correctAnswer || !question.explanation) {
        console.error('Invalid question format:', question);
        return NextResponse.json(
          { error: 'Invalid question format in quiz' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate quiz' },
      { status: 500 }
    );
  }
} 