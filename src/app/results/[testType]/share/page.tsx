'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Head from 'next/head'
import { personalityTypes } from '@/lib/personalityTest'
import { stressTypes } from '@/lib/stressTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SharePage() {
  const { testType } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Save Results functionality
  const saveResults = () => {
    const timestamp = new Date().toLocaleString()
    let content = `TestYourself - ${Array.isArray(testType) ? testType[0]?.charAt(0).toUpperCase() + testType[0]?.slice(1) : testType?.charAt(0).toUpperCase() + testType?.slice(1)} Test Results
Date: ${timestamp}

`

    switch (testType) {
      case 'math':
        const mathResults = JSON.parse(searchParams.get('results') || '{}')
        const mathAnswers = JSON.parse(searchParams.get('answers') || '[]')
        const mathQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `Math Test Results
Date: ${timestamp}

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
${mathResults.strengths.map((strength: string) => `- ${strength}`).join('\n')}

Areas for Growth:
${mathResults.areasForGrowth.map((area: string) => `- ${area}`).join('\n')}

Recommendations:
${mathResults.recommendations.map((rec: string) => `- ${rec}`).join('\n')}

Question Review:
${mathQuestions.map((question: any, index: number) => {
          const userAnswer = mathAnswers[index];
          const correctAnswer = question.correct;
          const isCorrect = userAnswer === correctAnswer;
          
          return `QUESTION ${index + 1}: ${question.question}
Your Answer: ${userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
Correct Answer: ${question.options[correctAnswer]}
Result: ${isCorrect ? 'Correct' : 'Incorrect'}
Category: ${question.category.charAt(0).toUpperCase() + question.category.slice(1)}
`
        }).join('\n')}`
        break

      case 'color-blindness':
        const colorBlindnessResults = JSON.parse(searchParams.get('results') || '{}')
        const colorBlindnessAnswers = JSON.parse(searchParams.get('answers') || '[]')
        const colorBlindnessQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `Color Blindness Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${colorBlindnessResults.totalQuestions}
- Correct Answers: ${colorBlindnessResults.totalScore}
- Accuracy: ${colorBlindnessResults.accuracy}%
- Result: ${colorBlindnessResults.colorBlindnessType}

Description:
${colorBlindnessResults.description}

Recommendations:
${colorBlindnessResults.recommendations.map((rec: string) => `- ${rec}`).join('\n')}

Key Insights:
${colorBlindnessResults.insights.map((insight: string) => `- ${insight}`).join('\n')}

Question Review:
${colorBlindnessAnswers.map((answer: number, index: number) => {
          const question = colorBlindnessQuestions[index]
          const selectedOption = question.options[answer]
          const isCorrect = answer === question.correctAnswer
          return `Plate ${index + 1}: What number do you see in this image?
Your Answer: ${selectedOption.text} ${isCorrect ? '(Correct)' : '(Incorrect)'}
Correct Answer: ${question.options[question.correctAnswer].text}
`
        }).join('\n')}`
        break

      case 'personality':
        const personalityType = searchParams.get('type') || 'Unknown'
        const questions = JSON.parse(searchParams.get('questions') || '[]')
        const answers = JSON.parse(searchParams.get('answers') || '{}')
        const personality = personalityTypes[personalityType as string]
        
        content += `Personality Type: ${personalityType}
${personality ? `Name: ${personality.name}` : ''}
${personality ? `Description: ${personality.description}` : ''}

${personality ? `Traits:
${personality.traits.map((trait: string) => `- ${trait}`).join('\n')}

Areas for Growth:
${personality.weaknesses.map((weakness: string) => `- ${weakness}`).join('\n')}` : ''}

Question Review:
${questions.map((question: any, index: number) => {
          const userAnswer = answers[question.id]
          const userAnswerText = userAnswer ? question.options.find((opt: any) => opt.type === userAnswer)?.text : 'No answer'
          const typeMapping: Record<string, string> = {
            'E': 'Extraversion',
            'I': 'Introversion',
            'S': 'Sensing',
            'N': 'Intuition',
            'T': 'Thinking',
            'F': 'Feeling',
            'J': 'Judging',
            'P': 'Perceiving'
          }
          return `${index + 1}. ${question.question}
   Your Answer: ${userAnswerText}
   Type: ${typeMapping[userAnswer] || userAnswer || 'Unknown'}
`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'trivia':
        const score = parseInt(searchParams.get('score') || '0', 10) || 0
        const speed = searchParams.get('speed') || 'Unknown'
        const correct = parseInt(searchParams.get('correct') || '0', 10) || 0
        const total = parseInt(searchParams.get('total') || '0', 10) || 0
        const triviaQuestions = JSON.parse(searchParams.get('questions') || '[]')
        const triviaAnswers = JSON.parse(searchParams.get('answers') || '{}')
        
        content += `Trivia Quiz Results:
- Score: ${score}/100
- Correct Answers: ${correct}/${total}
- Speed: ${speed}
- Accuracy: ${total > 0 ? Math.round((correct / total) * 100) : 0}%

Question Review:
${triviaQuestions.map((question: any, index: number) => {
          const userAnswer = triviaAnswers[question.id]
          const isCorrect = userAnswer === question.correct
          const userAnswerText = userAnswer === -1 ? 'No answer' : question.options[userAnswer]
          const correctAnswerText = question.options[question.correct]
          return `${index + 1}. ${question.question}
   Your Answer: ${userAnswerText} ${isCorrect ? '(Correct)' : '(Incorrect)'}
   Correct Answer: ${correctAnswerText}
   Category: ${question.category}
`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'optical-illusion':
        const results = JSON.parse(searchParams.get('results') || '{}')
        const illusions = JSON.parse(searchParams.get('illusions') || '[]')
        const illusionAnswers = JSON.parse(searchParams.get('answers') || '{}')
        
        content += `Optical Illusion Test Results:

Your Results:
- Overall Type: ${results.overallType || 'Visual Perceiver'}
- Description: Your visual perception reveals unique insights about your cognitive style

Your Visual Processing Style:
${results.personalityTraits ? Object.entries(results.personalityTraits).map(([trait, count]) => 
  `- ${trait}: ${Number(count) || 0} times (${results.totalQuestions > 0 ? Math.round((Number(count) / Number(results.totalQuestions)) * 100) : 0}%)`
).join('\n') : 'No traits data available'}

${results.insights && results.insights.length > 0 ? `Insights:
${results.insights.map((insight: string) => `- ${insight}`).join('\n')}` : ''}

Question Review:
${illusions.map((illusion: any, index: number) => {
          const userAnswer = illusionAnswers[illusion.id]
          return `${index + 1}. ${illusion.title}
   Your Answer: ${userAnswer ? userAnswer.text : 'No answer'}
   Description: ${illusion.description || 'No description available'}
`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'decision-making-test':
        const decisionMakingResults = JSON.parse(searchParams.get('results') || '{}')
        const decisionMakingAnswers = JSON.parse(searchParams.get('answers') || '{}')
        const decisionMakingQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `Decision Making Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${decisionMakingResults.totalQuestions}
- Correct Answers: ${decisionMakingResults.correctAnswers}
- Accuracy Score: ${decisionMakingResults.accuracy}%
- Speed Score: ${decisionMakingResults.speedScore}%
- Level: ${decisionMakingResults.level}
- Average Time: ${decisionMakingResults.averageTime}s per question

Category Breakdown:
${Object.entries(decisionMakingResults.categoryScores).map(([category, score]) => {
  const categoryQuestions = decisionMakingQuestions.filter((q: any) => q.category === category);
  const correctAnswers = categoryQuestions.filter((q: any) => decisionMakingAnswers[q.id] === q.correct);
  const correctCount = correctAnswers.length;
  const totalCount = categoryQuestions.length;
  const actualPercentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  return `- ${category}: ${actualPercentage}% (${correctCount}/${totalCount})`;
}).join('\n')}

Description:
${decisionMakingResults.description}

What This Means for You:
${decisionMakingResults.accuracy >= 80 ? 
  'Your decision-making skills show strong judgment and reasoning abilities. You demonstrate excellent decision-making across various scenarios and situations.' :
  decisionMakingResults.accuracy >= 60 ?
  'Your decision-making skills show solid judgment with good reasoning abilities. You have strong foundational decision-making skills with room for refinement.' :
  'Your decision-making skills show developing judgment abilities. Consider practicing decision-making exercises and studying decision-making frameworks.'}

Practical Applications:
${decisionMakingResults.accuracy >= 80 ? 
  'Your strong decision-making skills can help with leadership roles, complex problem-solving, and strategic planning in both personal and professional contexts.' :
  decisionMakingResults.accuracy >= 60 ?
  'Your decision-making skills provide a good foundation for handling everyday decisions and can be developed further for more complex situations.' :
  'Building decision-making skills can enhance your ability to handle challenges, make better choices, and improve your judgment in various situations.'}

Question Review:
${decisionMakingQuestions.map((q: any, index: number) => {
  const userAnswer = decisionMakingAnswers[q.id]
  const isCorrect = userAnswer === q.correct
  const userAnswerText = userAnswer !== undefined ? q.options[userAnswer] : 'Not answered'
  const correctAnswerText = q.options[q.correct]
  
  return `Question ${index + 1}: ${q.question}
Your Answer: ${userAnswerText} ${isCorrect ? '✓' : '✗'}
Correct Answer: ${correctAnswerText}
Category: ${q.category}

`
}).join('')}

Generated by TestYourself.com
`
        break

      case 'memory':
        const memoryResults = JSON.parse(searchParams.get('results') || '{}')
        const memoryChallenges = JSON.parse(searchParams.get('challenges') || '[]')
        const memoryAnswers = JSON.parse(searchParams.get('answers') || '{}')
        
        content += `Memory Challenge Results:

Your Results:
- Performance: ${memoryResults.performance || 'Memory Performance'}
- Challenge Score: ${Number(memoryResults.memoryScore) || 0}%
- Detailed Accuracy: ${Number(memoryResults.detailedAccuracy) || 0}%
- Total Correct: ${Number(memoryResults.totalCorrect) || 0}/${Number(memoryResults.totalItems) || 0}
- Detailed Correct: ${Number(memoryResults.totalCorrectItems) || 0}/${Number(memoryResults.totalDetailedItems) || 0}

Challenge Review:
${memoryChallenges.map((challenge: any, index: number) => {
          const userAnswer = memoryAnswers[challenge.id]
          const isCorrect = userAnswer && userAnswer.correct
          return `${index + 1}. ${challenge.title}
   Your Answer: ${userAnswer ? userAnswer.answer : 'No answer'}
   Correct: ${isCorrect ? 'Yes' : 'No'}
   Description: ${challenge.description || 'No description available'}
`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'emotional-intelligence':
        const eqResults = JSON.parse(searchParams.get('results') || '{}')
        const eqQuestions = JSON.parse(searchParams.get('questions') || '[]')
        const eqAnswers = JSON.parse(searchParams.get('answers') || '[]')
        
        content += `Emotional Intelligence Test Results:

Overall Results:
- EQ Level: ${eqResults.overallLevel || 'EQ Assessment'}
- Overall Score: ${eqResults.totalScore || 0}/5
- Description: ${eqResults.description || 'Emotional intelligence assessment results'}

EQ Components:
- Self-Awareness: ${eqResults.selfAwareness || 0}/5
- Self-Regulation: ${eqResults.selfRegulation || 0}/5
- Motivation: ${eqResults.motivation || 0}/5
- Empathy: ${eqResults.empathy || 0}/5
- Social Skills: ${eqResults.socialSkills || 0}/5

Areas for Growth:
${eqResults.areasForGrowth && eqResults.areasForGrowth.length > 0 ? eqResults.areasForGrowth.map((area: string) => `- ${area}`).join('\n') : '- Great job! Keep maintaining your EQ skills'}

Key Insights:
${eqResults.insights && eqResults.insights.length > 0 ? eqResults.insights.map((insight: string) => `- ${insight}`).join('\n') : '- Continue developing your emotional intelligence'}

Question Review:
${eqQuestions.map((question: any, index: number) => {
          const userAnswer = eqAnswers[index]
          const selectedOption = question.options[userAnswer]
          return `${index + 1}. ${question.question}
   Your Answer: ${selectedOption}
   Category: ${question.category}
`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'reaction-time':
        const reactionTimeResults = JSON.parse(searchParams.get('results') || '{}')
        const reactionTimeAnswers = JSON.parse(searchParams.get('answers') || '[]')
        const reactionTimes = JSON.parse(searchParams.get('reactionTimes') || '[]')
        const reactionTimeQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `Reaction Time Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${reactionTimeResults.totalQuestions}
- Average Reaction Time: ${reactionTimeResults.averageReactionTime}ms
- Level: ${reactionTimeResults.level}
- Accuracy: ${reactionTimeResults.accuracy}%

Description:
${reactionTimeResults.description}

Category Breakdown:
- Color Selection Reaction: ${reactionTimeResults.categoryAverages['color-selection']}ms
- Sequential Click Reaction: ${reactionTimeResults.categoryAverages['sequential-click']}ms
- Movement Reaction: ${reactionTimeResults.categoryAverages['movement']}ms

Strengths:
${reactionTimeResults.strengths.map((strength: string) => `- ${strength}`).join('\n')}

Areas for Growth:
${reactionTimeResults.areasForGrowth.map((area: string) => `- ${area}`).join('\n')}

Recommendations:
${reactionTimeResults.recommendations.map((rec: string) => `- ${rec}`).join('\n')}

Question Review:
${reactionTimeQuestions.map((question: any, index: number) => {
          const userAnswer = reactionTimeAnswers[index];
          const reactionTime = reactionTimes[index];
          const hasResponse = userAnswer !== undefined && reactionTime !== undefined;
          
          return `QUESTION ${index + 1}: ${question.instruction}
Reaction Time: ${reactionTime ? `${reactionTime}ms` : 'N/A'}
Test Type: ${question.type === 'color-selection' ? 'Color Selection' : question.type === 'sequential-click' ? 'Sequential Click' : question.type === 'movement' ? 'Movement' : question.category.charAt(0).toUpperCase() + question.category.slice(1).replace('-', ' ')}
Response: ${hasResponse ? 'Completed' : 'No response'}
`}).join('\n')}`
        break

      case 'stress-test':
        const stressType = searchParams.get('type') || 'Unknown'
        const stressQuestions = JSON.parse(searchParams.get('questions') || '[]')
        const stressAnswers = JSON.parse(searchParams.get('answers') || '{}')
        const stress = stressTypes[stressType as keyof typeof stressTypes]
        
        content += `Stress Evaluation Results
Date: ${timestamp}

Stress Level: ${stressType}
${stress ? `Name: ${stress.name}` : ''}

${stress ? `Recommendations:
${stress.recommendations.map((recommendation: string) => `- ${recommendation}`).join('\n')}

Strengths:
${stress.traits.map((trait: string) => `- ${trait}`).join('\n')}

Areas for Growth:
${stress.weaknesses.map((weakness: string) => `- ${weakness}`).join('\n')}` : ''}

Question Review:
${stressQuestions.map((question: any, index: number) => {
          const userAnswer = stressAnswers[question.id]
          const userAnswerText = userAnswer ? question.options.find((opt: any) => opt.type === userAnswer)?.text : 'No answer'
          return `Question ${index + 1}: ${question.question}
Your Answer: ${userAnswerText}`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'iq-test':
        const iqResults = JSON.parse(searchParams.get('results') || '{}')
        const iqAnswers = JSON.parse(searchParams.get('answers') || '{}')
        const iqQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `IQ Measurement Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${iqResults.totalQuestions}
- Correct Answers: ${iqResults.correctAnswers}
- Accuracy: ${iqResults.accuracy}%
- IQ Score: ${iqResults.iqScore}
- IQ Level: ${iqResults.level}

Description:
${iqResults.description}

Question Review:
${iqQuestions.map((question: any, index: number) => {
          const userAnswer = iqAnswers[question.id]
          const isCorrect = userAnswer === question.correct
          const userAnswerText = userAnswer !== undefined ? question.options[userAnswer] : 'No answer'
          const correctAnswerText = question.options[question.correct]
          return `QUESTION ${index + 1}: ${question.question}
Your Answer: ${userAnswerText} ${isCorrect ? '(Correct)' : '(Incorrect)'}
Correct Answer: ${correctAnswerText}
Category: ${question.category.charAt(0).toUpperCase() + question.category.slice(1)}
Difficulty: ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'time-management-test':
        const timeResults = JSON.parse(searchParams.get('results') || '{}')
        const timeAnswers = JSON.parse(searchParams.get('answers') || '{}')
        const timeQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `Time Management Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${timeResults.totalQuestions}
- Completed Questions: ${timeResults.answeredQuestions}
- Overall Score: ${timeResults.overallScore}%
- Time Management Style: ${timeResults.style}

Description:
${timeResults.styleDescription}

Key Insights:
${timeResults.keyInsights}

Category Breakdown:
- Planning & Prioritization: ${timeResults.categoryScores.planning}%
- Time Awareness: ${timeResults.categoryScores['time-awareness']}%
- Productivity Habits: ${timeResults.categoryScores.productivity}%
- Stress & Workload: ${timeResults.categoryScores.stress}%

Recommendations:
${timeResults.recommendations.map((rec: string) => `- ${rec}`).join('\n')}

Question Review:
${timeQuestions.map((question: any, index: number) => {
          const userAnswer = timeAnswers[question.id]
          const userAnswerText = userAnswer !== undefined ? question.options[userAnswer] : 'No answer'
          return `QUESTION ${index + 1}: ${question.question}
Your Answer: ${userAnswerText}
Category: ${question.category.charAt(0).toUpperCase() + question.category.slice(1).replace('-', ' ')}
Explanation: ${question.explanation}
`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'spatial-reasoning-test':
        const spatialResults = JSON.parse(searchParams.get('results') || '{}')
        const spatialAnswers = JSON.parse(searchParams.get('answers') || '{}')
        const spatialQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `Spatial Reasoning Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${spatialResults.totalQuestions}
- Correct Answers: ${spatialResults.correctAnswers}
- Accuracy: ${spatialResults.accuracy}%
- Spatial Reasoning Level: ${spatialResults.level}

Description:
${spatialResults.description}

Category Breakdown:
- Mental Rotation: ${spatialResults.categoryScores['Mental Rotation']}%
- 2D/3D Visualization: ${spatialResults.categoryScores['2D/3D Visualization']}%
- Spatial Relationships: ${spatialResults.categoryScores['Spatial Relationships']}%
- Geometric Reasoning: ${spatialResults.categoryScores['Geometric Reasoning']}%

Question Review:
${spatialQuestions.map((question: any, index: number) => {
          const userAnswer = spatialAnswers[question.id]
          const correctAnswerText = question.options[question.correct]
          const isCorrect = userAnswer === correctAnswerText
          return `QUESTION ${index + 1}: ${question.question}
Your Answer: ${userAnswer !== undefined ? userAnswer : 'Not answered'}
Correct Answer: ${correctAnswerText}
Result: ${isCorrect ? 'Correct' : 'Incorrect'}
Category: ${question.category}
Difficulty: ${question.difficulty}
Explanation: ${question.explanation}
`
        }).join('\n')}

Generated by TestYourself
Visit https://testyourself.com for more tests!`
        break

      case 'world-geography-test':
        const geographyResults = JSON.parse(searchParams.get('results') || '{}')
        const geographyAnswers = JSON.parse(searchParams.get('answers') || '{}')
        const geographyQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `World Geography Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${geographyResults.totalQuestions}
- Correct Answers: ${geographyResults.correctAnswers}
- Accuracy: ${geographyResults.accuracy}%
- Level: ${geographyResults.level}
- Average Time: ${geographyResults.averageTime}s per question

Category Breakdown:
${Object.entries(geographyResults.categoryScores).map(([category, score]) => `- ${category}: ${score}%`).join('\n')}

Description:
${geographyResults.description}

Question Review:
${geographyQuestions.map((q: any, index: number) => {
  const userAnswer = geographyAnswers[q.id]
  const isCorrect = userAnswer === q.correct
  const userAnswerText = userAnswer !== undefined ? q.options[userAnswer] : 'Not answered'
  const correctAnswerText = q.options[q.correct]
  
  return `Question ${index + 1}: ${q.question}
Your Answer: ${userAnswerText} ${isCorrect ? '✓' : '✗'}
Correct Answer: ${correctAnswerText}
Category: ${q.category}

`
}).join('')}

Generated by TestYourself.com
`
        break

      case 'creativity-test':
        const creativityResults = JSON.parse(searchParams.get('results') || '{}')
        const creativityAnswers = JSON.parse(searchParams.get('answers') || '{}')
        const creativityQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `Creativity Explorer Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${creativityResults.totalQuestions}
- Your Creative Type: ${creativityResults.creativityType}
- Description: ${creativityResults.description}

Creative Preferences:
- Innovation: ${creativityResults.innovationPreference}%
- Research: ${creativityResults.researchPreference}%
- Practical: ${creativityResults.practicalPreference}%
- Bold: ${creativityResults.boldPreference}%
- Collaborative: ${creativityResults.collaborativePreference}%
- Intuitive: ${creativityResults.intuitivePreference}%

Strengths:
${creativityResults.strengths.map((strength: string) => `- ${strength}`).join('\n')}

Areas for Growth:
${creativityResults.areasForGrowth.map((area: string) => `- ${area}`).join('\n')}

Question Review:
${creativityQuestions.map((q: any, index: number) => {
  const userAnswer = creativityAnswers[q.id]
  const rankingText = userAnswer && userAnswer.length === 4 ? 
    userAnswer.map((rankIndex: number, rank: number) => {
      const option = q.options[rankIndex]
      return `${rank + 1}. [Option ${rankIndex + 1}] ${option.text} (${option.type})`
    }).join('\n   ') : 'Not ranked'
  
  return `Question ${index + 1}: ${q.question}
Your Ranking:
   ${rankingText}

`
}).join('')}

Generated by TestYourself.com
`
        break

      default:
        content += `Test Results saved successfully!

Generated by TestYourself
Visit https://testyourself.com for more tests!`
    }

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${testType === 'personality' ? 'character-assessment' : testType}-test-results-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Generate share content based on test type
  const getShareContent = () => {
    const baseUrl = window.location.origin
    const testName = (testType as string).charAt(0).toUpperCase() + (testType as string).slice(1).replace('-', ' ')
    
    let title = ''
    let description = ''
    let hashtags = '#TestYourself #SelfDiscovery'
    
    switch (testType) {
      case 'math':
        title = 'I just completed a math assessment!'
        description = 'Take the math test and assess your mathematical abilities across different categories!'
        hashtags = '#MathTest #MathAssessment #Mathematics #TestYourself #MathSkills'
        break
      case 'personality':
        title = 'I just discovered my character type!'
        description = 'Take the character assessment and discover your personality type. Find out what makes you unique!'
        hashtags = '#CharacterAssessment #PersonalityTest #SelfDiscovery #TestYourself #PersonalityType'
        break
      case 'emotional-intelligence':
        title = 'I just tested my emotional intelligence!'
        description = 'Discover your EQ level and emotional awareness. Take the emotional intelligence test!'
        hashtags = '#EmotionalIntelligence #EQTest #SelfAwareness #Empathy #TestYourself #EQAssessment'
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
      case 'color-blindness':
        title = 'I just tested my color vision!'
        description = 'Discover your color perception with the Ishihara color blindness test!'
        hashtags = '#ColorBlindnessTest #ColorVision #IshiharaTest #TestYourself #ColorPerception'
        break
      case 'reaction-time':
        title = 'I just tested my reaction time!'
        description = 'How fast are your reflexes? Test your speed and accuracy with this reaction time challenge!'
        hashtags = '#ReactionTimeTest #SpeedTest #Reflexes #TestYourself #CognitiveTest'
        break
      case 'stress-test':
        title = 'I just completed a stress evaluation!'
        description = 'Discover your stress levels and learn effective coping strategies with this stress assessment!'
        hashtags = '#StressEvaluation #StressManagement #MentalHealth #TestYourself #StressAssessment'
        break
      case 'typing':
        title = 'I just tested my typing speed!'
        description = 'How fast can you type? Test your speed and accuracy with this typing challenge!'
        hashtags = '#TypingTest #TypingSpeed #TestYourself #Skills'
        break
      case 'iq-test':
        title = 'I just completed an IQ measurement test!'
        description = 'Discover your intelligence quotient and cognitive abilities with this comprehensive IQ test!'
        hashtags = '#IQTest #IntelligenceQuotient #CognitiveTest #TestYourself #IQMeasurement'
        break
      case 'time-management-test':
        title = 'I just tested my time management skills!'
        description = 'Discover your productivity style and get personalized recommendations for better time management!'
        hashtags = '#TimeManagementTest #ProductivityTest #TimeManagementSkills #TestYourself #ProductivityAssessment'
        break
      case 'spatial-reasoning-test':
        title = 'I just tested my spatial reasoning abilities!'
        description = 'Discover your 3D visualization skills and spatial thinking patterns!'
        hashtags = '#SpatialReasoningTest #3DVisualization #SpatialThinking #TestYourself #CognitiveAssessment'
        break
      case 'world-geography-test':
        title = 'I just tested my world geography knowledge!'
        description = 'Discover your global knowledge of countries, capitals, landmarks, and physical geography!'
        hashtags = '#WorldGeographyTest #GeographyChallenge #GlobalKnowledge #CountriesCapitals #TestYourself'
        break
      case 'decision-making-test':
        title = 'I just tested my decision-making skills!'
        description = 'Discover your judgment abilities in workplace leadership, personal decisions, ethical dilemmas, crisis management, and strategic thinking!'
        hashtags = '#DecisionMakingTest #JudgmentAssessment #LeadershipDecisions #EthicalDilemmas #TestYourself'
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

  const handleXShare = () => {
    const content = getShareContent()
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.text)}&url=${encodeURIComponent(content.url)}`
    window.open(url, '_blank', 'width=800,height=600')
  }

  const handleFacebookShare = () => {
    // Facebook sharing disabled - requires live site
    alert('Facebook sharing will be available when the site is live!')
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

  // Dynamic SEO content based on test type
  const getSEOContent = () => {
    const baseUrl = 'https://testyourself.com'
    
    switch (testType) {
      case 'math':
        return {
          title: 'Share Math Test Results | TestYourself',
          description: 'Share your math test results with friends and family. Let them assess their mathematical abilities across different categories too! Take our free math test.',
          keywords: 'share math test results, math assessment results, mathematics test sharing, math skills sharing, free math test, math test results',
          ogTitle: 'Share Math Test Results',
          ogDescription: 'Share your math test results with friends and family. Let them assess their mathematical abilities too!',
          ogImage: `${baseUrl}/images/math-test-share-og.jpg`,
          canonical: `${baseUrl}/results/math/share`
        }
      case 'personality':
        return {
          title: 'Share Character Assessment Results | TestYourself',
          description: 'Share your character assessment results with friends and family. Let them discover their personality type and character traits too! Take our free personality test.',
          keywords: 'share character assessment, share personality test results, character assessment results, personality type sharing, character traits sharing, free personality test',
          ogTitle: 'Share Character Assessment Results',
          ogDescription: 'Share your character assessment results with friends and family. Let them discover their personality type too!',
          ogImage: `${baseUrl}/images/character-assessment-share-og.jpg`,
          canonical: `${baseUrl}/results/personality/share`
        }
      case 'emotional-intelligence':
        return {
          title: 'Share Emotional Intelligence Test Results | TestYourself',
          description: 'Share your emotional intelligence test results with friends and family. Let them discover their EQ level and emotional awareness too! Take our free EQ test.',
          keywords: 'share emotional intelligence results, share EQ test results, emotional intelligence sharing, EQ level sharing, emotional awareness sharing, free EQ test',
          ogTitle: 'Share Emotional Intelligence Test Results',
          ogDescription: 'Share your emotional intelligence test results with friends and family. Let them discover their EQ level too!',
          ogImage: `${baseUrl}/images/emotional-intelligence-share-og.jpg`,
          canonical: `${baseUrl}/results/emotional-intelligence/share`
        }
      case 'trivia':
        return {
          title: 'Share Trivia Quiz Results | TestYourself',
          description: 'Share your trivia quiz results and challenge others to beat your score!',
          canonical: `${baseUrl}/results/trivia/share`
        }
      case 'optical-illusion':
        return {
          title: 'Share Optical Illusion Test Results | TestYourself',
          description: 'Share your visual perception test results and challenge others to discover their cognitive style!',
          canonical: `${baseUrl}/results/optical-illusion/share`
        }
      case 'memory':
        return {
          title: 'Share Memory Challenge Results | TestYourself',
          description: 'Share your memory test results and challenge others to test their memory skills!',
          canonical: `${baseUrl}/results/memory/share`
        }
      case 'color-blindness':
        return {
          title: 'Share Color Blindness Test Results | TestYourself',
          description: 'Share your color blindness test results with friends and family. Let them discover their color vision and perception abilities too! Take our free Ishihara test.',
          keywords: 'share color blindness results, share color vision test results, color blindness sharing, Ishihara test sharing, color perception sharing, free color blindness test',
          ogTitle: 'Share Color Blindness Test Results',
          ogDescription: 'Share your color blindness test results with friends and family. Let them discover their color vision abilities too!',
          ogImage: `${baseUrl}/images/color-blindness-share-og.jpg`,
          canonical: `${baseUrl}/results/color-blindness/share`
        }
      case 'reaction-time':
        return {
          title: 'Share Reaction Time Test Results | TestYourself',
          description: 'Share your reaction time test results with friends and family. Challenge them to test their speed and accuracy with our free reaction time assessment!',
          keywords: 'share reaction time results, share speed test results, reaction time sharing, speed test sharing, reflex sharing, free reaction time test',
          ogTitle: 'Share Reaction Time Test Results',
          ogDescription: 'Share your reaction time test results with friends and family. Challenge them to test their speed and accuracy!',
          ogImage: `${baseUrl}/images/reaction-time-share-og.jpg`,
          canonical: `${baseUrl}/results/reaction-time/share`
        }
      case 'stress-test':
        return {
          title: 'Share Stress Evaluation Results | TestYourself',
          description: 'Share your stress evaluation results with friends and family. Let them discover their stress levels and learn effective coping strategies with our free stress assessment!',
          keywords: 'share stress evaluation results, share stress test results, stress evaluation sharing, stress management sharing, stress assessment sharing, free stress test',
          ogTitle: 'Share Stress Evaluation Results',
          ogDescription: 'Share your stress evaluation results with friends and family. Let them discover their stress levels and learn coping strategies!',
          ogImage: `${baseUrl}/images/stress-evaluation-share-og.jpg`,
          canonical: `${baseUrl}/results/stress-test/share`
        }
      case 'iq-test':
        return {
          title: 'Share IQ Measurement Results | TestYourself',
          description: 'Share your IQ measurement results with friends and family. Let them discover their intelligence quotient and cognitive abilities with our free IQ test!',
          keywords: 'share IQ test results, share intelligence quotient results, IQ measurement sharing, cognitive test sharing, intelligence test sharing, free IQ test',
          ogTitle: 'Share IQ Measurement Results',
          ogDescription: 'Share your IQ measurement results with friends and family. Let them discover their intelligence quotient and cognitive abilities!',
          ogImage: `${baseUrl}/images/iq-measurement-share-og.jpg`,
          canonical: `${baseUrl}/results/iq-test/share`
        }
      case 'time-management-test':
        return {
          title: 'Share Time Management Test Results | TestYourself',
          description: 'Share your time management test results with friends and family. Let them discover their productivity style and get personalized recommendations with our free time management test!',
          keywords: 'share time management test results, share productivity test results, time management sharing, productivity assessment sharing, efficiency test sharing, free time management test',
          ogTitle: 'Share Time Management Test Results',
          ogDescription: 'Share your time management test results with friends and family. Let them discover their productivity style and get personalized recommendations!',
          ogImage: `${baseUrl}/images/time-management-test-share-og.jpg`,
          canonical: `${baseUrl}/results/time-management-test/share`
        }
      case 'spatial-reasoning-test':
        return {
          title: 'Share Spatial Reasoning Test Results | TestYourself',
          description: 'Share your spatial reasoning test results with friends and family. Let them discover their 3D visualization abilities and spatial thinking patterns with our free spatial reasoning test!',
          keywords: 'share spatial reasoning test results, share 3D visualization test results, spatial thinking sharing, geometric reasoning sharing, mental rotation test sharing, free spatial reasoning test',
          ogTitle: 'Share Spatial Reasoning Test Results',
          ogDescription: 'Share your spatial reasoning test results with friends and family. Let them discover their 3D visualization abilities and spatial thinking patterns!',
          ogImage: `${baseUrl}/images/spatial-reasoning-test-share-og.jpg`,
          canonical: `${baseUrl}/results/spatial-reasoning-test/share`
        }
      case 'world-geography-test':
        return {
          title: 'Share World Geography Test Results | TestYourself',
          description: 'Share your world geography test results with friends and family. Let them discover their global knowledge of countries, capitals, landmarks, and physical geography with speed penalty analysis!',
          keywords: 'share world geography test results, share geography challenge results, global knowledge sharing, countries capitals sharing, landmarks sharing, speed penalty analysis',
          ogTitle: 'Share World Geography Test Results',
          ogDescription: 'Share your world geography test results with friends and family. Let them discover their global knowledge and geography skills with speed penalty analysis!',
          ogImage: `${baseUrl}/images/world-geography-test-share-og.jpg`,
          canonical: `${baseUrl}/results/world-geography-test/share`
        }
      case 'decision-making-test':
        return {
          title: 'Share Decision Making Test Results - Advanced Weighted Assessment | TestYourself',
          description: 'Share your decision making test results with advanced weighted scoring! Let friends discover their judgment effectiveness, speed penalty analysis, and performance in workplace leadership, personal decisions, ethical dilemmas, crisis management, and strategic thinking!',
          keywords: 'share decision making test results, weighted scoring results, effectiveness points, speed penalties, share judgment assessment results, leadership decisions sharing, ethical dilemmas sharing, crisis management sharing, free decision making test',
          ogTitle: 'Share Decision Making Test Results - Advanced Weighted Assessment',
          ogDescription: 'Share your decision making test results with advanced weighted scoring! Let friends discover their judgment effectiveness, speed penalty analysis, and decision-making abilities!',
          ogImage: `${baseUrl}/images/decision-making-test-share-og.jpg`,
          canonical: `${baseUrl}/results/decision-making-test/share`
        }
      default:
        return {
          title: 'Share Test Results | TestYourself',
          description: 'Share your test results and challenge others to discover themselves!',
          canonical: `${baseUrl}/results/${testType}/share`
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
        
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Share Character Assessment Results",
              "description": "Share your character assessment results with friends and family. Let them discover their personality type too!",
              "url": seoContent.canonical,
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": testType === 'emotional-intelligence' ? [
                  {
                    "@type": "Question",
                    "name": "How can I share my emotional intelligence test results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You can share your emotional intelligence test results on social media platforms like X (Twitter), Facebook, and LinkedIn. You can also save your results as a text file to share privately or discuss with friends and family."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why should I share my emotional intelligence test results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sharing your EQ test results can help others discover their own emotional intelligence level and encourage them to take the assessment. It's a great conversation starter about emotional awareness, empathy, and personal development."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What information is included when I share my EQ results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "When sharing your emotional intelligence results, you can include your overall EQ level, component scores (self-awareness, self-regulation, motivation, empathy, social skills), and key insights. You control how much information to share publicly."
                    }
                  }
                ] : [
                  {
                    "@type": "Question",
                    "name": "How can I share my character assessment results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You can share your character assessment results on social media platforms like X (Twitter), Facebook, and LinkedIn. You can also save your results as a text file to share privately."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why should I share my character assessment results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sharing your results can help others discover their own personality type and encourage them to take the character assessment. It's also a great conversation starter about personality and self-discovery."
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
          <div className="max-w-6xl mx-auto overflow-x-hidden">
            {/* Header */}
            <Header onLogoClick={undefined} />

            {/* Test Title */}
            <div className="text-center mb-2 mt-2">
              <div className="bg-white rounded-2xl shadow-lg px-2 py-0.5">
                <h1 className="text-lg font-bold text-gray-800">
                  {testType === 'personality' ? 'Character Assessment Results' :
                   testType === 'math' ? 'Math Test Results - 7th-8th Grade Assessment' :
                   testType === 'emotional-intelligence' ? 'Emotional Intelligence Test Results' :
                   testType === 'trivia' ? 'Trivia Quiz Results' :
                   testType === 'memory' ? 'Memory Challenge Results' :
                   testType === 'optical-illusion' ? 'Optical Illusion Test Results' :
                   testType === 'color-blindness' ? 'Color Blindness Test Results' :
                   testType === 'reaction-time' ? 'Reaction Time Test Results' :
                   testType === 'stress-test' ? 'Stress Evaluation Results' :
                   testType === 'iq-test' ? 'IQ Measurement Results' :
                   'Test Results'}
                </h1>
              </div>
            </div>

            {/* Action Buttons - For Emotional Intelligence, Personality, Optical Illusion, Trivia, Memory, Math, Color Blindness, Reaction Time, Stress Test, IQ Tests, and Creativity Test */}
            {(testType === 'emotional-intelligence' || testType === 'personality' || testType === 'optical-illusion' || testType === 'trivia' || testType === 'memory' || testType === 'math' || testType === 'color-blindness' || testType === 'reaction-time' || testType === 'stress-test' || testType === 'iq-test' || testType === 'time-management-test' || testType === 'spatial-reasoning-test' || testType === 'world-geography-test' || testType === 'decision-making-test' || testType === 'creativity-test') && (
              <div className="mb-2">
                <div className="bg-gray-50 rounded-2xl shadow-lg p-2">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push(`/results/${testType}?${searchParams.toString()}`)}
                      className="px-8 py-3 bg-sage-500 text-white rounded-full font-medium hover:bg-sage-600 transition-all duration-300"
                    >
                      📤 Hide Share
                    </button>
                    <button
                      onClick={() => router.push(`/results/${testType}/review?${searchParams.toString()}`)}
                      className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300"
                    >
                      📋 Show Review
                    </button>
                    <button
                      onClick={saveResults}
                      className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all duration-300"
                    >
                      💾 Save Results
                    </button>
                    <button
                      onClick={() => router.push(`/${testType}`)}
                      className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all duration-300"
                    >
                      🔄 Retake Test
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-4 mt-2 mb-2">
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Share Your Results</h3>
              <p className="text-gray-600 mb-2 text-center">Choose a platform to share your EQ test results</p>
              
              <div className="flex justify-start">
                <button
                  onClick={handleXShare}
                  className="p-4 text-left bg-white hover:bg-blue-50 rounded-2xl shadow-lg transition-colors flex items-center border border-blue-200"
                  style={{width: '210px'}}
                >
                  <span className="text-2xl mr-3" aria-label="X (formerly Twitter) logo">𝕏</span>
                  <div className="flex-1 text-center">
                    <div className="font-semibold text-blue-800">X.com</div>
                    <div className="text-sm text-blue-600">Share on X</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons - Exclude Emotional Intelligence, Personality, Optical Illusion, Trivia, Memory, Math, Color Blindness, Reaction Time, Stress Test, IQ Test, and Creativity Test as they have their own buttons at top */}
            {testType !== 'emotional-intelligence' && testType !== 'personality' && testType !== 'optical-illusion' && testType !== 'trivia' && testType !== 'memory' && testType !== 'math' && testType !== 'color-blindness' && testType !== 'reaction-time' && testType !== 'stress-test' && testType !== 'iq-test' && testType !== 'time-management-test' && testType !== 'spatial-reasoning-test' && testType !== 'world-geography-test' && testType !== 'decision-making-test' && testType !== 'creativity-test' && (
              <div className="mt-2 mb-2">
                <div className="bg-gray-50 rounded-2xl shadow-lg p-2">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push(`/results/${testType}?${searchParams.toString()}`)}
                      className="px-8 py-3 bg-sage-500 text-white rounded-full font-medium hover:bg-sage-600 transition-all duration-300"
                    >
                      📤 Hide Share
                    </button>
                    <button
                      onClick={() => router.push(`/results/${testType}/review?${searchParams.toString()}`)}
                      className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300"
                    >
                      📋 Show Review
                    </button>
                    <button
                      onClick={saveResults}
                      className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all duration-300"
                    >
                      💾 Save Results
                    </button>
                    <button
                      onClick={() => router.push(`/${testType}`)}
                      className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all duration-300"
                    >
                      {testType === 'typing' ? '🔄 Try Another Challenge' : '🔄 Retake Test'}
                    </button>
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
