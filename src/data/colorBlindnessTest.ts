export interface ColorBlindnessQuestion {
  id: number;
  question: string;
  image: string;
  options: ColorBlindnessOption[];
  correctAnswer: number;
  explanation: string;
}

export interface ColorBlindnessOption {
  text: string;
  value: string;
}

export interface ColorBlindnessResult {
  totalScore: number;
  totalQuestions: number;
  accuracy: number;
  colorBlindnessType: 'Normal' | 'Protanopia' | 'Deuteranopia' | 'Tritanopia' | 'Monochromacy' | 'Unknown';
  severity: 'None' | 'Mild' | 'Moderate' | 'Severe';
  description: string;
  recommendations: string[];
  insights: string[];
}

export const colorBlindnessQuestions: ColorBlindnessQuestion[] = [
  {
    id: 1,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-1.jpg",
    options: [
      { text: "12", value: "12" },
      { text: "7", value: "7" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" }
    ],
    correctAnswer: 0,
    explanation: "This is a classic Ishihara test. People with normal color vision should see '12'. Those with red-green color blindness may see '7' or nothing."
  },
  {
    id: 2,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-2.jpg",
    options: [
      { text: "8", value: "8" },
      { text: "3", value: "3" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" }
    ],
    correctAnswer: 0,
    explanation: "People with normal color vision should see '8'. Those with protanopia (red-blind) may see '3' or nothing."
  },
  {
    id: 3,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-3.jpg",
    options: [
      { text: "6", value: "6" },
      { text: "9", value: "9" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '6'. Those with deuteranopia (green-blind) may see '9' or nothing."
  },
  {
    id: 4,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-4.jpg",
    options: [
      { text: "5", value: "5" },
      { text: "2", value: "2" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '5'. Those with red-green color blindness may see '2' or nothing."
  },
  {
    id: 5,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-5.jpg",
    options: [
      { text: "74", value: "74" },
      { text: "21", value: "21" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '74'. Those with color blindness may see '21' or nothing."
  },
  {
    id: 6,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-6.jpg",
    options: [
      { text: "2", value: "2" },
      { text: "7", value: "7" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '2'. Those with protanopia may see '7' or nothing."
  },
  {
    id: 7,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-7.jpg",
    options: [
      { text: "45", value: "45" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" },
      { text: "Unclear", value: "unclear" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '45'. Those with severe color blindness may see nothing."
  },
  {
    id: 8,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-8.jpg",
    options: [
      { text: "29", value: "29" },
      { text: "70", value: "70" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '29'. Those with deuteranopia may see '70' or nothing."
  },
  {
    id: 9,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-9.jpg",
    options: [
      { text: "15", value: "15" },
      { text: "17", value: "17" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '15'. Those with color blindness may see '17' or nothing."
  },
  {
    id: 10,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-10.jpg",
    options: [
      { text: "97", value: "97" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" },
      { text: "Unclear", value: "unclear" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '97'. Those with severe color blindness may see nothing."
  },
  {
    id: 11,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-11.jpg",
    options: [
      { text: "16", value: "16" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" },
      { text: "Unclear", value: "unclear" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '16'. Those with color blindness may see nothing."
  },
  {
    id: 12,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-12.jpg",
    options: [
      { text: "35", value: "35" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" },
      { text: "Unclear", value: "unclear" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '35'. Those with color blindness may see nothing."
  },
  {
    id: 13,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-13.jpg",
    options: [
      { text: "96", value: "96" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" },
      { text: "Unclear", value: "unclear" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '96'. Those with color blindness may see nothing."
  },
  {
    id: 14,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-14.jpg",
    options: [
      { text: "42", value: "42" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" },
      { text: "Unclear", value: "unclear" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '42'. Those with color blindness may see nothing."
  },
  {
    id: 15,
    question: "What number do you see in this image?",
    image: "/images/color-blindness/ishihara-15.jpg",
    options: [
      { text: "73", value: "73" },
      { text: "Nothing", value: "nothing" },
      { text: "Other", value: "other" },
      { text: "Unclear", value: "unclear" }
    ],
    correctAnswer: 0,
    explanation: "Normal color vision should see '73'. Those with color blindness may see nothing."
  }
];

export const calculateColorBlindnessResults = (answers: number[]): ColorBlindnessResult => {
  let correctAnswers = 0;
  const totalQuestions = answers.length;

  // Count correct answers
  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === colorBlindnessQuestions[questionIndex].correctAnswer) {
      correctAnswers++;
    }
  });

  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const totalScore = correctAnswers;

  // Determine color blindness type based on specific wrong answers
  let colorBlindnessType: 'Normal' | 'Protanopia' | 'Deuteranopia' | 'Tritanopia' | 'Monochromacy' | 'Unknown' = 'Unknown';
  let severity: 'None' | 'Mild' | 'Moderate' | 'Severe' = 'None';

  if (accuracy >= 90) {
    colorBlindnessType = 'Normal';
    severity = 'None';
  } else if (accuracy >= 70) {
    colorBlindnessType = 'Unknown';
    severity = 'Mild';
  } else if (accuracy >= 50) {
    colorBlindnessType = 'Unknown';
    severity = 'Moderate';
  } else {
    colorBlindnessType = 'Unknown';
    severity = 'Severe';
  }

  // Generate description
  const descriptions = {
    'Normal': 'You have normal color vision! You can distinguish colors effectively and don\'t appear to have any form of color blindness.',
    'Unknown': 'Your results suggest some difficulty with color perception. This could indicate mild color vision deficiency or other visual factors.'
  };

  // Generate recommendations
  const recommendations: string[] = [];
  if (colorBlindnessType === 'Normal') {
    recommendations.push('Continue to protect your vision with regular eye exams');
    recommendations.push('Be aware that color vision can change over time');
  } else {
    recommendations.push('Consider consulting an eye care professional for a comprehensive color vision test');
    recommendations.push('Use color-blind friendly design tools when creating visual content');
    recommendations.push('Inform others about your color vision needs in professional settings');
  }

  // Generate insights
  const insights: string[] = [];
  if (colorBlindnessType === 'Normal') {
    insights.push('You have excellent color discrimination abilities');
    insights.push('You can effectively distinguish between different colors');
    insights.push('Your color vision appears to be within normal range');
  } else {
    insights.push('You may have some difficulty with certain color combinations');
    insights.push('Consider using alternative methods to distinguish colors when needed');
    insights.push('Your results suggest consulting a professional for further evaluation');
  }

  return {
    totalScore,
    totalQuestions,
    accuracy,
    colorBlindnessType,
    severity,
    description: descriptions[colorBlindnessType] || descriptions['Unknown'],
    recommendations,
    insights
  };
};
