export interface MathQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: 'arithmetic' | 'fractions' | 'percentages' | 'algebra' | 'geometry';
  explanation?: string;
}

export interface MathResult {
  totalScore: number;
  totalQuestions: number;
  accuracy: number;
  categoryScores: {
    arithmetic: number;
    fractions: number;
    percentages: number;
    algebra: number;
    geometry: number;
  };
  categoryAverages: {
    arithmetic: string;
    fractions: string;
    percentages: string;
    algebra: string;
    geometry: string;
  };
  overallAverage: number;
  level: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced';
  description: string;
  strengths: string[];
  areasForGrowth: string[];
  recommendations: string[];
}

export const mathQuestions: MathQuestion[] = [
  // Arithmetic (20 questions)
  {
    id: 1,
    question: "What is 15 × 8?",
    options: ["120", "115", "125", "130"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 2,
    question: "What is 144 ÷ 12?",
    options: ["11", "12", "13", "14"],
    correct: 1,
    category: "arithmetic"
  },
  {
    id: 3,
    question: "What is 7² + 3²?",
    options: ["58", "52", "56", "54"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 4,
    question: "What is √64?",
    options: ["6", "7", "8", "9"],
    correct: 2,
    category: "arithmetic"
  },
  {
    id: 5,
    question: "What is 25 + 37 + 18?",
    options: ["80", "75", "85", "90"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 6,
    question: "What is 156 - 89?",
    options: ["67", "65", "69", "71"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 7,
    question: "What is 13 × 7?",
    options: ["91", "89", "93", "95"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 8,
    question: "What is 225 ÷ 15?",
    options: ["14", "15", "16", "17"],
    correct: 1,
    category: "arithmetic"
  },
  {
    id: 9,
    question: "What is 4³?",
    options: ["64", "60", "68", "72"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 10,
    question: "What is √100?",
    options: ["9", "10", "11", "12"],
    correct: 1,
    category: "arithmetic"
  },
  {
    id: 11,
    question: "What is 8 × 9 + 7?",
    options: ["79", "75", "81", "83"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 12,
    question: "What is 168 ÷ 8?",
    options: ["20", "21", "22", "23"],
    correct: 1,
    category: "arithmetic"
  },
  {
    id: 13,
    question: "What is 5² - 3²?",
    options: ["16", "14", "18", "20"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 14,
    question: "What is √144?",
    options: ["11", "12", "13", "14"],
    correct: 1,
    category: "arithmetic"
  },
  {
    id: 15,
    question: "What is 45 + 67 - 23?",
    options: ["89", "85", "91", "93"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 16,
    question: "What is 19 × 6?",
    options: ["114", "112", "116", "118"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 17,
    question: "What is 288 ÷ 12?",
    options: ["23", "24", "25", "26"],
    correct: 1,
    category: "arithmetic"
  },
  {
    id: 18,
    question: "What is 6³?",
    options: ["216", "210", "220", "226"],
    correct: 0,
    category: "arithmetic"
  },
  {
    id: 19,
    question: "What is √81?",
    options: ["8", "9", "10", "11"],
    correct: 1,
    category: "arithmetic"
  },
  {
    id: 20,
    question: "What is 12 × 8 - 15?",
    options: ["81", "79", "83", "85"],
    correct: 0,
    category: "arithmetic"
  },

  // Fractions (20 questions)
  {
    id: 21,
    question: "What is 3/4 + 1/2?",
    options: ["5/4", "4/6", "3/4", "2/3"],
    correct: 0,
    category: "fractions"
  },
  {
    id: 22,
    question: "What is 5/6 - 1/3?",
    options: ["4/3", "1/2", "2/3", "3/4"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 23,
    question: "What is 2/3 × 3/4?",
    options: ["6/12", "2/3", "5/7", "3/4"],
    correct: 0,
    category: "fractions"
  },
  {
    id: 24,
    question: "What is 3/5 ÷ 2/5?",
    options: ["6/25", "1½", "5/10", "2/3"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 25,
    question: "What is 1/2 + 1/4 + 1/8?",
    options: ["7/8", "3/14", "1⅛", "2/3"],
    correct: 0,
    category: "fractions"
  },
  {
    id: 26,
    question: "What is 4/7 - 2/7?",
    options: ["2/7", "2/14", "6/7", "3/4"],
    correct: 0,
    category: "fractions"
  },
  {
    id: 27,
    question: "What is 2/5 × 5/6?",
    options: ["10/30", "2/3", "7/11", "3/4"],
    correct: 0,
    category: "fractions"
  },
  {
    id: 28,
    question: "What is 7/8 ÷ 1/4?",
    options: ["7/32", "3 1/2", "2/3", "3/4"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 29,
    question: "What is 1/3 + 2/9?",
    options: ["3/12", "5/9", "3/9", "2/3"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 30,
    question: "What is 5/6 - 1/2?",
    options: ["4/4", "1/3", "2/3", "3/4"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 31,
    question: "What is 3/4 × 2/3?",
    options: ["6/12", "2/3", "5/7", "3/4"],
    correct: 0,
    category: "fractions"
  },
  {
    id: 32,
    question: "What is 8/9 ÷ 2/3?",
    options: ["16/27", "1⅓", "2/3", "3/4"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 33,
    question: "What is 2/5 + 3/10?",
    options: ["5/15", "7/10", "1/2", "3/4"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 34,
    question: "What is 7/12 - 1/4?",
    options: ["6/8", "1/3", "2/3", "3/4"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 35,
    question: "What is 4/5 × 3/8?",
    options: ["12/40", "2/3", "7/13", "3/4"],
    correct: 0,
    category: "fractions"
  },
  {
    id: 36,
    question: "What is 9/10 ÷ 3/5?",
    options: ["27/50", "1½", "2/3", "3/4"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 37,
    question: "What is 1/6 + 1/3?",
    options: ["2/9", "1/2", "2/3", "3/4"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 38,
    question: "What is 5/8 - 1/4?",
    options: ["4/4", "3/8", "1/2", "2/3"],
    correct: 1,
    category: "fractions"
  },
  {
    id: 39,
    question: "What is 2/7 × 7/8?",
    options: ["14/56", "2/3", "9/15", "3/4"],
    correct: 0,
    category: "fractions"
  },
  {
    id: 40,
    question: "What is 6/7 ÷ 2/7?",
    options: ["12/49", "3", "2/3", "3/4"],
    correct: 1,
    category: "fractions"
  },

  // Percentages (20 questions)
  {
    id: 41,
    question: "What is 25% of 80?",
    options: ["20", "25", "30", "35"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 42,
    question: "What is 15% of 120?",
    options: ["18", "15", "20", "25"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 43,
    question: "What is 40% of 150?",
    options: ["60", "55", "65", "70"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 44,
    question: "What is 12% of 200?",
    options: ["24", "20", "28", "32"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 45,
    question: "What is 75% of 80?",
    options: ["60", "55", "65", "70"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 46,
    question: "What is 8% of 250?",
    options: ["20", "18", "22", "25"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 47,
    question: "What is 30% of 90?",
    options: ["27", "25", "30", "35"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 48,
    question: "What is 16% of 125?",
    options: ["20", "18", "22", "25"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 49,
    question: "What is 60% of 75?",
    options: ["45", "40", "50", "55"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 50,
    question: "What is 22% of 100?",
    options: ["22", "20", "25", "28"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 51,
    question: "What is 35% of 160?",
    options: ["56", "50", "60", "65"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 52,
    question: "What is 18% of 200?",
    options: ["36", "32", "40", "45"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 53,
    question: "What is 45% of 80?",
    options: ["36", "32", "40", "45"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 54,
    question: "What is 14% of 150?",
    options: ["21", "18", "24", "28"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 55,
    question: "What is 50% of 120?",
    options: ["60", "55", "65", "70"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 56,
    question: "What is 24% of 125?",
    options: ["30", "28", "32", "35"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 57,
    question: "What is 80% of 90?",
    options: ["72", "70", "75", "80"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 58,
    question: "What is 28% of 100?",
    options: ["28", "25", "30", "35"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 59,
    question: "What is 65% of 80?",
    options: ["52", "50", "55", "60"],
    correct: 0,
    category: "percentages"
  },
  {
    id: 60,
    question: "What is 36% of 150?",
    options: ["54", "50", "58", "62"],
    correct: 0,
    category: "percentages"
  },

  // Algebra (20 questions)
  {
    id: 61,
    question: "Solve for x: 2x + 5 = 13",
    options: ["x = 4", "x = 3", "x = 5", "x = 6"],
    correct: 0,
    category: "algebra"
  },
  {
    id: 62,
    question: "Solve for x: 3x - 7 = 14",
    options: ["x = 6", "x = 7", "x = 8", "x = 9"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 63,
    question: "Solve for x: x + 8 = 15",
    options: ["x = 6", "x = 7", "x = 8", "x = 9"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 64,
    question: "Solve for x: 4x = 28",
    options: ["x = 6", "x = 7", "x = 8", "x = 9"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 65,
    question: "Solve for x: 2x - 3 = 9",
    options: ["x = 5", "x = 6", "x = 7", "x = 8"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 66,
    question: "Solve for x: 5x + 2 = 17",
    options: ["x = 2", "x = 3", "x = 4", "x = 5"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 67,
    question: "Solve for x: x - 6 = 12",
    options: ["x = 16", "x = 17", "x = 18", "x = 19"],
    correct: 2,
    category: "algebra"
  },
  {
    id: 68,
    question: "Solve for x: 3x + 4 = 19",
    options: ["x = 4", "x = 5", "x = 6", "x = 7"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 69,
    question: "Solve for x: 6x = 42",
    options: ["x = 6", "x = 7", "x = 8", "x = 9"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 70,
    question: "Solve for x: 2x + 7 = 21",
    options: ["x = 6", "x = 7", "x = 8", "x = 9"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 71,
    question: "Solve for x: x - 9 = 15",
    options: ["x = 22", "x = 23", "x = 24", "x = 25"],
    correct: 2,
    category: "algebra"
  },
  {
    id: 72,
    question: "Solve for x: 4x - 5 = 19",
    options: ["x = 5", "x = 6", "x = 7", "x = 8"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 73,
    question: "Solve for x: 7x = 49",
    options: ["x = 6", "x = 7", "x = 8", "x = 9"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 74,
    question: "Solve for x: 3x - 8 = 16",
    options: ["x = 7", "x = 8", "x = 9", "x = 10"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 75,
    question: "Solve for x: x + 12 = 25",
    options: ["x = 12", "x = 13", "x = 14", "x = 15"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 76,
    question: "Solve for x: 5x - 3 = 22",
    options: ["x = 4", "x = 5", "x = 6", "x = 7"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 77,
    question: "Solve for x: 8x = 64",
    options: ["x = 7", "x = 8", "x = 9", "x = 10"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 78,
    question: "Solve for x: 2x + 9 = 25",
    options: ["x = 7", "x = 8", "x = 9", "x = 10"],
    correct: 1,
    category: "algebra"
  },
  {
    id: 79,
    question: "Solve for x: x - 11 = 18",
    options: ["x = 27", "x = 28", "x = 29", "x = 30"],
    correct: 2,
    category: "algebra"
  },
  {
    id: 80,
    question: "Solve for x: 6x + 5 = 35",
    options: ["x = 4", "x = 5", "x = 6", "x = 7"],
    correct: 1,
    category: "algebra"
  },

  // Geometry (20 questions)
  {
    id: 81,
    question: "What is the area of a rectangle with length 8 and width 6?",
    options: ["48", "44", "52", "56"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 82,
    question: "What is the perimeter of a square with side length 7?",
    options: ["28", "24", "32", "35"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 83,
    question: "What is the area of a triangle with base 10 and height 6?",
    options: ["30", "26", "34", "38"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 84,
    question: "What is the circumference of a circle with radius 5? (Use π = 3.14)",
    options: ["31.4", "25.12", "37.68", "41.2"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 85,
    question: "What is the area of a circle with radius 4? (Use π = 3.14)",
    options: ["50.24", "45.12", "55.36", "60.8"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 86,
    question: "What is the volume of a cube with side length 3?",
    options: ["27", "24", "30", "33"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 87,
    question: "What is the area of a rectangle with length 12 and width 5?",
    options: ["60", "56", "64", "68"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 88,
    question: "What is the perimeter of a rectangle with length 9 and width 4?",
    options: ["26", "24", "28", "32"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 89,
    question: "What is the area of a square with side length 6?",
    options: ["36", "32", "40", "44"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 90,
    question: "What is the area of a triangle with base 8 and height 7?",
    options: ["28", "24", "32", "36"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 91,
    question: "What is the circumference of a circle with radius 6? (Use π = 3.14)",
    options: ["37.68", "33.12", "41.24", "45.8"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 92,
    question: "What is the area of a circle with radius 3? (Use π = 3.14)",
    options: ["28.26", "24.12", "32.4", "36.8"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 93,
    question: "What is the volume of a cube with side length 4?",
    options: ["64", "60", "68", "72"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 94,
    question: "What is the area of a rectangle with length 15 and width 4?",
    options: ["60", "56", "64", "68"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 95,
    question: "What is the perimeter of a square with side length 8?",
    options: ["32", "28", "36", "40"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 96,
    question: "What is the area of a triangle with base 12 and height 5?",
    options: ["30", "26", "34", "38"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 97,
    question: "What is the circumference of a circle with radius 7? (Use π = 3.14)",
    options: ["43.96", "39.12", "47.8", "52.4"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 98,
    question: "What is the area of a circle with radius 2? (Use π = 3.14)",
    options: ["12.56", "8.12", "16.4", "20.8"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 99,
    question: "What is the volume of a cube with side length 5?",
    options: ["125", "120", "130", "135"],
    correct: 0,
    category: "geometry"
  },
  {
    id: 100,
    question: "What is the area of a rectangle with length 10 and width 7?",
    options: ["70", "66", "74", "78"],
    correct: 0,
    category: "geometry"
  }
];

// Get random math questions for the test with balanced category distribution
export const selectRandomMathQuestions = (count = 15): MathQuestion[] => {
  const categories = ['arithmetic', 'fractions', 'percentages', 'algebra', 'geometry'];
  const questionsPerCategory = Math.floor(count / categories.length);
  const remainingQuestions = count % categories.length;
  
  const selectedQuestions: MathQuestion[] = [];
  
  // Select questions from each category
  categories.forEach((category, categoryIndex) => {
    const categoryQuestions = mathQuestions.filter(q => q.category === category);
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
  
  return finalShuffled.map((question: MathQuestion, index: number) => ({
    ...question,
    id: index + 1
  }));
};

// Calculate math test results
export const calculateMathResults = (answers: (number | undefined)[], selectedQuestions: MathQuestion[]): MathResult => {
  const categoryScores = {
    arithmetic: 0,
    fractions: 0,
    percentages: 0,
    algebra: 0,
    geometry: 0
  };

  const categoryCounts = {
    arithmetic: 0,
    fractions: 0,
    percentages: 0,
    algebra: 0,
    geometry: 0
  };

  // Calculate scores for each category
  let answeredQuestions = 0;
  
  // Only count and score questions that were actually answered
  answers.forEach((answer, questionIndex) => {
    const question = selectedQuestions[questionIndex];
    if (question && answer !== undefined) {
      answeredQuestions += 1;
      categoryCounts[question.category] += 1; // Count this question in its category
      
      if (answer === question.correct) {
        categoryScores[question.category] += 1;
      }
    }
  });

  // Calculate category averages (as fractions)
  const categoryAverages = {
    arithmetic: categoryCounts.arithmetic > 0 ? `${categoryScores.arithmetic}/${categoryCounts.arithmetic}` : '0/0',
    fractions: categoryCounts.fractions > 0 ? `${categoryScores.fractions}/${categoryCounts.fractions}` : '0/0',
    percentages: categoryCounts.percentages > 0 ? `${categoryScores.percentages}/${categoryCounts.percentages}` : '0/0',
    algebra: categoryCounts.algebra > 0 ? `${categoryScores.algebra}/${categoryCounts.algebra}` : '0/0',
    geometry: categoryCounts.geometry > 0 ? `${categoryScores.geometry}/${categoryCounts.geometry}` : '0/0'
  };

  // Calculate overall average
  const totalScore = answers.reduce((score, answer, index) => {
    const question = selectedQuestions[index];
    if (answer !== undefined && question) {
      return score + (answer === question.correct ? 1 : 0);
    }
    return score;
  }, 0);

  const overallAverage = Math.round((totalScore / answeredQuestions) * 10);

  // Determine level
  let level: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced';
  if (overallAverage <= 4) {
    level = 'Beginner';
  } else if (overallAverage <= 6) {
    level = 'Developing';
  } else if (overallAverage <= 8) {
    level = 'Proficient';
  } else {
    level = 'Advanced';
  }

  // Generate description
  const descriptions = {
    'Beginner': 'You\'re just starting your math journey! Focus on building strong fundamentals.',
    'Developing': 'You\'re making good progress! Keep practicing to strengthen your skills.',
    'Proficient': 'Great job! You have solid math skills across multiple areas.',
    'Advanced': 'Excellent work! You demonstrate strong mathematical understanding.'
  };

  // Generate strengths
  const strengths: string[] = [];
  Object.entries(categoryAverages).forEach(([category, score]) => {
    const [correct, total] = score.split('/').map(Number);
    const percentage = total > 0 ? (correct / total) : 0;
    if (percentage >= 0.8) { // 80% or higher
      const categoryNames = {
        arithmetic: 'Basic Arithmetic',
        fractions: 'Fractions',
        percentages: 'Percentages',
        algebra: 'Algebra',
        geometry: 'Geometry'
      };
      strengths.push(`Strong in ${categoryNames[category as keyof typeof categoryNames]}`);
    }
  });

  if (strengths.length === 0) {
    strengths.push('Willingness to learn and improve');
  }

  // Generate areas for growth
  const areasForGrowth: string[] = [];
  Object.entries(categoryAverages).forEach(([category, score]) => {
    const [correct, total] = score.split('/').map(Number);
    const percentage = total > 0 ? (correct / total) : 0;
    if (percentage <= 0.4) { // 40% or lower
      const categoryNames = {
        arithmetic: 'Basic Arithmetic',
        fractions: 'Fractions',
        percentages: 'Percentages',
        algebra: 'Algebra',
        geometry: 'Geometry'
      };
      areasForGrowth.push(`${categoryNames[category as keyof typeof categoryNames]}`);
    }
  });

  if (areasForGrowth.length === 0) {
    areasForGrowth.push('Great job! Keep maintaining your math skills');
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (level === 'Beginner') {
    recommendations.push('Focus on basic arithmetic operations');
    recommendations.push('Practice with simple fractions and percentages');
    recommendations.push('Build confidence with fundamental concepts');
  } else if (level === 'Developing') {
    recommendations.push('Continue practicing problem-solving');
    recommendations.push('Work on areas where you scored lower');
    recommendations.push('Try more challenging problems');
  } else if (level === 'Proficient') {
    recommendations.push('Challenge yourself with advanced problems');
    recommendations.push('Help others learn math concepts');
    recommendations.push('Explore real-world applications');
  } else {
    recommendations.push('Consider advanced math courses');
    recommendations.push('Explore mathematical competitions');
    recommendations.push('Share your knowledge with others');
  }

  return {
    totalScore,
    totalQuestions: answeredQuestions,
    accuracy: Math.round((totalScore / answeredQuestions) * 100),
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
