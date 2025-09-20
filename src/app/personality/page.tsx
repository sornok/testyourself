'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomPersonalityQuestions, personalityTypes } from '@/lib/personalityTest'
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

export default function PersonalityTest() {
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
        const questions = await getRandomPersonalityQuestions();
        setQuestions(questions);
      } catch (error) {
        console.error('Error loading personality questions:', error);
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
        // Calculate personality type
        const result = calculatePersonalityType(newAnswers)
        setIsComplete(true)
        // Navigate to results page with detailed data after a delay
        setTimeout(() => {
          const answersData = encodeURIComponent(JSON.stringify(newAnswers))
          const questionsData = encodeURIComponent(JSON.stringify(questions))
          router.push(`/results/personality?type=${result}&answers=${answersData}&questions=${questionsData}`)
        }, 1000)
      }, 800)
    }
  }

  const calculatePersonalityType = (answers: Record<number, string>) => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
    
    Object.values(answers).forEach(answer => {
      counts[answer as keyof typeof counts]++
    })

    const type = 
      (counts.E > counts.I ? 'E' : 'I') +
      (counts.S > counts.N ? 'S' : 'N') +
      (counts.T > counts.F ? 'T' : 'F') +
      (counts.J > counts.P ? 'J' : 'P')

    return type
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
          <title>Character Assessment - Free MBTI Personality Test | TestYourself</title>
          <meta name="description" content="Take our free MBTI-style personality test to discover your character type. Get detailed insights into your personality traits, preferences, and behavior patterns. Complete in 5-10 minutes!" />
          <meta name="keywords" content="personality test, MBTI test, character assessment, personality type, Myers-Briggs, personality quiz, self-discovery, psychological test, personality traits" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://testyourself.com/personality" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Character Assessment - Free MBTI Personality Test" />
          <meta property="og:description" content="Take our free MBTI-style personality test to discover your character type. Get detailed insights into your personality traits, preferences, and behavior patterns." />
          <meta property="og:image" content="https://testyourself.com/personality-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/personality" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Character Assessment - Free MBTI Personality Test" />
          <meta name="twitter:description" content="Take our free MBTI-style personality test to discover your character type. Get detailed insights into your personality traits, preferences, and behavior patterns." />
          <meta name="twitter:image" content="https://testyourself.com/personality-og-image.jpg" />
        </Head>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sage-600 mx-auto mb-4"></div>
            <p className="text-sage-600 text-lg">Calculating your personality type...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Character Assessment - Free MBTI Personality Test | TestYourself</title>
        <meta name="description" content="Take our free MBTI-style personality test to discover your character type. Get detailed insights into your personality traits, preferences, and behavior patterns. Complete in 5-10 minutes!" />
        <meta name="keywords" content="personality test, MBTI test, character assessment, personality type, Myers-Briggs, personality quiz, self-discovery, psychological test, personality traits" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://testyourself.com/personality" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Character Assessment - Free MBTI Personality Test" />
        <meta property="og:description" content="Take our free MBTI-style personality test to discover your character type. Get detailed insights into your personality traits, preferences, and behavior patterns." />
        <meta property="og:image" content="https://testyourself.com/personality-og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/personality" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Character Assessment - Free MBTI Personality Test" />
        <meta name="twitter:description" content="Take our free MBTI-style personality test to discover your character type. Get detailed insights into your personality traits, preferences, and behavior patterns." />
        <meta name="twitter:image" content="https://testyourself.com/personality-og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Character Assessment - MBTI Personality Test",
              "description": "A comprehensive MBTI-style personality test that helps you discover your character type and understand your personality traits, preferences, and behavior patterns.",
              "url": "https://testyourself.com/personality",
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
                "name": "Personality Assessment",
                "description": "MBTI-style personality testing and character assessment"
              },
              "teaches": [
                "Self-awareness",
                "Personality understanding",
                "Character traits",
                "Behavioral patterns",
                "Personal preferences"
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
                    "name": "What is the MBTI personality test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The MBTI (Myers-Briggs Type Indicator) is a personality assessment that categorizes people into 16 different personality types based on four key dimensions: Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate are personality tests?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Personality tests provide insights into your character traits and behavioral patterns. While they offer valuable self-reflection, they should be used as a starting point for understanding yourself rather than definitive labels. Results can vary based on mood and context."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What personality types are there?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "There are 16 personality types based on combinations of four dimensions. Examples include INTJ (Architect), ENFP (Campaigner), ISTJ (Logistician), and ENTP (Debater). Each type has unique characteristics, strengths, and preferences."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can my personality type change over time?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "While your core personality traits tend to remain relatively stable, some aspects may evolve with life experiences, personal growth, and conscious development. The test reflects your current preferences and tendencies."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the personality test take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The personality test typically takes about 5 minutes to complete. It includes questions about your preferences, behaviors, and reactions to various situations to determine your personality type."
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
                    "name": "Personality Test",
                    "item": "https://testyourself.com/personality"
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
            <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
              <h1 className="text-xl font-bold text-green-800 mb-3">
                Character Assessment
              </h1>
              <p className="text-green-600 mb-4 text-lg">
                Discover your personality type
              </p>
              
              {/* Test Info */}
              <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                <span className="font-medium">Format:</span> Multiple choice questions
                <span className="text-green-500 ml-2">🧠 Based on psychological principles</span>
              </div>
            </div>
          </div>

          {/* Begin Button Banner */}
          {!hasBegun ? (
            <div className="text-center mb-2">
              <div className="bg-yellow-50 rounded-2xl shadow-lg p-4">
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
            <div className="bg-sage-50 rounded-2xl shadow-lg p-4 mb-2">
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

          {/* Question Card - Only show when test has begun */}
          {questions.length > 0 && hasBegun && (
            <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
              <h2 className="text-xl font-semibold text-sage-800 mb-4 text-center">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option.type)}
                    className="w-full px-4 py-2 text-left border-2 border-sage-200 rounded-xl hover:border-sage-400 hover:bg-sage-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-sage-300 rounded-full mr-4 group-hover:border-sage-500 transition-colors"></div>
                      <span className="text-sage-700 group-hover:text-sage-800 transition-colors">
                        {option.text}
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
            <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column: What is the MBTI Test? */}
                <div>
                  <h4 className="text-xl font-semibold text-sage-800 mb-3">What is the MBTI Test?</h4>
                  <div className="text-sage-600">
                    <p className="mb-3">The Myers-Briggs Type Indicator (MBTI) categorizes people into 16 personality types based on four dimensions:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Extraversion (E) vs Introversion (I):</strong> How you gain energy</li>
                      <li><strong>Sensing (S) vs Intuition (N):</strong> How you process information</li>
                      <li><strong>Thinking (T) vs Feeling (F):</strong> How you make decisions</li>
                      <li><strong>Judging (J) vs Perceiving (P):</strong> How you approach structure</li>
                    </ul>
                  </div>
                </div>
                
                {/* Right Column: How to Take This Test */}
                <div>
                  <h4 className="text-xl font-semibold text-sage-800 mb-3">How to Take This Test</h4>
                  <div className="text-sage-600">
                    <ul className="space-y-2">
                      <li>• {questions.length} questions about your personality preferences</li>
                      <li>• Choose the option that best describes you</li>
                      <li>• No right or wrong answers - be honest about yourself</li>
                      <li>• Takes about 5-10 minutes to complete</li>
                      <li>• Results show your MBTI type with detailed descriptions</li>
                    </ul>
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
