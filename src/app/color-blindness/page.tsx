'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { colorBlindnessQuestions, calculateColorBlindnessResults, ColorBlindnessQuestion, ColorBlindnessResult } from '@/data/colorBlindnessTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ColorBlindnessTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [hasBegun, setHasBegun] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showShareDropdown, setShowShareDropdown] = useState(false)
  const [colorBlindnessResults, setColorBlindnessResults] = useState<ColorBlindnessResult | null>(null)
  const [randomizedOptions, setRandomizedOptions] = useState<{options: any[], correctIndex: number}[]>([])
  const [needsTopButtons, setNeedsTopButtons] = useState(false)
  const [bottomButtonsRef, setBottomButtonsRef] = useState<HTMLDivElement | null>(null)
  const router = useRouter()

  const checkBottomButtonsVisibility = () => {
    if (!bottomButtonsRef) return false
    
    const rect = bottomButtonsRef.getBoundingClientRect()
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
    
    return !isVisible // Show top buttons when bottom buttons are NOT visible
  }

  // Update needsTopButtons when showReview or showShare changes, or when results are shown
  useEffect(() => {
    // Check if we need top buttons whenever we have results (regardless of review/share state)
    if (colorBlindnessResults) {
      // Use a small delay to ensure DOM is updated
      setTimeout(() => {
        setNeedsTopButtons(checkBottomButtonsVisibility())
      }, 100)
    } else {
      setNeedsTopButtons(false)
    }
  }, [showReview, showShare, colorBlindnessResults])

  // Add scroll and resize listeners to update button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (colorBlindnessResults) { // Check whenever we have results
        setNeedsTopButtons(checkBottomButtonsVisibility())
      }
    }

    const handleResize = () => {
      if (colorBlindnessResults) { // Check whenever we have results
        setNeedsTopButtons(checkBottomButtonsVisibility())
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [showReview, showShare])

  const beginTest = () => {
    // Randomize options for each question
    const randomized = colorBlindnessQuestions.map(question => {
      const options = [...question.options]
      const correctIndex = question.correctAnswer
      const correctOption = options[correctIndex]
      
      // Shuffle the options array
      const shuffledOptions = options.sort(() => Math.random() - 0.5)
      
      // Find the new index of the correct answer
      const newCorrectIndex = shuffledOptions.findIndex(option => option.text === correctOption.text)
      
      return {
        options: shuffledOptions,
        correctIndex: newCorrectIndex
      }
    })
    
    setRandomizedOptions(randomized)
    setHasBegun(true)
  }

  const handleAnswer = (answerIndex: number) => {
    // Convert randomized answer back to original answer index
    const originalAnswerIndex = randomizedOptions[currentQuestion].correctIndex === answerIndex ? 
      colorBlindnessQuestions[currentQuestion].correctAnswer : 
      answerIndex
    
    const newAnswers = [...answers, originalAnswerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < colorBlindnessQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Test completed
      const results = calculateColorBlindnessResults(newAnswers)
      setColorBlindnessResults(results)
      setShowResults(true)
    }
  }

  const handleRetakeTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setShowReview(false)
    setShowShare(false)
    setShowShareDropdown(false)
    setColorBlindnessResults(null)
    setRandomizedOptions([])
    setHasBegun(false)
  }

  const handleReviewToggle = () => {
    if (!showReview) {
      setShowShare(false)
      setShowShareDropdown(false)
    }
    setShowReview(!showReview)
  }

  const handleShareToggle = () => {
    if (!showShare) {
      setShowReview(false)
    }
    setShowShare(!showShare)
    setShowShareDropdown(false)
  }

  const handleXShare = () => {
    const text = `I just took a Color Blindness Test! My results: ${colorBlindnessResults?.accuracy}% accuracy - ${colorBlindnessResults?.colorBlindnessType} color vision. Take the test at:`
    const url = 'https://testyourself.com/color-blindness'
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(xUrl, '_blank')
  }

  const handleFacebookShare = () => {
    const url = 'https://testyourself.com/color-blindness'
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank')
  }

  const handleLinkedInShare = () => {
    const text = `I just took a Color Blindness Test! My results: ${colorBlindnessResults?.accuracy}% accuracy - ${colorBlindnessResults?.colorBlindnessType} color vision.`
    const url = 'https://testyourself.com/color-blindness'
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedinUrl, '_blank')
  }

  const saveResults = () => {
    if (!colorBlindnessResults) return

    const fileContent = `Color Blindness Test Results
Generated on: ${new Date().toLocaleDateString()}

Test Summary:
- Total Questions: ${colorBlindnessResults.totalQuestions}
- Correct Answers: ${colorBlindnessResults.totalScore}
- Accuracy: ${colorBlindnessResults.accuracy}%
- Color Vision Type: ${colorBlindnessResults.colorBlindnessType}
- Severity: ${colorBlindnessResults.severity}

Description:
${colorBlindnessResults.description}

Recommendations:
${colorBlindnessResults.recommendations.map(rec => `- ${rec}`).join('\n')}

Key Insights:
${colorBlindnessResults.insights.map(insight => `- ${insight}`).join('\n')}

Question Review:
${answers.map((answer, index) => {
  const question = colorBlindnessQuestions[index]
  const selectedOption = question.options[answer]
  const isCorrect = answer === question.correctAnswer
  return `Question ${index + 1}: ${question.question}
Your Answer: ${selectedOption.text} ${isCorrect ? '(Correct)' : '(Incorrect)'}
Correct Answer: ${question.options[question.correctAnswer].text}
Explanation: ${question.explanation}
`
}).join('\n')}

---
Generated by TestYourself - Free Online Tests & Assessments
`

    const blob = new Blob([fileContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `color-blindness-test-results-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!hasBegun) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Color Blindness Test - Free Ishihara Test & Analysis | TestYourself</title>
          <meta name="description" content="Test your color vision with our free color blindness test! Take the Ishihara test to check for color vision deficiency. Get detailed analysis of your color perception abilities." />
          <meta name="keywords" content="color blindness test, Ishihara test, color vision test, color deficiency test, color perception test, free color blindness test, color vision deficiency" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="TestYourself" />
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://testyourself.com/color-blindness" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Color Blindness Test - Free Ishihara Test & Analysis" />
          <meta property="og:description" content="Test your color vision with our free color blindness test! Take the Ishihara test to check for color vision deficiency." />
          <meta property="og:image" content="https://testyourself.com/color-blindness-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/color-blindness" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Color Blindness Test - Free Ishihara Test & Analysis" />
          <meta name="twitter:description" content="Test your color vision with our free color blindness test! Take the Ishihara test to check for color vision deficiency." />
          <meta name="twitter:image" content="https://testyourself.com/color-blindness-og-image.jpg" />
          
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Color Blindness Test - Free Ishihara Test & Analysis",
                "description": "Test your color vision with our free color blindness test! Take the Ishihara test to check for color vision deficiency.",
                "url": "https://testyourself.com/color-blindness",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
                },
                "about": {
                  "@type": "Quiz",
                  "name": "Color Blindness Test - Ishihara Test",
                  "description": "A comprehensive color vision test using Ishihara plates to detect color blindness and color vision deficiency.",
                  "provider": {
                    "@type": "Organization",
                    "name": "TestYourself",
                    "url": "https://testyourself.com"
                  },
                  "educationalLevel": "beginner",
                  "learningResourceType": "assessment",
                  "timeRequired": "PT3M",
                  "numberOfQuestions": 15,
                  "about": {
                    "@type": "Thing",
                    "name": "Color Vision Assessment",
                    "description": "Test for color blindness and color vision deficiency"
                  }
                },
                "provider": {
                  "@type": "Organization",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
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
              
              {/* Test Title and Info Boxes */}
              <div className="text-center mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Main Title Box */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Color Blindness Test</h1>
                    <p className="text-gray-600 text-sm">Discover your color vision abilities with our comprehensive Ishihara test</p>
                  </div>

                  {/* Test Info Box */}
                  <div className="bg-white rounded-lg p-3 shadow-lg">
                    <div className="text-sm text-gray-600">
                      <p className="mb-2"><strong>Test Duration:</strong> 1-3 minutes</p>
                      <p className="mb-2"><strong>Questions:</strong> 15 Ishihara plates</p>
                      <p><strong>Purpose:</strong> Detect color vision deficiency</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-white rounded-2xl shadow-lg px-6 pt-6 pb-2 mb-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Test</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">What is Color Blindness?</h3>
                    <p className="text-gray-600 text-sm">
                      Color blindness (color vision deficiency) is the inability to distinguish certain colors. 
                      The most common type is red-green color blindness, affecting about 8% of men and 0.5% of women.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">What This Test Measures</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h4 className="font-semibold text-blue-800 mb-1">Ishihara Plates</h4>
                        <p className="text-blue-700 text-sm">Classic color vision test using colored dots</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="font-semibold text-green-800 mb-1">Color Discrimination</h4>
                        <p className="text-green-700 text-sm">Ability to distinguish between colors</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h4 className="font-semibold text-purple-800 mb-1">Vision Type</h4>
                        <p className="text-purple-700 text-sm">Normal, protanopia, deuteranopia, etc.</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <h4 className="font-semibold text-orange-800 mb-1">Severity Level</h4>
                        <p className="text-orange-700 text-sm">None, mild, moderate, or severe</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">How It Works</h3>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Look at each Ishihara plate carefully</li>
                        <li>• Identify the number or pattern you see</li>
                        <li>• Select your answer from the options</li>
                        <li>• Complete all 15 plates for accurate results</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Important Notes</h3>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• This is a screening test, not a diagnosis</li>
                        <li>• Results may vary with screen settings</li>
                        <li>• Consult an eye care professional for definitive results</li>
                        <li>• Ensure good lighting and screen quality</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4 mb-1">
                  <button
                    onClick={beginTest}
                    className="px-8 py-4 bg-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-base"
                  >
                    Begin Color Blindness Test
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Component */}
          <Footer />
        </div>
      </>
    )
  }

  if (showResults && colorBlindnessResults) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Color Blindness Test Results - Ishihara Test Analysis | TestYourself</title>
          <meta name="description" content="View your color blindness test results! Discover your color vision type, accuracy, and get detailed analysis of your color perception abilities." />
          <meta name="keywords" content="color blindness test results, Ishihara test results, color vision test results, color deficiency results, color perception analysis" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="TestYourself" />
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://testyourself.com/color-blindness" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Color Blindness Test Results - Ishihara Test Analysis" />
          <meta property="og:description" content="View your color blindness test results! Discover your color vision type and get detailed analysis of your color perception abilities." />
          <meta property="og:image" content="https://testyourself.com/color-blindness-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/color-blindness" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Color Blindness Test Results - Ishihara Test Analysis" />
          <meta name="twitter:description" content="View your color blindness test results! Discover your color vision type and get detailed analysis of your color perception abilities." />
          <meta name="twitter:image" content="https://testyourself.com/color-blindness-og-image.jpg" />
          
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Color Blindness Test Results - Ishihara Test Analysis",
                "description": "View your color blindness test results and discover your color vision type and abilities.",
                "url": "https://testyourself.com/color-blindness",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
                },
                "about": {
                  "@type": "Thing",
                  "name": "Color Vision Assessment",
                  "description": "A comprehensive test measuring color vision and detecting color blindness"
                },
                "provider": {
                  "@type": "Organization",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
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
              
              {/* Top Action Buttons - Only show when page is scrollable */}
              {needsTopButtons && (
                <div className="-mx-4 px-4 pt-2">
                  <div className="bg-gray-50 rounded-2xl shadow-lg p-2">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handleShareToggle}
                        className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                      >
                        {showShare ? '🔒 Hide Share' : '📤 Share Results'}
                      </button>
                      <button
                        onClick={handleReviewToggle}
                        className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                      >
                        {showReview ? '🔒 Hide Review' : '📋 Show Review'}
                      </button>
                      <button
                        onClick={saveResults}
                        className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                      >
                        💾 Save Results
                      </button>
                      <button
                        onClick={handleRetakeTest}
                        className="px-8 py-3 bg-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                      >
                        🔄 Retake Test
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Test Title */}
              <div className="text-center mb-2 mt-2">
                <div className="bg-white rounded-2xl shadow-lg px-2 py-0.5">
                  <h1 className="text-lg font-bold text-gray-800">
                    Color Blindness Test Results
                  </h1>
                </div>
              </div>

              {/* Results Content - Hide when review or share is shown */}
              {!showReview && !showShare && (
                <>
                  {/* Results Header */}
                  <div className="text-center mb-2 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {/* Overall Score */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-5">
                        <div className="text-center">
                          <h2 className="text-lg text-purple-800 mb-3">
                            <span className="font-bold">Your Results</span> - Here's what we discovered about your color vision
                          </h2>
                          <div className="text-4xl font-bold text-purple-600 mb-2">{colorBlindnessResults.accuracy}%</div>
                          <div className="text-xl font-semibold text-gray-800">{colorBlindnessResults.colorBlindnessType}</div>
                          <div className="text-sm text-gray-600 mt-2">{colorBlindnessResults.severity} Color Vision</div>
                        </div>
                      </div>

                      {/* Professional Consultation Info */}
                      <div className="bg-blue-50 rounded-2xl shadow-lg p-5">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-blue-800 mb-3">Important Note</h3>
                          <p className="text-blue-700 text-sm mb-3">
                            This is a screening test using 15 Ishihara plates. While it can detect color vision issues, it cannot accurately determine specific types of color blindness.
                          </p>
                          <p className="text-blue-700 text-sm font-medium">
                            For accurate diagnosis and specific type determination, please consult an eye care professional.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Test Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <div className="bg-blue-50 rounded-2xl shadow-lg p-5">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">Test Performance</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Correct Answers:</span>
                          <span className="font-semibold text-blue-800">{colorBlindnessResults.totalScore}/{colorBlindnessResults.totalQuestions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Accuracy:</span>
                          <span className="font-semibold text-blue-800">{colorBlindnessResults.accuracy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Color Vision Type:</span>
                          <span className="font-semibold text-blue-800">{colorBlindnessResults.colorBlindnessType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-2xl shadow-lg p-5">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">What This Means</h3>
                      <p className="text-gray-600 text-sm">{colorBlindnessResults.description}</p>
                    </div>
                  </div>

                  {/* Recommendations and Key Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-0">
                    <div className="bg-orange-50 rounded-2xl shadow-lg p-5">
                      <h3 className="text-lg font-semibold text-orange-800 mb-3">Recommendations</h3>
                      <ul className="space-y-2">
                        {colorBlindnessResults.recommendations.map((recommendation: string, index: number) => (
                          <li key={index} className="text-orange-700 text-sm">• {recommendation}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-2xl shadow-lg p-5">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3">Key Insights</h3>
                      <ul className="space-y-2">
                        {colorBlindnessResults.insights.map((insight: string, index: number) => (
                          <li key={index} className="text-purple-700 text-sm">• {insight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {/* Share Section */}
              {showShare && !showReview && (
                <div className="bg-purple-50 rounded-2xl shadow-lg p-2 mb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Share Your Results</h3>
                  <p className="text-gray-600 mb-2 text-center">Choose a platform to share your test results</p>
                  
                  <div className="flex justify-start">
                    <button
                      onClick={handleXShare}
                      className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-2xl shadow-lg transition-colors flex items-center"
                    >
                      <span className="text-2xl mr-3">𝕏</span>
                      <div>
                        <div className="font-semibold text-blue-800">X.com</div>
                        <div className="text-sm text-blue-600">Share on X</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Review Section */}
              {showReview && (
                <div className="bg-blue-50 rounded-2xl shadow-lg p-4 mt-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Question Review</h3>
                  <p className="text-gray-600 mb-4 text-center">Review your answers and see explanations for each question</p>
                  
                  <div className="space-y-4">
                    {answers.map((answer, index) => {
                      const question = colorBlindnessQuestions[index]
                      const selectedOption = question.options[answer]
                      const isCorrect = answer === question.correctAnswer
                      const correctOption = question.options[question.correctAnswer]
                      
                      return (
                        <div key={index} className="bg-white rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">Question {index + 1}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{question.question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="text-sm font-medium text-gray-700 mb-1">Your Answer:</div>
                              <div className="text-gray-800">{selectedOption.text}</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="text-sm font-medium text-gray-700 mb-1">Correct Answer:</div>
                              <div className="text-gray-800">{correctOption.text}</div>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm font-medium text-blue-800 mb-1">Explanation:</div>
                            <div className="text-blue-700 text-sm">{question.explanation}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Action Buttons */}
              <div ref={setBottomButtonsRef} className="-mx-4 px-4 pb-2 pt-2">
                <div className="bg-gray-50 rounded-2xl shadow-lg p-2">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleShareToggle}
                      className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                      {showShare ? '🔒 Hide Share' : '📤 Share Results'}
                    </button>
                    <button
                      onClick={handleReviewToggle}
                      className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                      {showReview ? '🔒 Hide Review' : '📋 Show Review'}
                    </button>
                    <button
                      onClick={saveResults}
                      className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                      💾 Save Results
                    </button>
                    <button
                      onClick={handleRetakeTest}
                      className="px-8 py-3 bg-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                      🔄 Retake Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Component */}
          <Footer />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Color Blindness Test - Free Ishihara Test & Analysis | TestYourself</title>
        <meta name="description" content="Test your color vision with our free color blindness test! Take the Ishihara test to check for color vision deficiency. Get detailed analysis of your color perception abilities." />
        <meta name="keywords" content="color blindness test, Ishihara test, color vision test, color deficiency test, color perception test, free color blindness test, color vision deficiency" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="TestYourself" />
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://testyourself.com/color-blindness" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Color Blindness Test - Free Ishihara Test & Analysis" />
        <meta property="og:description" content="Test your color vision with our free color blindness test! Take the Ishihara test to check for color vision deficiency." />
        <meta property="og:image" content="https://testyourself.com/color-blindness-og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/color-blindness" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Color Blindness Test - Free Ishihara Test & Analysis" />
        <meta name="twitter:description" content="Test your color vision with our free color blindness test! Take the Ishihara test to check for color vision deficiency." />
        <meta name="twitter:image" content="https://testyourself.com/color-blindness-og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Color Blindness Test - Free Ishihara Test & Analysis",
              "description": "Test your color vision with our free color blindness test! Take the Ishihara test to check for color vision deficiency.",
              "url": "https://testyourself.com/color-blindness",
              "isPartOf": {
                "@type": "WebSite",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "about": {
                "@type": "Quiz",
                "name": "Color Blindness Test - Ishihara Test",
                "description": "A comprehensive color vision test using Ishihara plates to detect color blindness and color vision deficiency.",
                "provider": {
                  "@type": "Organization",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
                },
                "educationalLevel": "beginner",
                "learningResourceType": "assessment",
                "timeRequired": "PT3M",
                "numberOfQuestions": 15,
                "about": {
                  "@type": "Thing",
                  "name": "Color Vision Assessment",
                  "description": "Test for color blindness and color vision deficiency"
                }
              },
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
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
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 w-full">
                <h1 className="text-xl font-bold text-purple-800 mb-3">Color Blindness Test - <span className="font-normal">Ishihara Color Vision Assessment</span></h1>
                
                {/* Test Info */}
                <div className="bg-white rounded-lg px-4 py-3 text-sm text-purple-700 shadow-lg">
                  <span className="font-medium">Format:</span> Ishihara plate identification
                  <span className="text-purple-500 ml-2">🌈 Test your color vision</span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestion + 1} of {colorBlindnessQuestions.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round((currentQuestion / colorBlindnessQuestions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestion / colorBlindnessQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                {colorBlindnessQuestions[currentQuestion].question}
              </h2>
              
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Image */}
                <div className="flex justify-center">
                  <img 
                    src={colorBlindnessQuestions[currentQuestion].image}
                    alt={`Ishihara Plate ${currentQuestion + 1}`}
                    className="w-64 h-64 rounded-lg object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500" style={{display: 'none'}}>
                    <span className="text-sm">Ishihara Plate {currentQuestion + 1}</span>
                  </div>
                </div>
                
                {/* Right Column - Answer Options */}
                <div className="space-y-3">
                  {randomizedOptions[currentQuestion]?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full py-4 px-3 text-left bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-3"></div>
                        <span className="text-gray-700">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Component */}
        <Footer />
      </div>
    </>
  )
}
