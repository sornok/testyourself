// Load personality test data using fetch
let personalityQuestionsData: any = null;

const loadPersonalityQuestionsData = async () => {
  if (personalityQuestionsData) return personalityQuestionsData;
  
  try {
    const response = await fetch('/personalityTest.json');
    personalityQuestionsData = await response.json();
    return personalityQuestionsData;
  } catch (error) {
    console.error('Error loading personality questions:', error);
    throw error;
  }
};

// Get random personality questions for the test
export const getRandomPersonalityQuestions = async (count = 15) => {
  // Clear cache to ensure fresh randomization
  personalityQuestionsData = null;
  const data = await loadPersonalityQuestionsData();
  
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

// Calculate personality type based on answers
export const calculatePersonalityType = (answers: any, questions: any[]) => {
  const scores = {
    E: 0, I: 0,  // Extraversion vs Introversion
    S: 0, N: 0,  // Sensing vs Intuition
    T: 0, F: 0,  // Thinking vs Feeling
    J: 0, P: 0   // Judging vs Perceiving
  };
  
  questions.forEach((question: any) => {
    const userAnswer = answers[question.id];
    if (userAnswer) {
      const selectedOption = question.options.find((opt: any) => opt.text === userAnswer);
      if (selectedOption) {
        scores[selectedOption.type as keyof typeof scores]++;
      }
    }
  });
  
  // Determine personality type
  const type = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');
  
  return {
    type,
    scores,
    totalQuestions: questions.length,
    answeredQuestions: Object.keys(answers).length
  };
};

// Personality types data
export const personalityTypes: Record<string, any> = {
  "INTJ": {
    name: "The Architect",
    description: "Imaginative and strategic thinkers, with a plan for everything.",
    traits: ["Independent", "Decisive", "Hard-working", "Determined"],
    strengths: ["Independent", "Decisive", "Hard-working", "Determined"],
    weaknesses: ["Overly analytical", "Loathe highly structured environments", "Clueless in romance", "May be insensitive"]
  },
  "INTP": {
    name: "The Thinker",
    description: "Innovative inventors with an unquenchable thirst for knowledge.",
    traits: ["Logical", "Original", "Creative", "Curious"],
    strengths: ["Logical", "Original", "Creative", "Curious"],
    weaknesses: ["Very private and withdrawn", "Insensitive", "Absent-minded", "Condescending"]
  },
  "ENTJ": {
    name: "The Commander",
    description: "Bold, imaginative and strong-willed leaders, always finding a way – or making one.",
    traits: ["Efficient", "Energetic", "Self-confident", "Strong-willed"],
    strengths: ["Efficient", "Energetic", "Self-confident", "Strong-willed"],
    weaknesses: ["Stubborn and dominant", "Cold and ruthless", "Impatient", "Poor handling of emotions"]
  },
  "ENTP": {
    name: "The Debater",
    description: "Smart and curious thinkers who cannot resist an intellectual challenge.",
    traits: ["Quick", "Ingenious", "Stimulating", "Alert"],
    strengths: ["Quick", "Ingenious", "Stimulating", "Alert"],
    weaknesses: ["Very argumentative", "Insensitive", "Intolerant", "Find it difficult to focus"]
  },
  "INFJ": {
    name: "The Advocate",
    description: "Creative and insightful, inspired and independent perfectionists.",
    traits: ["Creative", "Insightful", "Inspiring", "Decisive"],
    strengths: ["Creative", "Insightful", "Inspiring", "Decisive"],
    weaknesses: ["Sensitive", "Extremely private", "Perfectionist", "Always need to have a cause"]
  },
  "INFP": {
    name: "The Mediator",
    description: "Poetic, kind and altruistic people, always eager to help a good cause.",
    traits: ["Idealistic", "Loyal", "Adaptable", "Curious"],
    strengths: ["Idealistic", "Loyal", "Adaptable", "Curious"],
    weaknesses: ["Overly idealistic", "Too altruistic", "Impractical", "Dislike dealing with data"]
  },
  "ENFJ": {
    name: "The Protagonist",
    description: "Charismatic and inspiring leaders, able to mesmerize their listeners.",
    traits: ["Charismatic", "Inspiring", "Natural-born leaders", "Passionate"],
    strengths: ["Charismatic", "Inspiring", "Natural-born leaders", "Passionate"],
    weaknesses: ["Overly idealistic", "Too selfless", "Fluctuating self-esteem", "Struggle to make tough decisions"]
  },
  "ENFP": {
    name: "The Campaigner",
    description: "Enthusiastic, creative and sociable free spirits, always ready to explore new possibilities.",
    traits: ["Enthusiastic", "Creative", "Sociable", "Free-spirited"],
    strengths: ["Enthusiastic", "Creative", "Sociable", "Free-spirited"],
    weaknesses: ["Overly idealistic", "Too altruistic", "Impractical", "Dislike dealing with data"]
  },
  "ISTJ": {
    name: "The Logistician",
    description: "Practical and fact-minded, reliable and responsible.",
    traits: ["Practical", "Fact-minded", "Reliable", "Responsible"],
    strengths: ["Practical", "Fact-minded", "Reliable", "Responsible"],
    weaknesses: ["Stubborn", "Insensitive", "Always by the book", "Judgmental"]
  },
  "ISFJ": {
    name: "The Protector",
    description: "Very dedicated and warm protectors, always ready to defend their loved ones.",
    traits: ["Supportive", "Reliable", "Patient", "Imaginative"],
    strengths: ["Supportive", "Reliable", "Patient", "Imaginative"],
    weaknesses: ["Humble and shy", "Represses their feelings", "Reluctant to change", "Too altruistic"]
  },
  "ESTJ": {
    name: "The Executive",
    description: "Excellent administrators, unsurpassed at managing things or people.",
    traits: ["Dedicated", "Strong-willed", "Direct", "Honest"],
    strengths: ["Dedicated", "Strong-willed", "Direct", "Honest"],
    weaknesses: ["Inflexible", "Uncomfortable with unconventional situations", "Difficulty expressing emotion", "Tendency to get stuck in the details"]
  },
  "ESFJ": {
    name: "The Consul",
    description: "Extraordinarily caring, social and popular people, always eager to help.",
    traits: ["Strong practical skills", "Loyalty", "Sensitivity", "Warmth"],
    strengths: ["Strong practical skills", "Loyalty", "Sensitivity", "Warmth"],
    weaknesses: ["Worried about their social status", "Inflexible", "Reluctant to innovate or improvise", "Vulnerable to criticism"]
  },
  "ISTP": {
    name: "The Virtuoso",
    description: "Bold and practical experimenters, masters of all kinds of tools.",
    traits: ["Optimistic", "Creative", "Practical", "Spontaneous"],
    strengths: ["Optimistic", "Creative", "Practical", "Spontaneous"],
    weaknesses: ["Stubborn", "Insensitive", "Private and reserved", "Easily bored"]
  },
  "ISFP": {
    name: "The Adventurer",
    description: "Flexible and charming artists, always ready to explore new possibilities.",
    traits: ["Charming", "Sensitive to others", "Imaginative", "Passionate"],
    strengths: ["Charming", "Sensitive to others", "Imaginative", "Passionate"],
    weaknesses: ["Fiercely independent", "Unpredictable", "Easily stressed", "Overly competitive"]
  },
  "ESTP": {
    name: "The Entrepreneur",
    description: "Smart, energetic and very perceptive people, truly enjoy living on the edge.",
    traits: ["Bold", "Rational", "Practical", "Original"],
    strengths: ["Bold", "Rational", "Practical", "Original"],
    weaknesses: ["Sensitive", "Risk-prone", "Unpredictable", "May miss the bigger picture"]
  },
  "ESFP": {
    name: "The Entertainer",
    description: "Spontaneous, energetic and enthusiastic people – life is never boring around them.",
    traits: ["Bold", "Rational", "Practical", "Original"],
    strengths: ["Bold", "Rational", "Practical", "Original"],
    weaknesses: ["Sensitive", "Risk-prone", "Unpredictable", "May miss the bigger picture"]
  }
};