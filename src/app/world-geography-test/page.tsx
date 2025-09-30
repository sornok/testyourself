'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomWorldGeographyQuestions, calculateWorldGeographyScore } from '@/lib/worldGeographyTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

export default function WorldGeographyTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answerTimes, setAnswerTimes] = useState<Record<number, number>>({})
  const [questions, setQuestions] = useState<Question[]>([])
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [isComplete, setIsComplete] = useState(false)
  const [hasBegun, setHasBegun] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Generate random questions when component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const questions = await getRandomWorldGeographyQuestions(15);
        setQuestions(questions);
        
        // Randomize options for each question
        const randomizedQuestions = questions.map(question => {
          const options = [...question.options];
          const correctAnswer = question.correct;
          
          // Shuffle the options
          for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
          }
          
          // Find the new position of the correct answer
          const correctOptionText = question.options[correctAnswer];
          const newCorrectIndex = options.findIndex(option => option === correctOptionText);
          
          return {
            ...question,
            options,
            correct: newCorrectIndex
          };
        });
        
        setRandomizedQuestions(randomizedQuestions);
      } catch (error) {
        console.error('Error loading world geography questions:', error);
        setError('Failed to load world geography questions. Please refresh the page.');
      } finally {
        setIsLoading(false);
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
    
    // Get the selected option text from randomized options
    const selectedOption = randomizedQuestions[currentQuestion].options[answerIndex];
    
    // Find the original index of this option in the original question
    const originalQuestion = questions[currentQuestion];
    const originalAnswerIndex = originalQuestion.options.findIndex(
      option => option === selectedOption
    );
    
    const newAnswers = { ...answers, [questionId]: originalAnswerIndex }
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
    const quizScore = calculateWorldGeographyScore(finalAnswers, questions, finalAnswerTimes)
    // Navigate to results page with detailed data
    setTimeout(() => {
      const resultsData = encodeURIComponent(JSON.stringify(quizScore))
      const answersData = encodeURIComponent(JSON.stringify(finalAnswers))
      const questionsData = encodeURIComponent(JSON.stringify(questions))
      const answerTimesData = encodeURIComponent(JSON.stringify(finalAnswerTimes))
      router.push(`/results/world-geography-test?score=${quizScore.accuracy}&speed=${quizScore.speedFeedback}&correct=${quizScore.correctAnswers}&total=${quizScore.totalQuestions}&results=${resultsData}&answers=${answersData}&questions=${questionsData}&answerTimes=${answerTimesData}`)
    }, 1000)
  }

  const progress = randomizedQuestions.length > 0 ? (Object.keys(answers).length / randomizedQuestions.length) * 100 : 0

  if (isComplete) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>World Geography - Free Online Geography Test | TestYourself</title>
          <meta name="description" content="Test your world geography knowledge with our free geography quiz! Answer questions about countries, capitals, landmarks, flags, and physical features. Get scored on accuracy with speed penalty analysis!" />
          <meta name="keywords" content="world geography, geography test, countries, capitals, landmarks, flags, physical geography, global knowledge, geography quiz" />
          <meta name="author" content="TestYourself" />
          <meta name="publisher" content="TestYourself" />
          <meta name="language" content="en" />
          <meta name="revisit-after" content="7 days" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://testyourself.com/world-geography-test" />
          <link rel="alternate" hrefLang="en" href="https://testyourself.com/world-geography-test" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="World Geography - Free Online Geography Test" />
          <meta property="og:description" content="Test your world geography knowledge with our free geography quiz! Answer questions about countries, capitals, landmarks, flags, and physical features with speed penalty analysis." />
          <meta property="og:image" content="https://testyourself.com/world-geography-og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="World Geography Test - Free Online Geography Quiz" />
          <meta property="og:url" content="https://testyourself.com/world-geography-test" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="World Geography - Free Online Geography Test" />
          <meta name="twitter:description" content="Test your world geography knowledge with our free geography quiz! Answer questions about countries, capitals, landmarks, flags, and physical features with speed penalty analysis." />
          <meta name="twitter:image" content="https://testyourself.com/world-geography-og-image.jpg" />
          <meta name="twitter:image:alt" content="World Geography Test - Free Online Geography Quiz" />
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
        <title>World Geography - Free Online Geography Test | TestYourself</title>
        <meta name="description" content="Test your world geography knowledge with our free geography quiz! Answer questions about countries, capitals, landmarks, flags, and physical features with speed penalty analysis!" />
        <meta name="keywords" content="world geography, geography test, countries, capitals, landmarks, flags, physical geography, global knowledge, geography quiz, speed penalty analysis, geography assessment, world capitals quiz, geography knowledge test, free geography test, online geography quiz, geography skills assessment" />
        <meta name="author" content="TestYourself" />
        <meta name="publisher" content="TestYourself" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://testyourself.com/world-geography-test" />
        <link rel="alternate" hrefLang="en" href="https://testyourself.com/world-geography-test" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="World Geography - Free Online Geography Test" />
        <meta property="og:description" content="Test your world geography knowledge with our free geography quiz! Answer questions about countries, capitals, landmarks, flags, and physical features with speed penalty analysis." />
        <meta property="og:image" content="https://testyourself.com/world-geography-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="World Geography Test - Free Online Geography Quiz" />
        <meta property="og:url" content="https://testyourself.com/world-geography-test" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="World Geography - Free Online Geography Test" />
        <meta name="twitter:description" content="Test your world geography knowledge with our free geography quiz! Answer questions about countries, capitals, landmarks, flags, and physical features with speed penalty analysis." />
        <meta name="twitter:image" content="https://testyourself.com/world-geography-og-image.jpg" />
        <meta name="twitter:image:alt" content="World Geography Test - Free Online Geography Quiz" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "World Geography - Geography Knowledge Test",
              "description": "A comprehensive geography quiz that tests your world geography knowledge across various topics including countries, capitals, landmarks, flags, and physical features with scoring based on accuracy and speed penalty analysis.",
              "url": "https://testyourself.com/world-geography-test",
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "educationalLevel": "intermediate",
              "learningResourceType": "assessment",
              "timeRequired": "PT10M",
              "typicalAgeRange": "12-99",
              "about": {
                "@type": "Thing",
                "name": "World Geography",
                "description": "Geography knowledge testing across countries, capitals, landmarks, flags, and physical features"
              },
              "teaches": [
                "World geography",
                "Countries and capitals",
                "Geographic landmarks",
                "National flags",
                "Physical geography",
                "Speed penalty analysis"
              ],
              "inLanguage": "en",
              "isAccessibleForFree": true,
              "audience": {
                "@type": "Audience",
                "audienceType": "Students, Geography Enthusiasts, Travelers, Educators"
              },
              "keywords": "world geography, geography test, countries, capitals, landmarks, flags, physical geography, speed penalty analysis",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "hasPart": [
                {
                  "@type": "Question",
                  "name": "Countries Questions",
                  "description": "Questions about world countries and their characteristics"
                },
                {
                  "@type": "Question", 
                  "name": "Capitals Questions",
                  "description": "Questions about capital cities and their countries"
                },
                {
                  "@type": "Question",
                  "name": "Landmarks Questions", 
                  "description": "Questions about famous landmarks and monuments"
                },
                {
                  "@type": "Question",
                  "name": "Flags Questions",
                  "description": "Questions about national flags and symbols"
                },
                {
                  "@type": "Question",
                  "name": "Physical Geography Questions",
                  "description": "Questions about physical features, climate, and geography"
                }
              ],
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What topics are covered in the world geography quiz?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The world geography quiz covers five main categories: Countries (world countries and their characteristics), Capitals (capital cities and their countries), Landmarks (famous landmarks and monuments), Flags (national flags and symbols), and Physical Geography (physical features, climate, and geography)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is the world geography quiz scored?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The world geography quiz is scored based on both accuracy and speed. You get points for correct answers, and penalties for answering slowly. The final score reflects your geography knowledge and quick thinking abilities."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What difficulty level is the world geography quiz?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The world geography quiz is designed for intermediate to advanced knowledge levels, suitable for ages 12 and up. Questions range from basic geography facts to more challenging topics across various geographic areas."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I retake the world geography quiz?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, you can take the world geography quiz as many times as you want. Each attempt may include different questions, and you can track your improvement over time by comparing your scores."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the world geography quiz take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The world geography quiz typically takes about 10 minutes to complete. It includes multiple choice questions across different geographic categories, and the time limit encourages quick thinking and decision-making."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What makes this world geography test different from other geography quizzes?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "This world geography test features advanced speed penalty analysis, comprehensive coverage of 5 geography categories, balanced question selection from 150+ questions, and detailed performance analytics including category breakdown and speed analysis."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is the world geography test suitable for educational purposes?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, this world geography test is perfect for educational use. It's suitable for students, teachers, and geography enthusiasts. The test covers essential geography knowledge including countries, capitals, landmarks, flags, and physical geography with detailed performance feedback."
                    }
                  }
                ]
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://testyourself.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "World Geography",
                    "item": "https://testyourself.com/world-geography-test"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
      <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header onLogoClick={undefined} />
        
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-red-400 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Test</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {isLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">Loading test questions...</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Pre-test View */}
        {!hasBegun && (
          <>
            {/* Test Title Box and Begin Button - Side by Side */}
            <div className="grid md:grid-cols-2 gap-4 mb-2">
              {/* Test Title Box */}
              <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-4">
                <h1 className="text-xl font-bold text-green-800 mb-3">
                  World Geography
                </h1>
                <p className="text-green-600 mb-4 text-lg">
                  Test your global geography knowledge
                </p>
                
                {/* Scoring Info */}
                <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                  <span className="font-medium">Scoring:</span> Correct answers (speed penalties for slow answers)
                  <br />
                  <span className="text-green-500">⚡ Answer quickly to avoid penalties!</span>
                </div>
              </div>

              {/* Begin Button Banner */}
              <div className="bg-yellow-50 rounded-2xl shadow-lg p-4 flex flex-col justify-center">
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
          </>
        )}

        {/* Test View */}
        {hasBegun && (
          <>
            {/* Test Title Box */}
            <div className="text-center mb-2">
              <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
                <h1 className="text-xl font-bold text-green-800 mb-3">
                  World Geography
                </h1>
                <p className="text-green-600 mb-4 text-lg">
                  Test your global geography knowledge
                </p>
                
                {/* Scoring Info */}
                <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                  <span className="font-medium">Scoring:</span> Correct answers (speed penalties for slow answers)
                  <br />
                  <span className="text-green-500">⚡ Answer quickly to avoid penalties!</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Progress and Timer - Shows when test has begun */}
        {hasBegun && (
          <div className="mb-2">
            <div className="bg-green-50 rounded-2xl shadow-lg p-4 mb-2">
              <div className="flex justify-between text-sm text-green-600 mb-2">
                <span>Question {currentQuestion + 1} of {randomizedQuestions.length}</span>
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
        {randomizedQuestions.length > 0 && hasBegun && (
          <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-2">
            <div className="text-center mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-semibold">
                {randomizedQuestions[currentQuestion].category}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-green-800 mb-3 text-center">
              {randomizedQuestions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {randomizedQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(randomizedQuestions[currentQuestion].id, index)}
                  className="w-full p-2 text-left bg-white border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-bold mr-3 group-hover:bg-purple-200 transition-colors text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-purple-700 group-hover:text-purple-800 transition-colors">
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
          <div className="bg-purple-50 rounded-2xl shadow-lg p-4 mb-2">
            {/* Quiz Instructions and Scoring System - Side by Side */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Quiz Instructions */}
              <div>
                <h3 className="text-base font-semibold text-green-800 mb-3">Quiz Instructions</h3>
                <div className="bg-orange-100 rounded-lg p-3 border border-gray-200">
                  <div className="space-y-2 text-green-600 text-sm">
                    <p>• This quiz consists of {randomizedQuestions.length} questions across various geography categories</p>
                    <p>• You have 30 seconds to answer each question</p>
                    <p>• Slow answers get penalties - think quickly!</p>
                    <p>• Choose the best answer from the multiple choice options</p>
                    <p>• Your final score will include accuracy and speed penalties</p>
                  </div>
                </div>
              </div>
              
              {/* Scoring System */}
              <div>
                <h4 className="text-base font-semibold text-green-800 mb-3">Scoring System</h4>
                <div className="bg-purple-100 rounded-lg p-3 border border-gray-200">
                  <div className="space-y-2 text-green-700 text-sm">
                    <p>• <strong>Base Score:</strong> 1 point for each correct answer</p>
                    <p>• <strong>Speed Impact:</strong> Slow answers cut speed score (10-20s: -10%, 20+s: -20%)</p>
                    <p>• <strong>Final Score:</strong> Base score + speed score = Your geography rating</p>
                    <p>• <strong>Perfect Score:</strong> 15/15 with fast answers = Geography Expert level!</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* What You'll Be Tested On - Full Width */}
            <div className="pt-3">
              <h4 className="text-base font-semibold text-green-800 mb-3">What You'll Be Tested On:</h4>
              <div className="bg-yellow-50 rounded-lg p-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">🌍</span>
                      <div>
                        <p className="font-medium text-green-700">Countries & Capitals</p>
                        <p className="text-sm text-green-600">World countries, their capitals, and basic facts</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">🏛️</span>
                      <div>
                        <p className="font-medium text-green-700">Famous Landmarks</p>
                        <p className="text-sm text-green-600">Monuments, buildings, and historical sites</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">🏔️</span>
                      <div>
                        <p className="font-medium text-green-700">Physical Geography</p>
                        <p className="text-sm text-green-600">Mountains, rivers, deserts, and climate zones</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">🏳️</span>
                      <div>
                        <p className="font-medium text-green-700">National Flags</p>
                        <p className="text-sm text-green-600">Flag designs, colors, and symbolic meanings</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">🗺️</span>
                      <div>
                        <p className="font-medium text-green-700">Continents & Regions</p>
                        <p className="text-sm text-green-600">Geographic regions, borders, and locations</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">⚡</span>
                      <div>
                        <p className="font-medium text-green-700">Speed Impact</p>
                        <p className="text-sm text-green-600">Quick answers avoid penalties!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
