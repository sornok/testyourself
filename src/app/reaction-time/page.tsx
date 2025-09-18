'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { reactionQuestions, selectRandomReactionQuestions, calculateReactionResults, ReactionQuestion, ReactionResult } from '@/data/reactionTimeTest';

export default function ReactionTimeTest() {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [reactionTimes, setReactionTimes] = useState<(number | undefined)[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<ReactionQuestion[]>([]);
  const [reactionResults, setReactionResults] = useState<ReactionResult | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showTopButtons, setShowTopButtons] = useState(false);
  const [stimulusShown, setStimulusShown] = useState(false);
  const [stimulusStartTime, setStimulusStartTime] = useState<number>(0);
  const [startButtonClicked, setStartButtonClicked] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [previousReactionTime, setPreviousReactionTime] = useState<number | null>(null);
  const [firstNumberClicked, setFirstNumberClicked] = useState(false);
  const [firstClickTime, setFirstClickTime] = useState<number | null>(null);
  const [sequentialOrder, setSequentialOrder] = useState<{first: number, second: number} | null>(null);
  const [targetCorner, setTargetCorner] = useState<string | null>(null);
  const [cornerHovered, setCornerHovered] = useState(false);

  const handleLogoClick = () => {
    // Reset all states to go back to homepage
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setReactionTimes([]);
    setSelectedQuestions([]);
    setReactionResults(null);
    setShowShare(false);
    setShowReview(false);
    setShowTopButtons(false);
    setStimulusShown(false);
    setStimulusStartTime(0);
    setStartButtonClicked(false);
    setCountdown(0);
    setPreviousReactionTime(null);
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

  // Debug useEffect to track state changes
  useEffect(() => {
    console.log('State changed:', {
      testCompleted,
      currentQuestion,
      selectedQuestionsLength: selectedQuestions.length,
      answersLength: answers.length,
      reactionTimesLength: reactionTimes.length
    });
  }, [testCompleted, currentQuestion, selectedQuestions.length, answers.length, reactionTimes.length]);

  // Debug sequential test
  useEffect(() => {
    if (selectedQuestions.length > 0 && currentQuestion < selectedQuestions.length) {
      const currentQ = selectedQuestions[currentQuestion];
      console.log('Current question debug:', {
        type: currentQ.type,
        instruction: currentQ.instruction,
        stimulus: currentQ.stimulus,
        sequentialOrder,
        stimulusShown,
        startButtonClicked,
        targetCorner
      });
    }
  }, [currentQuestion, selectedQuestions, sequentialOrder, stimulusShown, startButtonClicked, targetCorner]);

  // Debug movement test rendering
  useEffect(() => {
    if (selectedQuestions.length > 0 && currentQuestion < selectedQuestions.length) {
      const currentQ = selectedQuestions[currentQuestion];
      if (currentQ.type === 'movement') {
        console.log('Movement test debug:', {
          type: currentQ.type,
          targetCorner,
          stimulusShown,
          shouldRender: targetCorner && stimulusShown,
          stimulus: currentQ.stimulus
        });
      }
    }
  }, [currentQuestion, selectedQuestions, targetCorner, stimulusShown]);

  const beginTest = () => {
    const questions = selectRandomReactionQuestions(9);
    console.log('beginTest: Selected questions count:', questions.length);
    console.log('beginTest: Questions:', questions.map(q => ({ id: q.id, type: q.type, instruction: q.instruction })));
    setSelectedQuestions(questions);
    setAnswers(new Array(questions.length).fill(undefined));
    setReactionTimes(new Array(questions.length).fill(undefined));
    setTestStarted(true);
  };

  const startStimulus = () => {
    setStartButtonClicked(true);
    setCountdown(3);
    setFirstNumberClicked(false);
    setFirstClickTime(null);
    setTargetCorner(null);
    setCornerHovered(false);
    
    // Set sequential order for sequential tests
    if (selectedQuestions[currentQuestion].type === 'sequential-click') {
      const firstNum = selectedQuestions[currentQuestion].stimulus.first || 1;
      const secondNum = selectedQuestions[currentQuestion].stimulus.second || 7;
      // Randomly decide which number goes left (0) or right (1)
      const leftPosition = Math.random() < 0.5 ? firstNum : secondNum;
      const rightPosition = leftPosition === firstNum ? secondNum : firstNum;
      const order = {
        first: leftPosition === firstNum ? 0 : 1, // 0 = left, 1 = right
        second: rightPosition === secondNum ? 1 : 0
      };
      console.log('Setting sequential order:', { firstNum, secondNum, leftPosition, rightPosition, order });
      setSequentialOrder(order);
    }
    
    // Set target corner for movement tests
    if (selectedQuestions[currentQuestion].type === 'movement') {
      setTargetCorner(selectedQuestions[currentQuestion].stimulus.corner || 'top-left');
    }
    
    // Start countdown
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // After countdown finishes, start the random delay
          const currentQ = selectedQuestions[currentQuestion];
          if (currentQ.stimulus.delay) {
            setTimeout(() => {
              setStimulusShown(true);
              setStimulusStartTime(Date.now());
            }, currentQ.stimulus.delay);
          } else {
            setStimulusShown(true);
            setStimulusStartTime(Date.now());
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStimulusClick = () => {
    if (!stimulusShown) return;

    const reactionTime = Date.now() - stimulusStartTime;
    const currentQ = selectedQuestions[currentQuestion];
    
    const newAnswers = [...answers];
    const newReactionTimes = [...reactionTimes];
    
    // Record the response (clicking on stimulus = correct action)
    newAnswers[currentQuestion] = 0; // Click
    newReactionTimes[currentQuestion] = reactionTime;
    
    setAnswers(newAnswers);
    setReactionTimes(newReactionTimes);
    setStimulusShown(false);
    setStimulusStartTime(0);
    setStartButtonClicked(false);
    setCountdown(0);
    
    // Store reaction time for next question
    setPreviousReactionTime(reactionTime);

    // Auto-advance to next question
    console.log(`Stimulus click completed. Current question: ${currentQuestion}, Total questions: ${selectedQuestions.length}`);
    console.log(`Condition check: ${currentQuestion} < ${selectedQuestions.length - 1} = ${currentQuestion < selectedQuestions.length - 1}`);
    if (currentQuestion < selectedQuestions.length - 1) {
      console.log(`Moving to next question: ${currentQuestion + 1}`);
      setCurrentQuestion(currentQuestion + 1);
      // Reset sequential states for next question
      setFirstNumberClicked(false);
      setFirstClickTime(null);
    } else {
      console.log('Calling completeTest from stimulus click - THIS IS THE LAST QUESTION');
      completeTest(newAnswers, newReactionTimes);
    }
  };

  const handleSequentialClick = (numberType: 'first' | 'second') => {
    if (!stimulusShown) return;

    if (numberType === 'first') {
      // First number clicked
      setFirstNumberClicked(true);
      setFirstClickTime(Date.now());
    } else if (numberType === 'second' && firstNumberClicked) {
      // Second number clicked - record reaction time and move to next question
      const reactionTime = Date.now() - stimulusStartTime;
      const currentQ = selectedQuestions[currentQuestion];
      
      const newAnswers = [...answers];
      const newReactionTimes = [...reactionTimes];
      
      // Record the response (both clicks completed)
      newAnswers[currentQuestion] = 0; // Sequential completion
      newReactionTimes[currentQuestion] = reactionTime;
      
      setAnswers(newAnswers);
      setReactionTimes(newReactionTimes);
      setStimulusShown(false);
      setStimulusStartTime(0);
      setStartButtonClicked(false);
      setCountdown(0);
      
      // Store reaction time for next question
      setPreviousReactionTime(reactionTime);

      // Auto-advance to next question
      console.log(`Sequential click completed. Current question: ${currentQuestion}, Total questions: ${selectedQuestions.length}`);
      console.log(`Condition check: ${currentQuestion} < ${selectedQuestions.length - 1} = ${currentQuestion < selectedQuestions.length - 1}`);
      if (currentQuestion < selectedQuestions.length - 1) {
        console.log(`Moving to next question: ${currentQuestion + 1}`);
        setCurrentQuestion(currentQuestion + 1);
        // Reset sequential states for next question
        setFirstNumberClicked(false);
        setFirstClickTime(null);
      } else {
        console.log('Calling completeTest from sequential click - THIS IS THE LAST QUESTION');
        completeTest(newAnswers, newReactionTimes);
      }
    }
  };

  const handleNoResponse = () => {
    if (!stimulusShown) return;

    const currentQ = selectedQuestions[currentQuestion];
    
    const newAnswers = [...answers];
    const newReactionTimes = [...reactionTimes];
    
    // Record no response (for go/no-go questions where waiting is correct)
    newAnswers[currentQuestion] = 1; // Wait
    newReactionTimes[currentQuestion] = 0; // No reaction time for no response
    
    setAnswers(newAnswers);
    setReactionTimes(newReactionTimes);
    setStimulusShown(false);
    setStimulusStartTime(0);
    setStartButtonClicked(false);
    setCountdown(0);
    
    // Store reaction time for next question (0ms for no response)
    setPreviousReactionTime(0);

    // Auto-advance to next question
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Reset sequential states for next question
      setFirstNumberClicked(false);
      setFirstClickTime(null);
    } else {
      completeTest(newAnswers, newReactionTimes);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      // Clear the answer for the current question when going back
      const newAnswers = [...answers];
      const newReactionTimes = [...reactionTimes];
      newAnswers[currentQuestion] = undefined;
      newReactionTimes[currentQuestion] = undefined;
      setAnswers(newAnswers);
      setReactionTimes(newReactionTimes);
      
      // Go to previous question
      setCurrentQuestion(currentQuestion - 1);
      setStimulusShown(false);
      setStimulusStartTime(0);
      setStartButtonClicked(false);
      setCountdown(0);
    }
  };

  const completeTest = (finalAnswers: number[], finalReactionTimes: number[]) => {
    console.log('completeTest called with:', { finalAnswers, finalReactionTimes, selectedQuestions: selectedQuestions.length });
    const results = calculateReactionResults(finalAnswers, finalReactionTimes, selectedQuestions);
    setReactionResults(results);
    setTestCompleted(true);
    console.log('Test completed, results set');
  };

  const handleCornerHover = (corner: string) => {
    // For movement tests, we need targetCorner, stimulusShown, and not already hovered
    const isMovementTest = selectedQuestions[currentQuestion]?.type === 'movement';
    const shouldRecord = isMovementTest 
      ? (stimulusShown && targetCorner === corner && !cornerHovered)
      : (stimulusShown && targetCorner === corner && !cornerHovered);
    
    if (shouldRecord) {
      const reactionTime = Date.now() - stimulusStartTime;
      const newAnswers = [...answers];
      const newReactionTimes = [...reactionTimes];
      
      newAnswers[currentQuestion] = 1; // Correct corner
      newReactionTimes[currentQuestion] = reactionTime;
      
      setAnswers(newAnswers);
      setReactionTimes(newReactionTimes);
      setPreviousReactionTime(reactionTime);
      setCornerHovered(true);
      
      // Move to next question after a brief delay
      setTimeout(() => {
        if (currentQuestion < selectedQuestions.length - 1) {
          // Reset states for next question
          setStimulusShown(false);
          setStimulusStartTime(0);
          setStartButtonClicked(false);
          setCountdown(0);
          setCornerHovered(false);
          setTargetCorner(null);
          
          // Advance to next question
          setCurrentQuestion(currentQuestion + 1);
        } else {
          completeTest(newAnswers, newReactionTimes);
        }
      }, 500);
    }
  };

  const handleRetakeTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setReactionTimes([]);
    setSelectedQuestions([]);
    setReactionResults(null);
    setShowShare(false);
    setShowReview(false);
    setShowTopButtons(false);
    setStimulusShown(false);
    setStimulusStartTime(0);
    setStartButtonClicked(false);
    setCountdown(0);
    setPreviousReactionTime(null);
  };

  const handleShareToggle = () => {
    setShowShare(!showShare);
    setShowReview(false);
  };

  const handleReviewToggle = () => {
    setShowReview(!showReview);
    setShowShare(false);
  };

  const handleXShare = () => {
    const shareText = `I just completed a reaction time test! ${reactionResults ? `Average Reaction Time: ${reactionResults.averageReactionTime}ms, Level: ${reactionResults.level}` : 'Check out my results!'} #ReactionTime #TestYourself`;
    const shareUrl = window.location.origin + '/reaction-time';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=800,height=600');
    setShowShare(false);
  };

  const handleFacebookShare = () => {
    const shareText = `I just completed a reaction time test! ${reactionResults ? `Average Reaction Time: ${reactionResults.averageReactionTime}ms` : 'Check out my results!'}`;
    const shareUrl = window.location.origin + '/reaction-time';
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=800,height=600');
    setShowShare(false);
  };

  const handleLinkedInShare = () => {
    const shareText = `I just completed a reaction time test! ${reactionResults ? `Average Reaction Time: ${reactionResults.averageReactionTime}ms, Level: ${reactionResults.level}` : 'Check out my results!'}`;
    const shareUrl = window.location.origin + '/reaction-time';
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=800,height=600');
    setShowShare(false);
  };

  const handleSaveResults = () => {
    if (!reactionResults) return;

    const fileContent = `Reaction Time Test Results
Generated on: ${new Date().toLocaleDateString()}

Test Summary:
- Total Questions: ${reactionResults.totalQuestions}
- Completed Responses: ${reactionResults.totalScore}
- Average Reaction Time: ${reactionResults.averageReactionTime}ms
- Overall Level: ${reactionResults.level}

Category Breakdown:
- Color Selection Reaction: ${reactionResults.categoryAverages['color-selection']}ms average
- Sequential Click Reaction: ${reactionResults.categoryAverages['sequential-click']}ms average
- Movement Reaction: ${reactionResults.categoryAverages['movement']}ms average

Description:
${reactionResults.description}

Strengths:
${reactionResults.strengths.map(strength => `- ${strength}`).join('\n')}

Areas for Growth:
${reactionResults.areasForGrowth.map(area => `- ${area}`).join('\n')}

Recommendations:
${reactionResults.recommendations.map(rec => `- ${rec}`).join('\n')}

Question Review:
${selectedQuestions.map((question, index) => {
  const userAnswer = answers[index];
  const reactionTime = reactionTimes[index];
  const hasResponse = userAnswer !== undefined && reactionTime !== undefined;
  
  return `Question ${index + 1}
Action: ${question.instruction}
Reaction Time: ${reactionTime ? `${reactionTime}ms` : 'N/A'}
Test Type: ${question.type === 'color-selection' ? 'Color Selection' : question.type === 'sequential-click' ? 'Sequential Click' : question.type === 'movement' ? 'Movement' : question.category.charAt(0).toUpperCase() + question.category.slice(1).replace('-', ' ')}
`;
}).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`;

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reaction-time-test-results-${new Date().toISOString().split('T')[0]}.txt`;
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
          <title>Reaction Time Test - Free Speed & Accuracy Assessment | TestYourself</title>
          <meta name="description" content="Test your reaction time with our free speed and accuracy assessment! Covers color selection, sequential clicking, and movement reaction tests. Get detailed results and recommendations." />
          <meta name="keywords" content="reaction time test, speed test, accuracy test, visual reaction, color selection test, sequential click test, movement reaction test, cognitive test, free reaction test, response time, visual processing test" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="TestYourself" />
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://testyourself.com/reaction-time" />

          {/* Open Graph Tags */}
          <meta property="og:title" content="Reaction Time Test - Free Speed & Accuracy Assessment | TestYourself" />
          <meta property="og:description" content="Test your reaction time with our free speed and accuracy assessment! Covers color selection, sequential clicking, and movement reaction tests." />
          <meta property="og:image" content="https://testyourself.com/images/reaction-time-og-image.png" />
          <meta property="og:url" content="https://testyourself.com/reaction-time" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TestYourself" />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Reaction Time Test - Free Speed & Accuracy Assessment | TestYourself" />
          <meta name="twitter:description" content="Test your reaction time with our free speed and accuracy assessment! Covers color selection, sequential clicking, and movement reaction tests." />
          <meta name="twitter:image" content="https://testyourself.com/images/reaction-time-og-image.png" />

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Reaction Time Test - Free Speed & Accuracy Assessment",
                "description": "Test your reaction time with our free speed and accuracy assessment! Covers color selection, sequential clicking, and movement reaction tests.",
                "url": "https://testyourself.com/reaction-time",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
                },
                "about": {
                  "@type": "Quiz",
                  "name": "Reaction Time Test - Speed & Accuracy Assessment",
                  "description": "A comprehensive reaction time assessment covering color selection, sequential clicking, and movement reaction tests for cognitive evaluation.",
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
                  "timeRequired": "PT4M",
                  "numberOfQuestions": 9,
                  "questionFormat": "Interactive reaction time tasks",
                  "testType": "Cognitive assessment",
                  "audience": {
                    "@type": "EducationalAudience",
                    "educationalRole": "student",
                    "audienceType": "general audience"
                  },
                  "about": {
                    "@type": "Thing",
                    "name": "Reaction Time Assessment",
                    "description": "Comprehensive cognitive test measuring reaction speed and accuracy across color selection, sequential clicking, and movement tasks"
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
              <Header onLogoClick={handleLogoClick} />
              
              {/* Header */}
              <div className="text-center mb-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Main Title Box - Narrower */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl shadow-lg p-4 md:col-span-1">
                  <h1 className="text-2xl font-bold text-orange-800 mb-2">Reaction Time Test</h1>
                  <p className="text-gray-600 text-sm">Test your speed and accuracy with our comprehensive reaction assessment</p>
                </div>

                {/* Test Info Box with Begin Button - Wider */}
                <div className="bg-white rounded-lg shadow-lg md:col-span-2">
                  <div className="flex flex-col lg:flex-row min-h-[100px]">
                    {/* Left Column - Test Info */}
                    <div className="text-sm text-gray-600 flex flex-col justify-center p-4 flex-1">
                      <p className="mb-2"><strong>Test Duration:</strong> 2-4 minutes</p>
                      <p className="mb-2"><strong>Questions:</strong> 15 reaction tasks</p>
                      <p><strong>Purpose:</strong> Measure reaction speed and accuracy</p>
                    </div>
                    
                    {/* Right Column - Begin Button */}
                    <div className="flex items-center justify-center p-4">
                      <button
                        onClick={beginTest}
                        className="px-8 py-4 bg-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-base whitespace-nowrap w-full lg:w-auto"
                      >
                        Begin Reaction Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Instructions */}
              <div className="bg-white rounded-2xl shadow-lg px-6 pt-6 pb-6 mb-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200 shadow-sm">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">How It Works</h3>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Color Selection: Click the target color from 4 options</li>
                        <li>• Sequential Click: Click two numbers in the correct order</li>
                        <li>• Movement Test: Move mouse to the indicated corner</li>
                        <li>• Measure your reaction time in milliseconds</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 shadow-sm">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Stay focused and ready to respond</li>
                        <li>• Click as fast as possible when appropriate</li>
                        <li>• Don't click too early (wait for stimulus)</li>
                        <li>• Take breaks if needed between questions</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">What This Test Measures</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h4 className="font-semibold text-blue-800 mb-1">Reaction Speed</h4>
                        <p className="text-blue-700 text-sm">How quickly you respond to visual stimuli</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="font-semibold text-green-800 mb-1">Visual Processing</h4>
                        <p className="text-green-700 text-sm">Ability to detect and recognize visual patterns</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h4 className="font-semibold text-purple-800 mb-1">Motor Control</h4>
                        <p className="text-purple-700 text-sm">Precision in mouse movement and targeting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  console.log('Render check - testCompleted:', testCompleted, 'currentQuestion:', currentQuestion, 'selectedQuestions.length:', selectedQuestions.length);
  
  if (!testCompleted) {
    const answeredQuestions = answers.filter(answer => answer !== undefined).length;
    const progress = (answeredQuestions / selectedQuestions.length) * 100;
    
    return (
      <>
        <Head>
          <title>Reaction Time Test - Question {currentQuestion + 1} of {selectedQuestions.length} | TestYourself</title>
          <meta name="description" content="Taking the reaction time test - Question {currentQuestion + 1} of {selectedQuestions.length}" />
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
                  <h1 className="text-xl font-bold text-orange-800 mb-3">Reaction Time Test - <span className="font-normal">Speed & Accuracy Assessment</span></h1>
                  
                  {/* Test Info */}
                  <div className="bg-white rounded-lg px-4 py-3 text-sm text-orange-700 shadow-lg">
                    <span className="font-medium">Format:</span> Interactive reaction time tasks
                    <span className="mx-2">•</span>
                    <span className="font-medium">Questions:</span> {selectedQuestions.length}
                    <span className="mx-2">•</span>
                    <span className="font-medium">Category:</span> {selectedQuestions[currentQuestion].category.charAt(0).toUpperCase() + selectedQuestions[currentQuestion].category.slice(1).replace('-', ' ')}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Question {currentQuestion + 1} of {selectedQuestions.length}</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-white rounded-2xl shadow-lg p-2 mb-2">
                {/* Stimulus Area */}
                <div className="min-h-[300px] flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 relative p-2">
                  {!startButtonClicked ? (
                    <div className="text-center flex-1 flex flex-col justify-center">
                      {/* Previous Reaction Time Display */}
                      {previousReactionTime !== null && (
                        <div className="mb-6 p-4 bg-blue-100 border-2 border-blue-300 rounded-lg">
                          <div className="text-center">
                            <p className="text-blue-800 text-lg font-semibold mb-2">Previous Reaction Time:</p>
                            <div className="text-3xl font-bold text-blue-600">
                              {previousReactionTime}ms
                            </div>
                            <p className="text-blue-700 text-sm mt-2">
                              {previousReactionTime === 0 ? 'No response recorded' : 'Great job!'}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={startStimulus}
                        className="px-8 py-4 text-lg bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        {currentQuestion === 0 ? '1st Reaction Challenge' : 
                         currentQuestion === 1 ? '2nd Reaction Challenge' :
                         currentQuestion === 2 ? '3rd Reaction Challenge' :
                         `${currentQuestion + 1}th Reaction Challenge`}
                      </button>
                    </div>
          ) : !stimulusShown ? (
            <div className="text-center flex-1 flex flex-col justify-center">
              {/* Question Text - Only shown after button is clicked */}
              <div className="mb-2">
                <h2 className={`text-2xl font-semibold text-center ${
                  selectedQuestions[currentQuestion].type === 'color-selection' ? 
                    selectedQuestions[currentQuestion].instruction === 'Green' ? 'text-green-600' :
                    selectedQuestions[currentQuestion].instruction === 'Red' ? 'text-red-600' :
                    selectedQuestions[currentQuestion].instruction === 'Blue' ? 'text-blue-600' :
                    selectedQuestions[currentQuestion].instruction === 'Yellow' ? 'text-yellow-600' :
                    'text-gray-800'
                  : selectedQuestions[currentQuestion].type === 'movement' ? 'text-gray-800'
                  : 'text-gray-800'
                }`}>
                  {selectedQuestions[currentQuestion].type === 'sequential-click' ? (
                    <>
                      <span className="text-gray-600">Sequential - First:</span> <span className="text-blue-600">{selectedQuestions[currentQuestion].stimulus.first || '?'}</span> <span className="text-gray-600">- Second:</span> <span className="text-green-600">{selectedQuestions[currentQuestion].stimulus.second || '?'}</span>
                    </>
                  ) : selectedQuestions[currentQuestion].type === 'movement' && !stimulusShown ? (
                    <>
                      <span className="text-gray-600">Movement - Move to the</span> <span className="text-green-600">Green</span> <span className="text-gray-600">Corner</span>
                    </>
                  ) : selectedQuestions[currentQuestion].type === 'movement' && stimulusShown ? (
                    ''
                  ) : selectedQuestions[currentQuestion].type === 'color-selection' ? (
                    <>
                      <span className="text-gray-600">Color Selection - Click on</span> <span className={selectedQuestions[currentQuestion].instruction === 'Green' ? 'text-green-600' : selectedQuestions[currentQuestion].instruction === 'Red' ? 'text-red-600' : selectedQuestions[currentQuestion].instruction === 'Blue' ? 'text-blue-600' : selectedQuestions[currentQuestion].instruction === 'Yellow' ? 'text-yellow-600' : 'text-gray-800'}>{selectedQuestions[currentQuestion].instruction}</span>
                    </>
                  ) : (
                    selectedQuestions[currentQuestion].instruction
                  )}
                  {selectedQuestions[currentQuestion].type === 'shape-selection' && (
                    <span className="ml-2">
                      {selectedQuestions[currentQuestion].instruction === 'Circle' ? '⭕' :
                       selectedQuestions[currentQuestion].instruction === 'Triangle' ? '🔺' :
                       selectedQuestions[currentQuestion].instruction === 'Square' ? '⬜' :
                       selectedQuestions[currentQuestion].instruction === 'Diamond' ? '💎' : ''}
                    </span>
                  )}
                </h2>
              </div>
              
              {countdown > 0 ? (
                <div className="mt-4">
                  <p className="text-gray-600 text-2xl">Time Until Delay:</p>
                  <div className="text-8xl font-bold text-orange-600">{countdown}</div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-4 mt-8">⏳</div>
                  <p className="text-gray-600 text-4xl">Get ready...</p>
                  <p className="text-gray-500 text-sm mt-4">Position your mouse over the hourglass for equal distance to all options</p>
                </div>
              )}
            </div>
                  ) : (
                    <div className="text-center flex-1 flex flex-col justify-center">
                      {/* Question Text - Only shown after button is clicked */}
                      <div className="mb-2">
                        <h2 className={`text-2xl font-semibold text-center ${
                          selectedQuestions[currentQuestion].type === 'color-selection' ? 
                            selectedQuestions[currentQuestion].instruction === 'Green' ? 'text-green-600' :
                            selectedQuestions[currentQuestion].instruction === 'Red' ? 'text-red-600' :
                            selectedQuestions[currentQuestion].instruction === 'Blue' ? 'text-blue-600' :
                            selectedQuestions[currentQuestion].instruction === 'Yellow' ? 'text-yellow-600' :
                            'text-gray-800'
                          : selectedQuestions[currentQuestion].type === 'movement' ? 'text-gray-800'
                          : 'text-gray-800'
                        }`}>
                  {selectedQuestions[currentQuestion].type === 'sequential-click' ? (
                    <>
                      <span className="text-gray-600">Sequential - First:</span> <span className="text-blue-600">{selectedQuestions[currentQuestion].stimulus.first || '?'}</span> <span className="text-gray-600">- Second:</span> <span className="text-green-600">{selectedQuestions[currentQuestion].stimulus.second || '?'}</span>
                    </>
                  ) : selectedQuestions[currentQuestion].type === 'movement' && !stimulusShown ? (
                    <>
                      <span className="text-gray-600">Movement - Move to the</span> <span className="text-green-600">Green</span> <span className="text-gray-600">Corner</span>
                    </>
                  ) : selectedQuestions[currentQuestion].type === 'movement' && stimulusShown ? (
                    ''
                  ) : selectedQuestions[currentQuestion].type === 'color-selection' ? (
                    <>
                      <span className="text-gray-600">Color Selection - Click on</span> <span className={selectedQuestions[currentQuestion].instruction === 'Green' ? 'text-green-600' : selectedQuestions[currentQuestion].instruction === 'Red' ? 'text-red-600' : selectedQuestions[currentQuestion].instruction === 'Blue' ? 'text-blue-600' : selectedQuestions[currentQuestion].instruction === 'Yellow' ? 'text-yellow-600' : 'text-gray-800'}>{selectedQuestions[currentQuestion].instruction}</span>
                    </>
                  ) : (
                    selectedQuestions[currentQuestion].instruction
                  )}
                          {selectedQuestions[currentQuestion].type === 'shape-selection' && (
                            <span className="ml-2">
                              {selectedQuestions[currentQuestion].instruction === 'Circle' ? '⭕' :
                               selectedQuestions[currentQuestion].instruction === 'Triangle' ? '🔺' :
                               selectedQuestions[currentQuestion].instruction === 'Square' ? '⬜' :
                               selectedQuestions[currentQuestion].instruction === 'Diamond' ? '💎' : ''}
                            </span>
                          )}
                        </h2>
                      </div>
                      
                      {selectedQuestions[currentQuestion].type === 'color-selection' && (() => {
                        // Create randomized color array
                        const colors = [
                          { color: 'green', emoji: '🟢' },
                          { color: 'red', emoji: '🔴' },
                          { color: 'blue', emoji: '🔵' },
                          { color: 'yellow', emoji: '🟡' }
                        ];
                        const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
                        
                        return (
                          <div className="flex flex-col items-center gap-4">
                            {/* First Row */}
                            <div className="flex justify-center gap-8">
                              {shuffledColors.slice(0, 2).map((colorObj, index) => (
                                <div 
                                  key={index}
                                  className={`text-6xl transition-transform hover:scale-110 cursor-pointer ${
                                    selectedQuestions[currentQuestion].stimulus.color === colorObj.color 
                                      ? '' 
                                      : 'pointer-events-none'
                                  }`}
                                  onClick={selectedQuestions[currentQuestion].stimulus.color === colorObj.color ? handleStimulusClick : undefined}
                                >
                                  {colorObj.emoji}
                                </div>
                              ))}
                            </div>
                            
                            {/* Second Row */}
                            <div className="flex justify-center gap-8">
                              {shuffledColors.slice(2, 4).map((colorObj, index) => (
                                <div 
                                  key={index + 2}
                                  className={`text-6xl transition-transform hover:scale-110 cursor-pointer ${
                                    selectedQuestions[currentQuestion].stimulus.color === colorObj.color 
                                      ? '' 
                                      : 'pointer-events-none'
                                  }`}
                                  onClick={selectedQuestions[currentQuestion].stimulus.color === colorObj.color ? handleStimulusClick : undefined}
                                >
                                  {colorObj.emoji}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                      {selectedQuestions[currentQuestion].type === 'shape-selection' && (() => {
                        // Create randomized shape array
                        const shapes = [
                          { shape: 'circle', emoji: '⭕' },
                          { shape: 'triangle', emoji: '🔺' },
                          { shape: 'square', emoji: '⬜' },
                          { shape: 'diamond', emoji: '💎' }
                        ];
                        const shuffledShapes = [...shapes].sort(() => Math.random() - 0.5);
                        
                        return (
                          <div className="flex flex-col items-center gap-4">
                            {/* First Row */}
                            <div className="flex justify-center gap-8">
                              {shuffledShapes.slice(0, 2).map((shapeObj, index) => (
                                <div 
                                  key={index}
                                  className={`text-6xl transition-transform hover:scale-110 cursor-pointer ${
                                    selectedQuestions[currentQuestion].stimulus.shape === shapeObj.shape 
                                      ? '' 
                                      : 'pointer-events-none'
                                  }`}
                                  onClick={selectedQuestions[currentQuestion].stimulus.shape === shapeObj.shape ? handleStimulusClick : undefined}
                                >
                                  {shapeObj.emoji}
                                </div>
                              ))}
                            </div>
                            
                            {/* Second Row */}
                            <div className="flex justify-center gap-8">
                              {shuffledShapes.slice(2, 4).map((shapeObj, index) => (
                                <div 
                                  key={index + 2}
                                  className={`text-6xl transition-transform hover:scale-110 cursor-pointer ${
                                    selectedQuestions[currentQuestion].stimulus.shape === shapeObj.shape 
                                      ? '' 
                                      : 'pointer-events-none'
                                  }`}
                                  onClick={selectedQuestions[currentQuestion].stimulus.shape === shapeObj.shape ? handleStimulusClick : undefined}
                                >
                                  {shapeObj.emoji}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                      {selectedQuestions[currentQuestion].type === 'go-no-go' && (() => {
                        // Parse the instruction to find which color to click
                        const instruction = selectedQuestions[currentQuestion].instruction;
                        const clickColor = instruction.match(/Click (\w+)/)?.[1]?.toLowerCase();
                        
                        return (
                          <div className="flex flex-col items-center gap-4">
                            {/* First Row */}
                            <div className="flex justify-center gap-8">
                              {/* Green Circle - Clickable if correct */}
                              <div 
                                className={`text-6xl transition-transform hover:scale-110 cursor-pointer ${
                                  clickColor === 'green' 
                                    ? '' 
                                    : 'pointer-events-none'
                                }`}
                                onClick={clickColor === 'green' ? handleStimulusClick : undefined}
                              >
                                🟢
                              </div>
                              
                              {/* Red Circle - Clickable if correct */}
                              <div 
                                className={`text-6xl transition-transform hover:scale-110 cursor-pointer ${
                                  clickColor === 'red' 
                                    ? '' 
                                    : 'pointer-events-none'
                                }`}
                                onClick={clickColor === 'red' ? handleStimulusClick : undefined}
                              >
                                🔴
                              </div>
                            </div>
                            
                            {/* Second Row */}
                            <div className="flex justify-center gap-8">
                              {/* Blue Circle - Clickable if correct */}
                              <div 
                                className={`text-6xl transition-transform hover:scale-110 cursor-pointer ${
                                  clickColor === 'blue' 
                                    ? '' 
                                    : 'pointer-events-none'
                                }`}
                                onClick={clickColor === 'blue' ? handleStimulusClick : undefined}
                              >
                                🔵
                              </div>
                              
                              {/* Yellow Circle - Clickable if correct */}
                              <div 
                                className={`text-6xl transition-transform hover:scale-110 cursor-pointer ${
                                  clickColor === 'yellow' 
                                    ? '' 
                                    : 'pointer-events-none'
                                }`}
                                onClick={clickColor === 'yellow' ? handleStimulusClick : undefined}
                              >
                                🟡
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                      {selectedQuestions[currentQuestion].type === 'sequential-click' && sequentialOrder && (
                        <div className="flex justify-center gap-12">
                          {/* Left number */}
                          <div 
                            className={`text-6xl transition-transform duration-200 rounded-full w-20 h-20 flex items-center justify-center font-bold ${
                              sequentialOrder.first === 0 
                                ? (firstNumberClicked ? 'bg-blue-100 text-blue-800 opacity-50' : 'bg-blue-100 text-blue-800 cursor-pointer hover:scale-110')
                                : (firstNumberClicked ? 'bg-green-100 text-green-800 cursor-pointer hover:scale-110' : 'bg-green-100 text-green-800 pointer-events-none opacity-50')
                            }`}
                            onClick={() => handleSequentialClick(sequentialOrder.first === 0 ? 'first' : 'second')}
                          >
                            {sequentialOrder.first === 0 ? selectedQuestions[currentQuestion].stimulus.first : selectedQuestions[currentQuestion].stimulus.second}
                          </div>
                          
                          {/* Right number */}
                          <div 
                            className={`text-6xl transition-transform duration-200 rounded-full w-20 h-20 flex items-center justify-center font-bold ${
                              sequentialOrder.second === 1 
                                ? (firstNumberClicked ? 'bg-green-100 text-green-800 cursor-pointer hover:scale-110' : 'bg-green-100 text-green-800 pointer-events-none opacity-50')
                                : (firstNumberClicked ? 'bg-blue-100 text-blue-800 opacity-50' : 'bg-blue-100 text-blue-800 cursor-pointer hover:scale-110')
                            }`}
                            onClick={() => handleSequentialClick(sequentialOrder.second === 1 ? 'second' : 'first')}
                          >
                            {sequentialOrder.second === 1 ? selectedQuestions[currentQuestion].stimulus.second : selectedQuestions[currentQuestion].stimulus.first}
                          </div>
                        </div>
                      )}
                      {selectedQuestions[currentQuestion].type === 'movement' && targetCorner && (
                        <div className="relative w-[475px] h-[475px] bg-gray-100 border-2 border-gray-300 rounded-lg mx-auto">
                          {/* Top-Left Corner */}
                          <div 
                            className={`absolute top-0 left-0 w-11 h-11 rounded-br-lg cursor-pointer transition-all duration-200 border-2 border-gray-400 z-40 ${
                              targetCorner === 'top-left' 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            onMouseEnter={() => handleCornerHover('top-left')}
                          />
                          {/* Top-Right Corner */}
                          <div 
                            className={`absolute top-0 right-0 w-11 h-11 rounded-bl-lg cursor-pointer transition-all duration-200 border-2 border-gray-400 z-40 ${
                              targetCorner === 'top-right' 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            onMouseEnter={() => handleCornerHover('top-right')}
                          />
                          {/* Bottom-Left Corner */}
                          <div 
                            className={`absolute bottom-0 left-0 w-11 h-11 rounded-tr-lg cursor-pointer transition-all duration-200 border-2 border-gray-400 z-40 ${
                              targetCorner === 'bottom-left' 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            onMouseEnter={() => handleCornerHover('bottom-left')}
                          />
                          {/* Bottom-Right Corner */}
                          <div 
                            className={`absolute bottom-0 right-0 w-11 h-11 rounded-tl-lg cursor-pointer transition-all duration-200 border-2 border-gray-400 z-40 ${
                              targetCorner === 'bottom-right' 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            onMouseEnter={() => handleCornerHover('bottom-right')}
                          />
                          {/* Center text showing target corner */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-2xl font-bold text-gray-800 bg-white px-6 py-3 rounded-lg shadow-lg">
                              Move to the <span className="text-green-600">green</span> corner
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedQuestions[currentQuestion].type === 'color-selection' ? (
                        <p className="text-gray-500 text-sm mt-8">Click the {selectedQuestions[currentQuestion].instruction} circle above (others are disabled)</p>
                      ) : selectedQuestions[currentQuestion].type === 'shape-selection' ? (
                        <p className="text-gray-500 text-sm mt-8">Click the {selectedQuestions[currentQuestion].instruction} above (others are disabled)</p>
                      ) : selectedQuestions[currentQuestion].type === 'sequential-click' ? (
                        <p className="text-gray-500 text-sm mt-8">Click the numbers in the correct order: {selectedQuestions[currentQuestion].instruction}</p>
                      ) : null}
                    </div>
                  )}
                </div>


              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Reaction Time Test Results - {reactionResults?.level} Level | TestYourself</title>
        <meta name="description" content="View your reaction time test results and get insights about your speed and accuracy." />
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
                  {showShare ? '📤 Hide Share' : '📤 Share Results'}
                </button>
                <button
                  onClick={handleReviewToggle}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  {showReview ? '📋 Hide Review' : '📋 Review Answers'}
                </button>
                <button
                  onClick={handleRetakeTest}
                  className="px-8 py-3 bg-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  🔄 Retake Test
                </button>
                <button
                  onClick={handleSaveResults}
                  className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  💾 Save Results
                </button>
              </div>
            </div>
          )}

            {/* Title Box - Always visible */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl shadow-lg p-3 mb-2">
              <h1 className="text-lg font-bold text-orange-800 text-center">
                Reaction Time Test Results - Speed & Accuracy Assessment
              </h1>
            </div>

            {/* Share State */}
            {showShare && reactionResults && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Share Your Results</h2>
                
                <div className="flex justify-center mb-6">
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

            {/* Review State */}
            {showReview && reactionResults && (
              <div className="bg-white rounded-2xl shadow-lg p-5 mb-2">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Question Review</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedQuestions.map((question, index) => {
                    const userAnswer = answers[index];
                    const reactionTime = reactionTimes[index];
                    const hasResponse = userAnswer !== undefined && reactionTime !== undefined;
                    
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-800 text-sm">Question {index + 1}</h3>
                        </div>
                        <p className="text-gray-700 mb-1 text-sm">Action: {question.instruction}</p>
                        <div className="text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Reaction Time:</span>
                            <span className="ml-1">{reactionTime ? `${reactionTime}ms` : 'N/A'}</span>
                          </div>
                        </div>
                        <div className="mt-1">
                          <span className="font-medium text-gray-600 text-sm">Test Type:</span>
                          <span className="ml-1 text-sm">{question.type === 'color-selection' ? 'Color Selection' : question.type === 'sequential-click' ? 'Sequential Click' : question.type === 'movement' ? 'Movement' : question.category.charAt(0).toUpperCase() + question.category.slice(1).replace('-', ' ')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
              </div>
            )}

            {/* Main Results - Only show when not in share or review mode */}
            {!showShare && !showReview && reactionResults && (
              <>
                {/* Your Results and Key Insights - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-2">
                  {/* Your Results - 40% width */}
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl shadow-lg p-5 h-full flex flex-col justify-center">
                      <div className="text-center">
                        <h2 className="text-xl text-orange-800 mb-1">
                          <span className="font-bold">Your Results</span>
                        </h2>
                        <p className="text-lg text-orange-700 mb-3">Here's what we discovered about your<br /><span className="font-bold">reaction time</span></p>
                        <div className="text-5xl font-bold text-orange-600 mb-2">{reactionResults.averageReactionTime}ms</div>
                        <div className="text-2xl font-semibold text-gray-800 mb-2">{reactionResults.level}</div>
                      </div>
                    </div>
                  </div>

                  {/* Key Insights - 60% width */}
                  <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg p-5 h-full flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights</h3>
                      <div className="space-y-3">
                        <p className="text-gray-700">{reactionResults.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Strengths</h4>
                            <ul className="text-gray-700 space-y-1">
                              {reactionResults.strengths.map((strength, index) => (
                                <li key={index}>• {strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Areas for Growth</h4>
                            <ul className="text-gray-700 space-y-1">
                              {reactionResults.areasForGrowth.map((area, index) => (
                                <li key={index}>• {area}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Breakdown and Recommendations - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
                  {/* Category Breakdown */}
                  <div className="bg-white rounded-2xl shadow-lg p-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Color Selection Reaction</span>
                        <span className="font-semibold text-gray-800">{reactionResults.categoryAverages['color-selection']}ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Sequential Click Reaction</span>
                        <span className="font-semibold text-gray-800">{reactionResults.categoryAverages['sequential-click']}ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Movement Reaction</span>
                        <span className="font-semibold text-gray-800">{reactionResults.categoryAverages['movement']}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h3>
                    <div className="space-y-1">
                      {reactionResults.recommendations.map((rec, index) => (
                        <div key={index} className="text-gray-700">• {rec}</div>
                      ))}
                    </div>
                  </div>
                </div>

              </>
            )}

            {/* Bottom Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleShareToggle}
                  className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  {showShare ? '📤 Hide Share' : '📤 Share Results'}
                </button>
                <button
                  onClick={handleReviewToggle}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  {showReview ? '📋 Hide Review' : '📋 Review Answers'}
                </button>
                <button
                  onClick={handleRetakeTest}
                  className="px-8 py-3 bg-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  🔄 Retake Test
                </button>
                <button
                  onClick={handleSaveResults}
                  className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  💾 Save Results
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

