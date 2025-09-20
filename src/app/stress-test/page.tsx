'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomStressQuestions, stressTypes } from '@/lib/stressTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Question {
  id: number;
  question: string;
  options: Array<{
    text: string;
    type: string;
  }>;
}

export default function StressTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [hasBegun, setHasBegun] = useState(false)
  const router = useRouter()

  // Generate random questions when component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await getRandomStressQuestions();
        setQuestions(questions);
      } catch (error) {
        console.error('Error loading stress questions:', error);
      }
    };
    loadQuestions();
  }, [])

  const handleAnswer = (questionId: number, answerType: string) => {
    const newAnswers = { ...answers, [questionId]: answerType }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Show 100% progress bar for a moment before completing
      setTimeout(() => {
        // Calculate stress level
        const result = calculateStressType(newAnswers)
        setIsComplete(true)
        // Navigate to results page with detailed data after a delay
        setTimeout(() => {
          const answersData = encodeURIComponent(JSON.stringify(newAnswers))
          const questionsData = encodeURIComponent(JSON.stringify(questions))
          router.push(`/results/stress-test?type=${result}&answers=${answersData}&questions=${questionsData}`)
        }, 1000)
      }, 800)
    }
  }

  const calculateStressType = (answers: Record<number, string>) => {
    const counts = { Low: 0, Medium: 0, High: 0 }
    
    Object.values(answers).forEach(answer => {
      counts[answer as keyof typeof counts]++
    })

    // Determine stress level based on highest score
    const maxScore = Math.max(counts.Low, counts.Medium, counts.High)
    if (counts.High === maxScore) return 'High'
    if (counts.Medium === maxScore) return 'Medium'
    return 'Low'
  }

  const beginTest = () => {
    setHasBegun(true)
  }

  if (!hasBegun) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Stress Evaluation - Free Stress Level Assessment | TestYourself</title>
          <meta name="description" content="Take our free stress evaluation test to assess your stress levels and learn effective coping strategies. Get detailed insights into your stress management and personalized recommendations. Complete in 5-10 minutes!" />
          <meta name="keywords" content="stress evaluation, stress test, stress assessment, stress management, stress levels, coping strategies, stress analysis, mental health, stress patterns" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://testyourself.com/stress-test" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Stress Evaluation - Free Stress Level Assessment" />
          <meta property="og:description" content="Take our free stress evaluation test to assess your stress levels and learn effective coping strategies. Get detailed insights into your stress management and personalized recommendations." />
          <meta property="og:image" content="https://testyourself.com/stress-evaluation-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/stress-test" />
          <meta property="og:type" content="website" />
          
          {/* Twitter Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Stress Evaluation - Free Stress Level Assessment" />
          <meta name="twitter:description" content="Take our free stress evaluation test to assess your stress levels and learn effective coping strategies. Get detailed insights into your stress management and personalized recommendations." />
          <meta name="twitter:image" content="https://testyourself.com/stress-evaluation-og-image.jpg" />

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Quiz",
                "name": "Stress Evaluation - Stress Level Assessment",
                "description": "A comprehensive stress evaluation that helps you assess your stress levels and learn effective coping strategies for better mental health and well-being.",
                "url": "https://testyourself.com/stress-test",
                "provider": {
                  "@type": "Organization",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
                },
                "educationalLevel": "beginner",
                "learningResourceType": "assessment",
                "timeRequired": "PT5M",
                "typicalAgeRange": "16-99",
                "about": {
                  "@type": "Thing",
                  "name": "Stress Assessment",
                  "description": "Stress level evaluation and coping strategy assessment"
                },
                "teaches": [
                  "Stress awareness",
                  "Stress management",
                  "Coping strategies",
                  "Mental health awareness",
                  "Stress patterns"
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
                    "name": "Stress Level Questions",
                    "description": "Questions about stress triggers, coping mechanisms, and stress response patterns"
                  }
                ],
                "mainEntity": {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is stress evaluation?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Stress evaluation is an assessment that helps identify your current stress levels, stress triggers, and coping mechanisms. It provides insights into your stress patterns and offers personalized recommendations for stress management."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does the stress evaluation work?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The stress evaluation presents you with questions about your stress levels, triggers, and coping strategies. Based on your responses, it categorizes your stress level as Low, Medium, or High and provides personalized insights and recommendations."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What stress levels can be identified?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The evaluation identifies three stress levels: Low (healthy stress management), Medium (moderate stress with some areas for improvement), and High (significant stress requiring attention and coping strategies)."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can stress levels change over time?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, stress levels can change based on life circumstances, events, and the effectiveness of your coping strategies. Regular evaluation helps track changes and adjust stress management approaches accordingly."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long does the stress evaluation take?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The stress evaluation typically takes about 5 minutes to complete. It includes questions about your stress triggers, coping mechanisms, and stress response patterns to provide a comprehensive assessment."
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
                      "name": "Stress Evaluation",
                      "item": "https://testyourself.com/stress-test"
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
              
              {/* Test Title Box */}
              <div className="mb-2">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-5 w-full">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="text-center lg:text-left">
                      <h1 className="text-2xl font-bold text-green-800 mb-2">Stress Evaluation</h1>
                      <p className="text-green-600 text-lg">Evaluate your stress levels and learn effective coping strategies</p>
                    </div>
                    <button
                      onClick={beginTest}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex-shrink-0"
                    >
                      Begin Stress Evaluation
                    </button>
                  </div>
                </div>
              </div>

              {/* Test Information */}
              <div className="bg-white rounded-2xl shadow-lg p-5 mb-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">About This Evaluation</h2>
                <p className="text-gray-600 mb-2">
                  This comprehensive stress evaluation will help you understand your current stress levels, 
                  identify stress triggers, and learn effective coping strategies. The assessment covers various 
                  aspects of stress including work, relationships, health, and daily life challenges.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-green-600">15</div>
                    <div className="text-gray-600 text-sm">Questions</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-green-600">5 min</div>
                    <div className="text-gray-600 text-sm">Duration</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-green-600">Free</div>
                    <div className="text-gray-600 text-sm">Assessment</div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl shadow-lg p-5 mb-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 text-sm">•</span>
                    <span className="text-gray-700 text-sm">Your current stress level classification</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 text-sm">•</span>
                    <span className="text-gray-700 text-sm">Personalized stress management recommendations</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 text-sm">•</span>
                    <span className="text-gray-700 text-sm">Identification of your main stress triggers</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 text-sm">•</span>
                    <span className="text-gray-700 text-sm">Effective coping strategies for your stress type</span>
                  </div>
                </div>
              </div>

              {/* How This Test Works */}
              <div className="bg-white rounded-2xl shadow-lg p-5 mb-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How This Test Works</h3>
                <p className="text-gray-600 mb-3">
                  Our stress evaluation uses a scientifically-based approach to assess your stress levels across different areas of life. 
                  You'll answer questions about your stress triggers, coping mechanisms, and daily stress experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600 mb-1">1. Answer Questions</div>
                    <div className="text-gray-600 text-sm">Respond honestly to 15 questions about your stress experiences</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600 mb-1">2. Analysis</div>
                    <div className="text-gray-600 text-sm">Our system analyzes your responses to determine your stress level</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600 mb-1">3. Results</div>
                    <div className="text-gray-600 text-sm">Get personalized insights and actionable recommendations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <Footer />
        </div>
      </>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your stress evaluation...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stress evaluation questions...</p>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = (Object.keys(answers).length / questions.length) * 100
  
  // Shuffle options for current question to prevent systematic bias
  const shuffledOptions = [...currentQ.options].sort(() => Math.random() - 0.5)

  return (
    <>
      <Head>
        <title>Stress Evaluation - Question {currentQuestion + 1} of {questions.length} | TestYourself</title>
        <meta name="description" content="Take the stress evaluation test to assess your stress levels and learn effective coping strategies. Question {currentQuestion + 1} of {questions.length}." />
        <link rel="canonical" href="https://testyourself.com/stress-test" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Stress Evaluation - Question {currentQuestion + 1} of {questions.length}" />
        <meta property="og:description" content="Take the stress evaluation test to assess your stress levels and learn effective coping strategies." />
        <meta property="og:image" content="https://testyourself.com/stress-evaluation-og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/stress-test" />
        
        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stress Evaluation - Question {currentQuestion + 1} of {questions.length}" />
        <meta name="twitter:description" content="Take the stress evaluation test to assess your stress levels and learn effective coping strategies." />
        <meta name="twitter:image" content="https://testyourself.com/stress-evaluation-og-image.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Stress Evaluation - Stress Level Assessment",
              "description": "A comprehensive stress evaluation that helps you assess your stress levels and learn effective coping strategies for better mental health and well-being.",
              "url": "https://testyourself.com/stress-test",
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "educationalLevel": "beginner",
              "learningResourceType": "assessment",
              "timeRequired": "PT5M",
              "typicalAgeRange": "16-99",
              "about": {
                "@type": "Thing",
                "name": "Stress Assessment",
                "description": "Stress level evaluation and coping strategy assessment"
              },
              "teaches": [
                "Stress awareness",
                "Stress management",
                "Coping strategies",
                "Mental health awareness",
                "Stress patterns"
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
                  "name": "Stress Level Questions",
                  "description": "Questions about stress triggers, coping mechanisms, and stress response patterns"
                }
              ],
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is stress evaluation?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Stress evaluation is an assessment that helps identify your current stress levels, stress triggers, and coping mechanisms. It provides insights into your stress patterns and offers personalized recommendations for stress management."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does the stress evaluation work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The stress evaluation presents you with questions about your stress levels, triggers, and coping strategies. Based on your responses, it categorizes your stress level as Low, Medium, or High and provides personalized insights and recommendations."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What stress levels can be identified?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The evaluation identifies three stress levels: Low (healthy stress management), Medium (moderate stress with some areas for improvement), and High (significant stress requiring attention and coping strategies)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can stress levels change over time?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, stress levels can change based on life circumstances, events, and the effectiveness of your coping strategies. Regular evaluation helps track changes and adjust stress management approaches accordingly."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the stress evaluation take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The stress evaluation typically takes about 5 minutes to complete. It includes questions about your stress triggers, coping mechanisms, and stress response patterns to provide a comprehensive assessment."
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
                    "name": "Stress Evaluation",
                    "item": "https://testyourself.com/stress-test"
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
               
               {/* Test Title Box */}
               <div className="text-center mb-2">
                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-5 w-full">
                   <h1 className="text-xl font-bold text-green-800 mb-3">Stress Evaluation - <span className="font-normal">Stress Level Assessment</span></h1>
                   
                   {/* Test Info */}
                   <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                     <span className="font-medium">Format:</span> Multiple choice stress assessment
                     <span className="text-green-500 ml-2">🧘‍♀️ Evaluate your stress levels</span>
                   </div>
                 </div>
               </div>
               
               {/* Progress Bar */}
            <div className="mb-2">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl shadow-lg pt-6 px-6 pb-2 mb-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {currentQ.question}
              </h2>
              
              <div className="space-y-2">
                {shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQ.id, option.type)}
                    className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                  >
                    <span className="text-gray-700">{option.text}</span>
                  </button>
                ))}
              </div>
              
              {/* Previous Question Button - Inside the answers box */}
              {currentQuestion > 0 && (
                <div className="text-center mt-2.5">
                  <button
                    onClick={() => {
                      const newAnswers = { ...answers }
                      delete newAnswers[questions[currentQuestion].id]
                      setAnswers(newAnswers)
                      setCurrentQuestion(currentQuestion - 1)
                    }}
                    className="px-4 py-1 bg-green-200 text-green-700 rounded-lg border-2 border-green-300 hover:bg-green-300 hover:border-green-400 transition-colors"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
