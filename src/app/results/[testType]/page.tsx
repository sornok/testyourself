'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Head from 'next/head'
import { personalityTypes } from '@/lib/personalityTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ResultsPage() {
  const { testType } = useParams()
  const searchParams = useSearchParams()
  const [showShareDropdown, setShowShareDropdown] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [needsTopButtons, setNeedsTopButtons] = useState(false)
  const bottomButtonsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const opticalReviewRef = useRef<HTMLDivElement>(null)
  const memoryReviewRef = useRef<HTMLDivElement>(null)
  const triviaReviewRef = useRef<HTMLDivElement>(null)

  // Extract data for review sections
  const questions = JSON.parse(searchParams.get('questions') || '[]')
  const answers = JSON.parse(searchParams.get('answers') || '{}')
  const illusions = JSON.parse(searchParams.get('illusions') || '[]')
  const challenges = JSON.parse(searchParams.get('challenges') || '[]')

  // Update needsTopButtons when showReview or showShare changes, or when results are shown
  useEffect(() => {
    // Check if we need top buttons whenever we have results (regardless of review/share state)
    const hasResults = questions.length > 0 || Object.keys(answers).length > 0
    if (showReview || showShare || (!showReview && !showShare && hasResults)) {
      // Use a small delay to ensure DOM is updated
      setTimeout(() => {
        setNeedsTopButtons(checkBottomButtonsVisibility())
      }, 100)
    } else {
      setNeedsTopButtons(false)
    }
  }, [showReview, showShare, questions, answers])

  // Add scroll and resize listeners to update button visibility
  useEffect(() => {
    const handleScroll = () => {
      const hasResults = questions.length > 0 || Object.keys(answers).length > 0
      if (showReview || showShare || (!showReview && !showShare && hasResults)) {
        setNeedsTopButtons(checkBottomButtonsVisibility())
      }
    }

    const handleResize = () => {
      const hasResults = questions.length > 0 || Object.keys(answers).length > 0
      if (showReview || showShare || (!showReview && !showShare && hasResults)) {
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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My TestYourself Results',
          text: '',
          url: ''
        })
        return
      }
    } catch (error) {
      console.log('Native share failed')
    }

    // Fallback - just show a message
    showNotification('Choose a platform from the popup to share your results!')
  }

  const handleReviewToggle = () => {
    if (!showReview) {
      // When showing review, hide share
      setShowShare(false)
    }
    setShowReview(!showReview)
  }

  const handleShareToggle = () => {
    if (!showShare) {
      // When showing share, hide review
      setShowReview(false)
    }
    setShowShare(!showShare)
  }

  // Check if bottom buttons are visible in viewport
  const checkBottomButtonsVisibility = () => {
    if (!bottomButtonsRef.current) return false
    
    const rect = bottomButtonsRef.current.getBoundingClientRect()
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
    
    return !isVisible // Show top buttons when bottom buttons are NOT visible
  }

  // Generate share content based on test type
  const getShareContent = () => {
    const baseUrl = window.location.origin
    const testName = (testType as string).charAt(0).toUpperCase() + (testType as string).slice(1).replace('-', ' ')
    
    let title = ''
    let description = ''
    let hashtags = '#TestYourself #SelfDiscovery'
    
    switch (testType) {
      case 'personality':
        title = 'I just discovered my personality type!'
        description = 'Take the personality test and discover your MBTI type. Find out what makes you unique!'
        hashtags = '#PersonalityTest #MBTI #SelfDiscovery #TestYourself'
        break
      case 'trivia':
        title = 'I just tested my general knowledge!'
        description = 'How much do you know? Take this trivia quiz and challenge yourself!'
        hashtags = '#TriviaQuiz #GeneralKnowledge #TestYourself #Quiz'
        break
      case 'optical-illusion':
        title = 'I just tested my visual perception!'
        description = 'Discover how your brain processes images with these optical illusions!'
        hashtags = '#OpticalIllusion #VisualPerception #BrainTest #TestYourself'
        break
      case 'memory':
        title = 'I just tested my memory skills!'
        description = 'Challenge your memory with sequence tests and see how well you remember!'
        hashtags = '#MemoryTest #BrainTraining #MemorySkills #TestYourself'
        break
      case 'typing':
        title = 'I just tested my typing speed!'
        description = 'How fast can you type? Test your speed and accuracy with this typing challenge!'
        hashtags = '#TypingTest #TypingSpeed #TestYourself #Skills'
        break
      default:
        title = 'I just took an amazing test!'
        description = 'Discover more about yourself with these fun and insightful tests!'
        hashtags = '#TestYourself #SelfDiscovery'
    }
    
    return {
      url: `${baseUrl}/${testType}`,
      title,
      description,
      hashtags,
      text: `${title} ${description} ${hashtags}`
    }
  }

  const handleFacebookShare = () => {
    // Facebook sharing disabled - requires live site
    alert('Facebook sharing will be available when the site is live!')
  }

  const handleTwitterShare = () => {
    const content = getShareContent()
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.text)}&url=${encodeURIComponent(content.url)}`
    window.open(url, '_blank', 'width=800,height=600')
  }

  const showNotification = (message: string) => {
    // Create a custom notification instead of using alert
    const notification = document.createElement('div')
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      font-family: system-ui, sans-serif;
      font-size: 14px;
    `
    document.body.appendChild(notification)
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 3000)
  }

  const renderPersonalityResults = () => {
    const type = searchParams.get('type')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const questions = JSON.parse(searchParams.get('questions') || '[]')
    const personality = personalityTypes[type as string]

    if (!personality) {
      return (
        <div className="text-center">
          <p className="text-sage-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {/* Main Result */}
        <div className="text-center">
          <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
            <h1 className="text-xl text-sage-800 mb-2">
              <span className="font-bold">Your Results</span> - Here's what we discovered about you
            </h1>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-500 rounded-full text-white text-xl font-bold">
                {type}
              </div>
              <h2 className="text-xl font-bold text-sage-800">
                {personality.name}
              </h2>
            </div>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              {personality.description}
            </p>
          </div>
        </div>

        {/* Traits */}
        <div className="bg-sage-50 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-sage-800 mb-2">Your Traits</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {personality.traits.map((trait: string, index: number) => (
              <div key={index} className="bg-white rounded-lg py-2 px-3 text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                <span className="text-sage-700 font-medium text-sm">{trait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-mint-50 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-mint-600 mb-2">Strengths</h3>
            <ul className="space-y-2">
              {personality.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-mint-500 mr-3">✓</span>
                  <span className="text-sage-700 text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-lavender-50 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-lavender-600 mb-2">Areas for Growth</h3>
            <ul className="space-y-2">
              {personality.weaknesses.map((weakness: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-lavender-500 mr-3">•</span>
                  <span className="text-sage-700 text-sm">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const renderTriviaResults = () => {
    const score = parseInt(searchParams.get('score') || '0', 10) || 0
    const speed = searchParams.get('speed') || 'Unknown'
    const correct = parseInt(searchParams.get('correct') || '0', 10) || 0
    const total = parseInt(searchParams.get('total') || '0', 10) || 0
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const questions = JSON.parse(searchParams.get('questions') || '[]')

    if (score === 0 && total === 0) {
      return (
        <div className="text-center">
          <p className="text-sage-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {/* Main Result */}
        <div className="text-center">
          <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
            <h1 className="text-xl text-sage-800 mb-2">
              <span className="font-bold">Your Results</span> - Here's what we discovered about you
            </h1>
            <div className="text-xl mb-2">🎯</div>
            <h2 className="text-xl font-bold text-green-800 mb-2">
              {score}%
            </h2>
            <p className="text-xl text-green-600 mb-2">
              {correct} out of {total} correct
            </p>
            <p className="text-lg text-gray-700">
              {speed}
            </p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-purple-50 rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Quiz Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold text-green-800 mb-2">{score}%</h4>
              <p className="text-green-600 font-medium">Accuracy</p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold text-blue-800 mb-2">{correct}/{total}</h4>
              <p className="text-blue-600 font-medium">Correct Answers</p>
            </div>
            <div className="bg-purple-50 border-2 border-gray-300 rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold text-purple-800 mb-2">{speed}</h4>
              <p className="text-purple-600 font-medium">Speed Rating</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderOpticalIllusionResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const illusions = JSON.parse(searchParams.get('illusions') || '[]')
    
    return (
      <div className="space-y-2">
        {/* Main Result */}
        <div className="text-center">
          <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
            <h1 className="text-xl text-sage-800 mb-2">
              <span className="font-bold">Your Results</span> - Here's what we discovered about you
            </h1>
            <div className="text-xl mb-2">👁️</div>
            <h2 className="text-xl font-bold text-sage-800 mb-2">
              {results.overallType || 'Visual Perceiver'}
            </h2>
            <p className="text-sage-600">
              Your visual perception reveals unique insights about your cognitive style
            </p>
          </div>
        </div>

        {/* Overall Results */}
        <div className="bg-sage-50 rounded-2xl p-8 border border-sage-200">
          
          {/* Personality Traits */}
          {results.personalityTraits && Object.keys(results.personalityTraits).length > 0 && (
            <div className="mb-2">
              <h3 className="text-xl font-semibold text-sage-800 mb-2">Your Visual Processing Style</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(results.personalityTraits).map(([trait, count], index) => (
                  <div key={index} className="rounded-lg p-4 border border-sage-200" style={{backgroundColor: '#fefcff'}}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sage-700">{trait}</span>
                      <span className="text-sm text-sage-500">{Number(count) || 0} times</span>
                    </div>
                    <div className="w-full bg-sage-200 rounded-full h-2">
                      <div 
                        className="bg-sage-500 h-2 rounded-full"
                        style={{ width: `${results.totalQuestions > 0 ? Math.round((Number(count) / Number(results.totalQuestions)) * 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights */}
          {results.insights && results.insights.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-sage-800 mb-2">Key Insights</h3>
              <div className="space-y-2">
                {results.insights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sage-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderMemoryResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const challenges = JSON.parse(searchParams.get('challenges') || '[]')
    
    return (
      <div className="space-y-2">
        {/* Main Result */}
        <div className="text-center">
          <div className="bg-sage-50 rounded-2xl shadow-lg p-6 mb-2">
            <h1 className="text-xl text-sage-800 mb-2">
              <span className="font-bold">Your Results</span> - Here's what we discovered about you
            </h1>
            <div className="text-xl mb-2">🧩</div>
            <h2 className="text-xl font-bold text-sage-800 mb-2">
              {results.performance || 'Memory Performance'}
            </h2>
            <p className="text-sage-600 mb-2">
              Your memory skills performance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-sage-800 mb-2">
                  {Number(results.memoryScore) || 0}%
                </h3>
                <p className="text-sage-600 font-medium text-lg">Challenge Score</p>
                <p className="text-sage-500 text-sm mt-1">
                  {Number(results.totalCorrect) || 0} out of {Number(results.totalItems) || 0} challenges completed
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-sage-800 mb-2">
                  {Number(results.detailedAccuracy) || 0}%
                </h3>
                <p className="text-sage-600 font-medium text-lg">Detailed Accuracy</p>
                <p className="text-sage-500 text-sm mt-1">
                  {Number(results.totalCorrectItems) || 0} out of {Number(results.totalDetailedItems) || 0} items correct
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights - Separate Box */}
        {results.insights && results.insights.length > 0 && (
          <div className="bg-sage-50 rounded-2xl p-8 border border-sage-200">
            <h3 className="text-xl font-semibold text-sage-800 mb-2">Key Insights</h3>
            <div className="space-y-2">
              {results.insights.map((insight: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sage-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderOtherResults = () => {
    return (
      <div className="space-y-2">
        <div className="text-center">
          <h2 className="text-xl font-bold text-sage-800 mb-2">
            Test Complete!
          </h2>
          <p className="text-sage-600">
            Results for {testType} test will be displayed here.
          </p>
        </div>
      </div>
    )
  }

  // Dynamic SEO content based on test type
  const getSEOContent = () => {
    const baseUrl = 'https://testyourself.com'
    
    switch (testType) {
      case 'personality':
        return {
          title: 'Character Assessment Results - Free MBTI Personality Test | TestYourself',
          description: 'View your detailed MBTI personality test results! Discover your character type, personality traits, and behavioral patterns. Get insights into your personality preferences and cognitive style.',
          keywords: 'personality test results, MBTI results, character assessment results, personality type, Myers-Briggs results, personality analysis, character traits',
          ogTitle: 'Character Assessment Results - MBTI Personality Test',
          ogDescription: 'View your detailed MBTI personality test results! Discover your character type, personality traits, and behavioral patterns.',
          ogImage: `${baseUrl}/personality-results-og-image.jpg`,
          canonical: `${baseUrl}/results/personality`
        }
      case 'trivia':
        return {
          title: 'Trivia Quiz Results - Free Knowledge Test Results | TestYourself',
          description: 'Check your trivia quiz results! See your knowledge test score, accuracy, and speed performance. Discover which topics you excel in and areas for improvement.',
          keywords: 'trivia quiz results, knowledge test results, quiz score, general knowledge results, trivia performance, quiz accuracy',
          ogTitle: 'Trivia Quiz Results - Knowledge Test Results',
          ogDescription: 'Check your trivia quiz results! See your knowledge test score, accuracy, and speed performance.',
          ogImage: `${baseUrl}/trivia-results-og-image.jpg`,
          canonical: `${baseUrl}/results/trivia`
        }
      case 'optical-illusion':
        return {
          title: 'Optical Illusion Test Results - Visual Perception Analysis | TestYourself',
          description: 'Explore your optical illusion test results! Understand how your brain processes visual information and discover your cognitive style. Learn about your visual perception patterns.',
          keywords: 'optical illusion results, visual perception results, cognitive test results, visual processing, brain test results, perception analysis',
          ogTitle: 'Optical Illusion Test Results - Visual Perception Analysis',
          ogDescription: 'Explore your optical illusion test results! Understand how your brain processes visual information and discover your cognitive style.',
          ogImage: `${baseUrl}/optical-illusion-results-og-image.jpg`,
          canonical: `${baseUrl}/results/optical-illusion`
        }
      case 'memory':
        return {
          title: 'Memory Challenge Results - Cognitive Memory Assessment | TestYourself',
          description: 'Review your memory challenge results! Analyze your short-term memory capacity, sequence memorization skills, and cognitive performance. Track your memory improvement.',
          keywords: 'memory test results, memory challenge results, cognitive memory results, short-term memory, memory capacity, sequence memory results',
          ogTitle: 'Memory Challenge Results - Cognitive Memory Assessment',
          ogDescription: 'Review your memory challenge results! Analyze your short-term memory capacity, sequence memorization skills, and cognitive performance.',
          ogImage: `${baseUrl}/memory-results-og-image.jpg`,
          canonical: `${baseUrl}/results/memory`
        }
      default:
        return {
          title: 'Test Results - Free Online Assessment Results | TestYourself',
          description: 'View your test results and performance analysis! Get detailed insights into your performance across various cognitive and personality assessments.',
          keywords: 'test results, assessment results, performance analysis, cognitive test results, personality test results',
          ogTitle: 'Test Results - Online Assessment Results',
          ogDescription: 'View your test results and performance analysis! Get detailed insights into your performance across various assessments.',
          ogImage: `${baseUrl}/test-results-og-image.jpg`,
          canonical: `${baseUrl}/results/${testType}`
        }
    }
  }

  const seoContent = getSEOContent()

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{seoContent.title}</title>
        <meta name="description" content={seoContent.description} />
        <meta name="keywords" content={seoContent.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={seoContent.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={seoContent.ogTitle} />
        <meta property="og:description" content={seoContent.ogDescription} />
        <meta property="og:image" content={seoContent.ogImage} />
        <meta property="og:url" content={seoContent.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoContent.ogTitle} />
        <meta name="twitter:description" content={seoContent.ogDescription} />
        <meta name="twitter:image" content={seoContent.ogImage} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": seoContent.ogTitle,
              "description": seoContent.description,
              "url": seoContent.canonical,
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "about": {
                "@type": "Thing",
                "name": testType === 'personality' ? 'Personality Assessment Results' :
                       testType === 'trivia' ? 'Trivia Quiz Results' :
                       testType === 'optical-illusion' ? 'Visual Perception Results' :
                       testType === 'memory' ? 'Memory Assessment Results' :
                       'Test Results',
                "description": seoContent.description
              },
              "mainEntity": {
                "@type": "Quiz",
                "name": seoContent.ogTitle,
                "description": seoContent.description,
                "url": seoContent.canonical
              },
              "inLanguage": "en",
              "isAccessibleForFree": true
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
      <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header onLogoClick={undefined} />
        
        {/* Top Action Buttons - Only show when content is tall enough to need scrolling */}
        {needsTopButtons && (
          <div className="-mx-4 px-4 pt-2">
            <div className="bg-gray-50 rounded-2xl shadow-lg p-2">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleShareToggle}
                  className="px-8 py-3 bg-sage-500 text-white rounded-full font-medium hover:bg-sage-600 transition-all duration-300"
                >
                  {showShare ? 'Hide Share' : 'Share Results'}
                </button>
                <button
                  onClick={handleReviewToggle}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300"
                >
                  {showReview ? 'Hide Review' : 'Show Review'}
                </button>
                <button
                  onClick={() => router.push(`/${testType}`)}
                  className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all duration-300"
                >
                  {testType === 'typing' ? 'Try Another Challenge' : 'Retake Test'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Content - Hide when review or share is shown */}
        {!showReview && !showShare && (
          <div className="mt-2">
            {testType === 'personality' ? renderPersonalityResults() : 
             testType === 'trivia' ? renderTriviaResults() : 
             testType === 'optical-illusion' ? renderOpticalIllusionResults() :
             testType === 'memory' ? renderMemoryResults() :
             renderOtherResults()}
          </div>
        )}


        {/* Test Title - Show when review or share is shown */}
        {(showReview || showShare) && (
          <div className={`text-center mb-2 ${needsTopButtons ? 'mt-2' : 'mt-4'}`}>
            <div className="bg-white rounded-2xl shadow-lg px-2 py-0.5">
              <h1 className="text-lg font-bold text-gray-800">
                {testType === 'personality' ? 'Character Assessment Results' :
                 testType === 'trivia' ? 'Trivia Quiz Results' :
                 testType === 'memory' ? 'Memory Test Results' :
                 testType === 'optical-illusion' ? 'Optical Illusion Test Results' :
                 'Test Results'}
              </h1>
            </div>
          </div>
        )}

        {/* Review Sections - All test types */}
        {showReview && (
          <>
            {/* Character Assessment Review */}
            {testType === 'personality' && questions.length > 0 && (
              <div ref={triviaReviewRef} className="bg-sage-50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-sage-800 mb-2 text-center">Question Review</h3>
                <div className="space-y-4">
                  {questions.map((question: any, index: number) => {
                    const userAnswer = answers[question.id]
                    const userAnswerText = userAnswer ? question.options.find((opt: any) => opt.type === userAnswer)?.text : 'No answer'
                    
                    return (
                      <div key={question.id} className="border border-sage-200 rounded-xl p-4 bg-sage-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                                Question {index + 1}
                              </span>
                            </div>
                            <h4 className="text-xl font-semibold text-sage-800 mb-2">
                              {question.question}
                            </h4>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-base font-medium text-sage-600 mb-1">Your Answer:</p>
                          <div className="p-2 rounded-lg border border-sage-200 text-lg text-sage-800" style={{backgroundColor: '#fefcff'}}>
                            {userAnswerText}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Trivia Test Review */}
            {testType === 'trivia' && questions.length > 0 && (
              <div ref={triviaReviewRef} className="bg-purple-50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-2 text-center">Question Review</h3>
                <div className="space-y-4">
                  {questions.map((question: any, index: number) => {
                    const userAnswer = answers[question.id]
                    const isCorrect = userAnswer === question.correct
                    const userAnswerText = userAnswer === -1 ? 'No answer' : question.options[userAnswer]
                    const correctAnswerText = question.options[question.correct]
                    
                    return (
                      <div key={question.id} className={`border-2 rounded-xl p-4 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                                Q{index + 1}
                              </span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                {question.category}
                              </span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                              {question.question}
                            </h4>
                          </div>
                          <div className={`text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? '✅' : '❌'}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-base font-medium text-gray-600 mb-2">Your Answer:</p>
                            <div className={`p-3 rounded-lg text-lg ${
                              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {userAnswerText}
                            </div>
                          </div>
                          <div>
                            <p className="text-base font-medium text-gray-600 mb-2">Correct Answer:</p>
                            <div className="p-3 rounded-lg bg-green-100 text-green-800 text-lg">
                              {correctAnswerText}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Optical Illusion Test Review */}
            {testType === 'optical-illusion' && illusions.length > 0 && (
              <div ref={opticalReviewRef} className="bg-sage-50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-sage-800 mb-2 text-center">Question Review</h3>
                <div className="space-y-4">
                  {illusions.map((illusion: any, index: number) => {
                    const userAnswer = answers[illusion.id]
                    return (
                      <div key={illusion.id} className="border border-sage-200 rounded-xl p-4 bg-sage-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                                Question {index + 1}
                              </span>
                            </div>
                            <h4 className="text-lg font-semibold text-sage-800 mb-2">
                              {illusion.title}
                            </h4>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="bg-sage-50 rounded-2xl p-4 border-2 border-sage-200">
                            <div className="flex justify-center">
                              <img 
                                src={illusion.image} 
                                alt={illusion.title}
                                className="max-w-full h-auto max-h-36 rounded-lg shadow-lg"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-base font-medium text-sage-600 mb-2">Your Answer:</p>
                          <div className="p-3 rounded-lg border border-sage-200 text-lg text-sage-800" style={{backgroundColor: '#fefcff'}}>
                            {userAnswer ? userAnswer.text : 'No answer'}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Memory Test Review */}
            {testType === 'memory' && challenges.length > 0 && (
              <div ref={memoryReviewRef} className="bg-purple-50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-sage-800 mb-2 text-center">Challenge Review</h3>
                <div className="space-y-4">
                  {challenges.map((challenge: any, index: number) => {
                    const userAnswer = answers[challenge.id]
                    const isCorrect = userAnswer && userAnswer.correct
                    
                    return (
                      <div key={challenge.id} className={`border-2 rounded-xl p-4 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                                Challenge {index + 1}
                              </span>
                            </div>
                            <h4 className="text-xl font-semibold text-sage-800 mb-2">
                              {challenge.title}
                            </h4>
                          </div>
                          <div className={`text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? '✅' : '❌'}
                          </div>
                        </div>
                        
                        {/* Item-level accuracy */}
                        <div className="mb-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-sage-600">Item Accuracy:</span>
                            <span className="text-sm font-bold text-sage-800">
                              {userAnswer ? (() => {
                                const userSeq = userAnswer.userSequence || [];
                                const correctSeq = challenge.sequence;
                                let correctItems = 0;
                                for (let i = 0; i < Math.min(correctSeq.length, userSeq.length); i++) {
                                  if (correctSeq[i] === userSeq[i]) correctItems++;
                                }
                                return `${correctItems}/${correctSeq.length}`;
                              })() : '0/0'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-base font-medium text-sage-600 mb-2">Your Answer:</p>
                            <div className="p-3 rounded-lg text-xl">
                              {userAnswer && userAnswer.userSequence ? (
                                <div className="flex flex-wrap gap-1">
                                  {userAnswer.userSequence.map((item: any, index: number) => {
                                    const correctSeq = challenge.sequence;
                                    const isItemCorrect = index < correctSeq.length && item === correctSeq[index];
                                    return (
                                      <span 
                                        key={index}
                                        className={`px-2 py-1 rounded ${
                                          isItemCorrect 
                                            ? 'bg-green-200 text-green-800' 
                                            : 'bg-red-200 text-red-800'
                                        }`}
                                      >
                                        {item}
                                      </span>
                                    );
                                  })}
                                </div>
                              ) : (
                                <span className="text-gray-500">No answer</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-base font-medium text-sage-600 mb-2">Correct Answer:</p>
                            <div className="p-3 rounded-lg bg-green-100 text-green-800 text-xl">
                              {challenge.sequence.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Share Section - Show when share is toggled (but not when review is shown) */}
        {showShare && !showReview && (
          <div className="bg-purple-50 rounded-2xl shadow-lg p-2 mb-2">
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Share Your Results</h3>
            <p className="text-gray-600 mb-2 text-center">Choose a platform to share your test results</p>
            
            <div className="flex justify-start">
              <button
                onClick={handleTwitterShare}
                className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-2xl shadow-lg transition-colors flex items-center"
              >
                <span className="text-2xl mr-3">🐦</span>
                <div>
                  <div className="font-semibold text-blue-800">Twitter</div>
                  <div className="text-sm text-blue-600">Share on Twitter</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Action Buttons - Always visible at the bottom */}
        <div ref={bottomButtonsRef} className={`-mx-4 px-4 pb-2 ${showShare && !showReview ? 'pt-0' : 'pt-2'}`}>
          <div className="bg-gray-50 rounded-2xl shadow-lg p-2">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleShareToggle}
                className="px-8 py-3 bg-sage-500 text-white rounded-full font-medium hover:bg-sage-600 transition-all duration-300"
              >
                {showShare ? 'Hide Share' : 'Share Results'}
              </button>
              {(testType === 'optical-illusion' || testType === 'memory' || testType === 'trivia' || testType === 'personality') && (
                <button
                  onClick={handleReviewToggle}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300"
                >
                  {showReview ? 'Hide Review' : 'Show Review'}
                </button>
              )}
              <button
                onClick={() => router.push(`/${testType}`)}
                className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all duration-300"
              >
                {testType === 'typing' ? 'Try Another Challenge' : 'Retake Test'}
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
