'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomIQQuestions, calculateIQScore } from '@/lib/iqTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: string;
}

export default function IQMeasurementTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [hasBegun, setHasBegun] = useState(false)
  const router = useRouter()

  // Generate random questions when component mounts
  useEffect(() => {
    try {
      const questions = getRandomIQQuestions();
      setQuestions(questions);
    } catch (error) {
      console.error('Error loading IQ questions:', error);
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
        // Calculate IQ score
        const result = calculateIQScore(newAnswers, questions)
        setIsComplete(true)
        // Navigate to results page with detailed data after a delay
        setTimeout(() => {
          const answersData = encodeURIComponent(JSON.stringify(newAnswers))
          const questionsData = encodeURIComponent(JSON.stringify(questions))
          const resultsData = encodeURIComponent(JSON.stringify(result))
          router.push(`/results/iq-test?results=${resultsData}&answers=${answersData}&questions=${questionsData}`)
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
          <title>IQ Measurement - Free IQ Test | TestYourself</title>
          <meta name="description" content="Take our free IQ test to discover your intelligence quotient. Get detailed insights into your cognitive abilities across verbal, mathematical, spatial, and logical reasoning. Complete in 8-12 minutes!" />
          <meta name="keywords" content="IQ test, intelligence quotient, cognitive test, IQ measurement, intelligence test, cognitive assessment, reasoning test, mental ability test, free IQ test, online IQ test, IQ quiz, intelligence assessment, cognitive ability test, verbal reasoning, mathematical reasoning, spatial reasoning, logical reasoning, IQ score, intelligence measurement, brain test, cognitive evaluation, mental aptitude test, IQ evaluation, intelligence screening" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://testyourself.com/iq-test" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="IQ Measurement - Free IQ Test" />
          <meta property="og:description" content="Take our comprehensive free IQ test to discover your intelligence quotient. Get detailed insights into your cognitive abilities across verbal, mathematical, spatial, and logical reasoning. Complete in 8-12 minutes with instant results!" />
          <meta property="og:image" content="https://testyourself.com/iq-test-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/iq-test" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="IQ Measurement - Free IQ Test" />
          <meta name="twitter:description" content="Take our free IQ test to discover your intelligence quotient. Get detailed insights into your cognitive abilities." />
          <meta name="twitter:image" content="https://testyourself.com/iq-test-og-image.jpg" />
        </Head>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sage-600 mx-auto mb-4"></div>
            <p className="text-sage-600 text-lg">Calculating your IQ score...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>IQ Measurement - Free IQ Test | TestYourself</title>
        <meta name="description" content="Take our free IQ test to discover your intelligence quotient. Get detailed insights into your cognitive abilities across verbal, mathematical, spatial, and logical reasoning. Complete in 8-12 minutes!" />
        <meta name="keywords" content="IQ test, intelligence quotient, cognitive test, IQ measurement, intelligence test, cognitive assessment, reasoning test, mental ability test, free IQ test, online IQ test, IQ quiz, intelligence assessment, cognitive ability test, verbal reasoning, mathematical reasoning, spatial reasoning, logical reasoning, IQ score, intelligence measurement, brain test, cognitive evaluation, mental aptitude test, IQ evaluation, intelligence screening" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://testyourself.com/iq-test" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="IQ Measurement - Free IQ Test" />
        <meta property="og:description" content="Take our comprehensive free IQ test to discover your intelligence quotient. Get detailed insights into your cognitive abilities across verbal, mathematical, spatial, and logical reasoning. Complete in 8-12 minutes with instant results!" />
        <meta property="og:image" content="https://testyourself.com/iq-test-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/iq-test" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IQ Measurement - Free IQ Test" />
        <meta name="twitter:description" content="Take our free IQ test to discover your intelligence quotient. Get detailed insights into your cognitive abilities." />
        <meta name="twitter:image" content="https://testyourself.com/iq-test-og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "IQ Measurement - Intelligence Quotient Test",
              "description": "A comprehensive IQ test that helps you discover your intelligence quotient and understand your cognitive abilities across verbal, mathematical, spatial, and logical reasoning.",
              "url": "https://testyourself.com/iq-test",
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "educationalLevel": "beginner",
              "learningResourceType": "assessment",
              "timeRequired": "PT10M",
              "typicalAgeRange": "16-99",
              "about": {
                "@type": "Thing",
                "name": "Intelligence Assessment",
                "description": "IQ testing and cognitive ability assessment"
              },
              "teaches": [
                "Self-awareness",
                "Cognitive assessment",
                "Intelligence measurement",
                "Reasoning abilities",
                "Mental capabilities"
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
                    "name": "What is an IQ test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "An IQ (Intelligence Quotient) test is a standardized assessment designed to measure human intelligence and cognitive abilities across various domains including verbal, mathematical, spatial, and logical reasoning."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate is this IQ test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our IQ test is based on established cognitive assessment principles and provides insights into your intellectual abilities. While no test is 100% accurate, it offers valuable self-discovery insights into your cognitive strengths."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What IQ score ranges are there?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "IQ scores typically range from 60-150, with 100 being average. Scores above 130 are considered very superior, 115-130 superior, 100-115 high average, 85-100 average, 70-85 low average, and below 70 below average."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the IQ test take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The IQ test typically takes about 8-12 minutes to complete. It includes 15 carefully selected questions designed to assess your cognitive abilities across different reasoning domains."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What types of questions are included in the IQ test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our IQ test includes four types of reasoning questions: Verbal reasoning (word analogies, vocabulary, sequences), Mathematical reasoning (arithmetic, geometric sequences, algebra), Spatial reasoning (visual patterns, rotations, symmetry), and Logical reasoning (deductive logic, problem-solving, syllogisms). All questions are text-based for accessibility."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is this IQ test free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our IQ test is completely free. You can take the test, view your results, and get detailed insights into your cognitive abilities at no cost. No registration, payment, or personal information required."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is my IQ score calculated?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Your IQ score is calculated based on your accuracy across all question types and difficulty levels. The scoring system converts your percentage accuracy into an IQ score range (60-150), providing you with a cognitive ability assessment and detailed performance analysis across verbal, mathematical, spatial, and logical reasoning."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I retake the IQ test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, you can retake the IQ test as many times as you like. Each test uses a different random selection of 15 questions from our pool of 80 questions, so you'll get a fresh assessment each time. However, for the most accurate results, we recommend taking it when you're well-rested and focused."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should I do to prepare for the IQ test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No special preparation is needed. For best results, take the test when you're well-rested, in a quiet environment, and have 10-15 minutes of uninterrupted time. Avoid taking the test when tired, stressed, or distracted, as this can affect your performance."
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
                    "name": "IQ Measurement Test",
                    "item": "https://testyourself.com/iq-test"
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
          
          {/* Test Title and Begin Button - Side by Side */}
          <div className="grid md:grid-cols-2 gap-2 mb-2">
            {/* Test Title Box */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 h-full">
                <h1 className="text-xl font-bold text-blue-800 mb-3">
                  IQ Measurement
                </h1>
                <p className="text-blue-600 mb-4 text-lg">
                  Discover your intelligence quotient
                </p>
                
                {/* Test Info */}
                <div className="bg-white rounded-lg px-4 py-3 text-sm text-blue-700 shadow-lg">
                  <div><span className="font-medium">Format:</span> Multiple choice questions</div>
                  <div className="text-blue-500">🧠 Based on cognitive assessment principles</div>
                </div>
              </div>
            </div>

            {/* Begin Button Banner */}
            {!hasBegun ? (
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
            ) : (
              /* Progress Bar - Shows when test has begun */
              <div className="bg-sage-50 rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
              <div className="flex justify-between text-sm text-sage-600 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-sage-200 rounded-full h-2">
                <div 
                  className="bg-sage-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            )}
          </div>

          {/* Question Card - Only show when test has begun */}
          {questions.length > 0 && hasBegun && (
            <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {questions[currentQuestion].category.charAt(0).toUpperCase() + questions[currentQuestion].category.slice(1)} Reasoning
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {questions[currentQuestion].difficulty.charAt(0).toUpperCase() + questions[currentQuestion].difficulty.slice(1)}
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
              {/* What is an IQ Test? Box */}
              <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
                <h4 className="text-xl font-semibold text-sage-800 mb-3">What is an IQ Test?</h4>
                <div className="text-sage-600">
                  <p className="mb-3">An IQ (Intelligence Quotient) test measures your cognitive abilities across four key areas:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Verbal Reasoning:</strong> Language comprehension and word relationships</li>
                    <li><strong>Mathematical Reasoning:</strong> Numerical problem-solving and logic</li>
                    <li><strong>Spatial Reasoning:</strong> Visual and spatial relationship understanding</li>
                    <li><strong>Logical Reasoning:</strong> Pattern recognition and deductive thinking</li>
                  </ul>
                </div>
              </div>
              
              {/* How to Take This Test Box */}
              <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
                <h4 className="text-xl font-semibold text-sage-800 mb-3">How to Take This Test</h4>
                <div className="text-sage-600">
                  <ul className="space-y-2">
                    <li>• {questions.length} questions covering different reasoning types</li>
                    <li>• Choose the best answer for each question</li>
                    <li>• Take your time - accuracy is more important than speed</li>
                    <li>• Takes about 8-12 minutes to complete</li>
                    <li>• Results show your IQ score with detailed analysis</li>
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
