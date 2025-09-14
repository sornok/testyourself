interface TypingChallenge {
  id: string;
  difficulty: string;
  duration: number;
  text: string;
  segments: string[] | null;
  texts: string[];
  totalWords: number;
  totalCharacters: number;
}

interface TypingStats {
  accuracy: number;
  wpm: number;
  cpm: number;
  duration: number;
  wordsTyped: number;
  totalWords: number;
  charactersTyped: number;
  totalCharacters: number;
  correctCharacters: number;
  errors: number;
  wordErrors: number;
  missingWords: number;
  score: number;
  performance: string;
}

// Load typing challenges data using fetch
let typingChallengesData: any = null;

const loadTypingChallengesData = async () => {
  if (typingChallengesData) return typingChallengesData;
  
  try {
    console.log('Loading typing challenges from /typingChallenges.json');
    const response = await fetch('/typingChallenges.json');
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    typingChallengesData = await response.json();
    console.log('Loaded typing challenges:', Object.keys(typingChallengesData));
    return typingChallengesData;
  } catch (error) {
    console.error('Error loading typing challenges:', error);
    throw error;
  }
};

// Get random typing challenge for the test
export const getRandomTypingChallenge = async (difficulty = 'easy', duration = 30): Promise<TypingChallenge> => {
  // Clear cache to ensure fresh data
  typingChallengesData = null;
  const data = await loadTypingChallengesData();
  
  if (!data[difficulty] || !data[difficulty][duration]) {
    throw new Error(`No challenges found for difficulty: ${difficulty}, duration: ${duration}`);
  }
  
  const challenges = data[difficulty][duration];
  const randomIndex = Math.floor(Math.random() * challenges.length);
  const selectedChallenge = challenges[randomIndex];
  
  // Handle both array format (easy) and string format (hard)
  const texts = Array.isArray(selectedChallenge) ? selectedChallenge : [selectedChallenge];
  const fullText = texts.join(' ');
  
  return {
    id: `${difficulty}_${duration}_${randomIndex}`,
    difficulty,
    duration,
    text: fullText,           // Full combined text for display
    segments: Array.isArray(selectedChallenge) ? texts : null,  // Only for easy mode
    texts: texts,            // Keep for backward compatibility
    totalWords: fullText.split(' ').length,
    totalCharacters: fullText.length
  };
};

// Calculate typing statistics
export const calculateTypingStats = (userInput: string, challenge: TypingChallenge & { startTime: number; endTime: number }): TypingStats => {
  const startTime = challenge.startTime;
  const endTime = challenge.endTime;
  const duration = (endTime - startTime) / 1000; // Convert to seconds
  
  const originalText = challenge.text || challenge.texts.join(' ');
  const words = originalText.split(' ');
  const characters = originalText.split('');
  
  // Calculate accuracy
  let correctCharacters = 0;
  let totalCharacters = characters.length;
  
  for (let i = 0; i < Math.min(userInput.length, characters.length); i++) {
    if (userInput[i] === characters[i]) {
      correctCharacters++;
    }
  }
  
  const accuracy = (correctCharacters / totalCharacters) * 100;
  
  // Calculate different types of errors for better user understanding
  const wordsTypedArray = userInput.split(' ').filter(word => word.length > 0);
  const wordsTypedCount = wordsTypedArray.length;
  
  // Calculate WPM (Words Per Minute)
  const wpm = (wordsTypedCount / duration) * 60;
  
  // Calculate CPM (Characters Per Minute)
  const cpm = (userInput.length / duration) * 60;
  const originalWords = originalText.split(' ').filter(word => word.length > 0);
  
  // For easy mode (segmented), there are no word errors since segments are validated before advancing
  // For hard mode, we can have actual word errors
  const isEasyMode = challenge.segments && challenge.segments.length > 1;
  
  let wordErrors = 0;
  if (!isEasyMode) {
    // Only check for word errors in hard mode
    for (let i = 0; i < Math.min(wordsTypedArray.length, originalWords.length); i++) {
      if (wordsTypedArray[i] !== originalWords[i]) {
        wordErrors++;
      }
    }
  }
  
  // Add missing words as errors
  const missingWords = Math.max(0, originalWords.length - wordsTypedArray.length);
  const totalErrors = wordErrors + missingWords;
  
  // For display purposes, we'll show:
  // - Actual errors: words that don't match (this includes both uncorrected and corrected mistakes)
  // - Missing words: words not typed due to time
  // Note: We can't distinguish between corrected vs uncorrected mistakes without tracking typing process
  
  // Calculate WPM for performance level
  const wpmForLevel = Math.round(wpm * 100) / 100;
  
  // Calculate overall score (0-100)
  // Base score from WPM (0-60 points)
  const wpmScore = Math.min(wpmForLevel * 1.0, 60);
  
  // Accuracy bonus (0-30 points)
  const accuracyScore = Math.min(accuracy * 0.3, 30);
  
  // Error penalty (0-10 points deducted)
  const errorPenalty = Math.min(totalErrors * 2, 10);
  
  const overallScore = Math.max(0, Math.round(wpmScore + accuracyScore - errorPenalty));
  
  // Determine performance level
  let performance = '';
  if (overallScore >= 85) performance = 'Expert';
  else if (overallScore >= 70) performance = 'Advanced';
  else if (overallScore >= 55) performance = 'Intermediate';
  else if (overallScore >= 40) performance = 'Beginner';
  else performance = 'Needs Practice';
  
  return {
    accuracy: Math.round(accuracy * 100) / 100,
    wpm: Math.round(wpm * 100) / 100,
    cpm: Math.round(cpm * 100) / 100,
    duration: Math.round(duration * 100) / 100,
    wordsTyped: wordsTypedCount,
    totalWords: words.length,
    charactersTyped: userInput.length,
    totalCharacters,
    correctCharacters,
    errors: totalErrors,
    wordErrors: wordErrors,
    missingWords: missingWords,
    score: overallScore,
    performance: performance
  };
};

// Get available difficulties and durations
export const getAvailableOptions = async () => {
  const data = await loadTypingChallengesData();
  
  const difficulties = Object.keys(data);
  const durations: Record<string, number[]> = {};
  
  difficulties.forEach(difficulty => {
    durations[difficulty] = Object.keys(data[difficulty]).map(d => parseInt(d));
  });
  
  return {
    difficulties,
    durations
  };
};