export interface CreativityOption {
  text: string;
  type: 'innovation' | 'research' | 'practical' | 'bold' | 'collaborative' | 'intuitive';
}

export interface CreativityQuestion {
  id: number;
  question: string;
  options: CreativityOption[];
}

export interface CreativityResult {
  totalQuestions: number;
  typeScores: {
    innovation: number;
    research: number;
    practical: number;
    bold: number;
    collaborative: number;
    intuitive: number;
  };
  innovationPreference: number;
  researchPreference: number;
  practicalPreference: number;
  boldPreference: number;
  collaborativePreference: number;
  intuitivePreference: number;
  creativityType: string;
  strengths: string[];
  areasForGrowth: string[];
  description: string;
}

const creativityQuestions: CreativityQuestion[] = [
  {
    id: 1,
    question: "You're tasked with designing a new smartphone app. Which approach appeals to you most?",
    options: [
      { text: "Focus on cutting-edge technology that pushes boundaries", type: 'innovation' },
      { text: "Research user needs extensively before designing anything", type: 'research' },
      { text: "Build on existing successful apps but with major improvements", type: 'practical' },
      { text: "Create something completely unconventional and unexpected", type: 'bold' },
      { text: "Collaborate with a diverse team to brainstorm ideas", type: 'collaborative' },
      { text: "Follow your gut feeling about what users really want", type: 'intuitive' }
    ]
  },
  {
    id: 2,
    question: "Your company needs a new marketing campaign. What's your preferred strategy?",
    options: [
      { text: "Develop a viral social media concept that breaks all conventions", type: 'bold' },
      { text: "Study successful campaigns and adapt the best elements", type: 'research' },
      { text: "Create an interactive experience that's never been done", type: 'innovation' },
      { text: "Focus on emotional storytelling with a unique twist", type: 'intuitive' },
      { text: "Work with influencers and partners for maximum reach", type: 'collaborative' },
      { text: "Use proven marketing tactics with a modern twist", type: 'practical' }
    ]
  },
  {
    id: 3,
    question: "You're asked to redesign a city park. Which vision excites you most?",
    options: [
      { text: "A futuristic space with technology-integrated features", type: 'innovation' },
      { text: "A park based on extensive community surveys and data", type: 'research' },
      { text: "A proven design that works well in similar cities", type: 'practical' },
      { text: "A completely reimagined concept that challenges traditional parks", type: 'bold' },
      { text: "A space designed through community workshops and input", type: 'collaborative' },
      { text: "A park that feels right and creates emotional connections", type: 'intuitive' }
    ]
  },
  {
    id: 4,
    question: "When brainstorming solutions to a complex problem, you prefer to:",
    options: [
      { text: "Generate completely unconventional approaches first", type: 'bold' },
      { text: "Gather data and analyze the problem thoroughly", type: 'research' },
      { text: "Combine existing solutions in novel ways", type: 'innovation' },
      { text: "Use proven methods that have worked before", type: 'practical' },
      { text: "Brainstorm with others to get diverse perspectives", type: 'collaborative' },
      { text: "Trust your instincts and go with what feels right", type: 'intuitive' }
    ]
  },
  {
    id: 5,
    question: "You're creating a new product. Which approach matches your style?",
    options: [
      { text: "Invent something that doesn't exist yet in any form", type: 'innovation' },
      { text: "Take an existing product and make it revolutionary", type: 'bold' },
      { text: "Create a new category by combining different concepts", type: 'practical' },
      { text: "Develop something that challenges industry standards", type: 'research' },
      { text: "Design through extensive user feedback and testing", type: 'collaborative' },
      { text: "Build something that resonates with your personal vision", type: 'intuitive' }
    ]
  },
  {
    id: 6,
    question: "When working on a creative project, you typically:",
    options: [
      { text: "Start with wild ideas and refine the most promising ones", type: 'bold' },
      { text: "Challenge every assumption and think from scratch", type: 'innovation' },
      { text: "Research best practices and successful examples first", type: 'research' },
      { text: "Use a structured approach with clear milestones", type: 'practical' },
      { text: "Involve others early and often in the creative process", type: 'collaborative' },
      { text: "Let the project evolve naturally based on feelings", type: 'intuitive' }
    ]
  },
  {
    id: 7,
    question: "Your ideal creative workspace would be:",
    options: [
      { text: "A high-tech lab with the latest tools and equipment", type: 'innovation' },
      { text: "A quiet library with access to extensive resources", type: 'research' },
      { text: "A practical office with proven workflow systems", type: 'practical' },
      { text: "An unconventional space that breaks traditional norms", type: 'bold' },
      { text: "An open collaborative area with team members nearby", type: 'collaborative' },
      { text: "A flexible space that adapts to your current mood", type: 'intuitive' }
    ]
  },
  {
    id: 8,
    question: "When presenting your creative ideas to others, you prefer to:",
    options: [
      { text: "Show the innovative technology and features", type: 'innovation' },
      { text: "Present data and research that supports your ideas", type: 'research' },
      { text: "Demonstrate practical benefits and real-world applications", type: 'practical' },
      { text: "Make a bold, memorable impression that stands out", type: 'bold' },
      { text: "Encourage discussion and build on others' input", type: 'collaborative' },
      { text: "Share the emotional impact and personal meaning", type: 'intuitive' }
    ]
  },
  {
    id: 9,
    question: "Your approach to learning new creative skills is to:",
    options: [
      { text: "Experiment with cutting-edge techniques and tools", type: 'innovation' },
      { text: "Study the theory and history behind the skill", type: 'research' },
      { text: "Follow proven tutorials and established methods", type: 'practical' },
      { text: "Try unconventional approaches that others avoid", type: 'bold' },
      { text: "Learn alongside others in group settings", type: 'collaborative' },
      { text: "Trust your instincts and learn through doing", type: 'intuitive' }
    ]
  },
  {
    id: 10,
    question: "When facing creative blocks, you typically:",
    options: [
      { text: "Try completely new techniques or approaches", type: 'innovation' },
      { text: "Research how others have solved similar problems", type: 'research' },
      { text: "Use systematic methods to work through the block", type: 'practical' },
      { text: "Take risks and try something completely different", type: 'bold' },
      { text: "Seek input and collaboration from others", type: 'collaborative' },
      { text: "Step away and let inspiration come naturally", type: 'intuitive' }
    ]
  },
  {
    id: 11,
    question: "Your ideal creative project timeline would be:",
    options: [
      { text: "Flexible, allowing for experimentation and iteration", type: 'innovation' },
      { text: "Extended, with time for thorough research and planning", type: 'research' },
      { text: "Structured, with clear deadlines and milestones", type: 'practical' },
      { text: "Intense, with high-pressure deadlines that push creativity", type: 'bold' },
      { text: "Collaborative, with regular team check-ins and feedback", type: 'collaborative' },
      { text: "Organic, following natural creative rhythms", type: 'intuitive' }
    ]
  },
  {
    id: 12,
    question: "When evaluating creative work, you focus on:",
    options: [
      { text: "How innovative and original the approach is", type: 'innovation' },
      { text: "How well-researched and evidence-based it is", type: 'research' },
      { text: "How practical and functional the solution is", type: 'practical' },
      { text: "How bold and boundary-pushing the concept is", type: 'bold' },
      { text: "How well it incorporates diverse perspectives", type: 'collaborative' },
      { text: "How emotionally resonant and meaningful it feels", type: 'intuitive' }
    ]
  },
  {
    id: 13,
    question: "When starting a new creative project, you typically:",
    options: [
      { text: "Dive in immediately with experimental approaches", type: 'bold' },
      { text: "Research similar projects and study successful examples", type: 'research' },
      { text: "Plan out a structured approach with clear milestones", type: 'practical' },
      { text: "Explore cutting-edge tools and techniques first", type: 'innovation' },
      { text: "Gather input from others before making decisions", type: 'collaborative' },
      { text: "Follow your instincts about what feels right", type: 'intuitive' }
    ]
  },
  {
    id: 14,
    question: "Your ideal creative collaboration would be:",
    options: [
      { text: "Working with forward-thinking innovators", type: 'innovation' },
      { text: "Partnering with methodical researchers", type: 'research' },
      { text: "Collaborating with practical implementers", type: 'practical' },
      { text: "Teaming up with bold risk-takers", type: 'bold' },
      { text: "Building with diverse, inclusive teams", type: 'collaborative' },
      { text: "Creating with emotionally intelligent partners", type: 'intuitive' }
    ]
  },
  {
    id: 15,
    question: "When facing criticism of your creative work, you:",
    options: [
      { text: "See it as a chance to push boundaries even further", type: 'bold' },
      { text: "Analyze the feedback systematically and make data-driven improvements", type: 'research' },
      { text: "Focus on practical solutions to address the concerns", type: 'practical' },
      { text: "Use it to inspire new innovative directions", type: 'innovation' },
      { text: "Engage in dialogue to understand different perspectives", type: 'collaborative' },
      { text: "Reflect on the emotional impact and personal meaning", type: 'intuitive' }
    ]
  },
  {
    id: 16,
    question: "Your approach to creative deadlines is to:",
    options: [
      { text: "Use time pressure to fuel breakthrough thinking", type: 'bold' },
      { text: "Allow extra time for thorough research and planning", type: 'research' },
      { text: "Create structured timelines with buffer periods", type: 'practical' },
      { text: "Build in time for experimentation and iteration", type: 'innovation' },
      { text: "Coordinate schedules with all team members", type: 'collaborative' },
      { text: "Follow natural creative rhythms and inspiration", type: 'intuitive' }
    ]
  },
  {
    id: 17,
    question: "When choosing creative tools and resources, you prioritize:",
    options: [
      { text: "Latest technology and cutting-edge capabilities", type: 'innovation' },
      { text: "Well-documented, research-backed methods", type: 'research' },
      { text: "Proven tools that reliably get results", type: 'practical' },
      { text: "Unconventional approaches that challenge norms", type: 'bold' },
      { text: "Tools that facilitate team collaboration", type: 'collaborative' },
      { text: "Resources that feel intuitive and inspiring", type: 'intuitive' }
    ]
  },
  {
    id: 18,
    question: "Your creative workspace reflects your preference for:",
    options: [
      { text: "High-tech equipment and digital tools", type: 'innovation' },
      { text: "Extensive libraries and reference materials", type: 'research' },
      { text: "Organized systems and efficient workflows", type: 'practical' },
      { text: "Unconventional layouts that break traditional rules", type: 'bold' },
      { text: "Open areas that encourage interaction", type: 'collaborative' },
      { text: "Flexible spaces that adapt to your mood", type: 'intuitive' }
    ]
  },
  {
    id: 19,
    question: "When presenting creative ideas to stakeholders, you:",
    options: [
      { text: "Showcase innovative features and future possibilities", type: 'innovation' },
      { text: "Present comprehensive research and supporting data", type: 'research' },
      { text: "Demonstrate practical benefits and implementation plans", type: 'practical' },
      { text: "Make bold statements that challenge conventional thinking", type: 'bold' },
      { text: "Encourage discussion and incorporate feedback", type: 'collaborative' },
      { text: "Share the vision and emotional impact", type: 'intuitive' }
    ]
  },
  {
    id: 20,
    question: "Your ideal creative mentor would be someone who:",
    options: [
      { text: "Pioneers breakthrough technologies and methods", type: 'innovation' },
      { text: "Has deep expertise and research-based knowledge", type: 'research' },
      { text: "Provides practical guidance and proven strategies", type: 'practical' },
      { text: "Takes bold risks and challenges the status quo", type: 'bold' },
      { text: "Builds strong networks and collaborative relationships", type: 'collaborative' },
      { text: "Connects with others on an emotional and intuitive level", type: 'intuitive' }
    ]
  },
  {
    id: 21,
    question: "When your creative project hits an unexpected obstacle, you:",
    options: [
      { text: "See it as an opportunity to innovate a new solution", type: 'innovation' },
      { text: "Research how others have overcome similar challenges", type: 'research' },
      { text: "Develop a systematic plan to work around it", type: 'practical' },
      { text: "Use it as motivation to push even harder", type: 'bold' },
      { text: "Seek input and support from your network", type: 'collaborative' },
      { text: "Step back and trust that the right solution will emerge", type: 'intuitive' }
    ]
  },
  {
    id: 22,
    question: "Your favorite type of creative inspiration comes from:",
    options: [
      { text: "Emerging technologies and scientific breakthroughs", type: 'innovation' },
      { text: "In-depth studies and academic research", type: 'research' },
      { text: "Real-world problems and practical applications", type: 'practical' },
      { text: "Boundary-pushing art and revolutionary ideas", type: 'bold' },
      { text: "Human stories and community experiences", type: 'collaborative' },
      { text: "Personal experiences and emotional connections", type: 'intuitive' }
    ]
  },
  {
    id: 23,
    question: "When working on multiple creative projects simultaneously, you:",
    options: [
      { text: "Experiment with cross-pollination of innovative ideas", type: 'innovation' },
      { text: "Research connections and patterns between projects", type: 'research' },
      { text: "Organize them with clear priorities and timelines", type: 'practical' },
      { text: "Use the energy from one to fuel breakthroughs in others", type: 'bold' },
      { text: "Coordinate with teams to share resources and insights", type: 'collaborative' },
      { text: "Let projects evolve naturally based on your current interests", type: 'intuitive' }
    ]
  },
  {
    id: 24,
    question: "Your approach to creative feedback and iteration is to:",
    options: [
      { text: "Use feedback to drive more innovative solutions", type: 'innovation' },
      { text: "Analyze feedback systematically and make evidence-based changes", type: 'research' },
      { text: "Focus on practical improvements that address specific concerns", type: 'practical' },
      { text: "Use criticism as fuel to push creative boundaries further", type: 'bold' },
      { text: "Engage in collaborative refinement with all stakeholders", type: 'collaborative' },
      { text: "Trust your instincts about what changes feel right", type: 'intuitive' }
    ]
  },
  {
    id: 25,
    question: "When choosing between creative opportunities, you prioritize:",
    options: [
      { text: "Projects that push technological or methodological boundaries", type: 'innovation' },
      { text: "Opportunities that allow for deep research and analysis", type: 'research' },
      { text: "Work that has clear practical applications and impact", type: 'practical' },
      { text: "Challenges that require bold, unconventional thinking", type: 'bold' },
      { text: "Collaborations that bring together diverse perspectives", type: 'collaborative' },
      { text: "Projects that resonate with your personal values and passions", type: 'intuitive' }
    ]
  },
  {
    id: 26,
    question: "Your ideal creative team would consist of:",
    options: [
      { text: "Forward-thinking innovators and tech pioneers", type: 'innovation' },
      { text: "Methodical researchers and data analysts", type: 'research' },
      { text: "Practical implementers and project managers", type: 'practical' },
      { text: "Bold risk-takers and boundary pushers", type: 'bold' },
      { text: "Diverse collaborators from different backgrounds", type: 'collaborative' },
      { text: "Intuitive creatives who understand emotional impact", type: 'intuitive' }
    ]
  },
  {
    id: 27,
    question: "When documenting your creative process, you focus on:",
    options: [
      { text: "Innovative techniques and breakthrough moments", type: 'innovation' },
      { text: "Research findings and analytical insights", type: 'research' },
      { text: "Practical steps and measurable outcomes", type: 'practical' },
      { text: "Bold decisions and unconventional choices", type: 'bold' },
      { text: "Collaborative contributions and team dynamics", type: 'collaborative' },
      { text: "Personal insights and emotional discoveries", type: 'intuitive' }
    ]
  },
  {
    id: 28,
    question: "Your approach to creative risk-taking is to:",
    options: [
      { text: "Embrace calculated risks that could lead to breakthroughs", type: 'innovation' },
      { text: "Take risks based on thorough research and analysis", type: 'research' },
      { text: "Minimize risks through careful planning and preparation", type: 'practical' },
      { text: "Take bold, unconventional risks that challenge norms", type: 'bold' },
      { text: "Share risks with collaborators and build support systems", type: 'collaborative' },
      { text: "Follow your instincts about which risks feel worth taking", type: 'intuitive' }
    ]
  },
  {
    id: 29,
    question: "When celebrating creative achievements, you value:",
    options: [
      { text: "Recognition for innovative contributions and breakthroughs", type: 'innovation' },
      { text: "Acknowledgment of thorough research and analytical rigor", type: 'research' },
      { text: "Appreciation for practical impact and real-world results", type: 'practical' },
      { text: "Recognition for bold thinking and boundary pushing", type: 'bold' },
      { text: "Celebration of collaborative success and team achievements", type: 'collaborative' },
      { text: "Recognition of personal growth and emotional resonance", type: 'intuitive' }
    ]
  },
  {
    id: 30,
    question: "Your ideal creative challenge would be:",
    options: [
      { text: "Developing a solution that doesn't exist yet", type: 'innovation' },
      { text: "Solving a complex problem through systematic research", type: 'research' },
      { text: "Creating something that solves a real-world problem", type: 'practical' },
      { text: "Challenging established conventions and creating new paradigms", type: 'bold' },
      { text: "Bringing together diverse groups to create something meaningful", type: 'collaborative' },
      { text: "Creating something that touches people's hearts and minds", type: 'intuitive' }
    ]
  },
  {
    id: 31,
    question: "When learning from creative failures, you:",
    options: [
      { text: "Extract innovative insights for future breakthrough attempts", type: 'innovation' },
      { text: "Analyze what went wrong and develop better research methods", type: 'research' },
      { text: "Identify practical lessons for more effective implementation", type: 'practical' },
      { text: "Use failures as motivation to take even bolder risks", type: 'bold' },
      { text: "Share learnings with collaborators to strengthen the team", type: 'collaborative' },
      { text: "Reflect on the emotional and personal growth from the experience", type: 'intuitive' }
    ]
  },
  {
    id: 32,
    question: "Your approach to creative constraints is to:",
    options: [
      { text: "Use constraints as fuel for innovative problem-solving", type: 'innovation' },
      { text: "Research how constraints have been successfully navigated before", type: 'research' },
      { text: "Work within constraints to create practical, achievable solutions", type: 'practical' },
      { text: "Challenge constraints and find ways to push beyond them", type: 'bold' },
      { text: "Collaborate with others to find creative ways around constraints", type: 'collaborative' },
      { text: "Trust that constraints will guide you to the right creative path", type: 'intuitive' }
    ]
  },
  {
    id: 33,
    question: "When sharing your creative work with the world, you hope to:",
    options: [
      { text: "Inspire others to pursue innovative thinking", type: 'innovation' },
      { text: "Contribute to knowledge and understanding in your field", type: 'research' },
      { text: "Provide practical value and real-world solutions", type: 'practical' },
      { text: "Challenge people's assumptions and push boundaries", type: 'bold' },
      { text: "Build connections and foster collaborative creativity", type: 'collaborative' },
      { text: "Touch people's hearts and create meaningful experiences", type: 'intuitive' }
    ]
  },
  {
    id: 34,
    question: "Your creative process is most energized when you:",
    options: [
      { text: "Discover new possibilities and breakthrough insights", type: 'innovation' },
      { text: "Uncover patterns and connections through deep analysis", type: 'research' },
      { text: "See your ideas translate into practical, working solutions", type: 'practical' },
      { text: "Push beyond what others thought was possible", type: 'bold' },
      { text: "Connect with others and build something together", type: 'collaborative' },
      { text: "Feel a deep sense of flow and intuitive knowing", type: 'intuitive' }
    ]
  },
  {
    id: 35,
    question: "When mentoring other creatives, you emphasize:",
    options: [
      { text: "Encouraging innovative thinking and experimentation", type: 'innovation' },
      { text: "Teaching systematic research and analytical approaches", type: 'research' },
      { text: "Focusing on practical skills and real-world applications", type: 'practical' },
      { text: "Inspiring bold thinking and risk-taking", type: 'bold' },
      { text: "Building collaborative skills and team dynamics", type: 'collaborative' },
      { text: "Nurturing personal growth and emotional intelligence", type: 'intuitive' }
    ]
  },
  {
    id: 36,
    question: "Your ideal creative environment would include:",
    options: [
      { text: "Cutting-edge technology and experimental tools", type: 'innovation' },
      { text: "Extensive resources and research materials", type: 'research' },
      { text: "Well-organized systems and efficient processes", type: 'practical' },
      { text: "Freedom to challenge conventions and take risks", type: 'bold' },
      { text: "Spaces designed for collaboration and interaction", type: 'collaborative' },
      { text: "Flexible, inspiring spaces that adapt to your needs", type: 'intuitive' }
    ]
  },
  {
    id: 37,
    question: "When choosing creative projects, you're most attracted to those that:",
    options: [
      { text: "Push the boundaries of what's technically possible", type: 'innovation' },
      { text: "Allow for deep investigation and systematic exploration", type: 'research' },
      { text: "Address real-world problems with practical solutions", type: 'practical' },
      { text: "Challenge established norms and create new possibilities", type: 'bold' },
      { text: "Bring together diverse communities and perspectives", type: 'collaborative' },
      { text: "Resonate with your personal values and emotional truth", type: 'intuitive' }
    ]
  },
  {
    id: 38,
    question: "Your creative legacy would ideally be:",
    options: [
      { text: "Pioneering innovative approaches that others build upon", type: 'innovation' },
      { text: "Contributing to knowledge through rigorous research", type: 'research' },
      { text: "Creating practical solutions that improve people's lives", type: 'practical' },
      { text: "Inspiring others to think boldly and challenge conventions", type: 'bold' },
      { text: "Building bridges between diverse communities and ideas", type: 'collaborative' },
      { text: "Touching hearts and creating meaningful, lasting impact", type: 'intuitive' }
    ]
  },
  {
    id: 39,
    question: "When facing creative competition, you:",
    options: [
      { text: "Focus on out-innovating with breakthrough solutions", type: 'innovation' },
      { text: "Leverage superior research and analytical insights", type: 'research' },
      { text: "Emphasize practical advantages and proven results", type: 'practical' },
      { text: "Take bolder risks and make more unconventional choices", type: 'bold' },
      { text: "Build stronger collaborative networks and partnerships", type: 'collaborative' },
      { text: "Connect more deeply with audiences on an emotional level", type: 'intuitive' }
    ]
  },
  {
    id: 40,
    question: "Your ultimate creative goal is to:",
    options: [
      { text: "Pioneer breakthrough innovations that change the world", type: 'innovation' },
      { text: "Contribute to human knowledge through rigorous research", type: 'research' },
      { text: "Create practical solutions that solve real problems", type: 'practical' },
      { text: "Challenge all conventions and create entirely new paradigms", type: 'bold' },
      { text: "Build collaborative communities that create together", type: 'collaborative' },
      { text: "Touch souls and create deeply meaningful experiences", type: 'intuitive' }
    ]
  }
];

