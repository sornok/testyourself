'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Head from 'next/head'
import { personalityTypes } from '@/lib/personalityTest'
import { stressTypes } from '@/lib/stressTest'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ResultsPage() {
  const { testType } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Save Results functionality
  const saveResults = () => {
    const timestamp = new Date().toLocaleString()
    let content = ''

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

      case 'world-geography-test':
        const geographyResults = JSON.parse(searchParams.get('results') || '{}')
        const geographyAnswers = JSON.parse(searchParams.get('answers') || '{}')
        const geographyQuestions = JSON.parse(searchParams.get('questions') || '[]')
        
        content += `World Geography Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${geographyResults.totalQuestions}
- Correct Answers: ${geographyResults.correctAnswers}
- Accuracy Score: ${geographyResults.accuracy}%
- Speed Score: ${geographyResults.speedScore}%
- Level: ${geographyResults.level}
- Average Time: ${geographyResults.averageTime}s per question

Category Breakdown:
${Object.entries(geographyResults.categoryScores).map(([category, score]) => {
  const categoryQuestions = geographyQuestions.filter((q: any) => q.category === category);
  const correctAnswers = categoryQuestions.filter((q: any) => geographyAnswers[q.id] === q.correct);
  const correctCount = correctAnswers.length;
  const totalCount = categoryQuestions.length;
  const actualPercentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  return `- ${category}: ${actualPercentage}% (${correctCount}/${totalCount})`;
}).join('\n')}

Description:
${geographyResults.description}

What This Means for You:
${geographyResults.accuracy >= 80 ? 
  'Your geography knowledge shows strong understanding of world geography. You demonstrate excellent knowledge of countries, capitals, landmarks, and physical features.' :
  geographyResults.accuracy >= 60 ?
  'Your geography knowledge shows solid understanding of world geography. You have good foundational knowledge with room to explore more regions and topics.' :
  'Your geography knowledge shows developing understanding of world geography. Consider exploring maps, atlases, and travel resources to expand your global knowledge.'}

Practical Applications:
${geographyResults.accuracy >= 80 ? 
  'Your strong geography knowledge can help with travel planning, cultural understanding, and global awareness.' :
  geographyResults.accuracy >= 60 ?
  'Your geography knowledge provides a good foundation for understanding world events and cultural diversity.' :
  'Building geography knowledge can enhance your understanding of world events, travel experiences, and cultural awareness.'}

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
          // Convert emojis to text for better readability
          const emojiToText = (item: string) => {
            const emojiMap: Record<string, string> = {
              // Weather
              '☀️': 'Sunny',
              '⛅': 'Cloudy', 
              '🌩️': 'Stormy',
              '🌤️': 'Partly Cloudy',
              '❄️': 'Snowy',
              '🌧️': 'Rainy',
              '🌈': 'Rainbow',
              '🌙': 'Moon',
              '⭐': 'Star',
              // Objects
              '🔥': 'Fire',
              '💧': 'Water',
              '🌱': 'Plant',
              // Fruits
              '🍎': 'Apple',
              '🍌': 'Banana',
              '🍊': 'Orange',
              '🍇': 'Grape',
              '🍒': 'Cherry',
              '🍓': 'Strawberry',
              '🍑': 'Peach',
              '🥝': 'Kiwi',
              '🍍': 'Pineapple',
              '🥭': 'Mango',
              '🍋': 'Lemon',
              '🥥': 'Coconut',
              // Colors
              '🔴': 'Red',
              '🔵': 'Blue',
              '🟢': 'Green',
              '🟡': 'Yellow',
              '🟣': 'Purple',
              '🟠': 'Orange',
              '⚪': 'White',
              '⚫': 'Black',
              '🟤': 'Brown',
              '🟥': 'Red Square',
              '🟦': 'Blue Square',
              '🟩': 'Green Square',
              '🟨': 'Yellow Square',
              '🟧': 'Orange Square',
              '🟪': 'Purple Square',
              // Vehicles
              '🚗': 'Car',
              '🚕': 'Taxi',
              '🚙': 'SUV',
              '🚌': 'Bus',
              '🚎': 'Trolleybus',
              '🏎️': 'Race Car',
              '🚓': 'Police Car',
              '🚑': 'Ambulance',
              '🚒': 'Fire Truck',
              '🚐': 'Van',
              '🛻': 'Pickup Truck',
              '🚚': 'Truck',
              '🚛': 'Articulated Truck',
              '🚜': 'Tractor',
              '🏍️': 'Motorcycle',
              '🛵': 'Scooter',
              '🚲': 'Bicycle',
              '🛴': 'Scooter',
              '🚁': 'Helicopter',
              '✈️': 'Airplane',
              '🛩️': 'Small Airplane',
              '🛫': 'Airplane Departure',
              '🛬': 'Airplane Arrival',
              '🪂': 'Parachute',
              '💺': 'Seat',
              '🚀': 'Rocket',
              '🛸': 'Flying Saucer',
              '🚉': 'Station',
              '🚊': 'Tram',
              '🚝': 'Monorail',
              '🚞': 'Mountain Railway',
              '🚋': 'Tram Car',
              '🚃': 'Railway Car',
              '🚋': 'Tram Car',
              '🚆': 'Train',
              '🚄': 'High-Speed Train',
              '🚅': 'Bullet Train',
              '🚈': 'Light Rail',
              '🚂': 'Steam Locomotive',
              '🚆': 'Train',
              '🚇': 'Metro',
              '🚊': 'Tram',
              '🚉': 'Station',
              '🚢': 'Ship',
              '⛴️': 'Ferry',
              '🛥️': 'Motor Boat',
              '🚤': 'Speedboat',
              '⛵': 'Sailboat',
              '🛶': 'Canoe',
              '🚣': 'Rowboat',
              '🏊': 'Swimmer',
              '🏄': 'Surfer',
              '🏇': 'Horse Racing',
              '🚴': 'Cyclist',
              '🏃': 'Runner',
              '🚶': 'Walker',
              '🚵': 'Mountain Biker',
              '🏋️': 'Weight Lifter',
              '🤸': 'Cartwheeler',
              '🤾': 'Handball Player',
              '🤽': 'Water Polo Player',
              '🤼': 'Wrestlers',
              '🤺': 'Fencer',
              '🏌️': 'Golfer',
              '🏇': 'Horse Racing',
              '⛷️': 'Skier',
              '🏂': 'Snowboarder',
              '🏄': 'Surfer',
              '🏊': 'Swimmer',
              '🏋️': 'Weight Lifter',
              '🚴': 'Cyclist',
              '🚵': 'Mountain Biker',
              '🏃': 'Runner',
              '🚶': 'Walker',
              '🏃‍♀️': 'Woman Running',
              '🏃‍♂️': 'Man Running',
              '🚶‍♀️': 'Woman Walking',
              '🚶‍♂️': 'Man Walking',
              '💃': 'Woman Dancing',
              '🕺': 'Man Dancing',
              '👯': 'People with Bunny Ears',
              '👯‍♀️': 'Women with Bunny Ears',
              '👯‍♂️': 'Men with Bunny Ears',
              '🧘': 'Person in Lotus Position',
              '🧘‍♀️': 'Woman in Lotus Position',
              '🧘‍♂️': 'Man in Lotus Position',
              '🏃‍♀️': 'Woman Running',
              '🏃‍♂️': 'Man Running',
              '🚶‍♀️': 'Woman Walking',
              '🚶‍♂️': 'Man Walking',
              '💃': 'Woman Dancing',
              '🕺': 'Man Dancing',
              '👯': 'People with Bunny Ears',
              '👯‍♀️': 'Women with Bunny Ears',
              '👯‍♂️': 'Men with Bunny Ears',
              '🧘': 'Person in Lotus Position',
              '🧘‍♀️': 'Woman in Lotus Position',
              '🧘‍♂️': 'Man in Lotus Position',
              // Animals (from memory challenges)
              '🐱': 'Cat',
              '🐶': 'Dog',
              '🐰': 'Rabbit',
              '🐸': 'Frog',
              '🐯': 'Tiger',
              '🦁': 'Lion',
              '🐻': 'Bear',
              '🐼': 'Panda',
              '🐨': 'Koala',
              '🐵': 'Monkey',
              '🐔': 'Chicken',
              '🐧': 'Penguin',
              // Directions (from memory challenges)
              '↑': 'Up Arrow',
              '↓': 'Down Arrow',
              '←': 'Left Arrow',
              '→': 'Right Arrow',
              '↗': 'Up Right Arrow',
              '↘': 'Down Right Arrow',
              '↙': 'Down Left Arrow',
              '↖': 'Up Left Arrow',
              // Weather (from memory challenges)
              '🌪️': 'Tornado',
              '🌤️': 'Partly Cloudy',
              '🌩️': 'Lightning',
              // Patterns (from memory challenges)
              '▲': 'Triangle',
              '●': 'Circle',
              '■': 'Square',
              '◆': 'Diamond',
              '★': 'Star',
              '♦': 'Diamond Suit',
              '♠': 'Spade Suit',
              '♣': 'Club Suit',
              '♥': 'Heart Suit'
            }
            return emojiMap[item] || item
          }
          
          const sequenceToMemorize = challenge.sequence ? challenge.sequence.map(emojiToText).join(', ') : 'No sequence data'
          const userSequence = userAnswer && userAnswer.userSequence ? userAnswer.userSequence.map(emojiToText).join(', ') : (userAnswer ? 'Completed' : 'No answer')
          return `${index + 1}. ${challenge.title}
   Sequence to Memorize: ${sequenceToMemorize}
   Your Answer: ${userSequence}
   Result: ${isCorrect ? 'Correct' : 'Incorrect'}
   ${challenge.description ? `Description: ${challenge.description}` : ''}
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
   Your Answer: ${selectedOption?.text || 'No answer'}
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
        
        // Identify stress triggers for saved file
        const getStressTriggersForFile = () => {
          const triggerMap: { [key: string]: string } = {
            'overwhelmed by daily responsibilities': 'Daily Responsibilities Overwhelm',
            'time and prioritize tasks': 'Time Management Issues',
            'work-life balance': 'Work-Life Balance Challenges',
            'financial stress': 'Financial Stress',
            'difficult conversations or conflicts': 'Relationship/Conflict Issues',
            'take time for yourself': 'Self-Care Neglect',
            'sleep at night': 'Sleep Issues',
            'physical symptoms of stress': 'Physical Stress Symptoms',
            'support from others': 'Lack of Support Network',
            'unexpected changes': 'Change Management Issues',
            'criticism or negative feedback': 'Criticism Sensitivity',
            'unexpected challenges': 'Problem-Solving Stress',
            'multiple deadlines': 'Deadline Pressure'
          }

          const highStressAnswers = stressQuestions
            .filter((q: any) => stressAnswers[q.id] === 'High')
            .map((q: any) => {
              const question = q.question.toLowerCase()
              for (const [key, trigger] of Object.entries(triggerMap)) {
                if (question.includes(key)) {
                  return trigger
                }
              }
              return null
            })
            .filter((trigger: string | null) => trigger !== null)

          return [...new Set(highStressAnswers)].slice(0, 3)
        }

        const fileStressTriggers = getStressTriggersForFile()

        content += `Stress Evaluation Results
Date: ${timestamp}

Stress Level: ${stressType}
${stress ? `Name: ${stress.name}` : ''}

${stress ? `Recommendations:
${stress.recommendations.map((recommendation: string) => `- ${recommendation}`).join('\n')}` : ''}

${fileStressTriggers.length > 0 ? `Your Main Stress Triggers:
${fileStressTriggers.map((trigger: string) => `- ${trigger}`).join('\n')}` : ''}

${stress ? `Strengths:
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
        
        // Calculate difficulty score
        const easyCorrect = spatialQuestions.filter((q: any) => q.difficulty === 'Easy' && spatialAnswers[q.id] === q.options[q.correct]).length;
        const mediumCorrect = spatialQuestions.filter((q: any) => q.difficulty === 'Medium' && spatialAnswers[q.id] === q.options[q.correct]).length;
        const hardCorrect = spatialQuestions.filter((q: any) => q.difficulty === 'Hard' && spatialAnswers[q.id] === q.options[q.correct]).length;
        const difficultyScore = (easyCorrect * 1) + (mediumCorrect * 2) + (hardCorrect * 3);
        const maxScore = (spatialQuestions.filter((q: any) => q.difficulty === 'Easy').length * 1) + (spatialQuestions.filter((q: any) => q.difficulty === 'Medium').length * 2) + (spatialQuestions.filter((q: any) => q.difficulty === 'Hard').length * 3);
        const difficultyPercentage = Math.round((difficultyScore / maxScore) * 100);
        
        content += `Spatial Reasoning Test Results
Date: ${timestamp}

Test Summary:
- Total Questions: ${spatialResults.totalQuestions}
- Correct Answers: ${spatialResults.correctAnswers}
- Accuracy: ${spatialResults.accuracy}%
- Spatial Reasoning Level: ${spatialResults.level}
- Difficulty Score: ${difficultyPercentage}%

Description:
${spatialResults.description}

Key Insights:
${spatialResults.accuracy >= 90 ? 
  "Your exceptional spatial reasoning abilities suggest strong potential in fields requiring 3D visualization, engineering, architecture, or design. You excel at mental rotation and spatial manipulation tasks." :
  spatialResults.accuracy >= 80 ?
  "Your strong spatial reasoning skills indicate good potential for technical and creative fields. You handle spatial relationships well and can visualize 3D objects effectively." :
  spatialResults.accuracy >= 70 ?
  "Your solid spatial reasoning abilities show good understanding of geometric concepts and spatial relationships. With practice, you can further develop your visualization skills." :
  spatialResults.accuracy >= 60 ?
  "Your developing spatial reasoning skills show room for growth. Consider practicing with puzzles, 3D modeling, or spatial exercises to improve your abilities." :
  "Your spatial reasoning skills need development. Focus on practicing with geometric puzzles, drawing exercises, and 3D visualization tasks to strengthen these abilities."
}

Practical Applications:
${spatialResults.accuracy >= 80 ? 
  "Consider careers in engineering, architecture, graphic design, video game development, or any field requiring strong spatial visualization skills." :
  spatialResults.accuracy >= 60 ?
  "Your spatial abilities can be valuable in technical fields, construction, interior design, or any role requiring understanding of spatial relationships." :
  "Focus on developing spatial skills through practice with puzzles, drawing, and 3D modeling to improve your career prospects in technical fields."
}

Category Breakdown:
- Mental Rotation: ${spatialResults.categoryScores['Mental Rotation']}% (${spatialQuestions.filter((q: any) => q.category === 'Mental Rotation' && spatialAnswers[q.id] === q.options[q.correct]).length}/${spatialQuestions.filter((q: any) => q.category === 'Mental Rotation').length})
- 2D/3D Visualization: ${spatialResults.categoryScores['2D/3D Visualization']}% (${spatialQuestions.filter((q: any) => q.category === '2D/3D Visualization' && spatialAnswers[q.id] === q.options[q.correct]).length}/${spatialQuestions.filter((q: any) => q.category === '2D/3D Visualization').length})
- Spatial Relationships: ${spatialResults.categoryScores['Spatial Relationships']}% (${spatialQuestions.filter((q: any) => q.category === 'Spatial Relationships' && spatialAnswers[q.id] === q.options[q.correct]).length}/${spatialQuestions.filter((q: any) => q.category === 'Spatial Relationships').length})
- Geometric Reasoning: ${spatialResults.categoryScores['Geometric Reasoning']}% (${spatialQuestions.filter((q: any) => q.category === 'Geometric Reasoning' && spatialAnswers[q.id] === q.options[q.correct]).length}/${spatialQuestions.filter((q: any) => q.category === 'Geometric Reasoning').length})

Performance Analysis:
- Easy Questions: ${Math.round((spatialQuestions.filter((q: any) => q.difficulty === 'Easy' && spatialAnswers[q.id] === q.options[q.correct]).length / spatialQuestions.filter((q: any) => q.difficulty === 'Easy').length) * 100)}% (${spatialQuestions.filter((q: any) => q.difficulty === 'Easy' && spatialAnswers[q.id] === q.options[q.correct]).length}/${spatialQuestions.filter((q: any) => q.difficulty === 'Easy').length})
- Medium Questions: ${Math.round((spatialQuestions.filter((q: any) => q.difficulty === 'Medium' && spatialAnswers[q.id] === q.options[q.correct]).length / spatialQuestions.filter((q: any) => q.difficulty === 'Medium').length) * 100)}% (${spatialQuestions.filter((q: any) => q.difficulty === 'Medium' && spatialAnswers[q.id] === q.options[q.correct]).length}/${spatialQuestions.filter((q: any) => q.difficulty === 'Medium').length})
- Hard Questions: ${Math.round((spatialQuestions.filter((q: any) => q.difficulty === 'Hard' && spatialAnswers[q.id] === q.options[q.correct]).length / spatialQuestions.filter((q: any) => q.difficulty === 'Hard').length) * 100)}% (${spatialQuestions.filter((q: any) => q.difficulty === 'Hard' && spatialAnswers[q.id] === q.options[q.correct]).length}/${spatialQuestions.filter((q: any) => q.difficulty === 'Hard').length})

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
            <h2 className="text-xl text-sage-800 mb-2">
              <span className="font-bold">Your Results</span> - Here's what we discovered about you
            </h2>
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

        {/* Areas for Growth */}
        <div className="bg-lavender-50 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-lavender-600 mb-2">Areas for Growth</h3>
          <div className="grid grid-cols-2 gap-2">
            {personality.weaknesses.map((weakness: string, index: number) => (
              <div key={index} className="flex items-start">
                <span className="text-lavender-500 mr-2 text-sm">•</span>
                <span className="text-sage-700 text-sm">{weakness}</span>
              </div>
            ))}
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
            <h2 className="text-xl text-sage-800 mb-2">
              <span className="font-bold">Your Results</span> - Here's what we discovered about you
            </h2>
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
            <h2 className="text-xl text-sage-800 mb-2">
              <span className="font-bold">Your Results</span> - Here's what we discovered about you
            </h2>
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
      <div className="space-y-2 overflow-x-hidden">
        {/* Main Result */}
        <div className="text-center">
          <div className="bg-sage-50 rounded-2xl shadow-lg p-6 overflow-x-hidden">
            <h2 className="text-xl text-sage-800 mb-2">
              <span className="font-bold">Your Results</span> - Here's what we discovered about you
            </h2>
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
          <div className="bg-sage-50 rounded-2xl p-8 border border-sage-200 overflow-x-hidden">
            <h3 className="text-xl font-semibold text-sage-800 mb-2">Key Insights</h3>
            <div className="space-y-2">
              {results.insights.map((insight: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sage-700 break-words max-w-full">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderEmotionalIntelligenceResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const questions = JSON.parse(searchParams.get('questions') || '[]')
    const answers = JSON.parse(searchParams.get('answers') || '[]')

    if (!results || Object.keys(results).length === 0) {
      return (
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Available</h2>
          <p className="text-gray-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {/* Overall Score - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          {/* Left Box - Score */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-5">
            <div className="text-center">
              <h2 className="text-lg text-sage-800 mb-3">
                <span className="font-bold">Your Results</span> - Here's what we discovered about you
              </h2>
              <div className="text-4xl font-bold text-blue-600 mb-2" aria-label={`EQ Score: ${results.totalScore} out of 5`}>{results.totalScore}/5</div>
              <div className="text-xl font-semibold text-gray-800" aria-label={`EQ Level: ${results.overallLevel}`}>{results.overallLevel}</div>
            </div>
          </div>
          
          {/* Right Box - Description */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-5">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What This Means</h3>
              <p className="text-gray-600 text-sm">{results.description}</p>
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
                     <div className="text-2xl font-bold text-blue-600 mb-1" aria-label={`Self-Awareness Score: ${results.selfAwareness} out of 5`}>{results.selfAwareness}/5</div>
                     <div className="text-sm font-medium text-gray-600">Self-Awareness</div>
                   </div>
                   <div className="bg-white rounded-lg p-3 text-center">
                     <div className="text-2xl font-bold text-green-600 mb-1" aria-label={`Self-Regulation Score: ${results.selfRegulation} out of 5`}>{results.selfRegulation}/5</div>
                     <div className="text-sm font-medium text-gray-600">Self-Regulation</div>
                   </div>
                   <div className="bg-white rounded-lg p-3 text-center">
                     <div className="text-2xl font-bold text-purple-600 mb-1" aria-label={`Motivation Score: ${results.motivation} out of 5`}>{results.motivation}/5</div>
                     <div className="text-sm font-medium text-gray-600">Motivation</div>
                   </div>
                   <div className="bg-white rounded-lg p-3 text-center">
                     <div className="text-2xl font-bold text-orange-600 mb-1" aria-label={`Empathy Score: ${results.empathy} out of 5`}>{results.empathy}/5</div>
                     <div className="text-sm font-medium text-gray-600">Empathy</div>
                   </div>
                   <div className="bg-white rounded-lg p-3 text-center">
                     <div className="text-2xl font-bold text-red-600 mb-1" aria-label={`Social Skills Score: ${results.socialSkills} out of 5`}>{results.socialSkills}/5</div>
                     <div className="text-sm font-medium text-gray-600">Social Skills</div>
                   </div>
            </div>
          </div>

          {/* Areas for Growth */}
          <div className="bg-orange-50 rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">Areas for Growth</h3>
            {results.areasForGrowth && results.areasForGrowth.length > 0 ? (
              <ul className="space-y-2">
                {results.areasForGrowth.map((area: string, index: number) => (
                  <li key={index} className="text-orange-700 text-sm">• {area}</li>
                ))}
              </ul>
            ) : (
              <p className="text-orange-600 text-sm">Great job! Keep maintaining your EQ skills</p>
            )}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-blue-50 rounded-2xl shadow-lg p-5 mb-2">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Insights</h3>
          <ul className="space-y-2">
            {results.insights && results.insights.map((insight: string, index: number) => (
              <li key={index} className="text-blue-700 text-sm">• {insight}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const renderMathResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '[]')
    const questions = JSON.parse(searchParams.get('questions') || '[]')

    if (!results || !results.level) {
      return (
        <div className="text-center">
          <p className="text-sage-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
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
                <div className="text-5xl font-bold text-blue-600 mb-2">{results.overallAverage}/10</div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">{results.level}</div>
                <div className="text-lg font-semibold text-blue-700">{results.accuracy}% ({results.totalScore}/{results.totalQuestions} correct)</div>
              </div>
            </div>
          </div>

          {/* Key Insights - 60% width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
              <div className="space-y-3">
                <p className="text-gray-700">{results.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Strengths:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {results.strengths.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {results.recommendations.map((rec: string, index: number) => (
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
                <span className="font-semibold text-gray-800">{results.categoryAverages.arithmetic}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Fractions</span>
                <span className="font-semibold text-gray-800">{results.categoryAverages.fractions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Percentages</span>
                <span className="font-semibold text-gray-800">{results.categoryAverages.percentages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Algebra</span>
                <span className="font-semibold text-gray-800">{results.categoryAverages.algebra}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Geometry</span>
                <span className="font-semibold text-gray-800">{results.categoryAverages.geometry}</span>
              </div>
            </div>
          </div>

          {/* Areas for Growth */}
          <div className="bg-white rounded-2xl shadow-lg p-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Areas for Growth</h3>
            <div className="space-y-1">
              {results.areasForGrowth.map((area: string, index: number) => (
                <div key={index} className="text-gray-700">• {area}</div>
              ))}
            </div>
          </div>
        </div>
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
  // Render Color Blindness Results
  const renderColorBlindnessResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '[]')
    const questions = JSON.parse(searchParams.get('questions') || '[]')
    
    return (
      <>
        {/* Results Header */}
        <div className="text-center mb-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-5">
              <div className="text-center">
                <h2 className="text-lg text-purple-800 mb-1">
                  <span className="font-bold">Your Results</span>
                </h2>
                <p className="text-base text-purple-700 mb-3">Here's what we discovered about your color vision</p>
                <div className="text-4xl font-bold text-purple-600 mb-2">{results.accuracy}%</div>
                <div className="text-xl font-semibold text-gray-800">{results.colorBlindnessType}</div>
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
                <span className="font-semibold text-blue-800">{results.totalScore}/{results.totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Accuracy:</span>
                <span className="font-semibold text-blue-800">{results.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Result:</span>
                <span className="font-semibold text-blue-800">{results.colorBlindnessType}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-semibold text-green-800 mb-3">What This Means</h3>
            <p className="text-gray-600 text-sm">{results.description}</p>
          </div>
        </div>

        {/* Recommendations and Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <div className="bg-orange-50 rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {results.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="text-orange-700 text-sm">• {recommendation}</li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Key Insights</h3>
            <ul className="space-y-2">
              {results.insights.map((insight: string, index: number) => (
                <li key={index} className="text-purple-700 text-sm">• {insight}</li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  const renderReactionTimeResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '[]')
    const reactionTimes = JSON.parse(searchParams.get('reactionTimes') || '[]')
    const questions = JSON.parse(searchParams.get('questions') || '[]')
    
    return (
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
                <div className="text-5xl font-bold text-orange-600 mb-2">{results.averageReactionTime}ms</div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">{results.level}</div>
              </div>
            </div>
          </div>

          {/* Key Insights - 60% width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-5 h-full flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights</h3>
              <div className="space-y-3">
                <p className="text-gray-700">{results.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Strengths</h4>
                    <ul className="text-gray-700 space-y-1">
                      {results.strengths.map((strength: string, index: number) => (
                        <li key={index}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Areas for Growth</h4>
                    <ul className="text-gray-700 space-y-1">
                      {results.areasForGrowth.map((area: string, index: number) => (
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
                <span className="font-semibold text-gray-800">{results.categoryAverages['color-selection']}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sequential Click Reaction</span>
                <span className="font-semibold text-gray-800">{results.categoryAverages['sequential-click']}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Movement Reaction</span>
                <span className="font-semibold text-gray-800">{results.categoryAverages['movement']}ms</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h3>
            <div className="space-y-1">
              {results.recommendations.map((rec: string, index: number) => (
                <div key={index} className="text-gray-700">• {rec}</div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderIQMeasurementResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const questions = JSON.parse(searchParams.get('questions') || '[]')

    if (!results || Object.keys(results).length === 0) {
      return (
        <div className="text-center">
          <p className="text-sage-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {/* Your Results and Key Insights - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-2">
          {/* Your Results - 40% width */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-5 h-full flex flex-col justify-center">
              <div className="text-center">
                <h2 className="text-xl text-blue-800 mb-1">
                  <span className="font-bold">Your Results</span>
                </h2>
                <p className="text-lg text-blue-700 mb-3">Here's what we discovered about your<br /><span className="font-bold">Intelligence Quotient (IQ)</span></p>
                <div className="text-5xl font-bold text-blue-600 mb-2">{results.iqScore}</div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">{results.level}</div>
                <div className="text-lg font-semibold text-blue-700">{results.accuracy}% ({results.correctAnswers}/{results.totalQuestions} correct)</div>
              </div>
            </div>
          </div>

          {/* Key Insights - 60% width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-5 h-full flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights</h3>
              <div className="space-y-3">
                <p className="text-gray-700">{results.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown and Performance Analysis - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Verbal Reasoning</span>
                <span className="font-semibold text-gray-800">{Math.round((questions.filter((q: any) => q.category === 'verbal' && answers[q.id] === q.correct).length / questions.filter((q: any) => q.category === 'verbal').length) * 100) || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Pattern Recognition</span>
                <span className="font-semibold text-gray-800">{Math.round((questions.filter((q: any) => q.category === 'pattern' && answers[q.id] === q.correct).length / questions.filter((q: any) => q.category === 'pattern').length) * 100) || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Spatial Reasoning</span>
                <span className="font-semibold text-gray-800">{Math.round((questions.filter((q: any) => q.category === 'spatial' && answers[q.id] === q.correct).length / questions.filter((q: any) => q.category === 'spatial').length) * 100) || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Logical Reasoning</span>
                <span className="font-semibold text-gray-800">{Math.round((questions.filter((q: any) => q.category === 'logical' && answers[q.id] === q.correct).length / questions.filter((q: any) => q.category === 'logical').length) * 100) || 0}%</span>
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Easy Questions</span>
                <span className="font-semibold text-gray-800">{Math.round((questions.filter((q: any) => q.difficulty === 'easy' && answers[q.id] === q.correct).length / questions.filter((q: any) => q.difficulty === 'easy').length) * 100) || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Medium Questions</span>
                <span className="font-semibold text-gray-800">{Math.round((questions.filter((q: any) => q.difficulty === 'medium' && answers[q.id] === q.correct).length / questions.filter((q: any) => q.difficulty === 'medium').length) * 100) || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Hard Questions</span>
                <span className="font-semibold text-gray-800">{Math.round((questions.filter((q: any) => q.difficulty === 'hard' && answers[q.id] === q.correct).length / questions.filter((q: any) => q.difficulty === 'hard').length) * 100) || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSpatialReasoningResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const questions = JSON.parse(searchParams.get('questions') || '[]')

    if (!results || Object.keys(results).length === 0) {
      return (
        <div className="text-center">
          <p className="text-sage-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    return (
      <div className="space-y-2 mb-2">
        {/* Your Results and Key Insights - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-2">
          {/* Your Results - 40% width */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
              <div className="text-center">
                <h2 className="text-xl text-blue-800 mb-1">
                  <span className="font-bold">Your Results</span>
                </h2>
                <p className="text-lg text-blue-700 mb-3">Here's what we discovered about your<br /><span className="font-bold">Spatial Reasoning</span></p>
                <div className="text-5xl font-bold text-blue-600 mb-2">{results.accuracy}%</div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">{results.level}</div>
                <div className="text-xl font-semibold text-blue-700">{results.correctAnswers}/{results.totalQuestions} correct</div>
                <div className="text-xl font-semibold text-purple-600 mt-2">
                  Difficulty Score: {(() => {
                    const easyCorrect = questions.filter((q: any) => q.difficulty === 'Easy' && answers[q.id] === q.options[q.correct]).length;
                    const mediumCorrect = questions.filter((q: any) => q.difficulty === 'Medium' && answers[q.id] === q.options[q.correct]).length;
                    const hardCorrect = questions.filter((q: any) => q.difficulty === 'Hard' && answers[q.id] === q.options[q.correct]).length;
                    const difficultyScore = (easyCorrect * 1) + (mediumCorrect * 2) + (hardCorrect * 3);
                    const maxScore = (questions.filter((q: any) => q.difficulty === 'Easy').length * 1) + (questions.filter((q: any) => q.difficulty === 'Medium').length * 2) + (questions.filter((q: any) => q.difficulty === 'Hard').length * 3);
                    return Math.round((difficultyScore / maxScore) * 100);
                  })()}%
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights - 60% width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights</h3>
              <div className="space-y-3">
                <p className="text-gray-700">{results.description}</p>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-sm font-medium text-blue-700 mb-1">💡 What This Means for You:</div>
                  <div className="text-blue-800 text-sm">
                    {results.accuracy >= 90 ? 
                      "Your exceptional spatial reasoning abilities suggest strong potential in fields requiring 3D visualization, engineering, architecture, or design. You excel at mental rotation and spatial manipulation tasks." :
                      results.accuracy >= 80 ?
                      "Your strong spatial reasoning skills indicate good potential for technical and creative fields. You handle spatial relationships well and can visualize 3D objects effectively." :
                      results.accuracy >= 70 ?
                      "Your solid spatial reasoning abilities show good understanding of geometric concepts and spatial relationships. With practice, you can further develop your visualization skills." :
                      results.accuracy >= 60 ?
                      "Your developing spatial reasoning skills show room for growth. Consider practicing with puzzles, 3D modeling, or spatial exercises to improve your abilities." :
                      "Your spatial reasoning skills need development. Focus on practicing with geometric puzzles, drawing exercises, and 3D visualization tasks to strengthen these abilities."
                    }
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="text-sm font-medium text-green-700 mb-1">🎯 Practical Applications:</div>
                  <div className="text-green-800 text-sm">
                    {results.accuracy >= 80 ? 
                      "Consider careers in engineering, architecture, graphic design, video game development, or any field requiring strong spatial visualization skills." :
                      results.accuracy >= 60 ?
                      "Your spatial abilities can be valuable in technical fields, construction, interior design, or any role requiring understanding of spatial relationships." :
                      "Focus on developing spatial skills through practice with puzzles, drawing, and 3D modeling to improve your career prospects in technical fields."
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown and Performance Analysis - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Mental Rotation</span>
                <span className="font-semibold text-blue-600">
                  {results.categoryScores['Mental Rotation']}% ({questions.filter((q: any) => q.category === 'Mental Rotation' && answers[q.id] === q.options[q.correct]).length}/{questions.filter((q: any) => q.category === 'Mental Rotation').length})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">2D/3D Visualization</span>
                <span className="font-semibold text-blue-600">
                  {results.categoryScores['2D/3D Visualization']}% ({questions.filter((q: any) => q.category === '2D/3D Visualization' && answers[q.id] === q.options[q.correct]).length}/{questions.filter((q: any) => q.category === '2D/3D Visualization').length})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Spatial Relationships</span>
                <span className="font-semibold text-blue-600">
                  {results.categoryScores['Spatial Relationships']}% ({questions.filter((q: any) => q.category === 'Spatial Relationships' && answers[q.id] === q.options[q.correct]).length}/{questions.filter((q: any) => q.category === 'Spatial Relationships').length})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Geometric Reasoning</span>
                <span className="font-semibold text-blue-600">
                  {results.categoryScores['Geometric Reasoning']}% ({questions.filter((q: any) => q.category === 'Geometric Reasoning' && answers[q.id] === q.options[q.correct]).length}/{questions.filter((q: any) => q.category === 'Geometric Reasoning').length})
                </span>
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Easy Questions</span>
                <span className="font-semibold text-green-600">
                  {Math.round((questions.filter((q: any) => q.difficulty === 'Easy' && answers[q.id] === q.options[q.correct]).length / questions.filter((q: any) => q.difficulty === 'Easy').length) * 100)}% ({questions.filter((q: any) => q.difficulty === 'Easy' && answers[q.id] === q.options[q.correct]).length}/{questions.filter((q: any) => q.difficulty === 'Easy').length})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Medium Questions</span>
                <span className="font-semibold text-yellow-600">
                  {Math.round((questions.filter((q: any) => q.difficulty === 'Medium' && answers[q.id] === q.options[q.correct]).length / questions.filter((q: any) => q.difficulty === 'Medium').length) * 100)}% ({questions.filter((q: any) => q.difficulty === 'Medium' && answers[q.id] === q.options[q.correct]).length}/{questions.filter((q: any) => q.difficulty === 'Medium').length})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Hard Questions</span>
                <span className="font-semibold text-red-600">
                  {Math.round((questions.filter((q: any) => q.difficulty === 'Hard' && answers[q.id] === q.options[q.correct]).length / questions.filter((q: any) => q.difficulty === 'Hard').length) * 100)}% ({questions.filter((q: any) => q.difficulty === 'Hard' && answers[q.id] === q.options[q.correct]).length}/{questions.filter((q: any) => q.difficulty === 'Hard').length})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderWorldGeographyResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const questions = JSON.parse(searchParams.get('questions') || '[]')

    if (!results || Object.keys(results).length === 0) {
      return (
        <div className="text-center">
          <p className="text-sage-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    return (
      <div className="space-y-2 mb-2">
        {/* Your Results and Key Insights - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-2">
          {/* Your Results - 40% width */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
              <div className="text-center">
                <h2 className="text-xl text-green-800 mb-1">
                  <span className="font-bold">Your Results</span>
                </h2>
                <p className="text-lg text-green-700 mb-3">Here's what we discovered about your<br /><span className="font-bold">World Geography Knowledge</span></p>
                <div className="text-5xl font-bold text-green-600 mb-2">{results.accuracy}%</div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">{results.level}</div>
                <div className="text-xl font-semibold text-green-700">{results.correctAnswers}/{results.totalQuestions} correct</div>
                <div className="text-lg font-semibold text-blue-600 mb-1">
                  Speed Score: {results.speedScore}%
                </div>
                <div className="text-sm text-green-600">
                  Average Time: {results.averageTime}s per question
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights - 60% width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights</h3>
              <div className="space-y-3">
                <p className="text-gray-700">{results.description}</p>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="text-sm font-medium text-green-700 mb-1">🌍 What This Means for You:</div>
                  <div className="text-green-800 text-sm">
                    Your geography knowledge shows {results.accuracy >= 80 ? 'strong' : results.accuracy >= 60 ? 'solid' : 'developing'} understanding of world geography. 
                    {results.accuracy >= 80 ? ' You demonstrate excellent knowledge of countries, capitals, landmarks, and physical features.' : 
                     results.accuracy >= 60 ? ' You have good foundational knowledge with room to explore more regions and topics.' : 
                     ' Consider exploring maps, atlases, and travel resources to expand your global knowledge.'}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-sm font-medium text-blue-700 mb-1">🗺️ Practical Applications:</div>
                  <div className="text-blue-800 text-sm">
                    {results.accuracy >= 80 ? 'Your strong geography knowledge can help with travel planning, cultural understanding, and global awareness.' :
                     results.accuracy >= 60 ? 'Your geography knowledge provides a good foundation for understanding world events and cultural diversity.' :
                     'Building geography knowledge can enhance your understanding of world events, travel experiences, and cultural awareness.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(results.categoryScores).map(([category, score]) => {
              // Calculate correct/total for this category from the actual test questions
              const categoryQuestions = questions.filter(q => q.category === category);
              const correctAnswers = categoryQuestions.filter(q => answers[q.id] === q.correct);
              const correctCount = correctAnswers.length;
              const totalCount = categoryQuestions.length;
              
              // Calculate the actual percentage based on the test questions
              const actualPercentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
              
              return (
                <div key={category} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm font-bold text-green-600">{actualPercentage}% ({correctCount}/{totalCount})</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${actualPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  }

  const renderTimeManagementResults = () => {
    const results = JSON.parse(searchParams.get('results') || '{}')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const questions = JSON.parse(searchParams.get('questions') || '[]')

    if (!results || Object.keys(results).length === 0) {
      return (
        <div className="text-center">
          <p className="text-sage-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    return (
      <div className="space-y-2 mb-2">
        {/* Your Results and Key Insights - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-2">
          {/* Your Results - 40% width */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
              <div className="text-center">
                <h2 className="text-xl text-green-800 mb-1">
                  <span className="font-bold">Your Results</span>
                </h2>
                <p className="text-lg text-green-700 mb-3">Here's what we discovered about your<br /><span className="font-bold">Time Management Style</span></p>
                <div className="text-5xl font-bold text-green-600 mb-2">{results.overallScore}%</div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">{results.style}</div>
                <div className="text-lg font-semibold text-green-700">{results.answeredQuestions}/{results.totalQuestions} completed</div>
              </div>
            </div>
          </div>

          {/* Key Insights - 60% width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights</h3>
              <div className="space-y-3">
                <p className="text-gray-700">{results.styleDescription}</p>
                {results.keyInsights && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="text-sm font-medium text-blue-700 mb-1">💡 What This Means for You:</div>
                    <div className="text-blue-800 text-sm">{results.keyInsights}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown and Performance Analysis - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Planning & Prioritization</span>
                <span className="font-semibold text-gray-800">{results.categoryScores.planning}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Time Awareness</span>
                <span className="font-semibold text-gray-800">{results.categoryScores['time-awareness']}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Productivity Habits</span>
                <span className="font-semibold text-gray-800">{results.categoryScores.productivity}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Stress & Workload</span>
                <span className="font-semibold text-gray-800">{results.categoryScores.stress}%</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h3>
            <div className="space-y-3">
              {results.recommendations.map((recommendation: string, index: number) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 text-sm">•</span>
                  <span className="text-gray-700 text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderStressTestResults = () => {
    const type = searchParams.get('type')
    const answers = JSON.parse(searchParams.get('answers') || '{}')
    const questions = JSON.parse(searchParams.get('questions') || '[]')
    const stress = stressTypes[type as keyof typeof stressTypes]

    if (!stress) {
      return (
        <div className="text-center">
          <p className="text-green-600">Unable to load results. Please try again.</p>
        </div>
      )
    }

    // Identify stress triggers based on High stress responses
    const getStressTriggers = () => {
      const triggerMap: { [key: string]: string } = {
        'overwhelmed by daily responsibilities': 'Daily Responsibilities Overwhelm',
        'time and prioritize tasks': 'Time Management Issues',
        'work-life balance': 'Work-Life Balance Challenges',
        'financial stress': 'Financial Stress',
        'difficult conversations or conflicts': 'Relationship/Conflict Issues',
        'take time for yourself': 'Self-Care Neglect',
        'sleep at night': 'Sleep Issues',
        'physical symptoms of stress': 'Physical Stress Symptoms',
        'support from others': 'Lack of Support Network',
        'unexpected changes': 'Change Management Issues',
        'criticism or negative feedback': 'Criticism Sensitivity',
        'unexpected challenges': 'Problem-Solving Stress',
        'multiple deadlines': 'Deadline Pressure'
      }

      const highStressAnswers = questions
        .filter((q: any) => answers[q.id] === 'High')
        .map((q: any) => {
          const question = q.question.toLowerCase()
          for (const [key, trigger] of Object.entries(triggerMap)) {
            if (question.includes(key)) {
              return trigger
            }
          }
          return null
        })
        .filter((trigger: string | null) => trigger !== null)

      // Remove duplicates and return top triggers
      return [...new Set(highStressAnswers)].slice(0, 3)
    }

    const stressTriggers = getStressTriggers()

    return (
      <>
        {/* Your Results and Recommendations - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-2">
          {/* Your Results - 40% width */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg px-4 py-2 h-full flex flex-col justify-center">
              <div className="text-center">
                <h2 className="text-xl text-green-800 mb-1">
                  <span className="font-bold">Your Results</span>
                </h2>
                <p className="text-lg text-green-700 mb-3">Here's what we discovered about your<br /><span className="font-bold">stress level</span></p>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full text-white text-sm font-bold">
                    {type === 'Low' ? 'LOW' : type === 'Medium' ? 'MED' : 'HIGH'}
                  </div>
                  <h2 className="text-xl font-bold text-green-800">
                    {stress.name}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations - 60% width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg px-4 py-2 h-full flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h3>
              <div className="space-y-1">
                {stress.recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="text-gray-700">• {recommendation}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stress Triggers */}
        {stressTriggers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Main Stress Triggers - <span className="font-normal text-sm">Based on your responses, here are the areas that cause you the most stress:</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {stressTriggers.map((trigger: string, index: number) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-1.5">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span className="text-red-800 font-medium text-sm">{trigger}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strengths and Areas for Growth - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
          {/* Strengths */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Strengths</h3>
            <div className="space-y-1">
              {stress.traits.map((trait: string, index: number) => (
                <div key={index} className="text-gray-700">• {trait}</div>
              ))}
            </div>
          </div>

          {/* Areas for Growth */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Areas for Growth</h3>
            <div className="space-y-1">
              {stress.weaknesses.map((weakness: string, index: number) => (
                <div key={index} className="text-gray-700">• {weakness}</div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  const getSEOContent = () => {
    const baseUrl = 'https://testyourself.com'
    
    switch (testType) {
      case 'math':
        return {
          title: 'Math Test Results - 7th-8th Grade Assessment | TestYourself',
          description: 'View your math test results and get insights about your mathematical abilities. See your performance across arithmetic, fractions, percentages, algebra, and geometry.',
          keywords: 'math test results, 7th grade math, 8th grade math, arithmetic, fractions, percentages, algebra, geometry, math assessment',
          ogTitle: 'Math Test Results - Mathematical Ability Assessment',
          ogDescription: 'View your math test results and get insights about your mathematical abilities across different categories.',
          ogImage: `${baseUrl}/images/math-test-results-og.jpg`,
          canonical: `${baseUrl}/results/math`
        }
      case 'personality':
        return {
          title: 'Character Assessment Results - Free Personality Type Test | TestYourself',
          description: 'View your detailed character assessment results! Discover your personality type, character traits, and behavioral patterns. Get comprehensive insights into your personality preferences and cognitive style with our free personality test.',
          keywords: 'character assessment results, personality test results, personality type, character traits, behavioral patterns, personality analysis, cognitive style, personality preferences, free personality test',
          ogTitle: 'Character Assessment Results - Free Personality Type Test',
          ogDescription: 'View your detailed character assessment results! Discover your personality type, character traits, and behavioral patterns.',
          ogImage: `${baseUrl}/images/character-assessment-results-og.jpg`,
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
      case 'emotional-intelligence':
        return {
          title: 'Emotional Intelligence Test Results - EQ Assessment & Analysis | TestYourself',
          description: 'View your Emotional Intelligence test results! Discover your EQ level, strengths, and areas for growth. Get detailed insights into your emotional awareness, empathy, and social skills.',
          keywords: 'emotional intelligence test results, EQ test results, emotional intelligence assessment, EQ level, emotional awareness, empathy test, social skills assessment, emotional intelligence analysis',
          ogTitle: 'Emotional Intelligence Test Results - EQ Assessment & Analysis',
          ogDescription: 'View your Emotional Intelligence test results! Discover your EQ level, strengths, and areas for growth. Get detailed insights into your emotional awareness.',
          ogImage: `${baseUrl}/emotional-intelligence-results-og-image.jpg`,
          canonical: `${baseUrl}/results/emotional-intelligence`
        }
      case 'color-blindness':
        return {
          title: 'Color Blindness Test Results - Ishihara Test Analysis | TestYourself',
          description: 'View your color blindness test results! Discover your color vision type, accuracy, and get detailed analysis of your color perception abilities.',
          keywords: 'color blindness test results, Ishihara test results, color vision test results, color deficiency results, color perception analysis',
          ogTitle: 'Color Blindness Test Results - Ishihara Test Analysis',
          ogDescription: 'Discover your color vision type with detailed Ishihara test analysis and comprehensive color perception assessment.',
          ogImage: `${baseUrl}/color-blindness-results-og-image.jpg`,
          canonical: `${baseUrl}/results/color-blindness`
        }
      case 'reaction-time':
        return {
          title: 'Reaction Time Test Results - Speed & Accuracy Assessment | TestYourself',
          description: 'View your reaction time test results! Discover your speed and accuracy level, get detailed analysis of your reaction time performance across different test types.',
          keywords: 'reaction time test results, speed test results, accuracy test results, visual reaction results, cognitive test results',
          ogTitle: 'Reaction Time Test Results - Speed & Accuracy Assessment',
          ogDescription: 'Discover your reaction time performance with detailed speed and accuracy analysis across color selection, sequential clicking, and movement tests.',
          ogImage: `${baseUrl}/reaction-time-results-og-image.jpg`,
          canonical: `${baseUrl}/results/reaction-time`
        }
      case 'stress-test':
        return {
          title: 'Stress Evaluation Results - Stress Level Assessment | TestYourself',
          description: 'View your stress evaluation results! Discover your stress level classification, get personalized stress management recommendations and coping strategies.',
          keywords: 'stress evaluation results, stress level assessment, stress management, stress test results, coping strategies, stress analysis',
          ogTitle: 'Stress Evaluation Results - Stress Level Assessment',
          ogDescription: 'View your stress evaluation results! Discover your stress level classification and get personalized stress management recommendations.',
          ogImage: `${baseUrl}/stress-evaluation-results-og-image.jpg`,
          canonical: `${baseUrl}/results/stress-test`
        }
      case 'iq-test':
        return {
          title: 'IQ Measurement Results - Intelligence Quotient Assessment | TestYourself',
          description: 'View your IQ measurement results! Discover your intelligence quotient score, cognitive abilities analysis, and detailed insights into your reasoning skills.',
          keywords: 'IQ test results, intelligence quotient results, IQ score, cognitive assessment results, intelligence test results, IQ measurement',
          ogTitle: 'IQ Measurement Results - Intelligence Quotient Assessment',
          ogDescription: 'View your IQ measurement results! Discover your intelligence quotient score and detailed cognitive abilities analysis.',
          ogImage: `${baseUrl}/iq-measurement-results-og-image.jpg`,
          canonical: `${baseUrl}/results/iq-test`
        }
      case 'time-management-test':
        return {
          title: 'Time Management Test Results - Productivity Assessment | TestYourself',
          description: 'View your time management test results! Discover your productivity style, time management skills analysis, and personalized recommendations for better efficiency.',
          keywords: 'time management test results, productivity test results, time management style, productivity assessment results, efficiency test results, time management skills',
          ogTitle: 'Time Management Test Results - Productivity Assessment',
          ogDescription: 'View your time management test results! Discover your productivity style and personalized recommendations for better efficiency.',
          ogImage: `${baseUrl}/time-management-test-results-og-image.jpg`,
          canonical: `${baseUrl}/results/time-management-test`
        }
      case 'spatial-reasoning-test':
        return {
          title: 'Spatial Reasoning Test Results - 3D Visualization Assessment | TestYourself',
          description: 'View your spatial reasoning test results! Discover your 3D visualization abilities, spatial thinking patterns, and detailed analysis of your geometric reasoning skills.',
          keywords: 'spatial reasoning test results, 3D visualization test results, spatial thinking results, geometric reasoning results, mental rotation test results, spatial awareness results',
          ogTitle: 'Spatial Reasoning Test Results - 3D Visualization Assessment',
          ogDescription: 'View your spatial reasoning test results! Discover your 3D visualization abilities and spatial thinking patterns.',
          ogImage: `${baseUrl}/spatial-reasoning-test-results-og-image.jpg`,
          canonical: `${baseUrl}/results/spatial-reasoning-test`
        }
      case 'world-geography-test':
        return {
          title: 'World Geography Test Results - Global Knowledge Assessment | TestYourself',
          description: 'View your world geography test results! Discover your global knowledge level, performance across countries, capitals, landmarks, flags, and physical geography.',
          keywords: 'world geography test results, geography challenge results, global knowledge results, countries capitals results, landmarks results, flags results, physical geography results',
          ogTitle: 'World Geography Test Results - Global Knowledge Assessment',
          ogDescription: 'View your world geography test results! Discover your global knowledge level and performance across different geography topics.',
          ogImage: `${baseUrl}/world-geography-test-results-og-image.jpg`,
          canonical: `${baseUrl}/results/world-geography-test`
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
        
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": testType === 'personality' ? "Character Assessment Test" :
                     testType === 'emotional-intelligence' ? "Emotional Intelligence Test" :
                     testType === 'trivia' ? "Trivia Quiz" :
                     testType === 'optical-illusion' ? "Optical Illusion Test" :
                     testType === 'memory' ? "Memory Challenge" :
                     testType === 'color-blindness' ? "Color Blindness Test" :
                     testType === 'stress-test' ? "Stress Evaluation Test" :
                     "TestYourself Assessment",
              "description": testType === 'personality' ? "Free personality type test based on character assessment principles. Discover your personality traits and behavioral patterns." :
                           testType === 'emotional-intelligence' ? "Free emotional intelligence test to assess your EQ level, emotional awareness, empathy, and social skills." :
                           testType === 'trivia' ? "Free trivia quiz to test your general knowledge across various categories." :
                           testType === 'optical-illusion' ? "Free optical illusion test to understand your visual perception and cognitive style." :
                           testType === 'memory' ? "Free memory challenge to test your cognitive memory and recall abilities." :
                           testType === 'color-blindness' ? "Free color blindness test using Ishihara plates to assess your color vision and detect color vision deficiency." :
                           testType === 'stress-test' ? "Free stress evaluation to assess your stress levels and learn effective coping strategies." :
                           "Free online assessments and tests for self-discovery.",
              "url": seoContent.canonical,
              "applicationCategory": "PsychologyApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "TestYourself",
                "url": "https://testyourself.com"
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": testType === 'emotional-intelligence' ? [
                  {
                    "@type": "Question",
                    "name": "What is emotional intelligence (EQ)?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Emotional intelligence is the ability to recognize, understand, and manage your own emotions, as well as recognize and influence the emotions of others. It includes self-awareness, self-regulation, motivation, empathy, and social skills."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate is the emotional intelligence test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our emotional intelligence test is based on established EQ assessment principles and provides insights into your emotional awareness and social skills. While no test is 100% accurate, it offers valuable self-discovery insights."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the emotional intelligence test take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The emotional intelligence test typically takes 5-7 minutes to complete, with 15 carefully selected questions designed to assess your EQ across five key components."
                    }
                  }
                ] : testType === 'stress-test' ? [
                  {
                    "@type": "Question",
                    "name": "What do my stress evaluation results mean?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Your stress evaluation results categorize your stress level as Low, Medium, or High, providing insights into your current stress management abilities and personalized recommendations for improvement."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate is the stress evaluation?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our stress evaluation is based on established stress assessment principles and provides valuable insights into your stress patterns. While no test is 100% accurate, it offers meaningful self-awareness and actionable recommendations."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can my stress level change over time?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, stress levels can change based on life circumstances, events, and the effectiveness of your coping strategies. Regular evaluation helps track changes and adjust stress management approaches accordingly."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should I do with my stress evaluation results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Use your results to identify areas for improvement, implement the personalized recommendations provided, and consider seeking professional help if you have high stress levels that significantly impact your daily life."
                    }
                  }
                ] : [
                  {
                    "@type": "Question",
                    "name": "What is a character assessment test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A character assessment test is a psychological evaluation that analyzes your personality traits, behavioral patterns, and cognitive preferences to determine your personality type."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate is the character assessment test?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our character assessment test is based on established psychological principles and provides insights into your personality preferences. While no test is 100% accurate, it offers valuable self-discovery insights."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the character assessment take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The character assessment test typically takes 5-10 minutes to complete, with 15 carefully selected questions designed to reveal your personality preferences."
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Quiz Schema for Emotional Intelligence Test */}
        {testType === 'emotional-intelligence' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Quiz",
                "name": testType === 'emotional-intelligence' ? "Emotional Intelligence Test" :
                       testType === 'stress-test' ? "Stress Evaluation Test" :
                       "Assessment Test",
                "description": testType === 'emotional-intelligence' ? "Free emotional intelligence test to assess your EQ level, emotional awareness, empathy, and social skills" :
                             testType === 'stress-test' ? "Free stress evaluation test to assess your stress levels and learn effective coping strategies" :
                             "Free online assessment test",
                "about": testType === 'emotional-intelligence' ? "Emotional Intelligence Assessment" :
                        testType === 'stress-test' ? "Stress Level Assessment" :
                        "Assessment",
                "educationalLevel": "Beginner",
                "educationalUse": "Assessment",
                "learningResourceType": "Quiz",
                "interactivityType": "Active",
                "typicalAgeRange": "16-99",
                "timeRequired": "PT5M",
                "isAccessibleForFree": true,
                "inLanguage": "en-US",
                "provider": {
                  "@type": "Organization",
                  "name": "TestYourself",
                  "url": "https://testyourself.com"
                },
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                }
              })
            }}
          />
        )}
        
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
                       testType === 'emotional-intelligence' ? 'Emotional Intelligence Assessment Results' :
                       testType === 'trivia' ? 'Trivia Quiz Results' :
                       testType === 'optical-illusion' ? 'Visual Perception Results' :
                       testType === 'memory' ? 'Memory Assessment Results' :
                       testType === 'color-blindness' ? 'Color Vision Assessment Results' :
                       'Test Results',
                "description": seoContent.description
              },
              "mainEntity": [
                {
                "@type": "Quiz",
                "name": seoContent.ogTitle,
                "description": seoContent.description,
                  "url": seoContent.canonical,
                  "educationalLevel": "beginner",
                  "learningResourceType": "assessment",
                  "audience": {
                    "@type": "EducationalAudience",
                    "educationalRole": "student",
                    "audienceType": "general public"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": testType === 'personality' ? [
                    {
                      "@type": "Question",
                      "name": "What do my personality test results mean?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Your personality test results show your character type and traits based on psychological assessment. The results provide insights into your behavior patterns, preferences, and how you interact with others."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How accurate are personality test results?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Personality tests provide insights into your character traits and behavioral patterns. While they offer valuable self-reflection, they should be used as a starting point for understanding yourself rather than definitive labels."
                      }
                    }
                  ] : testType === 'math' ? [
                    {
                      "@type": "Question",
                      "name": "What do my math test results show?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Your math test results show your performance across different mathematical areas including arithmetic, algebra, geometry, and problem-solving. The results help identify your strengths and areas for improvement."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How can I improve my math skills?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Focus on the areas where you scored lower, practice regularly with similar problems, and consider seeking additional help or resources for challenging topics. Consistent practice is key to improvement."
                      }
                    }
                  ] : testType === 'emotional-intelligence' ? [
                    {
                      "@type": "Question",
                      "name": "What is emotional intelligence?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Emotional intelligence (EQ) is the ability to recognize, understand, and manage your own emotions while also being aware of and responding appropriately to others' emotions."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How can I improve my emotional intelligence?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Practice self-awareness, develop empathy, improve your communication skills, and learn to manage stress effectively. Regular reflection on your emotional responses can help build EQ over time."
                      }
                    }
                  ] : testType === 'color-blindness' ? [
                    {
                      "@type": "Question",
                      "name": "What do my color blindness test results mean?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Your color blindness test results indicate your ability to distinguish colors. The test helps identify if you have any color vision deficiencies and provides insights into your color perception abilities."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Should I consult a doctor about my results?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "If the test indicates potential color vision issues, it's recommended to consult an eye care professional for a comprehensive examination and proper diagnosis."
                      }
                    }
                  ] : [
                    {
                      "@type": "Question",
                      "name": "What do my test results mean?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Your test results provide insights into your performance and abilities in the specific area being tested. They help identify your strengths and areas for improvement."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How can I improve my performance?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Focus on the areas where you scored lower, practice regularly, and consider seeking additional resources or guidance. Consistent practice and targeted improvement efforts can help enhance your skills."
                      }
                    }
                  ]
                }
              ],
              "inLanguage": "en",
              "isAccessibleForFree": true,
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
                    "name": testType === 'personality' ? 'Character Assessment' :
                           testType === 'math' ? 'Math Test' :
                           testType === 'emotional-intelligence' ? 'Emotional Intelligence Test' :
                           testType === 'trivia' ? 'Trivia Quiz' :
                           testType === 'optical-illusion' ? 'Optical Illusion Test' :
                           testType === 'memory' ? 'Memory Test' :
                           testType === 'color-blindness' ? 'Color Blindness Test' :
                           testType === 'reaction-time' ? 'Reaction Time Test' :
                           testType === 'stress-test' ? 'Stress Evaluation' :
                           'Test',
                    "item": `https://testyourself.com/${testType}`
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Results",
                    "item": seoContent.canonical
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
                   testType === 'trivia' ? 'Trivia Quiz Results' :
                   testType === 'memory' ? 'Memory Challenge Results' :
                   testType === 'optical-illusion' ? 'Optical Illusion Test Results' :
                   testType === 'emotional-intelligence' ? 'Emotional Intelligence Test Results' :
                   testType === 'color-blindness' ? 'Color Blindness Test Results' :
                   testType === 'reaction-time' ? 'Reaction Time Test Results' :
                   testType === 'stress-test' ? 'Stress Evaluation Results' :
                   testType === 'iq-test' ? 'IQ Measurement Results' :
                   testType === 'time-management-test' ? 'Time Management Test Results' :
                   testType === 'spatial-reasoning-test' ? 'Spatial Reasoning Test Results' :
                   testType === 'world-geography-test' ? 'World Geography Test Results' :
                   'Test Results'}
                </h1>
            </div>
          </div>

            {/* Action Buttons - For Emotional Intelligence, Personality, Optical Illusion, Trivia, Memory, Math, and Color Blindness Tests */}
            {(testType === 'emotional-intelligence' || testType === 'personality' || testType === 'optical-illusion' || testType === 'trivia' || testType === 'memory' || testType === 'math' || testType === 'color-blindness' || testType === 'reaction-time' || testType === 'stress-test' || testType === 'iq-test' || testType === 'time-management-test' || testType === 'spatial-reasoning-test' || testType === 'world-geography-test') && (
              <div className="mb-2">
            <div className="bg-gray-50 rounded-2xl shadow-lg p-2">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                      onClick={() => router.push(`/results/${testType}/share?${searchParams.toString()}`)}
                  className="px-8 py-3 bg-sage-500 text-white rounded-full font-medium hover:bg-sage-600 transition-all duration-300"
                >
                      📤 Share Results
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
        
            {/* Results Content */}
            <div className={`mt-2 ${(testType === 'emotional-intelligence' || testType === 'personality' || testType === 'optical-illusion' || testType === 'trivia' || testType === 'memory' || testType === 'math' || testType === 'color-blindness' || testType === 'reaction-time' || testType === 'stress-test' || testType === 'iq-test' || testType === 'time-management-test' || testType === 'spatial-reasoning-test' || testType === 'world-geography-test') ? 'mb-2' : ''}`}>
            {testType === 'personality' ? renderPersonalityResults() : 
             testType === 'math' ? renderMathResults() :
             testType === 'trivia' ? renderTriviaResults() : 
             testType === 'optical-illusion' ? renderOpticalIllusionResults() :
             testType === 'memory' ? renderMemoryResults() :
             testType === 'color-blindness' ? renderColorBlindnessResults() :
             testType === 'reaction-time' ? renderReactionTimeResults() :
               testType === 'emotional-intelligence' ? renderEmotionalIntelligenceResults() :
             testType === 'stress-test' ? renderStressTestResults() :
             testType === 'iq-test' ? renderIQMeasurementResults() :
             testType === 'time-management-test' ? renderTimeManagementResults() :
             testType === 'spatial-reasoning-test' ? renderSpatialReasoningResults() :
             testType === 'world-geography-test' ? renderWorldGeographyResults() :
             renderOtherResults()}
          </div>
                        
            {/* Action Buttons - Exclude Emotional Intelligence, Personality, Optical Illusion, Trivia, Memory, Math, and Color Blindness as they have their own buttons at top */}
            {testType !== 'emotional-intelligence' && testType !== 'personality' && testType !== 'optical-illusion' && testType !== 'trivia' && testType !== 'memory' && testType !== 'math' && testType !== 'color-blindness' && testType !== 'reaction-time' && testType !== 'stress-test' && testType !== 'iq-test' && testType !== 'time-management-test' && testType !== 'spatial-reasoning-test' && testType !== 'world-geography-test' && (
              <div className="mt-2 mb-2">
          <div className="bg-gray-50 rounded-2xl shadow-lg p-2">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                      onClick={() => router.push(`/results/${testType}/share?${searchParams.toString()}`)}
                className="px-8 py-3 bg-sage-500 text-white rounded-full font-medium hover:bg-sage-600 transition-all duration-300"
              >
                      📤 Share Results
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
