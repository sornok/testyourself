'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomTimeManagementQuestions, calculateTimeManagementScore } from '@/lib/timeManagementTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  explanation: string;
}

export default function TimeManagementTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [hasBegun, setHasBegun] = useState(false)
  const router = useRouter()

  // Generate random questions when component mounts
  useEffect(() => {
    try {
      const questions = getRandomTimeManagementQuestions();
      setQuestions(questions);
    } catch (error) {
      console.error('Error loading time management questions:', error);
    }
  }, [])

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...answers, [questionId]: answerIndex }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Show 100% progress bar for a moment before completing
      setTimeout(() => {
        // Calculate time management score
        const result = calculateTimeManagementScore(newAnswers, questions)
        setIsComplete(true)
        // Navigate to results page with detailed data after a delay
        setTimeout(() => {
          const answersData = encodeURIComponent(JSON.stringify(newAnswers))
          const questionsData = encodeURIComponent(JSON.stringify(questions))
          const resultsData = encodeURIComponent(JSON.stringify(result))
          router.push(`/results/time-management-test?results=${resultsData}&answers=${answersData}&questions=${questionsData}`)
        }, 1000)
      }, 800)
    }
  }

  const beginTest = () => {
    setHasBegun(true)
  }

  const progress = questions.length > 0 ? (Object.keys(answers).length / questions.length) * 100 : 0

  if (isComplete) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Time Management Test - Free Productivity Assessment | TestYourself</title>
          <meta name="description" content="Take our free time management test to assess your productivity skills and discover your time management style. Get personalized recommendations for better efficiency. Complete in 5-8 minutes!" />
          <meta name="keywords" content="time management test, productivity test, time management skills, productivity assessment, time management style, efficiency test, work productivity, time management tips, productivity habits, time awareness" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="TestYourself" />
        <meta name="publisher" content="TestYourself" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://testyourself.com/time-management-test" />
        <link rel="alternate" href="https://testyourself.com/time-management-test" hreflang="en" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Time Management Test - Free Productivity Assessment" />
          <meta property="og:description" content="Take our free time management test to assess your productivity skills and discover your time management style. Get personalized recommendations for better efficiency." />
          <meta property="og:image" content="https://testyourself.com/time-management-test-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/time-management-test" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Time Management Test - Free Productivity Assessment" />
          <meta name="twitter:description" content="Take our free time management test to assess your productivity skills and discover your time management style." />
          <meta name="twitter:image" content="https://testyourself.com/time-management-test-og-image.jpg" />
        </Head>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sage-600 mx-auto mb-4"></div>
            <p className="text-sage-600 text-lg">Calculating your time management score...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Time Management Test - Free Productivity Assessment | TestYourself</title>
        <meta name="description" content="Take our free time management test to assess your productivity skills and discover your time management style. Get personalized recommendations for better efficiency. Complete in 5-8 minutes!" />
        <meta name="keywords" content="time management test, productivity test, time management skills, productivity assessment, time management style, efficiency test, work productivity, time management tips, productivity habits, time awareness" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="TestYourself" />
        <meta name="publisher" content="TestYourself" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://testyourself.com/time-management-test" />
        <link rel="alternate" href="https://testyourself.com/time-management-test" hreflang="en" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Time Management Test - Free Productivity Assessment" />
        <meta property="og:description" content="Take our free time management test to assess your productivity skills and discover your time management style. Get personalized recommendations for better efficiency." />
        <meta property="og:image" content="https://testyourself.com/time-management-test-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Time Management Test - Free Productivity Assessment" />
        <meta property="og:url" content="https://testyourself.com/time-management-test" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TestYourself" />
        <meta name="twitter:creator" content="@TestYourself" />
        <meta name="twitter:title" content="Time Management Test - Free Productivity Assessment" />
        <meta name="twitter:description" content="Take our free time management test to assess your productivity skills and discover your time management style." />
        <meta name="twitter:image" content="https://testyourself.com/time-management-test-og-image.jpg" />
        <meta name="twitter:image:alt" content="Time Management Test - Free Productivity Assessment" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Time Management Test - Productivity Assessment",
              "description": "A comprehensive time management test that helps you assess your productivity skills and discover your time management style with personalized recommendations.",
              "url": "https://testyourself.com/time-management-test",
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "educationalLevel": "beginner",
              "learningResourceType": "assessment",
              "timeRequired": "PT6M",
              "typicalAgeRange": "16-99",
              "about": {
                "@type": "Thing",
                "name": "Time Management Assessment",
                "description": "Productivity skills and time management evaluation"
              },
              "teaches": [
                "Time management skills",
                "Productivity optimization",
                "Work efficiency",
                "Stress management",
                "Goal setting"
              ],
              "inLanguage": "en",
              "isAccessibleForFree": true,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a time management test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A time management test is an assessment that evaluates your productivity skills, time awareness, planning abilities, and stress management to help you understand your time management style and areas for improvement."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate is this time management test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our time management test is based on established productivity principles and provides insights into your time management abilities. While no test is 100% accurate, it offers valuable self-discovery insights into your productivity strengths and areas for improvement."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What time management styles are there?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Common time management styles include Strategic Planner (excellent at planning and time awareness), Efficient Executor (focuses on productivity and stress management), Organized Planner (strong planning skills), Time-Conscious (strong time awareness), Productivity Focused (optimizes work habits), and Stress-Resilient (handles pressure well)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the time management test take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The time management test typically takes about 5-8 minutes to complete. It includes 20 carefully selected questions designed to assess your productivity skills across different areas including planning, time awareness, productivity habits, and stress management."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What areas does the time management test cover?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our time management test covers four key areas: Planning & Prioritization (task organization and goal setting), Time Awareness (deadline management and time estimation), Productivity Habits (work environment and efficiency), and Stress & Workload (handling pressure and multiple demands)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is this time management test free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our time management test is completely free. You can take the test, view your results, and get detailed insights into your productivity skills at no cost. No registration, payment, or personal information required."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is my time management score calculated?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Your time management score is calculated based on your responses across all question categories. The scoring system evaluates your performance in planning, time awareness, productivity habits, and stress management, then provides an overall score and personalized recommendations."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I retake the time management test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, you can retake the time management test as many times as you like. Each test uses a different random selection of 20 questions from our pool of 60 questions, so you'll get a fresh assessment each time. However, for the most accurate results, we recommend taking it when you're well-rested and focused."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should I do to prepare for the time management test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No special preparation is needed. For best results, take the test when you're well-rested, in a quiet environment, and have 5-8 minutes of uninterrupted time. Answer honestly based on your typical work habits and preferences."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What makes this time management test different from others?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our time management test is completely free, requires no registration, and provides personalized recommendations based on your responses. It covers four key areas: planning, time awareness, productivity habits, and stress management, giving you a comprehensive view of your time management style."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I use the time management test results for professional development?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, the test results provide valuable insights for professional development, including your time management style, strengths, and areas for improvement. The personalized recommendations can help you optimize your productivity and work efficiency."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate are the time management test recommendations?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The recommendations are based on established time management principles and your specific response patterns. While no test is 100% accurate, the insights provide a solid foundation for improving your productivity and time management skills."
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
                    "name": "Time Management Test",
                    "item": "https://testyourself.com/time-management-test"
                  }
                ]
              },
              "potentialAction": {
                "@type": "TakeAction",
                "target": "https://testyourself.com/time-management-test",
                "name": "Take Time Management Test"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "professionals, students, entrepreneurs"
              },
              "educationalUse": "assessment",
              "interactivityType": "active",
              "learningResourceType": "assessment",
              "educationalAlignment": {
                "@type": "AlignmentObject",
                "alignmentType": "teaches",
                "educationalFramework": "time management skills",
                "targetName": "productivity improvement"
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
          
          {/* Test Title Box - Side by Side Layout for Pre-test */}
          {!hasBegun ? (
            <div className="grid md:grid-cols-2 gap-2 mb-2">
              {/* Test Title Box */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-6 h-full">
                  <h1 className="text-xl font-bold text-green-800 mb-3">
                    Time Management Test
                  </h1>
                  <p className="text-green-600 mb-4 text-lg">
                    Assess your productivity skills and discover your time management style
                  </p>
                  
                  {/* Test Info */}
                  <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                    <span className="font-medium">Format:</span> Multiple choice questions
                    <span className="text-green-500 ml-2">⏰ Based on productivity principles</span>
                  </div>
                </div>
              </div>

              {/* Begin Button Banner */}
              <div className="text-center">
                <div className="bg-yellow-50 rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">Ready to Begin?</h3>
                  <p className="text-yellow-700 mb-4">
                    Take a moment to read the instructions below. When you're ready, click the button to start the test.
                  </p>
                  <button
                    onClick={beginTest}
                    className="px-8 py-1 bg-yellow-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-lg"
                  >
                    Begin Test Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Test Title Box - Full width during test */
            <div className="text-center mb-2">
              <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
                <h1 className="text-xl font-bold text-green-800 mb-3">
                  Time Management Test
                </h1>
                <p className="text-green-600 mb-4 text-lg">
                  Assess your productivity skills and discover your time management style
                </p>
                
                {/* Test Info */}
                <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                  <span className="font-medium">Format:</span> Multiple choice questions
                  <span className="text-green-500 ml-2">⏰ Based on productivity principles</span>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar - Show when test has begun */}
          {hasBegun && (
            <div className="bg-blue-50 rounded-2xl shadow-lg p-4 mb-2">
              <div className="flex justify-between text-sm text-blue-500 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Question Card - Only show when test has begun */}
          {questions.length > 0 && hasBegun && (
            <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {questions[currentQuestion].category.charAt(0).toUpperCase() + questions[currentQuestion].category.slice(1).replace('-', ' ')}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-sage-800 mb-4 text-center">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(questions[currentQuestion].id, index)}
                    className="w-full px-4 py-2 text-left border-2 border-sage-200 rounded-xl hover:border-sage-400 hover:bg-sage-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-sage-300 rounded-full mr-4 group-hover:border-sage-500 transition-colors"></div>
                      <span className="text-sage-700 group-hover:text-sage-800 transition-colors">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Previous Question Button - Inside the answers box */}
              {currentQuestion > 0 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => {
                      // Clear the answer for the current question when going back
                      const newAnswers = { ...answers }
                      delete newAnswers[questions[currentQuestion].id]
                      setAnswers(newAnswers)
                      
                      setCurrentQuestion(currentQuestion - 1)
                    }}
                    className="px-3 py-1 bg-sage-200 text-sage-700 rounded-lg hover:bg-sage-300 transition-colors text-sm"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Instructions - Show when test hasn't begun */}
          {!hasBegun && (
            <>
              {/* What is a Time Management Test? Box */}
              <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
                <h4 className="text-xl font-semibold text-sage-800 mb-3">What is a Time Management Test?</h4>
                <div className="text-sage-600">
                  <p className="mb-3">A time management test evaluates your productivity preferences and work style across four key areas:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Planning & Prioritization:</strong> How you organize tasks and set goals</li>
                    <li><strong>Time Awareness:</strong> Your approach to deadlines and time estimation</li>
                    <li><strong>Productivity Habits:</strong> Your work environment and efficiency preferences</li>
                    <li><strong>Stress & Workload:</strong> How you handle pressure and multiple demands</li>
                  </ul>
                </div>
              </div>
              
              {/* How to Take This Test Box */}
              <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
                <h4 className="text-xl font-semibold text-sage-800 mb-3">How to Take This Test</h4>
                <div className="text-sage-600">
                  <ul className="space-y-2">
                    <li>• {questions.length} questions covering different productivity areas</li>
                    <li>• Choose the answer that best describes your typical behavior and preferences</li>
                    <li>• There are no right or wrong answers - be honest about your work style</li>
                    <li>• Takes about 5-8 minutes to complete</li>
                    <li>• Results show your time management style with personalized recommendations</li>
                  </ul>
                </div>
              </div>

            </>
          )}

        </div>


      </div>
      
      {/* Footer Component */}
      <Footer />
    </div>
    </>
  )
}
