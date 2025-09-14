interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

// Load trivia questions data using fetch
let triviaQuestionsData: Question[] | null = null;

const loadTriviaQuestionsData = async () => {
  if (triviaQuestionsData) return triviaQuestionsData;
  
  try {
    console.log('Loading trivia questions from /triviaQuestions.json');
    const response = await fetch('/triviaQuestions.json');
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    triviaQuestionsData = await response.json();
    console.log('Loaded trivia questions:', triviaQuestionsData?.length, 'questions');
    return triviaQuestionsData;
  } catch (error) {
    console.error('Error loading trivia questions:', error);
    throw error;
  }
};

// Get random trivia questions for the test
export const getRandomTriviaQuestions = async (count = 10): Promise<Question[]> => {
  // Clear cache to ensure fresh randomization
  triviaQuestionsData = null;
  const data = await loadTriviaQuestionsData();
  
  if (!data) {
    throw new Error('Failed to load trivia questions data');
  }
  
  // Create a proper shuffle function using Fisher-Yates algorithm
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count).map((question: Question, index: number) => ({
    ...question,
    id: index + 1 // Reassign IDs for the selected questions
  }));
};

// Calculate trivia score
export const calculateTriviaScore = (answers: Record<number, number>, questions: Question[], answerTimes: Record<number, number> = {}) => {
  let correct = 0;
  let totalTime = 0;
  let speedBonus = 0;
  const results: any[] = [];
  const categoryStats: any = {};
  
  questions.forEach((question: any, index: number) => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correct;
    const answerTime = answerTimes[question.id] || 30; // Default to 30 if no time recorded
    totalTime += answerTime;
    
    if (isCorrect) {
      correct++;
      // Speed bonus: faster answers get more points
      if (answerTime <= 5) speedBonus += 2;
      else if (answerTime <= 10) speedBonus += 1;
      else if (answerTime <= 15) speedBonus += 0.5;
    }
    
    results.push({
      question: question.question,
      userAnswer: userAnswer,
      correctAnswer: question.correct,
      isCorrect: isCorrect,
      time: answerTime,
      category: question.category
    });
    
    // Track category stats
    if (!categoryStats[question.category]) {
      categoryStats[question.category] = { total: 0, correct: 0 };
    }
    categoryStats[question.category].total++;
    if (isCorrect) categoryStats[question.category].correct++;
  });
  
  const accuracyPercentage = Math.round((correct / questions.length) * 100);
  const averageTime = Math.round(totalTime / questions.length);
  const totalScore = Math.round(accuracyPercentage + speedBonus);
  
  let feedback = "";
  let speedFeedback = "";
  
  // Accuracy feedback
  if (accuracyPercentage >= 90) feedback = "Outstanding! You're a trivia master!";
  else if (accuracyPercentage >= 80) feedback = "Excellent work! You know your stuff.";
  else if (accuracyPercentage >= 70) feedback = "Good job! You have solid knowledge.";
  else if (accuracyPercentage >= 60) feedback = "Not bad! Room for improvement.";
  else feedback = "Keep studying! Practice makes perfect.";
  
  // Speed feedback
  if (averageTime <= 8) speedFeedback = "Lightning fast! ⚡";
  else if (averageTime <= 12) speedFeedback = "Quick thinking! 🏃";
  else if (averageTime <= 18) speedFeedback = "Steady pace! 🚶";
  else speedFeedback = "Take your time! 🐌";
  
  return {
    score: totalScore,
    accuracy: accuracyPercentage,
    correct,
    total: questions.length,
    averageTime,
    speedBonus: Math.round(speedBonus),
    feedback,
    speedFeedback,
    results,
    categoryStats
  };
};