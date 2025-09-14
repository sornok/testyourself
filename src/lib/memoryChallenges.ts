// Load memory challenges data using fetch
let memoryChallengesData: any = null;

const loadMemoryChallengesData = async () => {
  if (memoryChallengesData) return memoryChallengesData;
  
  try {
    const response = await fetch('/memoryChallenges.json');
    memoryChallengesData = await response.json();
    return memoryChallengesData;
  } catch (error) {
    console.error('Error loading memory challenges:', error);
    throw error;
  }
};

// Generate random sequences for each challenge type
const generateRandomSequence = (challenge: any) => {
  const newChallenge = { ...challenge };
  
  switch (challenge.type) {
    case "color_sequence":
      const colors = ["🔴", "🟡", "🔵", "🟢", "🟠", "🟣", "⚫", "⚪"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(colors[Math.floor(Math.random() * colors.length)]);
      }
      newChallenge.options = colors;
      break;
      
    case "number_sequence":
      const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(numbers[Math.floor(Math.random() * numbers.length)]);
      }
      newChallenge.options = numbers;
      break;
      
    case "letter_sequence":
      const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      newChallenge.options = letters;
      break;
      
    case "symbol_sequence":
      const symbols = ["+", "−", "×", "÷", "=", "≠", "±", "∞", "∑", "∆", "π", "√"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
      newChallenge.options = symbols;
      break;
      
    case "direction_sequence":
      const directions = ["↑", "↓", "←", "→", "↗", "↘", "↙", "↖"];
      newChallenge.sequence = [];
      for (let i = 0; i < 4; i++) {
        newChallenge.sequence.push(directions[Math.floor(Math.random() * directions.length)]);
      }
      newChallenge.options = directions;
      break;
      
    case "animal_sequence":
      const animals = ["🐱", "🐶", "🐰", "🐸", "🐯", "🦁", "🐻", "🐼", "🐨", "🐵", "🐔", "🐧"];
      newChallenge.sequence = [];
      for (let i = 0; i < 4; i++) {
        newChallenge.sequence.push(animals[Math.floor(Math.random() * animals.length)]);
      }
      newChallenge.options = animals;
      break;
      
    case "food_sequence":
      const foods = ["🍎", "🍌", "🍇", "🍓", "🥝", "🍊", "🍋", "🍑", "🍒", "🥭", "🍍", "🥥"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(foods[Math.floor(Math.random() * foods.length)]);
      }
      newChallenge.options = foods;
      break;
      
    case "transport_sequence":
      const transports = ["🚗", "🚌", "✈️", "🚢", "🚂", "🚁", "🚲", "🏍️", "🚛", "🚑", "🚒", "🚓"];
      newChallenge.sequence = [];
      for (let i = 0; i < 4; i++) {
        newChallenge.sequence.push(transports[Math.floor(Math.random() * transports.length)]);
      }
      newChallenge.options = transports;
      break;
      
    case "size_sequence":
      const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(sizes[Math.floor(Math.random() * sizes.length)]);
      }
      newChallenge.options = sizes;
      break;
      
    case "pattern_sequence":
      const patterns = ["▲", "●", "■", "◆", "★", "♦", "♠", "♣", "♥"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(patterns[Math.floor(Math.random() * patterns.length)]);
      }
      newChallenge.options = patterns;
      break;
      
    case "word_sequence":
      const words = ["CAT", "DOG", "BIRD", "FISH", "BEAR", "LION", "WOLF", "DEER", "FROG", "OWL"];
      newChallenge.sequence = [];
      for (let i = 0; i < 4; i++) {
        newChallenge.sequence.push(words[Math.floor(Math.random() * words.length)]);
      }
      newChallenge.options = words;
      break;
      
    case "mixed_sequence":
      const mixedItems = ["A", "1", "🔴", "↑", "🐱", "B", "2", "🟡", "↓", "🐶"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(mixedItems[Math.floor(Math.random() * mixedItems.length)]);
      }
      newChallenge.options = mixedItems;
      break;
      
    case "weather_sequence":
      const weathers = ["☀️", "⛅", "🌧️", "❄️", "🌪️", "🌩️", "🌈", "🌤️"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(weathers[Math.floor(Math.random() * weathers.length)]);
      }
      newChallenge.options = weathers;
      break;
      
    case "position_sequence":
      const positions = ["TOP", "MID", "BOT", "LEFT", "RIGHT", "CENTER"];
      newChallenge.sequence = [];
      for (let i = 0; i < 4; i++) {
        newChallenge.sequence.push(positions[Math.floor(Math.random() * positions.length)]);
      }
      newChallenge.options = positions;
      break;
      
    case "complex_mixed_sequence":
      const complexItems = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "🔴", "🟡", "🔵", "🟢", "🟠", "🟣", "⚫", "⚪", "↑", "↓", "←", "→", "🐱", "🐶", "🐰", "🐸", "🐯", "🦁", "🐻", "🐼"];
      newChallenge.sequence = [];
      for (let i = 0; i < 5; i++) {
        newChallenge.sequence.push(complexItems[Math.floor(Math.random() * complexItems.length)]);
      }
      newChallenge.options = complexItems;
      break;
  }
  
  return newChallenge;
};

