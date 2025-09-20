'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { emotionalIntelligenceQuestions, selectRandomEQQuestions, calculateEQResults, EQQuestion } from '@/data/emotionalIntelligenceTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function EmotionalIntelligenceTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | undefined)[]>([])
  const [showResults, setShowResults] = useState(false)
  const [eqResults, setEqResults] = useState<any>(null)
  const [showReview, setShowReview] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showShareDropdown, setShowShareDropdown] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [needsTopButtons, setNeedsTopButtons] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<EQQuestion[]>([])
  const router = useRouter()
  const reviewRef = useRef<HTMLDivElement>(null)
  const bottomButtonsRef = useRef<HTMLDivElement>(null)

  // Check if bottom buttons are visible in viewport
  const checkBottomButtonsVisibility = () => {
    if (!bottomButtonsRef.current) return false
    
    const rect = bottomButtonsRef.current.getBoundingClientRect()
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
    
    return !isVisible // Show top buttons when bottom buttons are NOT visible
  }

  // Update needsTopButtons when showReview or showShare changes, or when results are shown
  useEffect(() => {
    // Check if we need top buttons whenever we have results (regardless of review/share state)
    if (eqResults) {
      // Use a small delay to ensure DOM is updated
      setTimeout(() => {
        setNeedsTopButtons(checkBottomButtonsVisibility())
      }, 100)
    } else {
      setNeedsTopButtons(false)
    }
  }, [showReview, showShare, eqResults])

  // Add scroll and resize listeners to update button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (eqResults) { // Check whenever we have results
        setNeedsTopButtons(checkBottomButtonsVisibility())
      }
    }

    const handleResize = () => {
      if (eqResults) { // Check whenever we have results
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

  const startTest = () => {
    const questions = selectRandomEQQuestions()
    setSelectedQuestions(questions)
    setShowInstructions(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)

    // Auto-advance to next question
    setTimeout(() => {
      if (currentQuestion < selectedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Test completed
        const results = calculateEQResults(newAnswers, selectedQuestions)
        setEqResults(results)
        
        // Navigate to results page with data
        const resultsData = encodeURIComponent(JSON.stringify(results))
        const answersData = encodeURIComponent(JSON.stringify(newAnswers))
        const questionsData = encodeURIComponent(JSON.stringify(selectedQuestions))
        router.push(`/results/emotional-intelligence?results=${resultsData}&answers=${answersData}&questions=${questionsData}`)
      }
    }, 500)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      // Clear the answer for the current question when going back
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = undefined
      setAnswers(newAnswers)
      
      // Go to previous question
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRetakeTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setEqResults(null)
    setShowReview(false)
    setShowShare(false)
    setShowShareDropdown(false)
    setShowInstructions(true)
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
    const shareText = `I just completed an Emotional Intelligence test! My EQ level: ${eqResults?.overallLevel || 'Check out my results!'} #EmotionalIntelligence #EQTest #TestYourself`
    const shareUrl = window.location.origin + '/emotional-intelligence'
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=800,height=600')
    setShowShareDropdown(false)
  }

  // Save Results functionality
  const saveResults = () => {
    if (!eqResults) return

    const timestamp = new Date().toLocaleString()
    const content = `TestYourself - Emotional Intelligence Test Results
Date: ${timestamp}

Overall Results:
- EQ Level: ${eqResults.overallLevel}
- Overall Score: ${eqResults.totalScore}/5
- Description: ${eqResults.description}

EQ Components:
- Self-Awareness: ${eqResults.selfAwareness}/5
- Self-Regulation: ${eqResults.selfRegulation}/5
- Motivation: ${eqResults.motivation}/5
- Empathy: ${eqResults.empathy}/5
- Social Skills: ${eqResults.socialSkills}/5

Areas for Growth:
${eqResults.areasForGrowth.length > 0 ? eqResults.areasForGrowth.map((area: string) => `- ${area}`).join('\n') : '- Great job! Keep maintaining your EQ skills'}

Key Insights:
${eqResults.insights.map((insight: string) => `- ${insight}`).join('\n')}

Question Review:
${selectedQuestions.map((question, index) => {
  const userAnswer = answers[index]
  const selectedOption = question.options[userAnswer]
  return `Question ${index + 1}: ${question.question}
Your Answer: ${selectedOption?.text || 'Not answered'}
Category: ${question.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
`
}).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `emotional-intelligence-test-results-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Instructions page
  if (showInstructions) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Emotional Intelligence Test - Free EQ Assessment & Analysis | TestYourself</title>
          <meta name="description" content="Test your Emotional Intelligence with our free EQ assessment! Discover your emotional awareness, empathy, self-regulation, and social skills. Get detailed insights into your emotional intelligence." />
          <meta name="keywords" content="emotional intelligence test, EQ test, emotional intelligence assessment, EQ assessment, emotional awareness test, empathy test, social skills test, emotional intelligence quiz" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="TestYourself" />
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://testyourself.com/emotional-intelligence" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Emotional Intelligence Test - Free EQ Assessment & Analysis" />
          <meta property="og:description" content="Test your Emotional Intelligence with our free EQ assessment! Discover your emotional awareness, empathy, self-regulation, and social skills." />
          <meta property="og:image" content="https://testyourself.com/emotional-intelligence-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/emotional-intelligence" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Emotional Intelligence Test - Free EQ Assessment & Analysis" />
          <meta name="twitter:description" content="Test your Emotional Intelligence with our free EQ assessment! Discover your emotional awareness, empathy, self-regulation, and social skills." />
          <meta name="twitter:image" content="https://testyourself.com/emotional-intelligence-og-image.jpg" />
        </Head>
        
        <div className="min-h-screen flex flex-col">
          <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <Header onLogoClick={undefined} />
              
              {/* Test Title Box */}
              <div className="text-center mb-2">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-4 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Column - Title and Test Info */}
                    <div className="lg:col-span-2">
                      <h1 className="text-xl font-bold text-blue-800 mb-2">Emotional Intelligence Test - <span className="font-normal">Discover your EQ level</span></h1>
                      
                      {/* Test Info */}
                      <div className="bg-white rounded-lg px-3 py-2 text-sm text-blue-700 shadow-lg">
                        <span className="font-medium">Format:</span> Multiple choice assessment
                        <span className="text-blue-500 ml-2">🧠 Understand your emotional intelligence</span>
                      </div>
                    </div>
                    
                    {/* Right Column - Button */}
                    <div className="lg:col-span-1 flex items-center justify-center">
                      <button
                        onClick={startTest}
                        className="px-8 py-4 bg-green-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-base whitespace-nowrap w-full lg:w-auto"
                      >
                        Begin EQ Assessment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions Card */}
              <div className="bg-blue-50 rounded-2xl shadow-lg p-6 mb-2">
                <div className="space-y-3 text-gray-600">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">What is Emotional Intelligence?</h3>
                    <p className="text-sm mb-1">
                      Emotional Intelligence (EQ) is the ability to recognize, understand, and manage your own emotions, 
                      as well as recognize and respond appropriately to the emotions of others. It's a crucial skill 
                      for personal relationships, professional success, and overall well-being.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">What This Test Measures</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-2">
                        <h4 className="font-semibold text-blue-600 mb-1">Self-Awareness</h4>
                        <p className="text-sm text-gray-600">Understanding your own emotions, triggers, and emotional patterns</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <h4 className="font-semibold text-green-600 mb-1">Self-Regulation</h4>
                        <p className="text-sm text-gray-600">Managing and controlling your emotional responses effectively</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <h4 className="font-semibold text-purple-600 mb-1">Motivation</h4>
                        <p className="text-sm text-gray-600">Using emotions to drive achievement and maintain optimism</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <h4 className="font-semibold text-orange-600 mb-1">Empathy</h4>
                        <p className="text-sm text-gray-600">Understanding and responding to others' emotions appropriately</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 mt-3">
                      <h4 className="font-semibold text-red-600 mb-1">Social Skills</h4>
                      <p className="text-sm text-gray-600">Building relationships, communicating effectively, and managing conflicts</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">How It Works</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                        <li>Answer 15 carefully crafted questions about emotional situations</li>
                        <li>Choose the response that best reflects your typical behavior</li>
                        <li>Get detailed results across all 5 EQ components</li>
                        <li>Receive personalized insights and improvement suggestions</li>
                        <li>Learn your overall EQ level and areas for growth</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-2 border border-yellow-200">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-1">Important Notes</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700 ml-4">
                        <li>There are no right or wrong answers - be honest about your typical responses</li>
                        <li>This test takes about 5-7 minutes to complete</li>
                        <li>Your results are private and not stored on our servers</li>
                        <li>This is an assessment tool, not a clinical diagnosis</li>
                      </ul>
                    </div>
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

  if (showResults && eqResults) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Emotional Intelligence Test Results - EQ Assessment & Analysis | TestYourself</title>
          <meta name="description" content="View your Emotional Intelligence test results! Discover your EQ level, strengths, and areas for growth. Get detailed insights into your emotional awareness, empathy, and social skills." />
          <meta name="keywords" content="emotional intelligence test results, EQ test results, emotional intelligence assessment, EQ level, emotional awareness, empathy test, social skills assessment, emotional intelligence analysis" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="TestYourself" />
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://testyourself.com/emotional-intelligence" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Emotional Intelligence Test Results - EQ Assessment & Analysis" />
          <meta property="og:description" content="View your Emotional Intelligence test results! Discover your EQ level, strengths, and areas for growth. Get detailed insights into your emotional awareness." />
          <meta property="og:image" content="https://testyourself.com/emotional-intelligence-og-image.jpg" />
          <meta property="og:url" content="https://testyourself.com/emotional-intelligence" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Emotional Intelligence Test Results - EQ Assessment & Analysis" />
          <meta name="twitter:description" content="View your Emotional Intelligence test results! Discover your EQ level, strengths, and areas for growth. Get detailed insights into your emotional awareness." />
          <meta name="twitter:image" content="https://testyourself.com/emotional-intelligence-og-image.jpg" />
          
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Emotional Intelligence Test Results - EQ Assessment",
                "description": "View your Emotional Intelligence test results and discover your EQ level, strengths, and areas for growth.",
                "url": "https://testyourself.com/emotional-intelligence",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
                },
                "about": {
                  "@type": "Thing",
                  "name": "Emotional Intelligence Assessment",
                  "description": "A comprehensive test measuring emotional intelligence across five key components"
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
              
              {/* Results Content - Hide when review or share is shown */}
              {!showReview && !showShare && (
                <>
                  {/* Results Header */}
                  <div className="text-center mb-2 mt-2">
                    <div className="bg-white rounded-2xl shadow-lg p-3 mb-2">
                      <h1 className="text-lg text-sage-600 mb-1 font-bold">
                        Emotional Intelligence Test Results
                      </h1>
                      
                      {/* Overall Score - Two Column Layout */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Left Box - Score */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-5">
                          <div className="text-center">
                            <h2 className="text-lg text-sage-800 mb-3">
                              <span className="font-bold">Your Results</span> - Here's what we discovered about you
                            </h2>
                            <div className="text-4xl font-bold text-blue-600 mb-2">{eqResults.totalScore}/5</div>
                            <div className="text-xl font-semibold text-gray-800">{eqResults.overallLevel}</div>
                          </div>
                        </div>
                        
                        {/* Right Box - Description */}
                        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-5">
                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">What This Means</h3>
                            <p className="text-gray-600 text-sm">{eqResults.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EQ Components and Areas for Growth */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
                    {/* EQ Components */}
                    <div className="lg:col-span-2 bg-sage-50 rounded-2xl shadow-lg p-5">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">EQ Components Breakdown</h3>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{eqResults.selfAwareness}/5</div>
                          <div className="text-sm font-medium text-gray-600">Self-Awareness</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">{eqResults.selfRegulation}/5</div>
                          <div className="text-sm font-medium text-gray-600">Self-Regulation</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">{eqResults.motivation}/5</div>
                          <div className="text-sm font-medium text-gray-600">Motivation</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">{eqResults.empathy}/5</div>
                          <div className="text-sm font-medium text-gray-600">Empathy</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-red-600 mb-1">{eqResults.socialSkills}/5</div>
                          <div className="text-sm font-medium text-gray-600">Social Skills</div>
                        </div>
                      </div>
                    </div>

                    {/* Areas for Growth */}
                    <div className="bg-orange-50 rounded-2xl shadow-lg p-5">
                      <h3 className="text-lg font-semibold text-orange-800 mb-3">Areas for Growth</h3>
                      {eqResults.areasForGrowth.length > 0 ? (
                        <ul className="space-y-2">
                          {eqResults.areasForGrowth.map((area: string, index: number) => (
                            <li key={index} className="text-orange-700 text-sm">• {area}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-orange-600 text-sm">Great job! Keep maintaining your EQ skills</p>
                      )}
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="bg-blue-50 rounded-2xl shadow-lg p-5 mb-0">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Insights</h3>
                    <ul className="space-y-2">
                      {eqResults.insights.map((insight: string, index: number) => (
                        <li key={index} className="text-blue-700 text-sm">• {insight}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Test Title - Show when review or share is shown */}
              {(showReview || showShare) && (
                <div className="text-center mb-2 mt-2">
                  <div className="bg-white rounded-2xl shadow-lg px-2 py-0.5">
                    <h1 className="text-lg font-bold text-gray-800">
                      Emotional Intelligence Test Results - EQ Assessment
                    </h1>
                  </div>
                </div>
              )}

              {/* Share Section */}
              {showShare && !showReview && (
                <div className="bg-purple-50 rounded-2xl shadow-lg p-4 mt-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Share Your Results</h3>
                  <p className="text-gray-600 mb-2 text-center">Choose a platform to share your EQ test results</p>
                  
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

              {/* Question Review */}
              {showReview && (
                <div className="bg-indigo-50 rounded-2xl shadow-lg p-3 mt-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Question Review</h3>
                  <div className="space-y-3">
                    {selectedQuestions.map((question, index) => {
                      const userAnswer = answers[index]
                      const selectedOption = question.options[userAnswer]
                      return (
                        <div key={index} className="bg-white rounded-lg p-2">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded">
                              Q{index + 1}
                            </span>
                            <span className="text-sm text-gray-600">
                              {question.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-800 mb-2">{question.question}</p>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Your Answer:</span> {selectedOption?.text || 'Not answered'}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Action Buttons */}
              <div ref={bottomButtonsRef} className="-mx-4 px-4 pb-2 pt-2">
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
        <title>Emotional Intelligence Test - Free EQ Assessment & Analysis | TestYourself</title>
        <meta name="description" content="Test your Emotional Intelligence with our free EQ assessment! Discover your emotional awareness, empathy, self-regulation, and social skills. Get detailed insights into your emotional intelligence." />
        <meta name="keywords" content="emotional intelligence test, EQ test, emotional intelligence assessment, EQ assessment, emotional awareness test, empathy test, social skills test, emotional intelligence quiz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://testyourself.com/emotional-intelligence" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Emotional Intelligence Test - Free EQ Assessment & Analysis" />
        <meta property="og:description" content="Test your Emotional Intelligence with our free EQ assessment! Discover your emotional awareness, empathy, self-regulation, and social skills." />
        <meta property="og:image" content="https://testyourself.com/emotional-intelligence-og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/emotional-intelligence" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Emotional Intelligence Test - Free EQ Assessment & Analysis" />
        <meta name="twitter:description" content="Test your Emotional Intelligence with our free EQ assessment! Discover your emotional awareness, empathy, self-regulation, and social skills." />
        <meta name="twitter:image" content="https://testyourself.com/emotional-intelligence-og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Emotional Intelligence Test - EQ Assessment",
              "description": "A comprehensive emotional intelligence test that measures your EQ across five key components: self-awareness, self-regulation, motivation, empathy, and social skills.",
              "url": "https://testyourself.com/emotional-intelligence",
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
                "name": "Emotional Intelligence",
                "description": "Emotional awareness, regulation, empathy, and social skills assessment"
              },
              "teaches": [
                "Emotional awareness",
                "Self-regulation",
                "Empathy",
                "Social skills",
                "Emotional intelligence"
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
                  "name": "Self-Awareness Assessment",
                  "description": "Questions about emotional self-awareness and understanding"
                },
                {
                  "@type": "Question",
                  "name": "Self-Regulation Assessment",
                  "description": "Questions about emotional control and management"
                },
                {
                  "@type": "Question",
                  "name": "Empathy Assessment",
                  "description": "Questions about understanding others' emotions"
                },
                {
                  "@type": "Question",
                  "name": "Social Skills Assessment",
                  "description": "Questions about interpersonal relationships and communication"
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
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 w-full">
                <h1 className="text-xl font-bold text-blue-800 mb-3">Emotional Intelligence Test - <span className="font-normal">Discover your EQ level</span></h1>
                
                {/* Test Info */}
                <div className="bg-white rounded-lg px-4 py-3 text-sm text-blue-700 shadow-lg">
                  <span className="font-medium">Format:</span> Multiple choice assessment
                  <span className="text-blue-500 ml-2">🧠 Understand your emotional intelligence</span>
                </div>
              </div>
            </div>

            {/* Test Questions - Only show when questions are selected */}
            {selectedQuestions.length > 0 && (
              <>
                {/* Progress Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Question {currentQuestion + 1} of {selectedQuestions.length}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round((currentQuestion / selectedQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentQuestion / selectedQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-2">
                  <div className="text-center mb-4">
                    <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                      {selectedQuestions[currentQuestion].category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    {selectedQuestions[currentQuestion].question}
                  </h2>
                  
                  {/* Answer Options */}
                  <div className="space-y-3">
                    {selectedQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className="w-full py-1.5 px-3 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-3"></div>
                          <span className="text-gray-700">{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Previous Button */}
                  {currentQuestion > 0 && (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={handlePreviousQuestion}
                        className="py-1.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 font-medium"
                      >
                        ← Previous Question
                      </button>
                    </div>
                  )}
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
