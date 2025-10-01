'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomDecisionMakingQuestions, calculateDecisionMakingScore } from '@/lib/decisionMakingTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

export default function DecisionMakingTest() {
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
        const questions = await getRandomDecisionMakingQuestions();
        setQuestions(questions);
        
        // Randomize options for each question
        const randomizedQuestions = questions.map(question => {
          const options = [...question.options];
          
          // Shuffle the options while preserving the weight information
          for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
          }
          
          return {
            ...question,
            options
          };
        });
        
        setRandomizedQuestions(randomizedQuestions);
      } catch (error) {
        console.error('Error loading decision making questions:', error);
        setError('Failed to load decision making questions. Please refresh the page.');
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
    const quizScore = calculateDecisionMakingScore(finalAnswers, questions, finalAnswerTimes)
    // Navigate to results page with detailed data
    setTimeout(() => {
      const resultsData = encodeURIComponent(JSON.stringify(quizScore))
      const answersData = encodeURIComponent(JSON.stringify(finalAnswers))
      const questionsData = encodeURIComponent(JSON.stringify(questions))
      const answerTimesData = encodeURIComponent(JSON.stringify(finalAnswerTimes))
      router.push(`/results/decision-making-test?score=${quizScore.accuracy}&speed=${quizScore.speedFeedback}&correct=${quizScore.correctAnswers}&total=${quizScore.totalQuestions}&results=${resultsData}&answers=${answersData}&questions=${questionsData}&answerTimes=${answerTimesData}`)
    }, 1000)
  }

  const progress = randomizedQuestions.length > 0 ? (Object.keys(answers).length / randomizedQuestions.length) * 100 : 0

  if (isComplete) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Decision Making Test - Free Online Assessment | TestYourself</title>
          <meta name="description" content="Test your decision-making skills with our free assessment! Evaluate your judgment in workplace leadership, personal life decisions, ethical dilemmas, crisis management, and strategic thinking scenarios." />
          <meta name="keywords" content="decision making test, judgment assessment, leadership decisions, ethical dilemmas, crisis management, strategic thinking, decision skills, free assessment" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://testyourself.com/decision-making-test" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Decision Making Test - Free Online Assessment" />
          <meta property="og:description" content="Test your decision-making skills with our free assessment! Evaluate your judgment in workplace leadership, personal life decisions, ethical dilemmas, crisis management, and strategic thinking scenarios." />
          <meta property="og:image" content="https://testyourself.com/decision-making-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/decision-making-test" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Decision Making Test - Free Online Assessment" />
          <meta name="twitter:description" content="Test your decision-making skills with our free assessment! Evaluate your judgment in workplace leadership, personal life decisions, ethical dilemmas, crisis management, and strategic thinking scenarios." />
          <meta name="twitter:image" content="https://testyourself.com/decision-making-og-image.jpg" />
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
        <title>Decision Making Test - Free Online Assessment | TestYourself</title>
        <meta name="description" content="Test your decision-making skills with our advanced weighted scoring assessment! Evaluate judgment effectiveness across workplace leadership, personal decisions, ethical dilemmas, crisis management, and strategic thinking with speed penalty analysis." />
        <meta name="keywords" content="decision making test, judgment assessment, weighted scoring, effectiveness points, speed penalties, leadership decisions, ethical dilemmas, crisis management, strategic thinking, decision skills, free assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="TestYourself" />
        <meta name="publisher" content="TestYourself" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://testyourself.com/decision-making-test" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Decision Making Test - Free Online Assessment" />
        <meta property="og:description" content="Test your decision-making skills with our advanced weighted scoring assessment! Evaluate judgment effectiveness across workplace leadership, personal decisions, ethical dilemmas, crisis management, and strategic thinking with speed penalty analysis." />
        <meta property="og:image" content="https://testyourself.com/decision-making-og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/decision-making-test" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Decision Making Test - Advanced Weighted Assessment" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Decision Making Test - Free Online Assessment" />
        <meta name="twitter:description" content="Test your decision-making skills with our advanced weighted scoring assessment! Evaluate judgment effectiveness across workplace leadership, personal decisions, ethical dilemmas, crisis management, and strategic thinking with speed penalty analysis." />
        <meta name="twitter:image" content="https://testyourself.com/decision-making-og-image.jpg" />
        <meta name="twitter:image:alt" content="Decision Making Test - Advanced Weighted Assessment" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Decision Making Test - Advanced Weighted Assessment",
              "description": "A comprehensive decision-making assessment with advanced weighted scoring that evaluates judgment effectiveness across workplace leadership, personal life decisions, ethical dilemmas, crisis management, and strategic thinking scenarios. Features speed penalty analysis for complete decision-making evaluation.",
              "url": "https://testyourself.com/decision-making-test",
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "educationalLevel": "intermediate",
              "learningResourceType": "assessment",
              "timeRequired": "PT8M",
              "typicalAgeRange": "16-99",
              "about": {
                "@type": "Thing",
                "name": "Decision Making",
                "description": "Assessment of judgment and decision-making abilities across various life and work scenarios"
              },
              "teaches": [
                "Decision making",
                "Critical thinking",
                "Judgment skills",
                "Ethical reasoning",
                "Crisis management",
                "Strategic thinking",
                "Weighted scoring evaluation",
                "Speed-based assessment",
                "Effectiveness analysis"
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
                  "name": "Workplace Leadership",
                  "description": "Scenarios involving team management, employee relations, and leadership decisions"
                },
                {
                  "@type": "Question", 
                  "name": "Personal Life Decisions",
                  "description": "Choices involving career, relationships, finances, and personal development"
                },
                {
                  "@type": "Question",
                  "name": "Ethical Dilemmas", 
                  "description": "Situations requiring moral reasoning and ethical judgment"
                },
                {
                  "@type": "Question",
                  "name": "Crisis Management",
                  "description": "Emergency situations requiring quick thinking and effective response"
                },
                {
                  "@type": "Question",
                  "name": "Strategic Thinking",
                  "description": "Long-term planning and strategic decision-making scenarios"
                }
              ],
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What areas of decision making are covered in this test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The decision making test covers five main areas: Workplace Leadership (team management, employee relations), Personal Life Decisions (career, relationships, finances), Ethical Dilemmas (moral reasoning), Crisis Management (emergency response), and Strategic Thinking (long-term planning)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is the decision making test scored?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The test uses an advanced weighted scoring system where each answer option has effectiveness points (0-100). You earn points based on decision quality: Excellent (90-100 pts), Good (70-89 pts), Fair (50-69 pts), Poor (0-49 pts). Speed penalties apply: 10-20s responses get 10% reduction, 20+ seconds get 20% reduction. This provides comprehensive evaluation of both decision quality and response speed."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What makes this decision making test different?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "This test features advanced weighted scoring where every answer has effectiveness points (0-100) instead of simple correct/incorrect. It includes speed penalty analysis, category breakdown by points earned, and answer quality distribution. The assessment evaluates both decision effectiveness and response time for comprehensive decision-making analysis."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What difficulty level is the decision making test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The decision making test is designed for intermediate to advanced levels, suitable for ages 16 and up. Scenarios range from everyday decisions to complex professional and ethical situations."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I retake the decision making test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, you can take the decision making test as many times as you want. Each attempt may include different scenarios, and you can track your improvement over time by comparing your scores and decision-making patterns."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the decision making test take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The decision making test typically takes about 8-12 minutes to complete. It includes multiple choice scenarios across different decision-making categories, with time limits to encourage thoughtful but timely decisions."
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
                    "name": "Decision Making Test",
                    "item": "https://testyourself.com/decision-making-test"
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
        
        {/* Test Title Box and Begin Button - Side by Side */}
        {!hasBegun && (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-2">
              {/* Test Title Box */}
              <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-4">
                <h1 className="text-xl font-bold text-green-800 mb-3">Decision Making</h1>
                <p className="text-green-600 mb-4 text-lg">Test your judgment and decision-making skills</p>
                <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                  <span className="font-medium">Scoring:</span> Correct answers + speed bonus<br />
                  <span className="text-green-500">⚡ Fast decisions get extra points!</span>
                </div>
              </div>
              {/* Begin Button Banner */}
              <div className="bg-yellow-50 rounded-2xl shadow-lg p-4 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Ready to Begin?</h3>
                <p className="text-yellow-700 mb-4">Take a moment to read the instructions below. When you&apos;re ready, click the button to start the assessment.</p>
                <button onClick={beginTest} className="px-8 py-0.5 bg-yellow-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-lg">Begin Assessment Now</button>
              </div>
            </div>
            {/* Instructions and Scoring System - Side by Side */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-4 mb-2">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-base font-semibold text-green-800 mb-3">Assessment Instructions</h3>
                  <div className="bg-blue-100 rounded-lg p-3 border border-gray-200">
                    <div className="space-y-2 text-green-600 text-sm">
                      <p>• This assessment consists of {randomizedQuestions.length} scenarios across various categories</p>
                      <p>• You have 30 seconds to make each decision</p>
                      <p>• Each answer option has different effectiveness points (0-100)</p>
                      <p>• Choose the most effective response from the multiple choice options</p>
                      <p>• Answer quickly to avoid speed penalties - think quickly but wisely!</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-green-800 mb-3">Scoring System</h4>
                  <div className="bg-green-100 rounded-lg p-3 border border-gray-200">
                    <div className="space-y-2 text-green-700 text-sm">
                      <p>• <strong>Effectiveness Points:</strong> Each answer gives 0-100 points based on quality</p>
                      <p>• <strong>Point Ranges:</strong> Excellent (90-100), Good (70-89), Fair (50-69), Poor (0-49)</p>
                      <p>• <strong>Speed Impact:</strong> Slow answers cut speed score (10-20s: -10%, 20+s: -20%)</p>
                      <p>• <strong>Final Score:</strong> Effectiveness points = Your decision rating</p>
                      <p>• <strong>Perfect Score:</strong> 1500/1500 points = Decision Expert!</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* What You'll Be Tested On - Full Width */}
              <div className="pt-3">
                <h4 className="text-base font-semibold text-green-800 mb-3">What You&apos;ll Be Tested On:</h4>
                <div className="bg-cyan-50 rounded-lg p-3 border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2">👔</span>
                        <div>
                          <p className="font-medium text-green-700">Workplace Leadership</p>
                          <p className="text-sm text-green-600">Team management, employee relations, and leadership decisions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2">🏠</span>
                        <div>
                          <p className="font-medium text-green-700">Personal Life Decisions</p>
                          <p className="text-sm text-green-600">Career choices, relationships, finances, and personal development</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2">⚖️</span>
                        <div>
                          <p className="font-medium text-green-700">Ethical Dilemmas</p>
                          <p className="text-sm text-green-600">Moral reasoning and ethical judgment in complex situations</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2">🚨</span>
                        <div>
                          <p className="font-medium text-green-700">Crisis Management</p>
                          <p className="text-sm text-green-600">Emergency response and quick decision-making under pressure</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2">🎯</span>
                        <div>
                          <p className="font-medium text-green-700">Strategic Thinking</p>
                          <p className="text-sm text-green-600">Long-term planning and strategic decision-making scenarios</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2">⚡</span>
                        <div>
                          <p className="font-medium text-green-700">Speed Impact</p>
                          <p className="text-sm text-green-600">Slow answers reduce speed score!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                  Decision Making
                </h1>
                <p className="text-green-600 mb-4 text-lg">
                  Test your judgment and problem-solving skills
                </p>
                
               {/* Scoring Info */}
               <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                 <span className="font-medium">Scoring:</span> Effectiveness points (speed penalties for slow answers)
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
                <span>Scenario {currentQuestion + 1} of {randomizedQuestions.length}</span>
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
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 text-base">
                {randomizedQuestions[currentQuestion].category}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-green-800 mb-3 text-center">
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
                    <span className="text-purple-700 group-hover:text-purple-800 transition-colors text-sm">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
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
