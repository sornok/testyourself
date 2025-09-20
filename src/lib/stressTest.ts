// Load stress test data using fetch
let stressQuestionsData: any = null;

const loadStressQuestionsData = async () => {
  if (stressQuestionsData) return stressQuestionsData;
  
  try {
    const response = await fetch('/stressTest.json');
    stressQuestionsData = await response.json();
    return stressQuestionsData;
  } catch (error) {
    console.error('Error loading stress questions:', error);
    throw error;
  }
};

// Get random stress questions for the test
export const getRandomStressQuestions = async (count = 15) => {
  // Clear cache to ensure fresh randomization
  stressQuestionsData = null;
  const data = await loadStressQuestionsData();
  
  // Create a proper shuffle function using Fisher-Yates algorithm
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count).map((question: any, index: number) => ({
    ...question,
    id: index + 1 // Reassign IDs for the selected questions
  }));
};

// Calculate stress level based on answers
export const calculateStressType = (answers: any, questions: any[]) => {
  const scores = {
    Low: 0,     // Low stress indicators
    Medium: 0,  // Medium stress indicators
    High: 0     // High stress indicators
  };
  
  questions.forEach((question: any) => {
    const userAnswer = answers[question.id];
    if (userAnswer) {
      const selectedOption = question.options.find((opt: any) => opt.type === userAnswer);
      if (selectedOption) {
        scores[selectedOption.type as keyof typeof scores]++;
      }
    }
  });

  // Determine stress level based on highest score
  const maxScore = Math.max(scores.Low, scores.Medium, scores.High);
  let stressType = 'Low';
  
  if (scores.High === maxScore) stressType = 'High';
  else if (scores.Medium === maxScore) stressType = 'Medium';
  else stressType = 'Low';

  return stressType;
};

// Stress level types and descriptions
export const stressTypes = {
  Low: {
    name: 'Low Stress Level',
    description: 'You demonstrate excellent stress management skills and maintain a healthy balance in your life. You have effective coping mechanisms and generally feel in control of your circumstances.',
    traits: [
      'Calm and composed',
      'Effective time management',
      'Healthy boundaries',
      'Positive outlook',
      'Good work-life balance',
      'Strong support network',
      'Regular self-care'
    ],
    weaknesses: [
      'May sometimes avoid challenges',
      'Could benefit from more ambitious goals',
      'Might miss growth opportunities'
    ],
    recommendations: [
      'Continue your current stress management practices',
      'Consider taking on new challenges for personal growth',
      'Share your coping strategies with others',
      'Maintain your healthy lifestyle habits'
    ]
  },
  Medium: {
    name: 'Medium Stress Level',
    description: 'You experience moderate levels of stress with some areas that could benefit from attention. You have some effective coping strategies but may need to develop additional tools for stress management.',
    traits: [
      'Generally resilient',
      'Some effective coping strategies',
      'Aware of stress triggers',
      'Seeking improvement',
      'Open to learning',
      'Moderate self-care practices'
    ],
    weaknesses: [
      'Occasional overwhelm',
      'Some areas need better boundaries',
      'Could improve time management',
      'May benefit from more support'
    ],
    recommendations: [
      'Develop additional stress management techniques',
      'Improve time management and prioritization',
      'Strengthen your support network',
      'Practice mindfulness and relaxation techniques',
      'Set clearer boundaries in personal and professional life'
    ]
  },
  High: {
    name: 'High Stress Level',
    description: 'You are experiencing significant stress that may be impacting your well-being. It\'s important to take immediate steps to address stress management and consider seeking professional support if needed.',
    traits: [
      'High awareness of stress',
      'Motivated to make changes',
      'Recognizes need for help',
      'Willing to learn new strategies',
      'Committed to improvement'
    ],
    weaknesses: [
      'Overwhelming stress levels',
      'Limited coping strategies',
      'Poor work-life balance',
      'Difficulty setting boundaries',
      'May be neglecting self-care'
    ],
    recommendations: [
      'Seek professional help or counseling',
      'Implement immediate stress reduction techniques',
      'Prioritize self-care and relaxation',
      'Consider lifestyle changes to reduce stressors',
      'Build a strong support network',
      'Practice daily mindfulness and breathing exercises',
      'Consider reducing commitments and responsibilities'
    ]
  }
};
