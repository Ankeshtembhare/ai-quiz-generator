'use client';

import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import QuizForm from '@/components/QuizForm';
import QuizDisplay from '@/components/QuizDisplay';
import Header from '@/components/Header';

export default function Home() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async (formData: any) => {
    try {
      setLoading(true);
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate quiz');
      }

      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid quiz format received');
      }

      setQuiz(data);
      toast.success('Quiz generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
            AI Quiz Generator
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Generate customized quizzes for your students with AI-powered questions
          </p>
          
          <QuizForm onSubmit={generateQuiz} loading={loading} />
          
          {quiz && <QuizDisplay quiz={quiz} onReset={() => setQuiz(null)} />}
          
          <Toaster position="bottom-right" />
        </div>
      </main>
    </div>
  );
}
