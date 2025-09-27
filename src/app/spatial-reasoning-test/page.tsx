'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomSpatialReasoningQuestions, calculateSpatialReasoningScore } from '@/lib/spatialReasoningTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: string;
  explanation: string;
}

export default function SpatialReasoningTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [hasBegun, setHasBegun] = useState(false)
  const [shuffledOptions, setShuffledOptions] = useState<Record<number, string[]>>({})
  const router = useRouter()

  // Generate random questions when component mounts
  useEffect(() => {
    const loadQuestions = () => {
      try {
        const questions = getRandomSpatialReasoningQuestions();
        setQuestions(questions);
        
        // Shuffle options for each question
        const shuffled: Record<number, string[]> = {};
        questions.forEach(question => {
          const options = [...question.options];
          // Fisher-Yates shuffle
          for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
          }
          shuffled[question.id] = options;
        });
        setShuffledOptions(shuffled);
      } catch (error) {
        console.error('Error loading spatial reasoning questions:', error);
      }
    };
    loadQuestions();
  }, [])

  const handleAnswer = (questionId: number, answerText: string) => {
    const newAnswers = { ...answers, [questionId]: answerText }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Show 100% progress bar for a moment before completing
      setTimeout(() => {
        // Calculate spatial reasoning score
        const result = calculateSpatialReasoningScore(newAnswers, questions)
        setIsComplete(true)
        // Navigate to results page with detailed data after a delay
        setTimeout(() => {
          const answersData = encodeURIComponent(JSON.stringify(newAnswers))
          const questionsData = encodeURIComponent(JSON.stringify(questions))
          const resultsData = encodeURIComponent(JSON.stringify(result))
          router.push(`/results/spatial-reasoning-test?answers=${answersData}&questions=${questionsData}&results=${resultsData}`)
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
          <title>Spatial Reasoning Test - Free 3D Visualization Assessment | TestYourself</title>
          <meta name="description" content="Test your spatial reasoning skills with our free assessment. Discover your 3D visualization abilities and spatial thinking patterns. Complete in 8-12 minutes!" />
          <meta name="keywords" content="spatial reasoning test, 3D visualization test, mental rotation test, spatial thinking, geometric reasoning, spatial awareness, cognitive assessment" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="TestYourself" />
          <meta name="publisher" content="TestYourself" />
          <meta name="language" content="en" />
          <meta name="revisit-after" content="7 days" />
          <link rel="canonical" href="https://testyourself.com/spatial-reasoning-test" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Spatial Reasoning Test - Free 3D Visualization Assessment" />
          <meta property="og:description" content="Test your spatial reasoning skills with our free assessment. Discover your 3D visualization abilities and spatial thinking patterns." />
          <meta property="og:image" content="https://testyourself.com/spatial-reasoning-og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Spatial Reasoning Test - 3D Visualization Assessment" />
          <meta property="og:url" content="https://testyourself.com/spatial-reasoning-test" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@testyourself" />
          <meta name="twitter:creator" content="@testyourself" />
          <meta name="twitter:title" content="Spatial Reasoning Test - Free 3D Visualization Assessment" />
          <meta name="twitter:description" content="Test your spatial reasoning skills with our free assessment. Discover your 3D visualization abilities and spatial thinking patterns." />
          <meta name="twitter:image" content="https://testyourself.com/spatial-reasoning-og-image.jpg" />
          <meta name="twitter:image:alt" content="Spatial Reasoning Test - 3D Visualization Assessment" />
        </Head>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sage-600 mx-auto mb-4"></div>
            <p className="text-sage-600 text-lg">Calculating your spatial reasoning score...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Spatial Reasoning Test - Free 3D Visualization Assessment | TestYourself</title>
        <meta name="description" content="Test your spatial reasoning skills with our free assessment. Discover your 3D visualization abilities and spatial thinking patterns. Complete in 8-12 minutes!" />
        <meta name="keywords" content="spatial reasoning test, 3D visualization test, mental rotation test, spatial thinking, geometric reasoning, spatial awareness, cognitive assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="TestYourself" />
        <meta name="publisher" content="TestYourself" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://testyourself.com/spatial-reasoning-test" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Spatial Reasoning Test - Free 3D Visualization Assessment" />
        <meta property="og:description" content="Test your spatial reasoning skills with our free assessment. Discover your 3D visualization abilities and spatial thinking patterns." />
        <meta property="og:image" content="https://testyourself.com/spatial-reasoning-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Spatial Reasoning Test - 3D Visualization Assessment" />
        <meta property="og:url" content="https://testyourself.com/spatial-reasoning-test" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@testyourself" />
        <meta name="twitter:creator" content="@testyourself" />
        <meta name="twitter:title" content="Spatial Reasoning Test - Free 3D Visualization Assessment" />
        <meta name="twitter:description" content="Test your spatial reasoning skills with our free assessment. Discover your 3D visualization abilities and spatial thinking patterns." />
        <meta name="twitter:image" content="https://testyourself.com/spatial-reasoning-og-image.jpg" />
        <meta name="twitter:image:alt" content="Spatial Reasoning Test - 3D Visualization Assessment" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Spatial Reasoning Test - 3D Visualization Assessment",
              "description": "A comprehensive spatial reasoning test that evaluates your 3D visualization abilities, mental rotation skills, and spatial thinking patterns through geometric and spatial relationship questions.",
              "url": "https://testyourself.com/spatial-reasoning-test",
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
                "name": "Spatial Reasoning Assessment",
                "description": "3D visualization and spatial thinking evaluation"
              },
              "teaches": [
                "Spatial reasoning",
                "3D visualization",
                "Mental rotation",
                "Geometric thinking",
                "Spatial relationships"
              ],
              "inLanguage": "en",
              "isAccessibleForFree": true,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "potentialAction": {
                "@type": "TakeAction",
                "name": "Take Spatial Reasoning Test",
                "description": "Start the free spatial reasoning assessment"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Students, Professionals, General Public"
              },
              "educationalUse": "Assessment",
              "interactivityType": "active",
              "educationalAlignment": {
                "@type": "AlignmentObject",
                "alignmentType": "teaches",
                "educationalFramework": "Cognitive Assessment",
                "targetName": "Spatial Reasoning Skills"
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is spatial reasoning?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Spatial reasoning is the ability to understand, manipulate, and reason about spatial relationships and 3D objects. It involves mental rotation, visualization, and understanding geometric concepts."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is spatial reasoning tested?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Spatial reasoning is tested through questions about mental rotation, 2D/3D visualization, spatial relationships, and geometric reasoning. These assess your ability to manipulate objects in your mind and understand spatial concepts."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are the benefits of good spatial reasoning?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Good spatial reasoning skills are valuable in fields like engineering, architecture, design, and science. They help with problem-solving, navigation, and understanding complex spatial relationships."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can spatial reasoning be improved?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, spatial reasoning can be improved through practice with puzzles, 3D modeling, drawing, and spatial exercises. Regular practice with geometric problems and visualization tasks can enhance these skills."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the spatial reasoning test take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The spatial reasoning test typically takes about 8-12 minutes to complete. It includes 15 questions covering mental rotation, 2D/3D visualization, spatial relationships, and geometric reasoning."
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
                    "name": "Spatial Reasoning Test",
                    "item": "https://testyourself.com/spatial-reasoning-test"
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
                Spatial Reasoning Test
              </h1>
              <p className="text-green-600 mb-4 text-lg">
                Test your 3D visualization abilities
              </p>
              
              {/* Test Info */}
              <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                <span className="font-medium">Format:</span> Multiple choice questions
                <span className="text-green-500 ml-2">🧠 Based on cognitive assessment principles</span>
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
              <h2 className="text-xl font-semibold text-sage-800 mb-4 text-center">
                {questions[currentQuestion].question}
              </h2>
              
              {/* Category and Difficulty Badges */}
              <div className="flex justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {questions[currentQuestion].category}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {questions[currentQuestion].difficulty}
                </span>
              </div>
              
              <div className="space-y-4">
                {shuffledOptions[questions[currentQuestion].id]?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option)}
                    className="w-full px-4 py-2 text-left border-2 border-sage-200 rounded-xl hover:border-sage-400 hover:bg-sage-100 transition-all duration-200 group"
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
            <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column: What is Spatial Reasoning? */}
                <div>
                  <h4 className="text-xl font-semibold text-sage-800 mb-3">What is Spatial Reasoning?</h4>
                  <div className="text-sage-600">
                    <p className="mb-3">Spatial reasoning is the ability to understand, manipulate, and reason about spatial relationships and 3D objects. It involves:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Mental Rotation:</strong> Visualizing objects from different angles</li>
                      <li><strong>2D/3D Visualization:</strong> Understanding spatial relationships</li>
                      <li><strong>Spatial Relationships:</strong> Understanding relative positions</li>
                      <li><strong>Geometric Reasoning:</strong> Working with shapes and patterns</li>
                    </ul>
                  </div>
                </div>
                
                {/* Right Column: How to Take This Test */}
                <div>
                  <h4 className="text-xl font-semibold text-sage-800 mb-3">How to Take This Test</h4>
                  <div className="text-sage-600">
                    <ul className="space-y-2">
                      <li>• {questions.length} questions about spatial reasoning</li>
                      <li>• Choose the best answer for each question</li>
                      <li>• Think carefully about spatial relationships</li>
                      <li>• Takes about 8-12 minutes to complete</li>
                      <li>• Results show your spatial reasoning level</li>
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
