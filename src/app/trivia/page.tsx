'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomTriviaQuestions, calculateTriviaScore } from '@/lib/triviaQuestions'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

export default function TriviaTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answerTimes, setAnswerTimes] = useState<Record<number, number>>({})
  const [questions, setQuestions] = useState<Question[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [isComplete, setIsComplete] = useState(false)
  const [hasBegun, setHasBegun] = useState(false)
  const router = useRouter()

  // Generate random questions when component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        console.log('Loading trivia questions...');
        const questions = await getRandomTriviaQuestions(10);
        console.log('Loaded questions:', questions);
        setQuestions(questions);
      } catch (error) {
        console.error('Error loading trivia questions:', error);
      }
    };
    loadQuestions();
  }, [])

  // Timer effect - only run when test has begun
  useEffect(() => {
    if (hasBegun && timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (hasBegun && timeLeft === 0 && !isComplete) {
      // Time's up - move to next question or finish
      handleTimeUp()
    }
  }, [hasBegun, timeLeft, isComplete])

  const beginTest = () => {
    setHasBegun(true)
  }

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const answerTime = 30 - timeLeft // Calculate how long it took to answer
    const newAnswers = { ...answers, [questionId]: answerIndex }
    const newAnswerTimes = { ...answerTimes, [questionId]: answerTime }
    
    setAnswers(newAnswers)
    setAnswerTimes(newAnswerTimes)

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setTimeLeft(30) // Reset timer for next question
      } else {
        // Show 100% progress bar for a moment before completing
        setTimeout(() => {
          finishQuiz(newAnswers, newAnswerTimes)
        }, 800)
      }
    }, 200)
  }

  const handleTimeUp = () => {
    // Mark as unanswered and move to next question
    const newAnswers = { ...answers, [questions[currentQuestion].id]: -1 }
    const newAnswerTimes = { ...answerTimes, [questions[currentQuestion].id]: 30 }
    setAnswers(newAnswers)
    setAnswerTimes(newAnswerTimes)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setTimeLeft(30)
      } else {
        // Show 100% progress bar for a moment before completing
        setTimeout(() => {
          finishQuiz(newAnswers, newAnswerTimes)
        }, 800)
      }
    }, 200)
  }

  const finishQuiz = (finalAnswers: Record<number, number>, finalAnswerTimes: Record<number, number>) => {
    setIsComplete(true)
    const quizScore = calculateTriviaScore(finalAnswers, questions, finalAnswerTimes)
    // Navigate to results page with detailed data
    setTimeout(() => {
      const resultsData = encodeURIComponent(JSON.stringify(quizScore))
      const answersData = encodeURIComponent(JSON.stringify(finalAnswers))
      const questionsData = encodeURIComponent(JSON.stringify(questions))
      router.push(`/results/trivia?score=${quizScore.accuracy}&speed=${quizScore.speedFeedback}&correct=${quizScore.correct}&total=${quizScore.total}&results=${resultsData}&answers=${answersData}&questions=${questionsData}`)
    }, 1000)
  }

  const progress = questions.length > 0 ? (Object.keys(answers).length / questions.length) * 100 : 0

  if (isComplete) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Trivia Quiz - Free Online Knowledge Test | TestYourself</title>
          <meta name="description" content="Test your general knowledge with our free trivia quiz! Answer questions across various topics including science, history, geography, arts, and sports. Get scored on accuracy and speed!" />
          <meta name="keywords" content="trivia quiz, general knowledge test, online quiz, knowledge test, trivia questions, quiz game, brain teaser, educational quiz, free quiz" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://testyourself.com/trivia" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Trivia Quiz - Free Online Knowledge Test" />
          <meta property="og:description" content="Test your general knowledge with our free trivia quiz! Answer questions across various topics including science, history, geography, arts, and sports." />
          <meta property="og:image" content="https://testyourself.com/trivia-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/trivia" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Trivia Quiz - Free Online Knowledge Test" />
          <meta name="twitter:description" content="Test your general knowledge with our free trivia quiz! Answer questions across various topics including science, history, geography, arts, and sports." />
          <meta name="twitter:image" content="https://testyourself.com/trivia-og-image.jpg" />
        </Head>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-green-600 text-lg">Calculating your score...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Trivia Quiz - Free Online Knowledge Test | TestYourself</title>
        <meta name="description" content="Test your general knowledge with our free trivia quiz! Answer questions across various topics including science, history, geography, arts, and sports. Get scored on accuracy and speed!" />
        <meta name="keywords" content="trivia quiz, general knowledge test, online quiz, knowledge test, trivia questions, quiz game, brain teaser, educational quiz, free quiz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://testyourself.com/trivia" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Trivia Quiz - Free Online Knowledge Test" />
        <meta property="og:description" content="Test your general knowledge with our free trivia quiz! Answer questions across various topics including science, history, geography, arts, and sports." />
        <meta property="og:image" content="https://testyourself.com/trivia-og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/trivia" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trivia Quiz - Free Online Knowledge Test" />
        <meta name="twitter:description" content="Test your general knowledge with our free trivia quiz! Answer questions across various topics including science, history, geography, arts, and sports." />
        <meta name="twitter:image" content="https://testyourself.com/trivia-og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Trivia Quiz - General Knowledge Test",
              "description": "A comprehensive trivia quiz that tests your general knowledge across various topics including science, history, geography, arts, and sports with scoring based on accuracy and speed.",
              "url": "https://testyourself.com/trivia",
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "educationalLevel": "intermediate",
              "learningResourceType": "assessment",
              "timeRequired": "PT5M",
              "typicalAgeRange": "12-99",
              "about": {
                "@type": "Thing",
                "name": "General Knowledge",
                "description": "Trivia and general knowledge testing across multiple subject areas"
              },
              "teaches": [
                "General knowledge",
                "Critical thinking",
                "Quick decision making",
                "Subject knowledge",
                "Speed and accuracy"
              ],
              "inLanguage": "en",
              "isAccessibleForFree": true,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "hasPart": [
                {
                  "@type": "Question",
                  "name": "Science Questions",
                  "description": "Questions about biology, physics, chemistry, and other sciences"
                },
                {
                  "@type": "Question", 
                  "name": "History Questions",
                  "description": "Questions about world events, historical figures, and historical facts"
                },
                {
                  "@type": "Question",
                  "name": "Geography Questions", 
                  "description": "Questions about countries, capitals, landmarks, and geographical facts"
                },
                {
                  "@type": "Question",
                  "name": "Arts & Culture Questions",
                  "description": "Questions about literature, music, art, and cultural topics"
                },
                {
                  "@type": "Question",
                  "name": "Sports Questions",
                  "description": "Questions about teams, athletes, records, and sports facts"
                }
              ]
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
      <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header onLogoClick={undefined} />
        
        {/* Test Title Box */}
        <div className="text-center mb-2">
          <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
            <h1 className="text-xl font-bold text-green-800 mb-3">
              Trivia Quiz
            </h1>
            <p className="text-green-600 mb-4 text-lg">
              Test your general knowledge
            </p>
            
            {/* Scoring Info */}
            <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
              <span className="font-medium">Scoring:</span> Correct answers + speed bonus
              <span className="text-green-500 ml-2">⚡ Fast answers get extra points!</span>
            </div>
          </div>
        </div>

        {/* Begin Button Banner */}
        {!hasBegun ? (
          <div className="text-center mb-2">
            <div className="bg-yellow-50 rounded-2xl shadow-lg p-4">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">Ready to Begin?</h3>
              <p className="text-yellow-700 mb-4">
                Take a moment to read the instructions below. When you're ready, click the button to start the quiz.
              </p>
              <button
                onClick={beginTest}
                className="px-8 py-0.5 bg-yellow-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-lg"
              >
                Begin Quiz Now
              </button>
            </div>
          </div>
        ) : (
          /* Progress and Timer - Shows when test has begun */
          <div className="mb-2">
            <div className="bg-green-50 rounded-2xl shadow-lg p-4 mb-2">
              <div className="flex justify-between text-sm text-green-600 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span className="font-bold">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {/* Timer positioned below progress bar */}
              <div className="text-center mt-2">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ⏱️ {timeLeft}s remaining
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Question Card - Only show when test has begun */}
        {questions.length > 0 && hasBegun && (
          <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-2">
            <div className="text-center mb-4">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {questions[currentQuestion].category}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-green-800 mb-3 text-center">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(questions[currentQuestion].id, index)}
                  className="w-full p-2 text-left bg-white border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-bold mr-3 group-hover:bg-purple-200 transition-colors text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-purple-700 group-hover:text-purple-800 transition-colors text-sm">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instructions - Show when test hasn't begun */}
        {!hasBegun && (
          <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-2">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Quiz Instructions</h3>
            <div className="space-y-3 text-green-600">
              <p>• This quiz consists of {questions.length} questions across various categories</p>
              <p>• You have 30 seconds to answer each question</p>
              <p>• Faster answers earn bonus points - think quickly!</p>
              <p>• Choose the best answer from the multiple choice options</p>
              <p>• Your final score will include accuracy and speed bonuses</p>
            </div>
          </div>
        )}
        </div>
      </div>
      
      {/* Footer Component */}
      <Footer />
    </div>
    </>
  )
}