export const getRandomCreativityQuestions = (): CreativityQuestion[] => {
  // Select 12 random questions
  const shuffled = [...creativityQuestions].sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, 12);
  
  // Create a pool of exactly 8 options per type (48 total)
  const typePool = {
    innovation: [],
    research: [],
    practical: [],
    bold: [],
    collaborative: [],
    intuitive: []
  };
  
  // Collect exactly 8 options of each type from all questions
  selectedQuestions.forEach(question => {
    question.options.forEach(option => {
      if (typePool[option.type].length < 8) {
        typePool[option.type].push({
          ...option,
          sourceQuestionId: question.id
        });
      }
    });
  });
  
  // Ensure we have exactly 8 of each type
  const allTypes = ['innovation', 'research', 'practical', 'bold', 'collaborative', 'intuitive'];
  allTypes.forEach(type => {
    if (typePool[type].length < 8) {
      // If we don't have enough, fill from all available questions
      const allQuestions = [...creativityQuestions];
      allQuestions.forEach(question => {
        question.options.forEach(option => {
          if (option.type === type && typePool[type].length < 8) {
            typePool[type].push({
              ...option,
              sourceQuestionId: question.id
            });
          }
        });
      });
    }
  });
  
  // Shuffle each type's pool
  allTypes.forEach(type => {
    typePool[type] = typePool[type].sort(() => 0.5 - Math.random());
  });
  
  // Create final questions with exactly 4 options each
  const finalQuestions = selectedQuestions.map((question, questionIndex) => {
    const selectedOptions = [];
    let slotsRemaining = 4;
    
    // For each question, select 4 options ensuring diversity
    while (slotsRemaining > 0) {
      // Find all types that still have options available
      const availableTypes = allTypes.filter(type => typePool[type].length > 0);
      
      if (availableTypes.length === 0) {
        // Emergency fallback: if all pools are empty, we have a serious issue
        console.error('All type pools are empty! This should not happen.');
        break;
      }
      
      // Randomly select a type from available ones
      const randomTypeIndex = Math.floor(Math.random() * availableTypes.length);
      const selectedType = availableTypes[randomTypeIndex];
      
      // Take the first option from this type's pool
      const option = typePool[selectedType].shift();
      if (option) {
        selectedOptions.push({
          text: option.text,
          type: option.type
        });
        slotsRemaining--;
      }
    }
    
    // Randomize the order of the 4 selected options
    const shuffledSelectedOptions = [...selectedOptions].sort(() => 0.5 - Math.random());
    
    return {
      ...question,
      options: shuffledSelectedOptions
    };
  });
  
  return finalQuestions;
};

