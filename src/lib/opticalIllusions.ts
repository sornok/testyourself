interface OpticalIllusion {
  id: number;
  title: string;
  description: string;
  image: string;
  question: string;
  options: {
    text: string;
    interpretation: string;
    personality: string;
  }[];
}

// Load optical illusions data using fetch
let opticalIllusionsData: OpticalIllusion[] | null = null;

const loadOpticalIllusionsData = async () => {
  if (opticalIllusionsData) return opticalIllusionsData;
  
  try {
    console.log('Loading optical illusions from /opticalIllusions.json');
    const response = await fetch('/opticalIllusions.json');
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    opticalIllusionsData = await response.json();
    console.log('Loaded optical illusions:', opticalIllusionsData?.length, 'illusions');
    return opticalIllusionsData;
  } catch (error) {
    console.error('Error loading optical illusions:', error);
    throw error;
  }
};

// Get random optical illusions for the test
export const getRandomOpticalIllusions = async (count = 6): Promise<OpticalIllusion[]> => {
  // Clear cache to ensure fresh randomization
  opticalIllusionsData = null;
  const data = await loadOpticalIllusionsData();
  
  if (!data) {
    throw new Error('Failed to load optical illusions data');
  }
  
  // Create a proper shuffle function using Fisher-Yates algorithm
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Map image paths to public directory paths
  return shuffled.slice(0, count).map((illusion: OpticalIllusion, index: number) => ({
    ...illusion,
    id: index + 1, // Reassign IDs for the selected illusions
    image: `/images/optical-illusions/${illusion.image.split('/').pop()}` // Convert to public path
  }));
};

// Calculate optical illusion results
export const calculateOpticalIllusionResults = (answers: Record<number, any>, illusions: OpticalIllusion[]) => {
  const personalityTraits: Record<string, number> = {};
  const interpretations: any[] = [];
  
  // Process each answer
  illusions.forEach(illusion => {
    const answer = answers[illusion.id];
    if (answer) {
      // Count personality traits
      const personality = answer.personality;
      personalityTraits[personality] = (personalityTraits[personality] || 0) + 1;
      
      // Collect interpretations
      interpretations.push({
        illusion: illusion.title,
        answer: answer.text,
        interpretation: answer.interpretation,
        personality: answer.personality
      });
    }
  });
  
  // Find dominant personality traits
  const sortedTraits = Object.entries(personalityTraits)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3);
  
  const dominantTraits = sortedTraits.map(([trait]) => trait);
  
  // Generate overall interpretation
  const totalAnswers = Object.keys(answers).length;
  const completionRate = (totalAnswers / illusions.length) * 100;
  
  let overallInterpretation = "Based on your responses to the optical illusions, ";
  
  if (dominantTraits.length > 0) {
    overallInterpretation += `you show strong tendencies toward being ${dominantTraits[0].toLowerCase()}`;
    if (dominantTraits.length > 1) {
      overallInterpretation += `, with additional traits of being ${dominantTraits[1].toLowerCase()}`;
    }
    if (dominantTraits.length > 2) {
      overallInterpretation += ` and ${dominantTraits[2].toLowerCase()}`;
    }
  } else {
    overallInterpretation += "you have a balanced and flexible approach to visual perception";
  }
  
  overallInterpretation += ". Your responses reveal insights into how you process visual information and make decisions.";
  
  // Determine overall type based on dominant traits
  let overallType = 'Visual Perceiver';
  if (dominantTraits.length > 0) {
    const topTrait = dominantTraits[0];
    if (topTrait.includes('Analytical') || topTrait.includes('Logical')) {
      overallType = 'Analytical Observer';
    } else if (topTrait.includes('Social') || topTrait.includes('relationship')) {
      overallType = 'Social Perceiver';
    } else if (topTrait.includes('Creative') || topTrait.includes('Flexible')) {
      overallType = 'Creative Visualizer';
    } else if (topTrait.includes('Strategic') || topTrait.includes('big-picture')) {
      overallType = 'Strategic Observer';
    }
  }

  return {
    overallType,
    personalityTraits,
    interpretations,
    overallInterpretation,
    completionRate,
    totalQuestions: illusions.length,
    answeredQuestions: totalAnswers
  };
};