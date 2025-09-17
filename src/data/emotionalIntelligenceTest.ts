export interface EQQuestion {
  id: number;
  question: string;
  options: EQOption[];
  category: 'self-awareness' | 'self-regulation' | 'motivation' | 'empathy' | 'social-skills';
}

export interface EQOption {
  text: string;
  score: number;
  type: 'high' | 'medium' | 'low';
}

export interface EQResult {
  totalScore: number;
  selfAwareness: number;
  selfRegulation: number;
  motivation: number;
  empathy: number;
  socialSkills: number;
  overallLevel: 'Low' | 'Below Average' | 'Average' | 'Above Average' | 'High' | 'Exceptional';
  description: string;
  strengths: string[];
  areasForGrowth: string[];
  insights: string[];
}

export const emotionalIntelligenceQuestions: EQQuestion[] = [
  // Self-Awareness Questions
  {
    id: 1,
    question: "When you're feeling stressed, how do you typically respond?",
    options: [
      { text: "I immediately recognize my stress and take steps to manage it", score: 5, type: 'high' },
      { text: "I usually notice my stress after a while and try to address it", score: 4, type: 'medium' },
      { text: "I sometimes realize I'm stressed but don't always know why", score: 3, type: 'medium' },
      { text: "I often don't realize I'm stressed until someone points it out", score: 2, type: 'low' },
      { text: "I rarely notice when I'm stressed", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },
  {
    id: 2,
    question: "How well do you understand your own emotional triggers?",
    options: [
      { text: "I have a clear understanding of what triggers my emotions", score: 5, type: 'high' },
      { text: "I understand most of my emotional triggers", score: 4, type: 'medium' },
      { text: "I understand some of my emotional triggers", score: 3, type: 'medium' },
      { text: "I have a vague understanding of my emotional triggers", score: 2, type: 'low' },
      { text: "I don't really understand what triggers my emotions", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },
  {
    id: 3,
    question: "When you make a mistake, how do you typically react?",
    options: [
      { text: "I acknowledge the mistake, learn from it, and move forward", score: 5, type: 'high' },
      { text: "I usually accept the mistake and try to do better next time", score: 4, type: 'medium' },
      { text: "I sometimes struggle to accept my mistakes", score: 3, type: 'medium' },
      { text: "I often feel defensive about my mistakes", score: 2, type: 'low' },
      { text: "I tend to blame others or circumstances for my mistakes", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },
  {
    id: 16,
    question: "How aware are you of your emotional state throughout the day?",
    options: [
      { text: "I'm constantly aware of my emotions and how they change", score: 5, type: 'high' },
      { text: "I'm usually aware of my emotional state", score: 4, type: 'medium' },
      { text: "I'm sometimes aware of my emotions", score: 3, type: 'medium' },
      { text: "I'm rarely aware of my emotional state", score: 2, type: 'low' },
      { text: "I hardly ever think about my emotions", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },
  {
    id: 17,
    question: "When you're in a bad mood, how quickly do you recognize it?",
    options: [
      { text: "I recognize it immediately and understand why", score: 5, type: 'high' },
      { text: "I usually notice it within a few minutes", score: 4, type: 'medium' },
      { text: "I sometimes notice it, sometimes don't", score: 3, type: 'medium' },
      { text: "I often don't realize it until someone mentions it", score: 2, type: 'low' },
      { text: "I rarely notice when I'm in a bad mood", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },
  {
    id: 18,
    question: "How well do you understand your strengths and weaknesses?",
    options: [
      { text: "I have a very clear understanding of both my strengths and weaknesses", score: 5, type: 'high' },
      { text: "I understand most of my strengths and weaknesses", score: 4, type: 'medium' },
      { text: "I understand some of my strengths and weaknesses", score: 3, type: 'medium' },
      { text: "I have a vague understanding of my strengths and weaknesses", score: 2, type: 'low' },
      { text: "I don't really understand my strengths and weaknesses", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },
  {
    id: 19,
    question: "When you receive feedback about your behavior, how do you process it?",
    options: [
      { text: "I reflect deeply on it and consider how to improve", score: 5, type: 'high' },
      { text: "I usually think about it and try to learn from it", score: 4, type: 'medium' },
      { text: "I sometimes consider it, sometimes dismiss it", score: 3, type: 'medium' },
      { text: "I often feel defensive and may ignore it", score: 2, type: 'low' },
      { text: "I usually reject feedback about my behavior", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },
  {
    id: 20,
    question: "How well do you know your own values and what's important to you?",
    options: [
      { text: "I have a very clear understanding of my core values", score: 5, type: 'high' },
      { text: "I understand most of my values and priorities", score: 4, type: 'medium' },
      { text: "I understand some of my values", score: 3, type: 'medium' },
      { text: "I have a vague understanding of my values", score: 2, type: 'low' },
      { text: "I don't really know what my core values are", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },
  {
    id: 21,
    question: "When you're feeling overwhelmed, how do you typically respond?",
    options: [
      { text: "I immediately recognize it and take steps to manage it", score: 5, type: 'high' },
      { text: "I usually notice it and try to address it", score: 4, type: 'medium' },
      { text: "I sometimes realize it and try to cope", score: 3, type: 'medium' },
      { text: "I often don't realize it until I'm really struggling", score: 2, type: 'low' },
      { text: "I rarely notice when I'm overwhelmed", score: 1, type: 'low' }
    ],
    category: 'self-awareness'
  },

  // Self-Regulation Questions
  {
    id: 4,
    question: "When someone criticizes you, how do you typically respond?",
    options: [
      { text: "I listen carefully, consider the feedback, and respond thoughtfully", score: 5, type: 'high' },
      { text: "I usually listen to criticism and try to learn from it", score: 4, type: 'medium' },
      { text: "I sometimes get defensive but try to stay calm", score: 3, type: 'medium' },
      { text: "I often feel hurt and may react emotionally", score: 2, type: 'low' },
      { text: "I usually get angry and defensive immediately", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },
  {
    id: 5,
    question: "How do you handle situations when you're feeling angry?",
    options: [
      { text: "I take time to calm down before responding", score: 5, type: 'high' },
      { text: "I usually try to control my anger and respond appropriately", score: 4, type: 'medium' },
      { text: "I sometimes manage my anger well, sometimes not", score: 3, type: 'medium' },
      { text: "I often struggle to control my anger", score: 2, type: 'low' },
      { text: "I usually express my anger immediately", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },
  {
    id: 6,
    question: "When you're under pressure, how do you typically behave?",
    options: [
      { text: "I stay calm and focused, making rational decisions", score: 5, type: 'high' },
      { text: "I usually maintain my composure and think clearly", score: 4, type: 'medium' },
      { text: "I sometimes stay calm, sometimes get overwhelmed", score: 3, type: 'medium' },
      { text: "I often feel stressed and may make poor decisions", score: 2, type: 'low' },
      { text: "I usually panic and struggle to think clearly", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },
  {
    id: 22,
    question: "How do you handle situations when you feel frustrated?",
    options: [
      { text: "I take deep breaths and try to find a solution", score: 5, type: 'high' },
      { text: "I usually try to calm down and think rationally", score: 4, type: 'medium' },
      { text: "I sometimes manage my frustration well", score: 3, type: 'medium' },
      { text: "I often let my frustration affect my behavior", score: 2, type: 'low' },
      { text: "I usually express my frustration immediately", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },
  {
    id: 23,
    question: "When you're tempted to react impulsively, how do you handle it?",
    options: [
      { text: "I always pause and think before acting", score: 5, type: 'high' },
      { text: "I usually stop and consider the consequences", score: 4, type: 'medium' },
      { text: "I sometimes pause, sometimes act impulsively", score: 3, type: 'medium' },
      { text: "I often act on impulse despite knowing I shouldn't", score: 2, type: 'low' },
      { text: "I usually act impulsively without thinking", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },
  {
    id: 24,
    question: "How do you manage your emotions when things don't go as planned?",
    options: [
      { text: "I adapt quickly and maintain a positive attitude", score: 5, type: 'high' },
      { text: "I usually adjust my expectations and move forward", score: 4, type: 'medium' },
      { text: "I sometimes handle changes well, sometimes don't", score: 3, type: 'medium' },
      { text: "I often get upset when plans change", score: 2, type: 'low' },
      { text: "I usually get very frustrated when things don't go as planned", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },
  {
    id: 25,
    question: "When you're feeling anxious, how do you typically respond?",
    options: [
      { text: "I use relaxation techniques and focus on what I can control", score: 5, type: 'high' },
      { text: "I usually try to calm myself down and think positively", score: 4, type: 'medium' },
      { text: "I sometimes manage my anxiety well", score: 3, type: 'medium' },
      { text: "I often let anxiety affect my daily activities", score: 2, type: 'low' },
      { text: "I usually let anxiety overwhelm me", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },
  {
    id: 26,
    question: "How do you handle situations when you're feeling disappointed?",
    options: [
      { text: "I acknowledge the disappointment and look for lessons learned", score: 5, type: 'high' },
      { text: "I usually process the disappointment and move on", score: 4, type: 'medium' },
      { text: "I sometimes handle disappointment well", score: 3, type: 'medium' },
      { text: "I often dwell on disappointment for a long time", score: 2, type: 'low' },
      { text: "I usually let disappointment ruin my mood for days", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },
  {
    id: 27,
    question: "When you're in a conflict, how do you manage your emotions?",
    options: [
      { text: "I stay calm and focus on finding a solution", score: 5, type: 'high' },
      { text: "I usually try to remain composed and listen", score: 4, type: 'medium' },
      { text: "I sometimes stay calm, sometimes get emotional", score: 3, type: 'medium' },
      { text: "I often get defensive and emotional", score: 2, type: 'low' },
      { text: "I usually lose my temper during conflicts", score: 1, type: 'low' }
    ],
    category: 'self-regulation'
  },

  // Motivation Questions
  {
    id: 7,
    question: "What motivates you most in your work or personal projects?",
    options: [
      { text: "Personal growth and making a positive impact", score: 5, type: 'high' },
      { text: "Achieving goals and helping others", score: 4, type: 'medium' },
      { text: "Recognition and personal satisfaction", score: 3, type: 'medium' },
      { text: "External rewards and avoiding failure", score: 2, type: 'low' },
      { text: "Money, status, or other external factors", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },
  {
    id: 8,
    question: "How do you handle setbacks or failures?",
    options: [
      { text: "I see them as learning opportunities and bounce back quickly", score: 5, type: 'high' },
      { text: "I usually learn from them and try again", score: 4, type: 'medium' },
      { text: "I sometimes get discouraged but eventually recover", score: 3, type: 'medium' },
      { text: "I often feel defeated and may give up", score: 2, type: 'low' },
      { text: "I usually give up easily when things get difficult", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },
  {
    id: 9,
    question: "How do you approach challenging tasks?",
    options: [
      { text: "I embrace challenges as opportunities to grow", score: 5, type: 'high' },
      { text: "I usually tackle challenges with determination", score: 4, type: 'medium' },
      { text: "I sometimes enjoy challenges, sometimes avoid them", score: 3, type: 'medium' },
      { text: "I often feel overwhelmed by challenges", score: 2, type: 'low' },
      { text: "I usually avoid challenging tasks", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },
  {
    id: 28,
    question: "How do you maintain your enthusiasm for long-term goals?",
    options: [
      { text: "I stay motivated by focusing on the bigger picture and celebrating small wins", score: 5, type: 'high' },
      { text: "I usually maintain motivation by setting milestones", score: 4, type: 'medium' },
      { text: "I sometimes stay motivated, sometimes lose interest", score: 3, type: 'medium' },
      { text: "I often struggle to maintain enthusiasm over time", score: 2, type: 'low' },
      { text: "I usually lose motivation quickly for long-term goals", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },
  {
    id: 29,
    question: "When you face obstacles, how do you typically respond?",
    options: [
      { text: "I see obstacles as puzzles to solve and opportunities to learn", score: 5, type: 'high' },
      { text: "I usually try to find ways around or through obstacles", score: 4, type: 'medium' },
      { text: "I sometimes persist, sometimes give up", score: 3, type: 'medium' },
      { text: "I often feel discouraged by obstacles", score: 2, type: 'low' },
      { text: "I usually give up when I encounter obstacles", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },
  {
    id: 30,
    question: "How do you stay motivated when working on repetitive tasks?",
    options: [
      { text: "I find ways to make them interesting and focus on improvement", score: 5, type: 'high' },
      { text: "I usually try to stay focused and find meaning in the work", score: 4, type: 'medium' },
      { text: "I sometimes stay motivated, sometimes struggle", score: 3, type: 'medium' },
      { text: "I often find repetitive tasks very boring", score: 2, type: 'low' },
      { text: "I usually lose motivation quickly with repetitive tasks", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },
  {
    id: 31,
    question: "How do you handle situations when you don't feel like doing something?",
    options: [
      { text: "I push through and find ways to make it more engaging", score: 5, type: 'high' },
      { text: "I usually try to motivate myself and get started", score: 4, type: 'medium' },
      { text: "I sometimes push through, sometimes procrastinate", score: 3, type: 'medium' },
      { text: "I often procrastinate when I don't feel like doing something", score: 2, type: 'low' },
      { text: "I usually avoid tasks I don't feel like doing", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },
  {
    id: 32,
    question: "How do you approach learning new skills or knowledge?",
    options: [
      { text: "I'm excited to learn and actively seek out new opportunities", score: 5, type: 'high' },
      { text: "I usually enjoy learning when it's relevant to my goals", score: 4, type: 'medium' },
      { text: "I sometimes enjoy learning, sometimes find it tedious", score: 3, type: 'medium' },
      { text: "I often find learning new things challenging", score: 2, type: 'low' },
      { text: "I usually avoid learning new skills unless necessary", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },
  {
    id: 33,
    question: "How do you maintain your drive when facing criticism or negative feedback?",
    options: [
      { text: "I use it as fuel to improve and prove myself", score: 5, type: 'high' },
      { text: "I usually try to learn from it and stay motivated", score: 4, type: 'medium' },
      { text: "I sometimes use it constructively, sometimes get discouraged", score: 3, type: 'medium' },
      { text: "I often feel demotivated by criticism", score: 2, type: 'low' },
      { text: "I usually lose motivation when criticized", score: 1, type: 'low' }
    ],
    category: 'motivation'
  },

  // Empathy Questions
  {
    id: 10,
    question: "When someone is upset, how do you typically respond?",
    options: [
      { text: "I listen attentively and try to understand their perspective", score: 5, type: 'high' },
      { text: "I usually try to comfort them and offer support", score: 4, type: 'medium' },
      { text: "I sometimes understand their feelings, sometimes don't", score: 3, type: 'medium' },
      { text: "I often don't know how to help them", score: 2, type: 'low' },
      { text: "I usually don't notice when others are upset", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },
  {
    id: 11,
    question: "How well can you read other people's emotions?",
    options: [
      { text: "I can usually tell how others are feeling from their expressions and behavior", score: 5, type: 'high' },
      { text: "I can often read people's emotions accurately", score: 4, type: 'medium' },
      { text: "I sometimes can read emotions, sometimes miss them", score: 3, type: 'medium' },
      { text: "I often miss subtle emotional cues", score: 2, type: 'low' },
      { text: "I usually can't tell how others are feeling", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },
  {
    id: 12,
    question: "When you disagree with someone, how do you handle it?",
    options: [
      { text: "I try to understand their viewpoint and find common ground", score: 5, type: 'high' },
      { text: "I usually listen to their perspective and explain mine respectfully", score: 4, type: 'medium' },
      { text: "I sometimes understand their view, sometimes don't", score: 3, type: 'medium' },
      { text: "I often focus on proving my point", score: 2, type: 'low' },
      { text: "I usually get defensive and don't listen to their view", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },
  {
    id: 34,
    question: "How well can you sense when someone is feeling uncomfortable or awkward?",
    options: [
      { text: "I can almost always tell when someone feels uncomfortable", score: 5, type: 'high' },
      { text: "I can usually sense when someone feels awkward", score: 4, type: 'medium' },
      { text: "I sometimes notice when someone feels uncomfortable", score: 3, type: 'medium' },
      { text: "I often miss signs of discomfort in others", score: 2, type: 'low' },
      { text: "I rarely notice when someone feels uncomfortable", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },
  {
    id: 35,
    question: "When someone shares their problems with you, how do you typically respond?",
    options: [
      { text: "I listen attentively and try to understand their perspective", score: 5, type: 'high' },
      { text: "I usually listen and offer support or advice", score: 4, type: 'medium' },
      { text: "I sometimes listen well, sometimes get distracted", score: 3, type: 'medium' },
      { text: "I often try to fix their problems quickly", score: 2, type: 'low' },
      { text: "I usually don't know how to respond to their problems", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },
  {
    id: 36,
    question: "How do you react when you see someone being treated unfairly?",
    options: [
      { text: "I feel their pain and want to help them", score: 5, type: 'high' },
      { text: "I usually feel bad for them and may offer support", score: 4, type: 'medium' },
      { text: "I sometimes feel bad, sometimes don't notice", score: 3, type: 'medium' },
      { text: "I often don't pay much attention to others' situations", score: 2, type: 'low' },
      { text: "I usually don't notice when others are treated unfairly", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },
  {
    id: 37,
    question: "How well do you understand different cultural perspectives and backgrounds?",
    options: [
      { text: "I actively seek to understand and appreciate different cultures", score: 5, type: 'high' },
      { text: "I usually try to understand different cultural perspectives", score: 4, type: 'medium' },
      { text: "I sometimes understand, sometimes struggle with cultural differences", score: 3, type: 'medium' },
      { text: "I often find it difficult to understand different cultures", score: 2, type: 'low' },
      { text: "I usually don't think much about cultural differences", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },
  {
    id: 38,
    question: "When someone is excited about something, how do you typically respond?",
    options: [
      { text: "I share their excitement and celebrate with them", score: 5, type: 'high' },
      { text: "I usually show interest and ask them about it", score: 4, type: 'medium' },
      { text: "I sometimes share their excitement, sometimes don't", score: 3, type: 'medium' },
      { text: "I often don't get as excited as they are", score: 2, type: 'low' },
      { text: "I usually don't understand why they're so excited", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },
  {
    id: 39,
    question: "How do you handle situations when someone is angry or frustrated?",
    options: [
      { text: "I try to understand their frustration and help them calm down", score: 5, type: 'high' },
      { text: "I usually try to listen and offer support", score: 4, type: 'medium' },
      { text: "I sometimes help, sometimes avoid the situation", score: 3, type: 'medium' },
      { text: "I often feel uncomfortable around angry people", score: 2, type: 'low' },
      { text: "I usually avoid people when they're angry", score: 1, type: 'low' }
    ],
    category: 'empathy'
  },

  // Social Skills Questions
  {
    id: 13,
    question: "How do you handle conflicts with others?",
    options: [
      { text: "I address conflicts directly and work toward resolution", score: 5, type: 'high' },
      { text: "I usually try to resolve conflicts through communication", score: 4, type: 'medium' },
      { text: "I sometimes handle conflicts well, sometimes avoid them", score: 3, type: 'medium' },
      { text: "I often avoid conflicts or let them escalate", score: 2, type: 'low' },
      { text: "I usually avoid conflicts or get into arguments", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  },
  {
    id: 14,
    question: "How do you build relationships with new people?",
    options: [
      { text: "I actively listen, show genuine interest, and find common ground", score: 5, type: 'high' },
      { text: "I usually make an effort to connect and be friendly", score: 4, type: 'medium' },
      { text: "I sometimes connect well with others, sometimes struggle", score: 3, type: 'medium' },
      { text: "I often find it difficult to connect with new people", score: 2, type: 'low' },
      { text: "I usually don't make much effort to build relationships", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  },
  {
    id: 15,
    question: "How do you communicate your needs and boundaries?",
    options: [
      { text: "I communicate clearly and assertively while respecting others", score: 5, type: 'high' },
      { text: "I usually express my needs and boundaries appropriately", score: 4, type: 'medium' },
      { text: "I sometimes communicate well, sometimes struggle", score: 3, type: 'medium' },
      { text: "I often have trouble expressing my needs clearly", score: 2, type: 'low' },
      { text: "I usually don't communicate my needs or boundaries", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  },
  {
    id: 40,
    question: "How do you handle situations when you need to give difficult feedback?",
    options: [
      { text: "I deliver it constructively and with empathy", score: 5, type: 'high' },
      { text: "I usually try to be honest but tactful", score: 4, type: 'medium' },
      { text: "I sometimes handle it well, sometimes avoid it", score: 3, type: 'medium' },
      { text: "I often struggle to give difficult feedback", score: 2, type: 'low' },
      { text: "I usually avoid giving difficult feedback", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  },
  {
    id: 41,
    question: "How do you approach networking or meeting new people professionally?",
    options: [
      { text: "I enjoy meeting new people and building professional relationships", score: 5, type: 'high' },
      { text: "I usually try to make connections and be friendly", score: 4, type: 'medium' },
      { text: "I sometimes enjoy networking, sometimes find it challenging", score: 3, type: 'medium' },
      { text: "I often find professional networking uncomfortable", score: 2, type: 'low' },
      { text: "I usually avoid professional networking events", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  },
  {
    id: 42,
    question: "How do you handle situations when someone is being difficult or uncooperative?",
    options: [
      { text: "I try to understand their perspective and find common ground", score: 5, type: 'high' },
      { text: "I usually try to stay calm and work toward a solution", score: 4, type: 'medium' },
      { text: "I sometimes handle it well, sometimes get frustrated", score: 3, type: 'medium' },
      { text: "I often get frustrated with difficult people", score: 2, type: 'low' },
      { text: "I usually avoid dealing with difficult people", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  },
  {
    id: 43,
    question: "How do you contribute to team dynamics and group discussions?",
    options: [
      { text: "I actively participate and help facilitate productive discussions", score: 5, type: 'high' },
      { text: "I usually contribute meaningfully to team discussions", score: 4, type: 'medium' },
      { text: "I sometimes participate actively, sometimes stay quiet", score: 3, type: 'medium' },
      { text: "I often prefer to listen rather than contribute", score: 2, type: 'low' },
      { text: "I usually avoid participating in group discussions", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  },
  {
    id: 44,
    question: "How do you handle situations when you need to ask for help or support?",
    options: [
      { text: "I ask clearly and appreciate the help I receive", score: 5, type: 'high' },
      { text: "I usually ask for help when I need it", score: 4, type: 'medium' },
      { text: "I sometimes ask for help, sometimes struggle alone", score: 3, type: 'medium' },
      { text: "I often find it difficult to ask for help", score: 2, type: 'low' },
      { text: "I usually avoid asking for help from others", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  },
  {
    id: 45,
    question: "How do you handle situations when you need to say no to someone?",
    options: [
      { text: "I say no respectfully and explain my reasons clearly", score: 5, type: 'high' },
      { text: "I usually say no politely when necessary", score: 4, type: 'medium' },
      { text: "I sometimes say no, sometimes agree reluctantly", score: 3, type: 'medium' },
      { text: "I often have trouble saying no to people", score: 2, type: 'low' },
      { text: "I usually avoid saying no even when I should", score: 1, type: 'low' }
    ],
    category: 'social-skills'
  }
];

// Function to select random questions for the test (3 per category = 15 total)
export const selectRandomEQQuestions = (): EQQuestion[] => {
  const questionsByCategory = {
    'self-awareness': emotionalIntelligenceQuestions.filter(q => q.category === 'self-awareness'),
    'self-regulation': emotionalIntelligenceQuestions.filter(q => q.category === 'self-regulation'),
    'motivation': emotionalIntelligenceQuestions.filter(q => q.category === 'motivation'),
    'empathy': emotionalIntelligenceQuestions.filter(q => q.category === 'empathy'),
    'social-skills': emotionalIntelligenceQuestions.filter(q => q.category === 'social-skills')
  };

  const selectedQuestions: EQQuestion[] = [];
  
  // Select 3 random questions from each category
  Object.values(questionsByCategory).forEach(categoryQuestions => {
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    selectedQuestions.push(...shuffled.slice(0, 3));
  });

  // Shuffle the final selection to randomize order
  return selectedQuestions.sort(() => Math.random() - 0.5);
};

export const calculateEQResults = (answers: number[]): EQResult => {
  const categoryScores = {
    'self-awareness': 0,
    'self-regulation': 0,
    'motivation': 0,
    'empathy': 0,
    'social-skills': 0
  };

  let totalScore = 0;

  answers.forEach((answerIndex, questionIndex) => {
    const question = emotionalIntelligenceQuestions[questionIndex];
    const selectedOption = question.options[answerIndex];
    const score = selectedOption.score;
    
    categoryScores[question.category] += score;
    totalScore += score;
  });

  // Calculate average scores for each category (now 9 questions per category)
  const categoryAverages = {
    selfAwareness: Math.round(categoryScores['self-awareness'] / 9),
    selfRegulation: Math.round(categoryScores['self-regulation'] / 9),
    motivation: Math.round(categoryScores['motivation'] / 9),
    empathy: Math.round(categoryScores['empathy'] / 9),
    socialSkills: Math.round(categoryScores['social-skills'] / 9)
  };

  // Calculate overall average as the average of the 5 category averages
  const overallAverage = Math.round((categoryAverages.selfAwareness + categoryAverages.selfRegulation + categoryAverages.motivation + categoryAverages.empathy + categoryAverages.socialSkills) / 5);

  // Determine overall level
  let overallLevel: 'Low' | 'Below Average' | 'Average' | 'Above Average' | 'High' | 'Exceptional';
  if (overallAverage >= 4.5) overallLevel = 'Exceptional';
  else if (overallAverage >= 4.0) overallLevel = 'High';
  else if (overallAverage >= 3.5) overallLevel = 'Above Average';
  else if (overallAverage >= 3.0) overallLevel = 'Average';
  else if (overallAverage >= 2.5) overallLevel = 'Below Average';
  else overallLevel = 'Low';

  // Generate description
  const descriptions = {
    'Exceptional': 'You demonstrate exceptional emotional intelligence with outstanding self-awareness, emotional regulation, and social skills. You excel at understanding and managing emotions in yourself and others.',
    'High': 'You have high emotional intelligence with strong abilities in emotional awareness, regulation, and social interaction. You handle emotions well and build positive relationships.',
    'Above Average': 'You have above-average emotional intelligence with good emotional awareness and social skills. You generally handle emotions and relationships well.',
    'Average': 'You have average emotional intelligence with moderate emotional awareness and social skills. There are opportunities for growth in emotional understanding and management.',
    'Below Average': 'You have below-average emotional intelligence with room for improvement in emotional awareness and social skills. Focus on developing emotional understanding.',
    'Low': 'You have low emotional intelligence with significant opportunities for growth in emotional awareness, regulation, and social skills. Consider developing these areas.'
  };

  // Generate strengths and areas for growth
  const strengths: string[] = [];
  const areasForGrowth: string[] = [];

  Object.entries(categoryAverages).forEach(([category, score]) => {
    const categoryName = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    if (score >= 4) {
      strengths.push(`${categoryName} (${score}/5)`);
    } else if (score <= 2) {
      areasForGrowth.push(`${categoryName} (${score}/5)`);
    }
  });

  // Generate insights
  const insights: string[] = [];
  
  if (overallLevel === 'Exceptional' || overallLevel === 'High') {
    insights.push('Your high emotional intelligence is a valuable asset in both personal and professional relationships.');
    insights.push('You excel at understanding emotions and managing interpersonal dynamics effectively.');
  } else if (overallLevel === 'Above Average' || overallLevel === 'Average') {
    insights.push('You have solid emotional intelligence with good potential for further development.');
    insights.push('Focus on your stronger areas while working to improve weaker emotional skills.');
  } else {
    insights.push('There are significant opportunities to develop your emotional intelligence skills.');
    insights.push('Consider focusing on self-awareness and empathy as starting points for improvement.');
  }

  if (categoryAverages.empathy >= 4) {
    insights.push('Your strong empathy skills help you connect deeply with others and understand their perspectives.');
  }
  if (categoryAverages.selfRegulation >= 4) {
    insights.push('Your excellent self-regulation helps you maintain composure and make thoughtful decisions.');
  }
  if (categoryAverages.socialSkills >= 4) {
    insights.push('Your strong social skills enable you to build meaningful relationships and navigate social situations effectively.');
  }

  return {
    totalScore: overallAverage,
    selfAwareness: categoryAverages.selfAwareness,
    selfRegulation: categoryAverages.selfRegulation,
    motivation: categoryAverages.motivation,
    empathy: categoryAverages.empathy,
    socialSkills: categoryAverages.socialSkills,
    overallLevel,
    description: descriptions[overallLevel],
    strengths,
    areasForGrowth,
    insights
  };
};
