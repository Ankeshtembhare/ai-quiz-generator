'use client';

import { useState } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

interface QuizFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export default function QuizForm({ onSubmit, loading }: QuizFormProps) {
  const [formData, setFormData] = useState({
    topic: '',
    subject: '',
    grade: '',
    numQuestions: 5,
    difficulty: 'medium',
    questionType: 'multiple-choice'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-colors duration-200">
      <div className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Photosynthesis, World War II"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Mathematics, History, Science"
            required
          />
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Grade Level
          </label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., 9th Grade, College"
            required
          />
        </div>

        <div>
          <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Questions
          </label>
          <input
            type="number"
            id="numQuestions"
            name="numQuestions"
            value={formData.numQuestions}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label htmlFor="questionType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Question Type
          </label>
          <select
            id="questionType"
            name="questionType"
            value={formData.questionType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 dark:focus:ring-offset-gray-800"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Quiz...
            </span>
          ) : (
            <span className="flex items-center">
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              Generate Quiz
            </span>
          )}
        </button>
      </div>
    </form>
  );
} 