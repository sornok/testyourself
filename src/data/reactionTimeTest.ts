export interface ReactionQuestion {
  id: number;
  type: 'color-selection' | 'sequential-click' | 'movement';
  instruction: string;
  stimulus: {
    color?: string;
    first?: number;
    second?: number;
    corner?: string;
    delay?: number;
  };
  correctAction: 'click' | 'sequential' | 'movement';
  category: 'color-selection' | 'sequential-click' | 'movement';
  explanation?: string;
}

export interface ReactionResult {
  totalScore: number;
  totalQuestions: number;
  averageReactionTime: number;
  categoryScores: {
    'color-selection': number;
    'sequential-click': number;
    'movement': number;
  };
  categoryAverages: {
    'color-selection': number;
    'sequential-click': number;
    'movement': number;
  };
  overallAverage: number;
  level: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced';
  description: string;
  strengths: string[];
  areasForGrowth: string[];
  recommendations: string[];
}

export const reactionQuestions: ReactionQuestion[] = [
  // Color Selection Reaction (15 questions)
  {
    id: 1,
    type: 'color-selection',
    instruction: 'Green',
    stimulus: { color: 'green', delay: 2000 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests color recognition and selection speed'
  },
  {
    id: 2,
    type: 'color-selection',
    instruction: 'Blue',
    stimulus: { color: 'blue', delay: 3000 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests color discrimination with longer delay'
  },
  {
    id: 3,
    type: 'color-selection',
    instruction: 'Yellow',
    stimulus: { color: 'yellow', delay: 2500 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests color selection with medium delay'
  },
  {
    id: 4,
    type: 'color-selection',
    instruction: 'Red',
    stimulus: { color: 'red', delay: 4000 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests color recognition with longer anticipation'
  },
  {
    id: 5,
    type: 'color-selection',
    instruction: 'Green',
    stimulus: { color: 'green', delay: 3500 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests color selection with varied timing'
  },
  {
    id: 6,
    type: 'color-selection',
    instruction: 'Green',
    stimulus: { color: 'green', delay: 5000 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests sustained color attention and selection'
  },
  {
    id: 7,
    type: 'color-selection',
    instruction: 'Blue',
    stimulus: { color: 'blue', delay: 2200 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests quick color selection'
  },
  {
    id: 8,
    type: 'color-selection',
    instruction: 'Yellow',
    stimulus: { color: 'yellow', delay: 2800 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests color selection with medium delay'
  },
  {
    id: 9,
    type: 'color-selection',
    instruction: 'Red',
    stimulus: { color: 'red', delay: 3200 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests consistent color selection'
  },
  {
    id: 10,
    type: 'color-selection',
    instruction: 'Red',
    stimulus: { color: 'red', delay: 2600 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests color selection with varied timing'
  },
  {
    id: 11,
    type: 'color-selection',
    instruction: 'Green',
    stimulus: { color: 'green', delay: 3800 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests sustained color attention'
  },
  {
    id: 12,
    type: 'color-selection',
    instruction: 'Blue',
    stimulus: { color: 'blue', delay: 2400 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests quick color response'
  },
  {
    id: 13,
    type: 'color-selection',
    instruction: 'Yellow',
    stimulus: { color: 'yellow', delay: 4200 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests patience and color selection'
  },
  {
    id: 14,
    type: 'color-selection',
    instruction: 'Red',
    stimulus: { color: 'red', delay: 2900 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests accurate color selection'
  },
  {
    id: 15,
    type: 'color-selection',
    instruction: 'Blue',
    stimulus: { color: 'blue', delay: 3600 },
    correctAction: 'click',
    category: 'color-selection',
    explanation: 'Tests final color selection consistency'
  },

  // Shape Selection Reaction (15 questions)
  {
    id: 16,
    type: 'shape-selection',
    instruction: 'Circle',
    stimulus: { shape: 'circle', position: 'center', size: 'medium', delay: 2000 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests shape recognition and selection speed'
  },
  {
    id: 17,
    type: 'shape-selection',
    instruction: 'Triangle',
    stimulus: { shape: 'triangle', position: 'top-left', size: 'small', delay: 2500 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests shape selection with different positions'
  },
  {
    id: 18,
    type: 'shape-selection',
    instruction: 'Square',
    stimulus: { shape: 'square', position: 'top-right', size: 'large', delay: 3000 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests shape selection with size variation'
  },
  {
    id: 19,
    type: 'shape-selection',
    instruction: 'Diamond',
    stimulus: { shape: 'diamond', position: 'bottom-left', size: 'medium', delay: 3500 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests complex shape selection'
  },
  {
    id: 20,
    type: 'shape-selection',
    instruction: 'Circle',
    stimulus: { shape: 'circle', position: 'bottom-right', size: 'small', delay: 4000 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests detailed shape selection'
  },
  {
    id: 21,
    type: 'shape-selection',
    instruction: 'Circle',
    stimulus: { shape: 'circle', position: 'top-left', size: 'large', delay: 2200 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests circle selection in corner position'
  },
  {
    id: 22,
    type: 'shape-selection',
    instruction: 'Triangle',
    stimulus: { shape: 'triangle', position: 'center', size: 'medium', delay: 2800 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests triangle selection in center'
  },
  {
    id: 23,
    type: 'shape-selection',
    instruction: 'Square',
    stimulus: { shape: 'square', position: 'bottom-left', size: 'small', delay: 3200 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests square selection in corner'
  },
  {
    id: 24,
    type: 'shape-selection',
    instruction: 'Diamond',
    stimulus: { shape: 'diamond', position: 'top-right', size: 'large', delay: 3800 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests diamond selection in top corner'
  },
  {
    id: 25,
    type: 'shape-selection',
    instruction: 'Triangle',
    stimulus: { shape: 'triangle', position: 'center', size: 'medium', delay: 4200 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests triangle selection in center position'
  },
  {
    id: 26,
    type: 'shape-selection',
    instruction: 'Circle',
    stimulus: { shape: 'circle', position: 'bottom-right', size: 'small', delay: 2600 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests circle selection in bottom corner'
  },
  {
    id: 27,
    type: 'shape-selection',
    instruction: 'Triangle',
    stimulus: { shape: 'triangle', position: 'top-right', size: 'large', delay: 3400 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests triangle selection with size variation'
  },
  {
    id: 28,
    type: 'shape-selection',
    instruction: 'Square',
    stimulus: { shape: 'square', position: 'center', size: 'medium', delay: 3600 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests square selection in center position'
  },
  {
    id: 29,
    type: 'shape-selection',
    instruction: 'Diamond',
    stimulus: { shape: 'diamond', position: 'bottom-left', size: 'small', delay: 4800 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests diamond selection in corner'
  },
  {
    id: 30,
    type: 'shape-selection',
    instruction: 'Square',
    stimulus: { shape: 'square', position: 'top-left', size: 'large', delay: 5200 },
    correctAction: 'click',
    category: 'shape-selection',
    explanation: 'Tests square selection with size variation'
  },

  // Sequential Click Test (15 questions)
  {
    id: 31,
    type: 'sequential-click',
    instruction: 'First: 1 - Second: 7',
    stimulus: { first: 1, second: 7, delay: 2000 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 32,
    type: 'sequential-click',
    instruction: 'First: 3 - Second: 9',
    stimulus: { first: 3, second: 9, delay: 2500 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 33,
    type: 'sequential-click',
    instruction: 'First: 2 - Second: 5',
    stimulus: { first: 2, second: 5, delay: 3000 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 34,
    type: 'sequential-click',
    instruction: 'First: 4 - Second: 8',
    stimulus: { first: 4, second: 8, delay: 1800 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 35,
    type: 'sequential-click',
    instruction: 'First: 6 - Second: 2',
    stimulus: { first: 6, second: 2, delay: 2200 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 36,
    type: 'sequential-click',
    instruction: 'First: 9 - Second: 3',
    stimulus: { first: 9, second: 3, delay: 2800 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 37,
    type: 'sequential-click',
    instruction: 'First: 5 - Second: 1',
    stimulus: { first: 5, second: 1, delay: 3500 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 38,
    type: 'sequential-click',
    instruction: 'First: 7 - Second: 4',
    stimulus: { first: 7, second: 4, delay: 2000 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 39,
    type: 'sequential-click',
    instruction: 'First: 8 - Second: 6',
    stimulus: { first: 8, second: 6, delay: 2500 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 40,
    type: 'sequential-click',
    instruction: 'First: 1 - Second: 9',
    stimulus: { first: 1, second: 9, delay: 3000 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 41,
    type: 'sequential-click',
    instruction: 'First: 3 - Second: 7',
    stimulus: { first: 3, second: 7, delay: 1800 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 42,
    type: 'sequential-click',
    instruction: 'First: 5 - Second: 8',
    stimulus: { first: 5, second: 8, delay: 2200 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 43,
    type: 'sequential-click',
    instruction: 'First: 2 - Second: 6',
    stimulus: { first: 2, second: 6, delay: 2800 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 44,
    type: 'sequential-click',
    instruction: 'First: 9 - Second: 1',
    stimulus: { first: 9, second: 1, delay: 3500 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  {
    id: 45,
    type: 'sequential-click',
    instruction: 'First: 4 - Second: 3',
    stimulus: { first: 4, second: 3, delay: 4000 },
    correctAction: 'sequential',
    category: 'sequential-click',
    explanation: 'Tests sequential reaction time and working memory'
  },
  // Movement Test (15 questions)
  {
    id: 46,
    type: 'movement',
    instruction: 'Move to Top-Left corner',
    stimulus: {
      corner: 'top-left',
      delay: 2500
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 47,
    type: 'movement',
    instruction: 'Move to Top-Right corner',
    stimulus: {
      corner: 'top-right',
      delay: 3200
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 48,
    type: 'movement',
    instruction: 'Move to Bottom-Left corner',
    stimulus: {
      corner: 'bottom-left',
      delay: 2800
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 49,
    type: 'movement',
    instruction: 'Move to Bottom-Right corner',
    stimulus: {
      corner: 'bottom-right',
      delay: 3500
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 50,
    type: 'movement',
    instruction: 'Move to Top-Left corner',
    stimulus: {
      corner: 'top-left',
      delay: 2900
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 51,
    type: 'movement',
    instruction: 'Move to Top-Right corner',
    stimulus: {
      corner: 'top-right',
      delay: 3100
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 52,
    type: 'movement',
    instruction: 'Move to Bottom-Left corner',
    stimulus: {
      corner: 'bottom-left',
      delay: 2700
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 53,
    type: 'movement',
    instruction: 'Move to Bottom-Right corner',
    stimulus: {
      corner: 'bottom-right',
      delay: 3300
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 54,
    type: 'movement',
    instruction: 'Move to Top-Left corner',
    stimulus: {
      corner: 'top-left',
      delay: 3000
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 55,
    type: 'movement',
    instruction: 'Move to Top-Right corner',
    stimulus: {
      corner: 'top-right',
      delay: 2600
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 56,
    type: 'movement',
    instruction: 'Move to Bottom-Left corner',
    stimulus: {
      corner: 'bottom-left',
      delay: 3400
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 57,
    type: 'movement',
    instruction: 'Move to Bottom-Right corner',
    stimulus: {
      corner: 'bottom-right',
      delay: 2800
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 58,
    type: 'movement',
    instruction: 'Move to Top-Left corner',
    stimulus: {
      corner: 'top-left',
      delay: 3200
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 59,
    type: 'movement',
    instruction: 'Move to Top-Right corner',
    stimulus: {
      corner: 'top-right',
      delay: 2900
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  },
  {
    id: 60,
    type: 'movement',
    instruction: 'Move to Bottom-Left corner',
    stimulus: {
      corner: 'bottom-left',
      delay: 3100
    },
    correctAction: 'movement',
    category: 'movement',
    explanation: 'Tests mouse movement reaction time and spatial awareness'
  }
];

export const selectRandomReactionQuestions = (count = 9): ReactionQuestion[] => {
  const categories = ['color-selection', 'sequential-click', 'movement'];
  const questionsPerCategory = Math.floor(count / categories.length);
  const remainingQuestions = count % categories.length;
  
  const selectedQuestions: ReactionQuestion[] = [];
  
  // Select questions from each category
  categories.forEach((category, categoryIndex) => {
    const categoryQuestions = reactionQuestions.filter(q => q.category === category);
    const questionsToSelect = questionsPerCategory + (categoryIndex < remainingQuestions ? 1 : 0);
    
    // Shuffle category questions
    const shuffled = [...categoryQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Select the required number of questions
    selectedQuestions.push(...shuffled.slice(0, questionsToSelect));
  });
  
  // Shuffle the final selection to randomize order
  const finalShuffled = [...selectedQuestions];
  for (let i = finalShuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalShuffled[i], finalShuffled[j]] = [finalShuffled[j], finalShuffled[i]];
  }
  
  return finalShuffled.map((question: ReactionQuestion, index: number) => ({
    ...question,
    id: index + 1
  }));
};

export const calculateReactionResults = (answers: number[], reactionTimes: number[], selectedQuestions: ReactionQuestion[]): ReactionResult => {
  const categoryScores = {
    'color-selection': 0,
    'sequential-click': 0,
    'movement': 0
  };

  const categoryCounts = {
    'color-selection': 0,
    'sequential-click': 0,
    'movement': 0
  };

  const categoryReactionTimes = {
    'color-selection': [] as number[],
    'sequential-click': [] as number[],
    'movement': [] as number[]
  };

  let answeredQuestions = 0;
  let totalReactionTime = 0;

  // Calculate scores for each category
  answers.forEach((answer, questionIndex) => {
    const question = selectedQuestions[questionIndex];
    const reactionTime = reactionTimes[questionIndex];
    
    if (question && answer !== undefined && reactionTime !== undefined) {
      answeredQuestions += 1;
      totalReactionTime += reactionTime;
      
      // For sequential-click, check if both clicks were made in correct order
      if (question.type === 'sequential-click') {
        // For now, we'll score based on completion (both clicks made)
        // The actual sequential logic will be implemented in the UI
        if (answer !== undefined && reactionTimes[questionIndex] !== undefined) {
          categoryScores[question.category] += 1;
        }
      } else {
        // For color-selection and shape-selection, any click is correct
        if (answer === 0) {
          categoryScores[question.category] += 1;
        }
      }
      
      categoryCounts[question.category] += 1;
      categoryReactionTimes[question.category].push(reactionTime);
    }
  });

  const totalScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0);
  const averageReactionTime = answeredQuestions > 0 ? Math.round(totalReactionTime / answeredQuestions) : 0;

  // Calculate category averages (reaction time based)
  const categoryAverages = {
    'color-selection': categoryReactionTimes['color-selection'].length > 0 
      ? Math.round(categoryReactionTimes['color-selection'].reduce((sum, time) => sum + time, 0) / categoryReactionTimes['color-selection'].length)
      : 0,
    'sequential-click': categoryReactionTimes['sequential-click'].length > 0 
      ? Math.round(categoryReactionTimes['sequential-click'].reduce((sum, time) => sum + time, 0) / categoryReactionTimes['sequential-click'].length)
      : 0,
    'movement': categoryReactionTimes['movement'].length > 0 
      ? Math.round(categoryReactionTimes['movement'].reduce((sum, time) => sum + time, 0) / categoryReactionTimes['movement'].length)
      : 0
  };

  // Calculate overall average (reaction time based, lower is better)
  const overallAverage = Math.round((categoryAverages['color-selection'] + categoryAverages['sequential-click'] + categoryAverages['movement']) / 3);

  // Determine level based on average reaction time
  let level: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced';
  if (averageReactionTime > 400) {
    level = 'Beginner';
  } else if (averageReactionTime > 300) {
    level = 'Developing';
  } else if (averageReactionTime > 200) {
    level = 'Proficient';
  } else {
    level = 'Advanced';
  }

  const descriptions = {
    'Beginner': 'Your reaction time is in the beginner range. With practice, you can significantly improve your response speed and accuracy.',
    'Developing': 'You have developing reaction skills. You\'re making good progress and can continue to refine your response times.',
    'Proficient': 'You have proficient reaction time skills. You respond quickly and accurately to visual stimuli.',
    'Advanced': 'You have advanced reaction time skills. Your responses are exceptionally fast and precise.'
  };

  // Generate strengths and areas for growth
  const strengths: string[] = [];
  const areasForGrowth: string[] = [];

  if (level === 'Advanced') {
    strengths.push('Exceptional reaction speed');
    strengths.push('Excellent visual processing');
    strengths.push('Superior attention control');
    strengths.push('Outstanding impulse control');
    if (categoryScores['movement'] / categoryCounts['movement'] > 0.8) {
      strengths.push('Excellent spatial awareness and movement control');
    }
  } else if (level === 'Proficient') {
    strengths.push('Good reaction speed');
    strengths.push('Solid visual processing');
    strengths.push('Reliable attention control');
    if (categoryScores['sequential-click'] / categoryCounts['sequential-click'] > 0.8) {
      strengths.push('Strong sequential processing');
    }
    if (categoryScores['movement'] / categoryCounts['movement'] > 0.8) {
      strengths.push('Good spatial awareness and movement control');
    }
  } else   if (level === 'Developing') {
    strengths.push('Improving reaction speed');
    strengths.push('Developing visual processing');
    if (categoryScores['color-selection'] / categoryCounts['color-selection'] > 0.7) {
      strengths.push('Good basic reaction skills');
    }
    if (categoryScores['movement'] / categoryCounts['movement'] > 0.7) {
      strengths.push('Developing spatial awareness');
    }
  } else {
    strengths.push('Basic reaction capabilities');
    if (categoryScores['color-selection'] / categoryCounts['color-selection'] > 0.6) {
      strengths.push('Some visual processing skills');
    }
    if (categoryScores['movement'] / categoryCounts['movement'] > 0.6) {
      strengths.push('Some spatial awareness');
    }
  }

  if (averageReactionTime > 350) {
    areasForGrowth.push('Improve overall reaction speed');
  }
  if (categoryScores['sequential-click'] / categoryCounts['sequential-click'] < 0.8) {
    areasForGrowth.push('Improve sequential processing');
  }
  if (categoryScores['color-selection'] / categoryCounts['color-selection'] < 0.8) {
    areasForGrowth.push('Practice basic reaction tasks');
  }
  if (categoryScores['movement'] / categoryCounts['movement'] < 0.8) {
    areasForGrowth.push('Improve spatial awareness and movement precision');
  }

  if (areasForGrowth.length === 0) {
    areasForGrowth.push('Continue practicing to maintain your excellent reaction skills');
  }

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (level === 'Advanced') {
    recommendations.push('Consider competitive gaming or sports that require quick reactions');
    recommendations.push('Share your skills by helping others improve their reaction time');
    recommendations.push('Explore advanced reaction training exercises');
  } else if (level === 'Proficient') {
    recommendations.push('Practice reaction time exercises regularly');
    recommendations.push('Try more challenging reaction games');
    recommendations.push('Focus on consistency in your responses');
  } else if (level === 'Developing') {
    recommendations.push('Practice simple reaction time exercises daily');
    recommendations.push('Focus on accuracy before speed');
    recommendations.push('Try visual tracking exercises');
  } else {
    recommendations.push('Start with basic reaction time practice');
    recommendations.push('Focus on improving attention and focus');
    recommendations.push('Consider exercises that improve visual processing');
  }

  return {
    totalScore,
    totalQuestions: answeredQuestions,
    averageReactionTime,
    categoryScores,
    categoryAverages,
    overallAverage,
    level,
    description: descriptions[level],
    strengths,
    areasForGrowth,
    recommendations
  };
};
