'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mathQuestions, calculateMathResults, MathQuestion, MathResult } from '@/data/mathTest';

export default function MathTest() {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<MathQuestion[]>([]);
  const [randomizedQuestions, setRandomizedQuestions] = useState<MathQuestion[]>([]);
  const [mathResults, setMathResults] = useState<MathResult | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showTopButtons, setShowTopButtons] = useState(false);

  const handleLogoClick = () => {
    // Reset all states to go back to homepage
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedQuestions([]);
    setRandomizedQuestions([]);
    setMathResults(null);
    setShowShare(false);
    setShowReview(false);
    setShowTopButtons(false);
  };

  // Check for scrollbar and show top buttons
  useEffect(() => {
    const checkScrollbar = () => {
      const hasScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;
      setShowTopButtons(hasScrollbar);
    };

    checkScrollbar();
    window.addEventListener('resize', checkScrollbar);
    window.addEventListener('scroll', checkScrollbar);

    return () => {
      window.removeEventListener('resize', checkScrollbar);
      window.removeEventListener('scroll', checkScrollbar);
    };
  }, [testCompleted, showShare, showReview]);

  // Function to select random math questions and randomize their options
  const selectRandomMathQuestions = (count: number): MathQuestion[] => {
    // Create a copy of all questions and shuffle them
    const shuffledQuestions = [...mathQuestions].sort(() => Math.random() - 0.5);
    
    // Select the first 'count' questions
    const selectedQuestions = shuffledQuestions.slice(0, count);
    
    // Randomize options for each selected question
    const randomizedQuestions = selectedQuestions.map(question => {
      const options = [...question.options];
      const correctAnswer = question.correct;
      
      // Shuffle the options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      
      // Find the new position of the correct answer
      const correctOptionText = question.options[correctAnswer];
      const newCorrectIndex = options.findIndex(option => option === correctOptionText);
      
      return {
        ...question,
        options,
        correct: newCorrectIndex
      };
    });
    
    return randomizedQuestions;
  };

  const beginTest = () => {
    const questions = selectRandomMathQuestions(15);
    setSelectedQuestions(questions);
    setRandomizedQuestions(questions);
    setAnswers(new Array(questions.length).fill(undefined));
    setTestStarted(true);
    setCurrentQuestion(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    // Get the selected option text from randomized options
    const selectedOption = randomizedQuestions[currentQuestion].options[answerIndex];
    
    // Find the original index of this option in the original question
    const originalQuestion = selectedQuestions[currentQuestion];
    const originalAnswerIndex = originalQuestion.options.findIndex(
      option => option === selectedOption
    );
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = originalAnswerIndex;
    setAnswers(newAnswers);

    // Auto-advance to next question
    setTimeout(() => {
      if (currentQuestion < randomizedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        completeTest(newAnswers as (number | undefined)[]);
      }
    }, 500);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      // Clear the answer for the current question when going back
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = undefined;
      setAnswers(newAnswers);
      
      // Go to previous question
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeTest = (finalAnswers: (number | undefined)[]) => {
    const results = calculateMathResults(finalAnswers, selectedQuestions);
    setMathResults(results);
    setTestCompleted(true);
    
    // Redirect to new results page
    const resultsData = encodeURIComponent(JSON.stringify(results));
    const answersData = encodeURIComponent(JSON.stringify(finalAnswers));
    const questionsData = encodeURIComponent(JSON.stringify(selectedQuestions));
    
    window.location.href = `/results/math?results=${resultsData}&answers=${answersData}&questions=${questionsData}`;
  };

  const handleRetakeTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedQuestions([]);
    setMathResults(null);
    setShowShare(false);
    setShowReview(false);
  };

  const handleShareToggle = () => {
    setShowShare(!showShare);
    setShowReview(false);
  };

  const handleReviewToggle = () => {
    setShowReview(!showReview);
    setShowShare(false);
  };

  const handleTwitterShare = () => {
    const shareText = `I just completed a math test! ${mathResults ? `Level: ${mathResults.level}, Overall Score: ${mathResults.overallAverage}/10` : 'Check out my results!'} #MathTest #TestYourself`;
    const shareUrl = window.location.origin + '/math';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=800,height=600');
    setShowShare(false);
  };

  const handleXShare = () => {
    const shareText = `I just completed a math test! ${mathResults ? `Level: ${mathResults.level}, Overall Score: ${mathResults.overallAverage}/10` : 'Check out my results!'} #MathTest #TestYourself`;
    const shareUrl = window.location.origin + '/math';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=800,height=600');
    setShowShare(false);
  };

  const handleSaveResults = () => {
    if (!mathResults) return;

    const fileContent = `Math Test Results
Generated on: ${new Date().toLocaleDateString()}

Test Summary:
- Total Questions: ${mathResults.totalQuestions}
- Correct Answers: ${mathResults.totalScore}
- Accuracy: ${mathResults.accuracy}%
- Overall Level: ${mathResults.level} (${mathResults.overallAverage}/10)

Category Breakdown:
- Arithmetic: ${mathResults.categoryAverages.arithmetic}
- Fractions: ${mathResults.categoryAverages.fractions}
- Percentages: ${mathResults.categoryAverages.percentages}
- Algebra: ${mathResults.categoryAverages.algebra}
- Geometry: ${mathResults.categoryAverages.geometry}

Description:
${mathResults.description}

Strengths:
${mathResults.strengths.map(strength => `- ${strength}`).join('\n')}

Areas for Growth:
${mathResults.areasForGrowth.map(area => `- ${area}`).join('\n')}

Recommendations:
${mathResults.recommendations.map(rec => `- ${rec}`).join('\n')}

Question Review:
${selectedQuestions.map((question, index) => {
  const userAnswer = answers[index];
  const correctAnswer = question.correct;
  const isCorrect = userAnswer === correctAnswer;
  
  return `Question ${index + 1}: ${question.question}
Your Answer: ${userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
Correct Answer: ${question.options[correctAnswer]}
Result: ${isCorrect ? 'Correct' : 'Incorrect'}
Category: ${question.category.charAt(0).toUpperCase() + question.category.slice(1)}
`;
}).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`;

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `math-test-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!testStarted) {
    return (
      <>
        <Head>
          {/* Basic Meta Tags */}
          <title>Math Test - Free 7th-8th Grade Math Assessment | TestYourself</title>
          <meta name="description" content="Test your math skills with our free 7th-8th grade math assessment! Covers arithmetic, fractions, percentages, algebra, and geometry. Get detailed results and recommendations." />
          <meta name="keywords" content="math test, 7th grade math, 8th grade math, arithmetic test, fractions test, algebra test, geometry test, math assessment, free math test, middle school math, US math test, American math assessment, online math quiz, math practice test" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="TestYourself" />
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://testyourself.com/math" />

          {/* Open Graph Tags */}
          <meta property="og:title" content="Math Test - Free 7th-8th Grade Math Assessment | TestYourself" />
          <meta property="og:description" content="Test your math skills with our free 7th-8th grade math assessment! Covers arithmetic, fractions, percentages, algebra, and geometry." />
          <meta property="og:image" content="https://testyourself.com/images/math-test-og.png" />
          <meta property="og:url" content="https://testyourself.com/math" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Math Test - Free 7th-8th Grade Math Assessment | TestYourself" />
          <meta name="twitter:description" content="Test your math skills with our free 7th-8th grade math assessment! Covers arithmetic, fractions, percentages, algebra, and geometry." />
          <meta name="twitter:image" content="https://testyourself.com/images/math-test-og.png" />

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Math Test - Free 7th-8th Grade Math Assessment",
                "description": "Test your math skills with our free 7th-8th grade math assessment! Covers arithmetic, fractions, percentages, algebra, and geometry.",
                "url": "https://testyourself.com/math",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
                },
                "about": {
                  "@type": "Quiz",
                  "name": "Math Test - 7th-8th Grade Assessment",
                  "description": "A comprehensive math assessment covering arithmetic, fractions, percentages, algebra, and geometry for 7th-8th grade level.",
                "provider": {
                  "@type": "Organization",
                  "name": "TestYourself",
                  "url": "https://testyourself.com",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "US"
                  }
                },
                "educationalLevel": "intermediate",
                "learningResourceType": "assessment",
                "timeRequired": "PT5M",
                "numberOfQuestions": 15,
                "questionFormat": "Multiple choice math problems",
                "testType": "Educational assessment",
                "audience": {
                  "@type": "EducationalAudience",
                  "educationalRole": "student",
                  "audienceType": "middle school students"
                },
                "about": {
                  "@type": "Thing",
                  "name": "Mathematics Assessment",
                  "description": "Comprehensive math skills test for middle school level"
                }
                },
                "provider": {
                  "@type": "Organization",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
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
                      "name": "Math Test",
                      "item": "https://testyourself.com/math"
                    }
                  ]
                },
                "mainEntity": {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What grade level is this math test for?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "This math test is designed for 7th-8th grade students, covering intermediate level mathematics concepts including arithmetic, fractions, percentages, algebra, and geometry."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long does the math test take to complete?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The math test typically takes about 5 minutes to complete and includes 15 multiple choice questions covering various mathematical topics."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What math topics are covered in this test?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The test covers five main mathematical categories: arithmetic (basic operations), fractions, percentages, algebra (basic equations), and geometry (shapes, area, perimeter)."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is this math test free to take?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, this is a completely free math assessment. No registration or payment is required to take the test and receive your results."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What kind of results will I get after taking the test?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You'll receive detailed results including your overall score, performance by category, strengths and weaknesses analysis, and personalized recommendations for improvement in each mathematical area."
                      }
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
              <Header onLogoClick={handleLogoClick} />
              
              {/* Header */}
              <div className="text-center mb-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Main Title Box - Narrower */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-4 md:col-span-1">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Math Test</h1>
                  <p className="text-gray-600 text-sm">Test your 7th-8th grade math skills with our comprehensive assessment</p>
                </div>

                {/* Test Info Box with Begin Button - Wider */}
                <div className="bg-white rounded-lg p-4 shadow-lg md:col-span-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center min-h-[80px]">
                    {/* Left Column - Test Info */}
                    <div className="text-sm text-gray-600">
                      <p className="mb-2"><strong>Test Duration:</strong> 3-5 minutes</p>
                      <p className="mb-2"><strong>Questions:</strong> 15 math problems</p>
                      <p><strong>Level:</strong> 7th-8th grade</p>
                    </div>
                    
                    {/* Right Column - Begin Button */}
                    <div className="flex items-center justify-center">
                      <button
                        onClick={beginTest}
                        className="px-8 py-4 bg-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-sm whitespace-nowrap w-full lg:w-auto"
                      >
                        Begin Math Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg px-6 pt-6 pb-6 mb-2">
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">What This Test Covers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-1">Arithmetic</h4>
                      <p className="text-blue-700 text-sm">Basic operations, exponents, square roots</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-1">Fractions</h4>
                      <p className="text-blue-700 text-sm">Adding, subtracting, multiplying, dividing</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-1">Percentages</h4>
                      <p className="text-blue-700 text-sm">Calculating percentages of numbers</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-1">Algebra</h4>
                      <p className="text-blue-700 text-sm">Solving simple equations</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-1">Geometry</h4>
                      <p className="text-blue-700 text-sm">Area, perimeter, volume, circles</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">How It Works</h3>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Answer 15 randomly selected math problems</li>
                      <li>• Get instant feedback on your performance</li>
                      <li>• Receive detailed results by category</li>
                      <li>• Get personalized recommendations for improvement</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• This test covers 7th-8th grade level mathematics</li>
                      <li>• You can go back and change previous answers</li>
                      <li>• Take your time and think through each problem</li>
                      <li>• Results are for educational purposes only</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </>
    );
  }

  if (!testCompleted) {
    const answeredQuestions = answers.filter(answer => answer !== undefined).length;
    const progress = (answeredQuestions / randomizedQuestions.length) * 100;
    
    return (
      <>
        <Head>
          <title>Math Test - Question {currentQuestion + 1} of {randomizedQuestions.length} | TestYourself</title>
          <meta name="description" content="Taking the math test - Question {currentQuestion + 1} of {randomizedQuestions.length}" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <div className="min-h-screen flex flex-col">
          <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <Header onLogoClick={handleLogoClick} />
              
              {/* Test Title Box */}
              <div className="text-center mb-2">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl shadow-lg p-6 w-full">
                  <h1 className="text-xl font-bold text-orange-800 mb-3">Math Test - <span className="font-normal">7th-8th Grade Assessment</span></h1>
                  
                  {/* Test Info */}
                  <div className="bg-white rounded-lg px-4 py-3 text-sm text-orange-700 shadow-lg">
                    <span className="font-medium">Format:</span> Multiple choice math problems
                    <span className="text-orange-500 ml-2">🧮 Test your math skills</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Question {currentQuestion + 1} of {randomizedQuestions.length}</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-2">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {randomizedQuestions[currentQuestion].category.charAt(0).toUpperCase() + randomizedQuestions[currentQuestion].category.slice(1)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {randomizedQuestions[currentQuestion].question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {randomizedQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className="w-full py-2 px-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200"
                  >
                    {option}
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
          </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </>
    );
  }

  // Results Page
  return (
    <>
      <Head>
        <title>Math Test Results - {mathResults?.level} Level | TestYourself</title>
        <meta name="description" content="View your math test results and get insights about your mathematical abilities." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <Header onLogoClick={handleLogoClick} />
            
            {/* Top Buttons - Only show when there's a scrollbar */}
          {showTopButtons && (
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
              <div className="flex flex-wrap gap-3 justify-center">
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
                  {showReview ? '🔒 Hide Review' : '📋 Review Answers'}
                </button>
                <button
                  onClick={handleSaveResults}
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
          )}


          {/* Test Title */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl shadow-lg px-2 py-0.5 mb-2">
            <h1 className="text-lg font-bold text-gray-800 text-center">Math Test Results - 7th-8th Grade Assessment</h1>
          </div>

          {/* Share Section */}
          {showShare && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Share Your Results</h2>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleXShare}
                  className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-2xl shadow-lg transition-colors flex items-center max-w-xs"
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
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Question Review</h2>
              </div>
              <div className="space-y-4">
                {selectedQuestions.map((question, index) => {
                  const userAnswer = answers[index];
                  const correctAnswer = question.correct;
                  const isCorrect = userAnswer === correctAnswer;
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                          Question {index + 1}
                        </span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-3">{question.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Your Answer:</p>
                          <p className="text-sm bg-gray-50 p-2 rounded border">
                            {userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Correct Answer:</p>
                          <p className="text-sm bg-green-50 p-2 rounded border border-green-200">
                            {question.options[correctAnswer]}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">
                          Category: {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main Results - Only show when not in share or review mode */}
          {!showShare && !showReview && mathResults && (
            <>
              {/* Your Results and Key Insights - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-2">
                {/* Your Results - 40% width */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-5 h-full flex flex-col justify-center">
                    <div className="text-center">
                      <h2 className="text-xl text-blue-800 mb-1">
                        <span className="font-bold">Your Results</span>
                      </h2>
                      <p className="text-lg text-blue-700 mb-3">Here's what we discovered about your<br /><span className="font-bold">math skills</span></p>
                      <div className="text-5xl font-bold text-blue-600 mb-2">{mathResults.overallAverage}/10</div>
                      <div className="text-2xl font-semibold text-gray-800 mb-2">{mathResults.level}</div>
                      <div className="text-lg font-semibold text-blue-700">{mathResults.accuracy}% ({mathResults.totalScore}/{mathResults.totalQuestions} correct)</div>
                    </div>
                  </div>
                </div>

                {/* Key Insights - 60% width */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-2xl shadow-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
                    <div className="space-y-3">
                      <p className="text-gray-700">{mathResults.description}</p>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Strengths:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {mathResults.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {mathResults.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown and Areas for Growth - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
                {/* Category Breakdown */}
                <div className="bg-white rounded-2xl shadow-lg p-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Arithmetic</span>
                      <span className="font-semibold text-gray-800">{mathResults.categoryAverages.arithmetic}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Fractions</span>
                      <span className="font-semibold text-gray-800">{mathResults.categoryAverages.fractions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Percentages</span>
                      <span className="font-semibold text-gray-800">{mathResults.categoryAverages.percentages}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Algebra</span>
                      <span className="font-semibold text-gray-800">{mathResults.categoryAverages.algebra}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Geometry</span>
                      <span className="font-semibold text-gray-800">{mathResults.categoryAverages.geometry}</span>
                    </div>
                  </div>
                </div>

                {/* Areas for Growth */}
                <div className="bg-white rounded-2xl shadow-lg p-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Areas for Growth</h3>
                  <div className="space-y-1">
                    {mathResults.areasForGrowth.map((area, index) => (
                      <div key={index} className="text-gray-700">• {area}</div>
                    ))}
                  </div>
                </div>
              </div>

            </>
          )}

          {/* Bottom Action Buttons */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex flex-wrap gap-3 justify-center">
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
                {showReview ? '🔒 Hide Review' : '📋 Review Answers'}
              </button>
              <button
                onClick={handleSaveResults}
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
          {/* Footer */}
          <div className="mt-4">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