export const calculateCreativityResults = (answers: Record<number, number[]>, questions: CreativityQuestion[]): CreativityResult => {
  const typeScores = {
    innovation: 0,
    research: 0,
    practical: 0,
    bold: 0,
    collaborative: 0,
    intuitive: 0
  };

  // Calculate weighted scores based on ranking positions
  questions.forEach(question => {
    const answer = answers[question.id];
    if (answer && answer.length === 4) {
      // Weighted scoring: Rank 1 = 4 pts, Rank 2 = 3 pts, Rank 3 = 1 pt, Rank 4 = 0 pts
      answer.forEach((optionIndex, rank) => {
        const points = rank === 0 ? 4 : rank === 1 ? 3 : rank === 2 ? 1 : 0;
        const optionType = question.options[optionIndex].type;
        typeScores[optionType] += points;
      });
    }
  });

  // Calculate preference percentages
  const totalPossiblePoints = questions.length * 8; // 4+3+1+0 = 8 max points per question
  const rawPercentages = {
    innovation: parseFloat(((typeScores.innovation / totalPossiblePoints) * 100).toFixed(1)),
    research: parseFloat(((typeScores.research / totalPossiblePoints) * 100).toFixed(1)),
    practical: parseFloat(((typeScores.practical / totalPossiblePoints) * 100).toFixed(1)),
    bold: parseFloat(((typeScores.bold / totalPossiblePoints) * 100).toFixed(1)),
    collaborative: parseFloat(((typeScores.collaborative / totalPossiblePoints) * 100).toFixed(1)),
    intuitive: parseFloat(((typeScores.intuitive / totalPossiblePoints) * 100).toFixed(1))
  };

  // Round and adjust to ensure total equals 100%
  const roundedPercentages = Object.values(rawPercentages).map(p => Math.round(p));
  const totalRounded = roundedPercentages.reduce((sum, p) => sum + p, 0);
  const adjustment = 100 - totalRounded;

  // Apply adjustment to the largest percentage
  const sortedIndices = Object.keys(rawPercentages)
    .map((key, index) => ({ key, index, value: rawPercentages[key as keyof typeof rawPercentages] }))
    .sort((a, b) => b.value - a.value);

  const preferencePercentages = { ...rawPercentages };
  if (adjustment !== 0) {
    const targetKey = sortedIndices[0].key as keyof typeof preferencePercentages;
    preferencePercentages[targetKey] = Math.round(rawPercentages[targetKey]) + adjustment;
  } else {
    Object.keys(preferencePercentages).forEach(key => {
      preferencePercentages[key as keyof typeof preferencePercentages] = Math.round(rawPercentages[key as keyof typeof rawPercentages]);
    });
  }

  // Determine creativity type based on percentage distribution
  const sortedEntries = Object.entries(preferencePercentages)
    .sort(([,a], [,b]) => b - a);
  
  const [firstType, firstPercent] = sortedEntries[0];
  const [secondType, secondPercent] = sortedEntries[1];
  const [thirdType, thirdPercent] = sortedEntries[2];
  const gap = firstPercent - secondPercent;
  const secondGap = secondPercent - thirdPercent;

  let creativityType = '';
  let strengths: string[] = [];
  let areasForGrowth: string[] = [];
  let description = '';

  // Type name mapping
  const typeNames = {
    innovation: 'Innovation',
    research: 'Research',
    practical: 'Practical',
    bold: 'Bold',
    collaborative: 'Collaborative',
    intuitive: 'Intuitive'
  };

  // Check for dominant single type (30%+ with 10%+ gap)
  if (firstPercent >= 30 && gap >= 10) {
    creativityType = `The ${typeNames[firstType as keyof typeof typeNames]} Specialist`;
    description = `You have a strong preference for ${typeNames[firstType as keyof typeof typeNames].toLowerCase()} approaches, bringing focused expertise to your creative work.`;
    
    if (firstType === 'innovation') {
      strengths = ['Cutting-edge thinking', 'Forward-looking vision', 'Technological innovation'];
      areasForGrowth = ['Practical implementation', 'Collaborative approaches'];
    } else if (firstType === 'research') {
      strengths = ['Thorough analysis', 'Evidence-based decisions', 'Systematic approach'];
      areasForGrowth = ['Intuitive leaps', 'Bold experimentation'];
    } else if (firstType === 'practical') {
      strengths = ['Real-world application', 'Reliable solutions', 'Effective implementation'];
      areasForGrowth = ['Creative risk-taking', 'Innovation breakthroughs'];
    } else if (firstType === 'bold') {
      strengths = ['Risk-taking courage', 'Boundary pushing', 'Revolutionary thinking'];
      areasForGrowth = ['Careful planning', 'Collaborative processes'];
    } else if (firstType === 'collaborative') {
      strengths = ['Team building', 'Community focus', 'Inclusive creativity'];
      areasForGrowth = ['Independent innovation', 'Personal vision'];
    } else if (firstType === 'intuitive') {
      strengths = ['Creative instincts', 'Emotional depth', 'Natural creativity'];
      areasForGrowth = ['Systematic analysis', 'Research-based approaches'];
    }
  }
  // Check for clear top two with meaningful gap (5%+ between 2nd and 3rd)
  else if (secondGap >= 5) {
    creativityType = `The ${typeNames[firstType as keyof typeof typeNames]} ${typeNames[secondType as keyof typeof typeNames]}`;
    description = `You combine ${typeNames[firstType as keyof typeof typeNames].toLowerCase()} and ${typeNames[secondType as keyof typeof typeNames].toLowerCase()} approaches, creating a unique creative blend.`;
    
    // Dynamic strengths based on combination
    strengths = [
      `${typeNames[firstType as keyof typeof typeNames]} expertise`,
      `${typeNames[secondType as keyof typeof typeNames]} skills`,
      'Balanced creative approach'
    ];
    
    // Find areas for growth from the weaker types
    const weakTypes = sortedEntries.slice(2).map(([type]) => typeNames[type as keyof typeof typeNames]);
    areasForGrowth = weakTypes.slice(0, 2).map(type => `Developing ${type.toLowerCase()} skills`);
  }
  // Balanced creative (close percentages)
  else {
    creativityType = 'The Balanced Creative';
    description = 'You demonstrate a well-rounded approach to creativity, showing strength across multiple dimensions without a dominant preference.';
    strengths = ['Versatile creativity', 'Adaptable approach', 'Well-rounded skills'];
    areasForGrowth = ['Developing signature style', 'Focusing on core strengths'];
  }

  return {
    totalQuestions: questions.length,
    typeScores: preferencePercentages,
    innovationPreference: preferencePercentages.innovation,
    researchPreference: preferencePercentages.research,
    practicalPreference: preferencePercentages.practical,
    boldPreference: preferencePercentages.bold,
    collaborativePreference: preferencePercentages.collaborative,
    intuitivePreference: preferencePercentages.intuitive,
    creativityType,
    strengths,
    areasForGrowth,
    description
  };
};
