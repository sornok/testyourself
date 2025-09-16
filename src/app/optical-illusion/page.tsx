'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getRandomOpticalIllusions, calculateOpticalIllusionResults } from '@/lib/opticalIllusions'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface OpticalIllusion {
  id: number;
  title: string;
  description: string;
  image: string;
  question: string;
  options: {
    text: string;
    interpretation: string;
    personality: string;
  }[];
}

export default function OpticalIllusionTest() {
  const [currentIllusion, setCurrentIllusion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [hasBegun, setHasBegun] = useState(false)
  const [illusions, setIllusions] = useState<OpticalIllusion[]>([])
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load random illusions when component mounts
    const loadIllusions = async () => {
      try {
        console.log('Loading optical illusions...');
        const randomIllusions = await getRandomOpticalIllusions(6);
        console.log('Loaded illusions:', randomIllusions);
        setIllusions(randomIllusions);
      } catch (error) {
        console.error('Error loading optical illusions:', error);
      }
    };
    loadIllusions();
  }, [])

  const beginTest = () => {
    setHasBegun(true)
  }

  const handleAnswer = (illusionId: number, answer: any) => {
    const newAnswers = { ...answers, [illusionId]: answer }
    setAnswers(newAnswers)
    
    // Move to next question or go directly to results
    if (currentIllusion < illusions.length - 1) {
      setCurrentIllusion(currentIllusion + 1)
    } else {
      // Show 100% progress bar for a moment before completing
      setTimeout(() => {
        const results = calculateOpticalIllusionResults(newAnswers, illusions)
        const params = new URLSearchParams({
          results: JSON.stringify(results),
          answers: JSON.stringify(newAnswers),
          illusions: JSON.stringify(illusions)
        })
        router.push(`/results/optical-illusion?${params.toString()}`)
      }, 800)
    }
  }

  const handlePrevious = () => {
    if (currentIllusion > 0) {
      setCurrentIllusion(currentIllusion - 1)
    }
  }

  const progress = illusions.length > 0 ? (Object.keys(answers).length / illusions.length) * 100 : 0

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Optical Illusion Test - Free Visual Perception Assessment | TestYourself</title>
        <meta name="description" content="Discover how your brain processes visual information with our free optical illusion test! Explore fascinating visual illusions and learn about your cognitive style and visual perception patterns." />
        <meta name="keywords" content="optical illusion test, visual perception test, cognitive test, visual illusions, brain test, perception assessment, visual processing, optical illusions quiz, visual cognition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://testyourself.com/optical-illusion" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Optical Illusion Test - Free Visual Perception Assessment" />
        <meta property="og:description" content="Discover how your brain processes visual information with our free optical illusion test! Explore fascinating visual illusions and learn about your cognitive style." />
        <meta property="og:image" content="https://testyourself.com/optical-illusion-og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/optical-illusion" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Optical Illusion Test - Free Visual Perception Assessment" />
        <meta name="twitter:description" content="Discover how your brain processes visual information with our free optical illusion test! Explore fascinating visual illusions and learn about your cognitive style." />
        <meta name="twitter:image" content="https://testyourself.com/optical-illusion-og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "Optical Illusion Test - Visual Perception Assessment",
              "description": "A comprehensive optical illusion test that explores how your brain processes visual information and reveals insights about your cognitive style and visual perception patterns.",
              "url": "https://testyourself.com/optical-illusion",
              "provider": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "educationalLevel": "beginner",
              "learningResourceType": "assessment",
              "timeRequired": "PT3M",
              "typicalAgeRange": "8-99",
              "about": {
                "@type": "Thing",
                "name": "Visual Perception",
                "description": "Optical illusions and visual perception testing"
              },
              "teaches": [
                "Visual perception",
                "Cognitive processing",
                "Visual processing patterns",
                "Brain interpretation",
                "Visual cognition"
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
                  "name": "Visual Illusion Questions",
                  "description": "Questions about various optical illusions and visual perception patterns"
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
            <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
              <h1 className="text-xl font-bold text-green-800 mb-3">
                Optical Illusion Test
              </h1>
              <p className="text-green-600 mb-4 text-lg">
                Test your visual perception and discover your cognitive style
              </p>
              
              {/* Test Info */}
              <div className="bg-white rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                <span className="font-medium">Format:</span> Visual perception questions
                <span className="text-green-500 ml-2">👁️ Explore how your brain processes images</span>
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
                  className="px-8 py-0.5 bg-yellow-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-lg"
                >
                  Begin Test Now
                </button>
              </div>
            </div>
          ) : null}

          {/* Instructions - Show when test hasn't begun */}
          {!hasBegun && (
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-2">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Test Instructions</h3>
              <div className="space-y-3 text-green-600">
                <p>• This test will show you various optical illusions</p>
                <p>• Look at each image and choose what you see first</p>
                <p>• There are no right or wrong answers - trust your perception</p>
                <p>• Your responses will reveal insights about your visual processing</p>
                <p>• The test will take about 3-5 minutes to complete</p>
              </div>
            </div>
          )}

          {/* Main Content - Show when test has begun */}
          {hasBegun && !showResults && illusions.length > 0 && (
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6">
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-600">
                    Question {currentIllusion + 1} of {illusions.length}
                  </span>
                  <span className="text-sm text-green-500">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Illusion */}
              <div className="mb-2">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image - Left Side */}
                  <div className="lg:w-1/2">
                    <div className="text-center mb-3">
                      <h2 className="text-xl font-bold text-green-800 mb-3">
                        {illusions[currentIllusion].title}
                      </h2>
                    </div>
                    
                    <div className="bg-green-50 rounded-2xl p-3 border-2 border-green-200 h-[72%]">
                      <div className="flex justify-center h-full">
                        <img 
                          src={illusions[currentIllusion].image} 
                          alt={illusions[currentIllusion].title}
                          className="max-w-full h-auto rounded-lg shadow-lg scale-65"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question and Options - Right Side */}
                  <div className="lg:w-1/2">
                    <div className="text-center mb-4">
                      <p className="text-green-600 mb-3">
                        {illusions[currentIllusion].description}
                      </p>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-2">
                      {illusions[currentIllusion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(illusions[currentIllusion].id, option)}
                          className="w-full py-3 px-3 text-left border-2 border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-green-700 font-medium"
                          style={{backgroundColor: '#fefcff'}}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentIllusion === 0}
                  className="px-6 py-2 bg-green-100 text-green-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-200 transition-colors"
                >
                  Previous
                </button>
                
                <div className="text-sm text-green-500">
                  {Object.keys(answers).length} of {illusions.length} answered
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