// Prepare challenge with random sequence generation
const prepareChallenge = (challenge: any) => {
  const challengeWithRandomSequence = generateRandomSequence(challenge);
  return {
    ...challengeWithRandomSequence,
    name: challenge.title // Map title to name for compatibility
  };
};

// Get random memory challenges
export const getRandomMemoryChallenges = async (count = 3) => {
  // Clear cache to ensure fresh randomization
  memoryChallengesData = null;
  const data = await loadMemoryChallengesData();
  
  // Shuffle and select random challenges using Fisher-Yates algorithm
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count).map(challenge => prepareChallenge(challenge));
};

// Calculate memory results
export const calculateMemoryResults = (answers: any, challenges: any[]) => {
  let totalCorrectChallenges = 0;
  let totalChallenges = challenges.length;
  let totalCorrectItems = 0;
  let totalItems = 0;
  const results: any[] = [];
  
  challenges.forEach((challenge: any, index: number) => {
    const userAnswer = answers[challenge.id];
    const correctSequence = challenge.sequence;
    
    // Extract userSequence from answer object
    const userSequence = userAnswer?.userSequence || [];
    
    // Check if the entire sequence is correct
    let isChallengeCorrect = false;
    if (userSequence.length === correctSequence.length) {
      isChallengeCorrect = userSequence.every((item: any, index: number) => item === correctSequence[index]);
    }
    
    if (isChallengeCorrect) {
      totalCorrectChallenges++;
    }
    
    // Count individual correct items for detailed results
    let correctItems = 0;
    for (let i = 0; i < Math.min(correctSequence.length, userSequence.length); i++) {
      if (correctSequence[i] === userSequence[i]) {
        correctItems++;
      }
    }
    
    totalCorrectItems += correctItems;
    totalItems += correctSequence.length;
    
    results.push({
      challenge: challenge.name,
      type: challenge.type,
      correct: correctItems,
      total: correctSequence.length,
      accuracy: correctSequence.length > 0 ? Math.round((correctItems / correctSequence.length) * 100) : 0,
      sequence: correctSequence,
      userSequence: userSequence,
      isChallengeCorrect: isChallengeCorrect
    });
  });
  
  // Calculate overall score based on challenges passed
  const overallAccuracy = totalChallenges > 0 ? Math.round((totalCorrectChallenges / totalChallenges) * 100) : 0;
  const memoryScore = overallAccuracy;
  
  // Calculate detailed accuracy based on individual items
  const detailedAccuracy = totalItems > 0 ? Math.round((totalCorrectItems / totalItems) * 100) : 0;
  
  let performance = "Beginner";
  if (memoryScore >= 90) performance = "Expert";
  else if (memoryScore >= 75) performance = "Advanced";
  else if (memoryScore >= 60) performance = "Intermediate";
  else if (memoryScore >= 40) performance = "Novice";
  
  return {
    memoryScore,
    detailedAccuracy,
    performance,
    totalCorrect: totalCorrectChallenges,
    totalItems: totalChallenges,
    totalCorrectItems,
    totalDetailedItems: totalItems,
    accuracy: overallAccuracy,
    results
  };
};