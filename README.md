# AI Quiz Generator

A modern web application that generates customized quizzes using AI technology. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎯 Generate quizzes on any subject or topic
- 📚 Customize difficulty levels (Easy, Medium, Hard)
- 🔢 Choose number of questions (1-10)
- ✨ Multiple question types (Multiple Choice, True/False)
- 📊 Real-time score tracking
- 💡 Detailed explanations for answers
- 🎨 Modern, responsive UI
- 🌙 Dark mode support

## Tech Stack

- **Frontend Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Heroicons
- **API Integration:** Google Gemini AI

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-quiz-generator.git
   cd ai-quiz-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter the topic and subject for your quiz
2. Select the grade level
3. Choose the number of questions (1-10)
4. Select difficulty level
5. Choose question type
6. Click "Generate Quiz"
7. Answer the questions and see your score in real-time
8. Review explanations for each answer
9. Start a new quiz when finished

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for providing the quiz generation capabilities
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework 