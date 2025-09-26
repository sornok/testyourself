export interface TimeManagementQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  explanation: string;
}

export const timeManagementQuestions: TimeManagementQuestion[] = [
  // Planning & Prioritization (20 questions)
  {
    id: 1,
    question: "When you start your workday, you typically:",
    options: [
      "Create a detailed to-do list with priorities",
      "Jump into the most urgent task first",
      "Check emails and messages before planning",
      "Work on whatever feels most interesting"
    ],
    correct: 0,
    category: "planning",
    explanation: "Creating a detailed to-do list with priorities helps you stay organized and focused throughout the day, ensuring important tasks don't get overlooked."
  },
  {
    id: 2,
    question: "How do you handle multiple projects with similar deadlines?",
    options: [
      "Break each project into smaller tasks and schedule them",
      "Work on one project at a time until completion",
      "Switch between projects based on mood",
      "Wait until the last minute to start working"
    ],
    correct: 0,
    category: "planning",
    explanation: "Breaking projects into smaller tasks and scheduling them allows for better time management and reduces the risk of missing deadlines."
  },
  {
    id: 3,
    question: "When setting daily goals, you prefer to:",
    options: [
      "Set 3-5 specific, achievable goals",
      "Set as many goals as possible to stay motivated",
      "Set only one major goal per day",
      "Avoid setting specific goals and go with the flow"
    ],
    correct: 0,
    category: "planning",
    explanation: "Setting 3-5 specific, achievable goals provides focus without overwhelming you, making it more likely you'll accomplish them."
  },
  {
    id: 4,
    question: "Your approach to long-term project planning is:",
    options: [
      "Create detailed timelines with milestones",
      "Set a final deadline and work backwards",
      "Start working and adjust as you go",
      "Avoid planning and handle tasks as they come"
    ],
    correct: 0,
    category: "planning",
    explanation: "Detailed timelines with milestones help track progress and ensure you stay on track for long-term projects."
  },
  {
    id: 5,
    question: "When prioritizing tasks, you consider:",
    options: [
      "Deadline, importance, and effort required",
      "Only the deadline",
      "Which task you feel like doing",
      "Whatever your manager asks for first"
    ],
    correct: 0,
    category: "planning",
    explanation: "Considering deadline, importance, and effort required provides a balanced approach to task prioritization."
  },
  {
    id: 6,
    question: "How do you handle unexpected urgent tasks?",
    options: [
      "Reassess priorities and adjust your schedule",
      "Drop everything and focus only on the urgent task",
      "Ignore them until you finish current work",
      "Panic and try to do everything at once"
    ],
    correct: 0,
    category: "planning",
    explanation: "Reassessing priorities and adjusting your schedule allows you to handle urgent tasks while maintaining control over your workload."
  },
  {
    id: 7,
    question: "Your ideal way to organize tasks is:",
    options: [
      "By priority level and deadline",
      "By project or category",
      "By how much time each will take",
      "In the order they were assigned"
    ],
    correct: 0,
    category: "planning",
    explanation: "Organizing by priority level and deadline ensures the most important and time-sensitive tasks get attention first."
  },
  {
    id: 8,
    question: "When planning your week, you:",
    options: [
      "Block time for different types of work",
      "Make a simple list of tasks to complete",
      "Plan day by day as you go",
      "Don't plan and see what happens"
    ],
    correct: 0,
    category: "planning",
    explanation: "Blocking time for different types of work helps maintain focus and ensures all important areas get attention."
  },
  {
    id: 9,
    question: "How do you handle tasks that seem overwhelming?",
    options: [
      "Break them into smaller, manageable steps",
      "Work on them for short periods and take breaks",
      "Ask for help or delegate parts of it",
      "All of the above approaches work well"
    ],
    correct: 3,
    category: "planning",
    explanation: "Breaking tasks down, working in short periods, and seeking help are all effective strategies for managing overwhelming tasks."
  },
  {
    id: 10,
    question: "Your approach to setting deadlines for yourself is:",
    options: [
      "Set realistic deadlines with buffer time",
      "Set aggressive deadlines to stay motivated",
      "Set deadlines based on others' expectations",
      "Avoid setting personal deadlines"
    ],
    correct: 0,
    category: "planning",
    explanation: "Setting realistic deadlines with buffer time accounts for unexpected delays and reduces stress."
  },
  {
    id: 11,
    question: "When you have a big project, you:",
    options: [
      "Start immediately and work consistently",
      "Plan thoroughly before starting",
      "Wait until you feel motivated",
      "Work intensively in short bursts"
    ],
    correct: 1,
    category: "planning",
    explanation: "Thorough planning before starting helps identify potential issues and creates a clear roadmap for success."
  },
  {
    id: 12,
    question: "How do you decide which tasks to tackle first?",
    options: [
      "Use a priority matrix (urgent vs important)",
      "Start with the easiest tasks",
      "Begin with the most difficult tasks",
      "Work on whatever is due soonest"
    ],
    correct: 0,
    category: "planning",
    explanation: "A priority matrix helps distinguish between urgent and important tasks, leading to better decision-making."
  },
  {
    id: 13,
    question: "Your strategy for handling recurring tasks is:",
    options: [
      "Schedule them at consistent times",
      "Do them whenever you remember",
      "Batch similar tasks together",
      "Use a combination of scheduling and batching"
    ],
    correct: 3,
    category: "planning",
    explanation: "Using a combination of scheduling recurring tasks consistently and batching similar tasks is an effective time management strategy."
  },
  {
    id: 14,
    question: "When planning for meetings, you:",
    options: [
      "Prepare agendas and materials in advance",
      "Show up and see what's needed",
      "Only prepare if you're leading the meeting",
      "Avoid meetings whenever possible"
    ],
    correct: 0,
    category: "planning",
    explanation: "Preparing agendas and materials in advance makes meetings more productive and efficient for everyone involved."
  },
  {
    id: 15,
    question: "How do you handle tasks with unclear requirements?",
    options: [
      "Ask clarifying questions before starting",
      "Make assumptions and start working",
      "Wait for more information",
      "Start with what you know and adjust"
    ],
    correct: 0,
    category: "planning",
    explanation: "Asking clarifying questions prevents wasted effort and ensures you're working on the right thing from the start."
  },
  {
    id: 16,
    question: "Your approach to goal setting is:",
    options: [
      "Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)",
      "Set general goals and figure out details later",
      "Set ambitious goals to push yourself",
      "Avoid setting goals to stay flexible"
    ],
    correct: 0,
    category: "planning",
    explanation: "SMART goals provide clear direction and measurable outcomes, making them more likely to be achieved."
  },
  {
    id: 17,
    question: "When you have competing priorities, you:",
    options: [
      "Evaluate impact and urgency of each",
      "Focus on the one your manager wants most",
      "Work on whichever seems easiest",
      "Try to do a little of each"
    ],
    correct: 0,
    category: "planning",
    explanation: "Evaluating impact and urgency helps make informed decisions about which priorities deserve attention first."
  },
  {
    id: 18,
    question: "How do you track your progress on projects?",
    options: [
      "Use project management tools or checklists",
      "Keep mental notes of what's done",
      "Review progress weekly",
      "Check progress only when asked"
    ],
    correct: 0,
    category: "planning",
    explanation: "Using tools or checklists provides clear visibility into progress and helps identify potential delays early."
  },
  {
    id: 19,
    question: "Your strategy for handling interruptions is:",
    options: [
      "Schedule specific times for handling interruptions",
      "Deal with them immediately as they come",
      "Ignore them until you finish current work",
      "Minimize interruptions by working in isolation"
    ],
    correct: 0,
    category: "planning",
    explanation: "Scheduling specific times for interruptions allows you to maintain focus while still being responsive to others."
  },
  {
    id: 20,
    question: "When planning your day, you consider:",
    options: [
      "Energy levels, deadlines, and task complexity",
      "Only the deadlines",
      "What you feel like doing",
      "Whatever comes up first"
    ],
    correct: 0,
    category: "planning",
    explanation: "Considering energy levels, deadlines, and task complexity helps optimize your schedule for maximum productivity."
  },

  // Time Awareness (15 questions)
  {
    id: 21,
    question: "How accurately do you estimate how long tasks will take?",
    options: [
      "Very accurately - I track my time and learn from experience",
      "Somewhat accurately - I'm usually close",
      "Not very accurately - I often underestimate",
      "Poorly - I'm usually way off"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Accurate time estimation comes from tracking time and learning from experience, leading to better planning."
  },
  {
    id: 22,
    question: "When you're running late, you typically:",
    options: [
      "Communicate the delay and adjust your schedule",
      "Rush to make up time",
      "Cancel or postpone other commitments",
      "Ignore the delay and hope no one notices"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Communicating delays and adjusting schedules maintains professionalism and reduces stress for everyone involved."
  },
  {
    id: 23,
    question: "Your approach to deadlines is:",
    options: [
      "Always meet them, often finishing early",
      "Usually meet them, sometimes cutting it close",
      "Often need extensions",
      "Frequently miss them"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Consistently meeting deadlines, often finishing early, demonstrates strong time management and reliability."
  },
  {
    id: 24,
    question: "How do you handle time zone differences in scheduling?",
    options: [
      "Use tools to convert times and double-check",
      "Rely on others to handle the conversion",
      "Guess and hope for the best",
      "Avoid scheduling across time zones"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Using tools to convert times and double-checking prevents scheduling errors and shows professionalism."
  },
  {
    id: 25,
    question: "When you have free time, you:",
    options: [
      "Use it productively for personal projects or learning",
      "Relax and recharge",
      "Fill it with more work tasks",
      "Waste it on unimportant activities"
    ],
    correct: 1,
    category: "time-awareness",
    explanation: "Using free time to relax and recharge is important for maintaining energy and preventing burnout."
  },
  {
    id: 26,
    question: "Your perception of time during focused work is:",
    options: [
      "Time flies when I'm in the zone",
      "Time passes at a normal pace",
      "Time seems to drag",
      "I lose track of time completely"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "When time flies during focused work, it indicates you're in a productive flow state."
  },
  {
    id: 27,
    question: "How do you handle tasks that take longer than expected?",
    options: [
      "Adjust my schedule and learn for next time",
      "Work longer hours to catch up",
      "Ask for help or delegate",
      "All of these approaches work well"
    ],
    correct: 3,
    category: "time-awareness",
    explanation: "Adjusting schedules, working longer when necessary, and seeking help are all valid strategies for handling delays."
  },
  {
    id: 28,
    question: "Your approach to buffer time in schedules is:",
    options: [
      "Always include buffer time for unexpected delays",
      "Include buffer time only for important tasks",
      "Rarely include buffer time",
      "Never include buffer time"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Including buffer time for unexpected delays helps maintain realistic schedules and reduces stress."
  },
  {
    id: 29,
    question: "How do you track time spent on different activities?",
    options: [
      "Use time tracking apps or tools",
      "Keep mental notes",
      "Only track time for billable work",
      "Don't track time at all"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Using time tracking tools provides valuable data for improving time management and productivity."
  },
  {
    id: 30,
    question: "When you're waiting (in line, for appointments, etc.), you:",
    options: [
      "Use the time productively (read, plan, etc.)",
      "Relax and enjoy the break",
      "Get frustrated and impatient",
      "Check social media or browse the internet"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Using waiting time productively helps maximize your overall productivity and reduces wasted time."
  },
  {
    id: 31,
    question: "Your approach to time-sensitive decisions is:",
    options: [
      "Make quick decisions based on available information",
      "Take time to gather more information",
      "Avoid making decisions under pressure",
      "Delegate decision-making to others"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Making quick decisions based on available information is often necessary in time-sensitive situations."
  },
  {
    id: 32,
    question: "How do you handle time conflicts between commitments?",
    options: [
      "Prioritize and communicate changes clearly",
      "Try to attend both if possible",
      "Cancel the less important commitment",
      "Show up late to one of them"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Prioritizing and communicating changes clearly maintains professionalism and respects others' time."
  },
  {
    id: 33,
    question: "Your strategy for managing time across different projects is:",
    options: [
      "Allocate specific time blocks for each project",
      "Work on projects based on deadlines",
      "Focus on one project at a time",
      "Work on whatever feels most urgent"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Allocating specific time blocks ensures all projects get attention and prevents any from being neglected."
  },
  {
    id: 34,
    question: "How do you handle tasks with no clear deadline?",
    options: [
      "Set my own deadline to maintain momentum",
      "Work on them when I have extra time",
      "Put them off indefinitely",
      "Ask for a deadline to be set"
    ],
    correct: 0,
    category: "time-awareness",
    explanation: "Setting your own deadlines for tasks without clear timelines helps maintain progress and accountability."
  },
  {
    id: 35,
    question: "Your approach to time management during busy periods is:",
    options: [
      "Strictly prioritize and eliminate non-essentials",
      "Work longer hours to get everything done",
      "Delegate more tasks to others",
      "All of these strategies work well"
    ],
    correct: 3,
    category: "time-awareness",
    explanation: "Prioritizing, working longer when necessary, and delegating are all effective strategies for busy periods."
  },

  // Productivity Habits (15 questions)
  {
    id: 36,
    question: "Your ideal work environment for maximum productivity is:",
    options: [
      "Quiet, organized, and free from distractions",
      "Moderately busy with some background noise",
      "Very quiet and isolated",
      "Busy and dynamic with lots of activity"
    ],
    correct: 0,
    category: "productivity",
    explanation: "A quiet, organized environment free from distractions typically supports the highest levels of focused productivity."
  },
  {
    id: 37,
    question: "How do you handle distractions during focused work?",
    options: [
      "Eliminate or minimize them proactively",
      "Deal with them as they come up",
      "Ignore them and try to stay focused",
      "Take breaks when distracted"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Proactively eliminating or minimizing distractions is more effective than trying to ignore them during work."
  },
  {
    id: 38,
    question: "Your approach to multitasking is:",
    options: [
      "Avoid it and focus on one task at a time",
      "Do it only for simple, routine tasks",
      "Multitask frequently to get more done",
      "Multitask only when necessary"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Focusing on one task at a time generally leads to higher quality work and better time management."
  },
  {
    id: 39,
    question: "How do you maintain energy throughout the day?",
    options: [
      "Take regular breaks and manage my schedule",
      "Drink coffee or energy drinks",
      "Push through fatigue",
      "Work in short, intense bursts"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Taking regular breaks and managing your schedule helps maintain consistent energy levels throughout the day."
  },
  {
    id: 40,
    question: "Your strategy for handling email and messages is:",
    options: [
      "Check at scheduled times and batch responses",
      "Check frequently throughout the day",
      "Check only when I have time",
      "Respond immediately to everything"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Checking at scheduled times and batching responses reduces interruptions and improves focus on other tasks."
  },
  {
    id: 41,
    question: "How do you approach learning new skills or tools?",
    options: [
      "Set aside dedicated time for learning",
      "Learn as needed for specific projects",
      "Learn during downtime or breaks",
      "Avoid learning new things unless necessary"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Setting aside dedicated time for learning ensures consistent skill development and long-term productivity gains."
  },
  {
    id: 42,
    question: "Your approach to perfectionism is:",
    options: [
      "Strive for excellence but know when to stop",
      "Always aim for perfection",
      "Focus on getting things done quickly",
      "Avoid perfectionism entirely"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Striving for excellence while knowing when to stop balances quality with efficiency and time management."
  },
  {
    id: 43,
    question: "How do you handle tasks you don't enjoy?",
    options: [
      "Do them first to get them out of the way",
      "Mix them with enjoyable tasks",
      "Put them off until the last minute",
      "Delegate them if possible"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Doing unpleasant tasks first (eating the frog) prevents procrastination and improves overall productivity."
  },
  {
    id: 44,
    question: "Your approach to work-life balance is:",
    options: [
      "Set clear boundaries and stick to them",
      "Work when needed, relax when possible",
      "Work hard during the week, relax on weekends",
      "Balance varies depending on workload"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Setting clear boundaries helps maintain work-life balance and prevents burnout, leading to better long-term productivity."
  },
  {
    id: 45,
    question: "How do you handle creative blocks or low motivation?",
    options: [
      "Take a break and return with fresh perspective",
      "Push through and keep working",
      "Switch to different types of tasks",
      "All of these approaches work well"
    ],
    correct: 3,
    category: "productivity",
    explanation: "Taking breaks, pushing through, and switching tasks are all valid strategies for handling creative blocks."
  },
  {
    id: 46,
    question: "Your strategy for managing information overload is:",
    options: [
      "Filter and prioritize information sources",
      "Try to consume everything",
      "Avoid information that's not immediately relevant",
      "Save everything for later review"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Filtering and prioritizing information sources helps manage overload and focus on what's most important."
  },
  {
    id: 47,
    question: "How do you approach delegation?",
    options: [
      "Delegate tasks that others can do better or faster",
      "Delegate only routine or simple tasks",
      "Avoid delegation and do everything myself",
      "Delegate everything possible"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Delegating tasks that others can do better or faster maximizes overall team productivity and efficiency."
  },
  {
    id: 48,
    question: "Your approach to technology and tools is:",
    options: [
      "Use tools that genuinely improve productivity",
      "Try every new tool that comes along",
      "Stick to basic tools I know well",
      "Avoid technology and work manually"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Using tools that genuinely improve productivity provides the best balance of efficiency and simplicity."
  },
  {
    id: 49,
    question: "How do you handle feedback and criticism?",
    options: [
      "Use it to improve and learn",
      "Accept it but don't let it affect me",
      "Ignore feedback that seems unfair",
      "Get defensive and explain my approach"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Using feedback to improve and learn leads to continuous growth and better performance over time."
  },
  {
    id: 50,
    question: "Your strategy for continuous improvement is:",
    options: [
      "Regularly review and refine my processes",
      "Focus on improving only when problems arise",
      "Avoid changing what's working",
      "Constantly experiment with new approaches"
    ],
    correct: 0,
    category: "productivity",
    explanation: "Regularly reviewing and refining processes ensures continuous improvement and sustained productivity gains."
  },

  // Stress & Workload (10 questions)
  {
    id: 51,
    question: "When you feel overwhelmed by your workload, you:",
    options: [
      "Prioritize and focus on the most important tasks",
      "Try to do everything at once",
      "Avoid work until the feeling passes",
      "Ask for help or delegate tasks"
    ],
    correct: 0,
    category: "stress",
    explanation: "Prioritizing and focusing on the most important tasks helps manage overwhelming workloads effectively."
  },
  {
    id: 52,
    question: "Your approach to saying no to additional requests is:",
    options: [
      "Politely decline when my plate is full",
      "Always say yes and figure it out later",
      "Say yes but negotiate deadlines",
      "Avoid saying no to avoid conflict"
    ],
    correct: 0,
    category: "stress",
    explanation: "Politely declining when your plate is full protects your time and prevents overcommitment."
  },
  {
    id: 53,
    question: "How do you handle stress from tight deadlines?",
    options: [
      "Break the work into smaller, manageable parts",
      "Work longer hours to meet the deadline",
      "Ask for deadline extensions",
      "All of these strategies work well"
    ],
    correct: 3,
    category: "stress",
    explanation: "Breaking work down, working longer when necessary, and requesting extensions are all valid stress management strategies."
  },
  {
    id: 54,
    question: "Your strategy for managing work-life balance during busy periods is:",
    options: [
      "Protect personal time and set boundaries",
      "Work longer hours but maintain some personal time",
      "Focus entirely on work until the busy period ends",
      "Let work take over and catch up on personal time later"
    ],
    correct: 0,
    category: "stress",
    explanation: "Protecting personal time and setting boundaries prevents burnout and maintains long-term productivity."
  },
  {
    id: 55,
    question: "How do you handle conflicting demands from different people?",
    options: [
      "Communicate priorities and negotiate solutions",
      "Try to please everyone",
      "Focus on the most senior person's requests",
      "Avoid the conflict and work around it"
    ],
    correct: 0,
    category: "stress",
    explanation: "Communicating priorities and negotiating solutions addresses conflicts directly and professionally."
  },
  {
    id: 56,
    question: "Your approach to handling mistakes or setbacks is:",
    options: [
      "Learn from them and adjust my approach",
      "Focus on fixing them quickly",
      "Avoid dwelling on them",
      "All of these approaches work well"
    ],
    correct: 3,
    category: "stress",
    explanation: "Learning from mistakes, fixing them quickly, and not dwelling on them are all healthy approaches to setbacks."
  },
  {
    id: 57,
    question: "How do you manage energy during long work sessions?",
    options: [
      "Take regular breaks and maintain good habits",
      "Push through fatigue with caffeine",
      "Work until I'm completely exhausted",
      "Switch between different types of tasks"
    ],
    correct: 0,
    category: "stress",
    explanation: "Taking regular breaks and maintaining good habits sustains energy and prevents burnout during long sessions."
  },
  {
    id: 58,
    question: "Your strategy for handling unrealistic expectations is:",
    options: [
      "Communicate concerns and negotiate realistic goals",
      "Try to meet them anyway",
      "Ignore them and work at my own pace",
      "Ask others to handle the unrealistic parts"
    ],
    correct: 0,
    category: "stress",
    explanation: "Communicating concerns and negotiating realistic goals prevents stress and sets achievable expectations."
  },
  {
    id: 59,
    question: "How do you handle interruptions during important work?",
    options: [
      "Set boundaries and schedule time for interruptions",
      "Deal with them immediately",
      "Ignore them until I finish",
      "Work in isolation to avoid them"
    ],
    correct: 0,
    category: "stress",
    explanation: "Setting boundaries and scheduling time for interruptions protects focus while remaining responsive."
  },
  {
    id: 60,
    question: "Your approach to managing stress and pressure is:",
    options: [
      "Use stress management techniques and maintain perspective",
      "Push through and ignore the stress",
      "Avoid stressful situations when possible",
      "Let stress motivate me to work harder"
    ],
    correct: 0,
    category: "stress",
    explanation: "Using stress management techniques and maintaining perspective helps handle pressure effectively and sustainably."
  }
];

export const getRandomTimeManagementQuestions = (count = 20) => {
  const planningQuestions = timeManagementQuestions.filter(q => q.category === 'planning')
  const timeAwarenessQuestions = timeManagementQuestions.filter(q => q.category === 'time-awareness')
  const productivityQuestions = timeManagementQuestions.filter(q => q.category === 'productivity')
  const stressQuestions = timeManagementQuestions.filter(q => q.category === 'stress')
  
  // Balanced selection: 5 planning, 4 time-awareness, 4 productivity, 3 stress, 4 random
  const shuffle = (array: any[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  
  const selectedPlanning = shuffle(planningQuestions).slice(0, 5)
  const selectedTimeAwareness = shuffle(timeAwarenessQuestions).slice(0, 4)
  const selectedProductivity = shuffle(productivityQuestions).slice(0, 4)
  const selectedStress = shuffle(stressQuestions).slice(0, 3)
  
  // Add 4 more random questions from any category
  const remainingQuestions = timeManagementQuestions.filter(q => 
    ![...selectedPlanning, ...selectedTimeAwareness, ...selectedProductivity, ...selectedStress].includes(q)
  )
  const selectedRandom = shuffle(remainingQuestions).slice(0, 4)
  
  const selectedQuestions = shuffle([...selectedPlanning, ...selectedTimeAwareness, ...selectedProductivity, ...selectedStress, ...selectedRandom])
  
  return selectedQuestions.map((question, index) => {
    // Create properly shuffled options array using Fisher-Yates
    const shuffledOptions = [...question.options]
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]]
    }
    
    // Find new index of correct answer
    const newCorrectIndex = shuffledOptions.indexOf(question.options[question.correct])
    
    return {
      ...question,
      id: index + 1, // Reassign IDs for the selected questions
      options: shuffledOptions,
      correct: newCorrectIndex // Update correct answer index to match new position
    }
  })
}

export const calculateTimeManagementScore = (answers: Record<number, number>, questions: any[]) => {
  const totalQuestions = questions.length
  const answeredQuestions = Object.keys(answers).length
  
  // Calculate category scores based on response patterns
  const categoryScores = {
    planning: 0,
    'time-awareness': 0,
    productivity: 0,
    stress: 0
  }
  
  const categoryCounts = {
    planning: 0,
    'time-awareness': 0,
    productivity: 0,
    stress: 0
  }
  
  // Score based on response patterns rather than "correct" answers
  Object.keys(answers).forEach(questionId => {
    const question = questions.find(q => q.id === parseInt(questionId))
    if (question) {
      const userAnswer = answers[parseInt(questionId)]
      const category = question.category as keyof typeof categoryScores
      
      // Score based on response patterns (0-3 scale, where 0 is most structured/planned, 3 is most flexible/spontaneous)
      let score = 0
      if (userAnswer === 0) score = 3 // Most structured/planned approach
      else if (userAnswer === 1) score = 2 // Moderately structured
      else if (userAnswer === 2) score = 1 // Moderately flexible
      else if (userAnswer === 3) score = 0 // Most flexible/spontaneous
      
      categoryScores[category] += score
      categoryCounts[category] += 1
    }
  })
  
  // Calculate average scores per category (0-3 scale)
  const categoryAverages = {
    planning: categoryCounts.planning > 0 ? Math.round((categoryScores.planning / categoryCounts.planning) * 10) / 10 : 0,
    'time-awareness': categoryCounts['time-awareness'] > 0 ? Math.round((categoryScores['time-awareness'] / categoryCounts['time-awareness']) * 10) / 10 : 0,
    productivity: categoryCounts.productivity > 0 ? Math.round((categoryScores.productivity / categoryCounts.productivity) * 10) / 10 : 0,
    stress: categoryCounts.stress > 0 ? Math.round((categoryScores.stress / categoryCounts.stress) * 10) / 10 : 0
  }
  
  // Convert to percentages for display (0-100 scale)
  const categoryPercentages = {
    planning: Math.round((categoryAverages.planning / 3) * 100),
    'time-awareness': Math.round((categoryAverages['time-awareness'] / 3) * 100),
    productivity: Math.round((categoryAverages.productivity / 3) * 100),
    stress: Math.round((categoryAverages.stress / 3) * 100)
  }
  
  // Calculate overall score (average of all categories)
  const overallScore = Math.round(((categoryPercentages.planning + categoryPercentages['time-awareness'] + categoryPercentages.productivity + categoryPercentages.stress) / 4) * 10) / 10
  
  // Determine time management style based on response patterns
  let style = 'Balanced'
  let styleDescription = 'You have a well-rounded approach to time management with strengths across different areas.'
  let keyInsights = ''
  
  if (categoryPercentages.planning >= 70 && categoryPercentages['time-awareness'] >= 70) {
    style = 'Strategic Planner'
    styleDescription = 'You excel at planning and time awareness, creating detailed schedules and managing deadlines effectively.'
    keyInsights = `Your structured approach makes you highly reliable and organized. You thrive in environments that value planning and predictability. Consider delegating some planning tasks to avoid over-optimization, and remember that flexibility can sometimes lead to creative solutions.`
  } else if (categoryPercentages.productivity >= 70 && categoryPercentages.stress >= 70) {
    style = 'Efficient Executor'
    styleDescription = 'You focus on productivity and stress management, getting things done efficiently while maintaining balance.'
    keyInsights = `Your ability to maintain high productivity while managing stress is exceptional. You're likely a natural leader who can handle complex projects. Be mindful not to push others too hard, and consider sharing your stress management techniques with teammates.`
  } else if (categoryPercentages.planning >= 70) {
    style = 'Organized Planner'
    styleDescription = 'You are excellent at planning and organization, creating structured approaches to your work and goals.'
    keyInsights = `Your planning skills are a major strength that helps you stay on track and meet deadlines. You work best with clear objectives and timelines. Consider building in buffer time for unexpected changes, and don't be afraid to adjust plans when new information emerges.`
  } else if (categoryPercentages['time-awareness'] >= 70) {
    style = 'Time-Conscious'
    styleDescription = 'You have strong time awareness and estimation skills, managing deadlines and schedules effectively.'
    keyInsights = `Your time awareness helps you manage expectations and deliver on commitments. You're likely good at helping others understand realistic timelines. Consider using your time estimation skills to mentor colleagues and improve team planning processes.`
  } else if (categoryPercentages.productivity >= 70) {
    style = 'Productivity Focused'
    styleDescription = 'You prioritize productivity and efficiency, optimizing your work habits and environment for maximum output.'
    keyInsights = `Your focus on productivity and efficiency drives results and helps you accomplish more in less time. You likely have valuable insights about workflow optimization. Share your productivity techniques with others, but remember that different people may have different optimal working styles.`
  } else if (categoryPercentages.stress >= 70) {
    style = 'Stress-Resilient'
    styleDescription = 'You handle stress and workload well, maintaining composure and balance even during challenging periods.'
    keyInsights = `Your stress resilience is a valuable asset, especially in high-pressure environments. You're likely someone others turn to during challenging times. Consider taking on mentoring roles and sharing your coping strategies with colleagues who may struggle with stress management.`
  } else if (overallScore <= 30) {
    style = 'Flexible Adaptor'
    styleDescription = 'You prefer a flexible, adaptive approach to time management, adjusting to circumstances as they arise.'
    keyInsights = `Your flexibility allows you to adapt quickly to changing circumstances and find creative solutions. You thrive in dynamic environments where plans frequently change. Consider developing some basic planning skills to help with long-term projects, while maintaining your valuable adaptability.`
  } else {
    keyInsights = `Your balanced approach gives you versatility across different work situations. You can adapt to various team dynamics and project requirements. Consider identifying your strongest areas to develop into signature strengths while maintaining your well-rounded capabilities.`
  }
  
  return {
    overallScore,
    answeredQuestions,
    totalQuestions,
    categoryScores: categoryPercentages,
    style,
    styleDescription,
    keyInsights,
    recommendations: getTimeManagementRecommendations(categoryPercentages, style)
  }
}

const getTimeManagementRecommendations = (categoryScores: any, style: string) => {
  const recommendations = []
  
  if (categoryScores.planning < 70) {
    recommendations.push('Improve your planning skills by creating detailed to-do lists and breaking large projects into smaller tasks.')
  }
  
  if (categoryScores['time-awareness'] < 70) {
    recommendations.push('Work on time estimation by tracking how long tasks actually take and building buffer time into your schedules.')
  }
  
  if (categoryScores.productivity < 70) {
    recommendations.push('Optimize your productivity by eliminating distractions and creating an ideal work environment.')
  }
  
  if (categoryScores.stress < 70) {
    recommendations.push('Develop better stress management techniques and learn to say no to protect your time and energy.')
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Continue refining your time management skills and consider mentoring others who could benefit from your expertise.')
  }
  
  return recommendations
}
