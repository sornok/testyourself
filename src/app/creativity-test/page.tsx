'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomCreativityQuestions, calculateCreativityResults, CreativityQuestion } from '@/lib/creativityTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CreativityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number[]>>({})
  const [answerTimes, setAnswerTimes] = useState<Record<number, number>>({})
  const [questions, setQuestions] = useState<CreativityQuestion[]>([])
  const [randomizedQuestions, setRandomizedQuestions] = useState<CreativityQuestion[]>([])
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
        const questions = await getRandomCreativityQuestions(12);
        setQuestions(questions);
        
        // Randomize options for each question
        const randomizedQuestions = questions.map(question => {
          const options = [...question.options];
          
          // Shuffle the options
          for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
          }
          
          return {
            ...question,
            options: options
          };
        });
        
        setRandomizedQuestions(randomizedQuestions);
      } catch (error) {
        console.error('Error loading creativity questions:', error);
        setError('Failed to load creativity test questions. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [])

  const handleAnswer = (questionId: number, ranking: number[]) => {
    const newAnswers = { ...answers, [questionId]: ranking }
    setAnswers(newAnswers)
    
    // Record answer time
    const currentTime = new Date().getTime()
    setAnswerTimes(prev => ({ ...prev, [questionId]: currentTime }))
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      // Go to previous question without clearing any answers
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  const completeTest = () => {
    setIsComplete(true)
    
    // Calculate results
    const results = calculateCreativityResults(answers, questions)
    
    // Redirect to results page
    const resultsData = encodeURIComponent(JSON.stringify(results))
    const answersData = encodeURIComponent(JSON.stringify(answers))
    const questionsData = encodeURIComponent(JSON.stringify(questions))
    
    window.location.href = `/results/creativity-test?results=${resultsData}&answers=${answersData}&questions=${questionsData}`
  }

  if (isComplete) {
    return (
      <>
        <Head>
          <title>Creativity Explorer - Processing Your Results | TestYourself</title>
          <meta name="description" content="Processing your creativity test results..." />
        </Head>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-purple-600 text-lg">Analyzing your creative patterns...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Creativity Explorer - Free Creative Thinking Assessment | TestYourself</title>
        <meta name="description" content="Discover your creative potential with our comprehensive free creativity test! Assess your innovation, research, practical, bold, collaborative, and intuitive thinking styles through 12 ranking-based scenarios. Get detailed insights into your creative preferences and unlock your creative potential." />
        <meta name="keywords" content="creativity test, creative thinking assessment, innovation test, artistic assessment, creative potential, problem-solving creativity, creative expression, free creativity test, online creativity assessment, creative thinking skills, creative types, innovation preference, research preference, practical creativity, bold creativity, collaborative creativity, intuitive creativity, ranking-based assessment, creative thinking style, creative preferences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="TestYourself" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <link rel="canonical" href="https://testyourself.com/creativity-test" />
        
        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
                  "name": "Creativity Explorer",
                  "item": "https://testyourself.com/creativity-test"
                }
              ]
            })
          }}
        />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Creativity Explorer - Free Creative Thinking Assessment | TestYourself" />
        <meta property="og:description" content="Discover your creative potential with our comprehensive free creativity test! Assess your innovation, research, practical, bold, collaborative, and intuitive thinking styles through 12 ranking-based scenarios." />
        <meta property="og:image" content="https://testyourself.com/creativity-test-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Creativity Explorer - Creative Thinking Assessment" />
        <meta property="og:url" content="https://testyourself.com/creativity-test" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TestYourself" />
        <meta name="twitter:creator" content="@TestYourself" />
        <meta name="twitter:title" content="Creativity Explorer - Free Creative Thinking Assessment" />
        <meta name="twitter:description" content="Discover your creative potential with our comprehensive free creativity test! Assess your innovation, research, practical, bold, collaborative, and intuitive thinking styles." />
        <meta name="twitter:image" content="https://testyourself.com/creativity-test-og-image.jpg" />
        <meta name="twitter:image:alt" content="Creativity Explorer - Creative Thinking Assessment" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Creativity Explorer - Creative Thinking Assessment",
              "description": "A comprehensive creativity test that evaluates your innovation, research, practical, bold, collaborative, and intuitive thinking styles through 12 ranking-based scenarios to discover your unique creative preferences and unlock your creative potential.",
              "url": "https://testyourself.com/creativity-test",
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com",
                "logo": "https://testyourself.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "url": "https://testyourself.com/contact"
                }
              },
              "educationalLevel": "beginner",
              "learningResourceType": "assessment",
              "timeRequired": "PT10M",
              "typicalAgeRange": "16-99",
              "about": {
                "@type": "Thing",
                "name": "Creative Thinking Assessment",
                "description": "Evaluation of creative thinking abilities including innovation, research, practical, bold, collaborative, and intuitive preferences"
              },
              "keywords": [
                "creativity test",
                "creative thinking assessment",
                "innovation test",
                "artistic assessment",
                "creative potential",
                "problem-solving creativity",
                "creative expression",
                "free creativity test",
                "online creativity assessment",
                "creative thinking skills",
                "creative types",
                "innovation preference",
                "research preference",
                "practical creativity",
                "bold creativity",
                "collaborative creativity",
                "intuitive creativity",
                "ranking-based assessment",
                "creative thinking style",
                "creative preferences"
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
                "name": "Take Creativity Test",
                "description": "Start the free creativity assessment"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Students, Professionals, Artists, General Public"
              },
              "educationalUse": "assessment",
              "interactivityType": "active",
              "learningResourceType": "assessment",
              "educationalAlignment": {
                "@type": "AlignmentObject",
                "alignmentType": "teaches",
                "educationalFramework": "creative thinking skills",
                "targetName": "creative development"
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What does the creativity test measure?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our creativity test evaluates six key creative thinking styles: Innovation (original, unconventional ideas), Research (analytical, evidence-based approaches), Practical (functional, real-world solutions), Bold (daring, ambitious choices), Collaborative (team-based, inclusive approaches), and Intuitive (instinct-driven, emotional connections)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the creativity test take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The creativity test typically takes 8-12 minutes to complete. It includes 12 carefully selected questions designed to assess your creative thinking across different scenarios and situations."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What creativity types are identified by this test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The test identifies your creative thinking style as a Specialist (dominant preference), Combination Creative (clear top two preferences), or Balanced Creative (evenly distributed preferences). Your results include detailed percentages for Innovation, Research, Practical, Bold, Collaborative, and Intuitive thinking styles."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is this creativity test free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our creativity test is completely free. You can take the test, view your results, and get detailed insights into your creative thinking style at no cost. No registration, payment, or personal information required."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can creativity be improved?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, creativity can be developed and improved through practice, exposure to diverse experiences, learning new skills, and challenging yourself with creative exercises. Our test provides personalized recommendations for enhancing your creative abilities."
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
                    "name": "Creativity Explorer",
                    "item": "https://testyourself.com/creativity-test"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
      <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto mb-2">
          {/* Header */}
          <Header onLogoClick={undefined} />
          
          {/* Error State */}
          {error && (
            <>
            <Head>
              <title>Creativity Explorer - Error Loading Test | TestYourself</title>
              <meta name="description" content="Error loading creativity test. Please try refreshing the page to access our free creative thinking assessment." />
              <meta name="robots" content="noindex, nofollow" />
            </Head>
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
            </>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <>
            <Head>
              <title>Creativity Explorer - Loading Assessment | TestYourself</title>
              <meta name="description" content="Loading your personalized creativity test with 12 ranking-based scenarios. Discover your innovation, research, practical, bold, collaborative, and intuitive thinking styles." />
              <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">Loading creativity test questions...</p>
                </div>
              </div>
            </div>
            </>
          )}

          {/* Only show test content if not loading, no error, and questions are loaded */}
          {!isLoading && !error && questions.length > 0 && (
            <>
            {/* Dynamic SEO for test progress */}
            {hasBegun && (
              <Head>
                <title>{`Creativity Explorer - Question ${currentQuestion + 1} of ${randomizedQuestions.length} | TestYourself`}</title>
                <meta name="description" content={`Taking the Creativity Explorer test - Question ${currentQuestion + 1} of ${randomizedQuestions.length}. Discover your creative thinking style through ranking-based scenarios assessing Innovation, Research, Practical, Bold, Collaborative, and Intuitive preferences.`} />
                <meta name="robots" content="noindex, nofollow" />
              </Head>
            )}
              {/* Test Title Box - Side by Side Layout for Pre-test */}
              {!hasBegun ? (
            <div className="grid md:grid-cols-3 gap-2 mb-2">
              {/* Test Title Box */}
              <div className="text-center md:col-span-2">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-lg p-6 h-full">
                  <h1 className="text-xl font-bold text-pink-800 mb-3">
                    Creativity Explorer
                  </h1>
                  <p className="text-pink-600 mb-4 text-base">
                    Discover your creative thinking style and unlock your creative potential
                  </p>
                  
                  {/* Test Info */}
                  <div className="bg-white rounded-lg px-4 py-3 text-base text-pink-700 shadow-lg">
                    <div>
                      <span className="font-medium">Time:</span> 8-12 minutes • 
                      <span className="font-medium"> Questions:</span> 12 creativity scenarios
                    </div>
                    <div className="text-pink-500 mt-1">
                      🎨 Explore your creative mind
                    </div>
                  </div>
                </div>
              </div>

        {/* Test Info Box */}
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <div className="text-sm text-gray-600 h-full flex flex-col justify-center text-center">
            <div className="mb-3">
              <p className="mb-2 text-base"><strong>Test Duration:</strong> 8-12 minutes</p>
              <p className="mb-2 text-base"><strong>Questions:</strong> 12 creative scenarios</p>
              <p className="mb-0 text-base"><strong>Format:</strong> Ranking-based assessment</p>
            </div>
                  
                  {/* Begin Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => setHasBegun(true)}
                      className="px-8 py-4 bg-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-base whitespace-nowrap"
                    >
                      Begin Creativity Test
                    </button>
                  </div>
                </div>
              </div>
            </div>

          ) : (
            <>
              {/* Test Title Box - Same as pre-test but without description */}
              <div className="text-center mb-2">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-lg p-6">
                  <h1 className="text-xl font-bold text-pink-800 mb-3">
                    Creativity Explorer
                  </h1>
                  <div className="bg-white rounded-lg px-4 py-3 text-base text-pink-700 shadow-lg">
                    <span className="font-medium">Time:</span> 8-12 minutes • 
                    <span className="font-medium"> Questions:</span> 12 creativity scenarios • 
                    <span className="text-pink-500 ml-2">🎨 Explore your creative mind</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Box */}
              <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">
                    {currentQuestion + 1} of {randomizedQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / randomizedQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Box */}
              <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      {randomizedQuestions[currentQuestion]?.options[0]?.type === 'innovation' && '🎨 Innovation'}
                      {randomizedQuestions[currentQuestion]?.options[0]?.type === 'research' && '🔬 Research'}
                      {randomizedQuestions[currentQuestion]?.options[0]?.type === 'practical' && '⚙️ Practical'}
                      {randomizedQuestions[currentQuestion]?.options[0]?.type === 'bold' && '🚀 Bold'}
                      {randomizedQuestions[currentQuestion]?.options[0]?.type === 'collaborative' && '🤝 Collaborative'}
                      {randomizedQuestions[currentQuestion]?.options[0]?.type === 'intuitive' && '💫 Intuitive'}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {randomizedQuestions[currentQuestion]?.question}
                    </h2>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    Rank these options from most appealing (1) to least appealing (4):
                  </p>
                </div>

                {/* Ranking Options */}
                <div className="space-y-2">
                  {randomizedQuestions[currentQuestion]?.options.map((option, index) => {
                    const currentRanking = answers[randomizedQuestions[currentQuestion].id] || [];
                    const currentRank = currentRanking.indexOf(index) + 1;
                    
                    return (
                      <div key={index} className="relative">
                        <div
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            currentRanking.includes(index)
                              ? 'border-pink-500 bg-pink-50'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                          onClick={() => {
                            const newRanking = [...currentRanking];
                            const existingIndex = newRanking.indexOf(index);
                            
                            if (existingIndex !== -1) {
                              // Remove if already selected
                              newRanking.splice(existingIndex, 1);
                            } else if (newRanking.length < 4) {
                              // Add if not full
                              newRanking.push(index);
                            }
                            
                            handleAnswer(randomizedQuestions[currentQuestion].id, newRanking);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-800">{option.text}</span>
                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                              {currentRank > 0 && (
                                <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-500 text-white text-xs font-bold rounded-full">
                                  {currentRank}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons - Centered */}
                <div className="mt-4 flex justify-center gap-3">
                  {/* Previous Button */}
                  {currentQuestion > 0 && (
                    <button
                      onClick={handlePreviousQuestion}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      ← Previous Question
                    </button>
                  )}

                  {/* Next Question Button - Show when all 4 options are ranked */}
                  {(answers[randomizedQuestions[currentQuestion]?.id] || []).length === 4 && (
                    <button
                      onClick={() => {
                        if (currentQuestion < randomizedQuestions.length - 1) {
                          setCurrentQuestion(currentQuestion + 1);
                        } else {
                          completeTest();
                        }
                      }}
                      className="px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
                    >
                      {currentQuestion < randomizedQuestions.length - 1 ? 'Next Question →' : 'Complete Test →'}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Main Content - Only show on pre-test screen */}
          {!hasBegun && (
            <div className="bg-white rounded-2xl shadow-lg px-4 pt-4 pb-4 mb-2">
              <div className="space-y-3">
                <div className="bg-pink-50 rounded-lg p-2 border border-pink-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-pink-800 mb-2">What This Test Covers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base text-pink-700">
                    <div>
                      <p className="font-medium mb-1">🎨 Innovation</p>
                      <p className="text-sm">Your preference for creating original, unconventional ideas</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">🔬 Research</p>
                      <p className="text-sm">Your preference for analytical, evidence-based approaches</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">⚙️ Practical</p>
                      <p className="text-sm">Your preference for functional, real-world solutions</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">🚀 Bold</p>
                      <p className="text-sm">Your preference for daring, ambitious creative choices</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">🤝 Collaborative</p>
                      <p className="text-sm">Your preference for team-based, inclusive approaches</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">💫 Intuitive</p>
                      <p className="text-sm">Your preference for instinct-driven, emotional connections</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-2 border border-purple-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Your Results Will Include</h3>
                  <ul className="text-base text-purple-700 space-y-1">
                    <li>• <strong>Creative Type:</strong> Your unique creative thinking style (Specialist, Combination, or Balanced)</li>
                    <li>• <strong>Creative Preferences:</strong> Percentage breakdown of all 6 creative types</li>
                    <li>• <strong>Detailed Analysis:</strong> Strengths in each creative dimension</li>
                    <li>• <strong>Personalized Insights:</strong> Areas for creative development</li>
                    <li>• <strong>Question Review:</strong> Complete ranking analysis for all scenarios</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
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
