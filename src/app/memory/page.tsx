'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getRandomMemoryChallenges, calculateMemoryResults } from '@/lib/memoryChallenges'

interface Challenge {
  id: number;
  title: string;
  description: string;
  type: string;
  sequence: string[];
  options: string[];
  timeLimit: number;
}

export default function MemoryTest() {
  const [hasBegun, setHasBegun] = useState(false)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showSequence, setShowSequence] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [pendingFinish, setPendingFinish] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Load random challenges when component mounts
    const loadChallenges = async () => {
      try {
        const randomChallenges = await getRandomMemoryChallenges(5);
        setChallenges(randomChallenges);
      } catch (error) {
        console.error('Error loading memory challenges:', error);
      }
    };
    loadChallenges();
  }, [])

  useEffect(() => {
    // Timer for memory challenges
    if (timeLeft > 0 && showSequence) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && showSequence) {
      setShowSequence(false)
      setShowAnswer(true)
    }
  }, [timeLeft, showSequence, currentChallenge])

  // Handle pending finish when answer is saved
  useEffect(() => {
    if (pendingFinish && Object.keys(answers).length === challenges.length) {
      setPendingFinish(false)
      handleFinish()
    }
  }, [answers, challenges.length, pendingFinish])

  const beginTest = () => {
    setHasBegun(true)
    startChallenge()
  }

  const startChallenge = (challengeIndex = currentChallenge) => {
    const challenge = challenges[challengeIndex]
    
    // Ensure timer starts properly
    setTimeLeft(challenge.timeLimit || 5)
    setShowSequence(true)
  }

  const handleSequenceClick = (item: string) => {
    if (showAnswer) {
      const newSequence = [...userSequence, item]
      setUserSequence(newSequence)
      
      const challenge = challenges[currentChallenge]
      
      if (newSequence.length === challenge.sequence.length) {
        // Check if sequence is correct
        const isCorrect = newSequence.every((item, index) => item === challenge.sequence[index])
        const newAnswer = {
          correct: isCorrect,
          userSequence: newSequence,
          correctSequence: challenge.sequence
        }
        
        // Save the answer and then proceed
        setAnswers(prevAnswers => {
          const updatedAnswers = {
            ...prevAnswers,
            [challenge.id]: newAnswer
          }
          return updatedAnswers
        })
        
        // If this is the last challenge, set pending finish
        if (currentChallenge === challenges.length - 1) {
          setPendingFinish(true)
        } else {
          setTimeout(() => {
            setShowAnswer(false)
            setUserSequence([])
            nextChallenge()
          }, 500) // 0.5 second delay
        }
      }
    }
  }

  const handleAnswerRemove = (indexToRemove: number) => {
    if (showAnswer) {
      const newSequence = userSequence.filter((_, index) => index !== indexToRemove)
      setUserSequence(newSequence)
    }
  }

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      
      const nextChallengeIndex = currentChallenge + 1
      
      setCurrentChallenge(nextChallengeIndex)
      // Reset all states for the next challenge
      setShowSequence(false)
      setShowAnswer(false)
      setUserSequence([])
      setTimeLeft(challenges[nextChallengeIndex]?.timeLimit || 5) // Set timer to challenge timeLimit
      setTimeout(() => startChallenge(nextChallengeIndex), 1000)
    } else {
      // This should not happen anymore since we handle the last challenge in handleSequenceClick
      handleFinish()
    }
  }

  const handleFinish = () => {
    // Show 100% progress bar for a moment before completing
    setTimeout(() => {
      const results = calculateMemoryResults(answers, challenges)
      
      const params = new URLSearchParams({
        results: JSON.stringify(results),
        answers: JSON.stringify(answers),
        challenges: JSON.stringify(challenges)
      })
      
      router.push(`/results/memory?${params.toString()}`)
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Header onLogoClick={undefined} />
          
          {/* Test Title Box */}
          <div className="text-center mb-2">
            <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg border border-green-200 p-6 max-w-6xl mx-auto">
              <h1 className="text-xl font-bold text-green-800 mb-3">
                Memory Test
              </h1>
              <p className="text-green-600 mb-4 text-lg">
                Challenge your memory with sequence tests
              </p>
              
              {/* Test Info */}
              <div className="bg-white border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 shadow-lg">
                <span className="font-medium">Format:</span> Sequence memorization
                <span className="text-green-500 ml-2">🧠 Test your short-term memory capacity</span>
              </div>
            </div>
          </div>

          {/* Begin Button Banner */}
          {!hasBegun ? (
            <div className="text-center mb-2">
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg p-4">
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
          ) : null}

          {/* Instructions - Show when test hasn't begun */}
          {!hasBegun && (
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-2">
              <h3 className="text-xl font-semibold text-sage-800 mb-4">Test Instructions</h3>
              <div className="space-y-3 text-sage-600">
                <p>• This test will challenge your memory skills</p>
                <p>• You'll see sequences of colors, numbers, patterns, words, or mixed items</p>
                <p>• Try to remember and reproduce them accurately</p>
                <p>• Click on your answers to remove them if you make a mistake</p>
                <p>• The progress indicator shows how many items you need (e.g., 3/5)</p>
                <p>• Your accuracy will be measured</p>
                <p>• The test will take about 2-3 minutes to complete</p>
              </div>
            </div>
          )}

          {/* Main Content - Show when test has begun */}
          {hasBegun && challenges.length > 0 && (
            <>
              {/* Progress Bar - Separate Box */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-sage-600">
                    Challenge {currentChallenge + 1} of {challenges.length}
                  </span>
                  <span className="text-sm text-sage-500">
                    {Math.round((Object.keys(answers).length / challenges.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-2">
                  <div 
                    className="bg-sage-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(Object.keys(answers).length / challenges.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Challenge */}
              <div className="text-center">
                {/* Show sequence to memorize */}
                {showSequence && challenges[currentChallenge] && (
                  <div className="bg-sage-50 rounded-2xl p-6 mb-6 border-2 border-sage-200">
                    <h2 className="text-xl font-bold text-sage-800 mb-4">
                      {challenges[currentChallenge] && challenges[currentChallenge].title}
                    </h2>
                    <p className="text-sage-600 mb-4">
                      {challenges[currentChallenge].description}
                    </p>
                    <div className="flex justify-center flex-wrap gap-2 mb-4">
                      {challenges[currentChallenge].sequence && challenges[currentChallenge].sequence.map((item, index) => (
                        <div key={index} className="text-4xl">
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-4">
                      {timeLeft > 0 && (
                        <p className="text-lg font-semibold text-sage-700">
                          Time to memorize: {timeLeft}s
                        </p>
                      )}
                      <p className="text-lg font-semibold text-sage-600">
                        Total time: {challenges[currentChallenge] && challenges[currentChallenge].timeLimit}s
                      </p>
                    </div>
                  </div>
                )}

                {/* Show answer options */}
                {showAnswer && challenges[currentChallenge] && (
                  <div className="bg-sage-50 rounded-2xl p-6 mb-6 border-2 border-sage-200">
                    <h2 className="text-xl font-bold text-sage-800 mb-4">
                      {challenges[currentChallenge] && challenges[currentChallenge].title}
                    </h2>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sage-600">
                        Now reproduce the sequence you just saw:
                      </p>
                      <div className="bg-sage-200 text-sage-800 px-3 py-1 rounded-full text-sm font-medium">
                        {userSequence.length}/{challenges[currentChallenge].sequence.length}
                      </div>
                    </div>
                    <div className="flex justify-center flex-wrap gap-1 mb-4 min-h-[4rem]">
                      {userSequence && userSequence.map((item, index) => (
                        <button 
                          key={index} 
                          onClick={() => handleAnswerRemove(index)}
                          className="text-4xl rounded-lg px-1 py-3 border-2 border-sage-300 hover:border-red-400 hover:bg-red-50 transition-all duration-200 cursor-pointer" 
                          style={{backgroundColor: '#fefcff'}}
                          title="Click to remove this answer"
                        >
                          {item}
                        </button>
                      ))}
                      {(!userSequence || userSequence.length === 0) && (
                        <div className="text-4xl rounded-lg px-1 py-3 border-2 border-sage-200 opacity-30" style={{backgroundColor: '#fefcff'}}>
                          &nbsp;
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center flex-wrap gap-1 max-w-6xl mx-auto">
                      {challenges[currentChallenge] && challenges[currentChallenge].options && challenges[currentChallenge].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleSequenceClick(option)}
                          className="px-1 py-3 border-2 border-sage-200 rounded-lg hover:border-sage-400 hover:bg-sage-50 transition-all duration-200 text-4xl"
                          style={{backgroundColor: '#fefcff'}}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
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
  )
}
