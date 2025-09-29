export interface Question {
  id: number
  question: string
  options: Array<{
    text: string
    weight: number // 0-100 points based on effectiveness
  }>
  category: string
  explanation?: string
}

export const decisionMakingQuestions: Question[] = [
  // Category 1: Workplace Leadership (15 questions)
  {
    id: 1,
    question: "Your team is consistently missing deadlines. The project manager blames your department. What do you do?",
    options: [
      { text: "Defend your team publicly and blame external factors", weight: 30 },
      { text: "Schedule a private meeting to discuss the real issues and create an action plan", weight: 95 },
      { text: "Accept the blame and promise to work harder without investigating", weight: 60 },
      { text: "Complain to upper management about the project manager", weight: 75 }
    ],
    category: "Workplace Leadership",
    explanation: "Addressing issues privately allows for honest discussion and collaborative problem-solving."
  },
  {
    id: 2,
    question: "An employee reports that a colleague has been making inappropriate comments. What's your first step?",
    options: [
      { text: "Dismiss the complaint as likely exaggerated", weight: 30 },
      { text: "Thank them for reporting and start a formal investigation immediately", weight: 95 },
      { text: "Tell them to handle it themselves", weight: 60 },
      { text: "Wait to see if more complaints come in", weight: 75 }
    ],
    category: "Workplace Leadership",
    explanation: "Taking harassment complaints seriously and investigating promptly protects all employees."
  },
  {
    id: 3,
    question: "Your best performer asks for a promotion, but you only have budget for one promotion and two people are qualified. What do you do?",
    options: [
      { text: "Give it to your best performer without considering others", weight: 75 },
      { text: "Explain the situation and create a fair evaluation process with clear criteria", weight: 95 },
      { text: "Delay the decision indefinitely", weight: 30 },
      { text: "Give it to whoever asks first", weight: 60 }
    ],
    category: "Workplace Leadership",
    explanation: "Fair processes build trust and ensure the best person gets the role based on merit."
  },
  {
    id: 4,
    question: "A project is going over budget. The client wants additional features. What do you do?",
    options: [
      { text: "Agree to everything to keep the client happy", weight: 60 },
      { text: "Present the budget impact and negotiate scope or timeline", weight: 95 },
      { text: "Hide the budget issues and hope for the best", weight: 30 },
      { text: "Blame the client for changing requirements", weight: 75 }
    ],
    category: "Workplace Leadership",
    explanation: "Transparent communication about constraints leads to better solutions and stronger relationships."
  },
  {
    id: 5,
    question: "Two team members are in constant conflict, affecting team productivity. How do you handle it?",
    options: [
      { text: "Ignore it and hope it resolves itself", weight: 30 },
      { text: "Mediate a conversation between them to address the root cause", weight: 95 },
      { text: "Transfer one of them to another team immediately", weight: 75 },
      { text: "Take sides and support one over the other", weight: 60 }
    ],
    category: "Workplace Leadership",
    explanation: "Mediation helps resolve conflicts constructively while maintaining team cohesion."
  },
  {
    id: 6,
    question: "You need to lay off 20% of your team due to budget cuts. How do you approach this?",
    options: [
      { text: "Make decisions based only on seniority", weight: 60 },
      { text: "Use objective criteria and provide support resources for affected employees", weight: 95 },
      { text: "Let each manager decide without guidelines", weight: 75 },
      { text: "Keep it secret until the last minute", weight: 30 },
    ],
    category: "Workplace Leadership",
    explanation: "Fair criteria and support show respect for employees during difficult transitions."
  },
  {
    id: 7,
    question: "An employee consistently arrives 15 minutes late. What's your approach?",
    options: [
      { text: "Write them up immediately", weight: 60 },
      { text: "Have a private conversation to understand the situation and find solutions", weight: 95 },
      { text: "Publicly shame them in a team meeting", weight: 30 },
      { text: "Ignore it completely", weight: 75 },
    ],
    category: "Workplace Leadership",
    explanation: "Understanding the root cause before taking action leads to better outcomes for everyone."
  },
  {
    id: 8,
    question: "Your team is resistant to a new process you need to implement. What do you do?",
    options: [
      { text: "Force compliance with threats", weight: 30 },
      { text: "Explain the benefits, listen to concerns, and involve them in the implementation", weight: 95 },
      { text: "Implement it secretly", weight: 60 },
      { text: "Give up on the new process", weight: 75 },
    ],
    category: "Workplace Leadership",
    explanation: "Involving people in change increases buy-in and successful implementation."
  },
  {
    id: 9,
    question: "A high-performing employee wants to work remotely full-time, but company policy limits it. What do you do?",
    options: [
      { text: "Flatly refuse without discussion", weight: 30 },
      { text: "Explore options like a trial period or policy exceptions based on performance", weight: 95 },
      { text: "Make them choose between the job and remote work", weight: 60 },
      { text: "Ignore the request", weight: 75 },
    ],
    category: "Workplace Leadership",
    explanation: "Finding creative solutions for valuable employees shows flexibility and retains talent."
  },
  {
    id: 10,
    question: "You discover a team member has been taking credit for another's work. How do you handle it?",
    options: [
      { text: "Publicly confront them in a team meeting", weight: 30 },
      { text: "Address it privately with both parties and establish clear attribution practices", weight: 95 },
      { text: "Ignore it to avoid drama", weight: 60 },
      { text: "Promote the person taking credit", weight: 75 },
    ],
    category: "Workplace Leadership",
    explanation: "Private resolution protects reputations while ensuring fair recognition going forward."
  },
  {
    id: 11,
    question: "Your team is struggling with a new software system. Training budget is limited. What do you do?",
    options: [
      { text: "Force them to figure it out on their own", weight: 60 },
      { text: "Identify internal experts, create peer training, and prioritize essential skills", weight: 95 },
      { text: "Blame the software vendor", weight: 30 },
      { text: "Give up on the new system", weight: 75 },
    ],
    category: "Workplace Leadership",
    explanation: "Creative solutions within constraints show resourcefulness and support for your team."
  },
  {
    id: 12,
    question: "An employee requests a salary increase but budget doesn't allow it. What's your response?",
    options: [
      { text: "Tell them they should be grateful to have a job", weight: 30 },
      { text: "Discuss alternative benefits, development opportunities, and future salary review timeline", weight: 95 },
      { text: "Promise an increase you can't deliver", weight: 75 },
      { text: "Ignore the request", weight: 60 },
    ],
    category: "Workplace Leadership",
    explanation: "Transparent communication about constraints while exploring alternatives shows respect."
  },
  {
    id: 13,
    question: "Two departments are competing for the same resources. How do you resolve this?",
    options: [
      { text: "Give resources to the department that complains loudest", weight: 60 },
      { text: "Facilitate a discussion to understand needs and find collaborative solutions", weight: 95 },
      { text: "Make a unilateral decision without input", weight: 30 },
      { text: "Avoid making any decision", weight: 75 },
    ],
    category: "Workplace Leadership",
    explanation: "Collaborative problem-solving creates better outcomes and stronger interdepartmental relationships."
  },
  {
    id: 14,
    question: "A team member consistently misses meetings but delivers good work. How do you address this?",
    options: [
      { text: "Fire them for not following protocol", weight: 75 },
      { text: "Discuss the importance of team communication and find a compromise", weight: 95 },
      { text: "Change all meeting times to accommodate them", weight: 30 },
      { text: "Ignore the pattern", weight: 60 },
    ],
    category: "Workplace Leadership",
    explanation: "Balancing individual needs with team requirements shows thoughtful leadership."
  },
  {
    id: 15,
    question: "You need to give difficult feedback to a sensitive employee. What's your approach?",
    options: [
      { text: "Give feedback publicly to make an example", weight: 30 },
      { text: "Schedule a private meeting, focus on specific behaviors, and offer support", weight: 95 },
      { text: "Avoid giving feedback to prevent upsetting them", weight: 60 },
      { text: "Give feedback through email to avoid confrontation", weight: 75 },
    ],
    category: "Workplace Leadership",
    explanation: "Private, specific, and supportive feedback helps people improve while maintaining dignity."
  },

  // Category 2: Personal Life Decisions (15 questions)
  {
    id: 16,
    question: "You receive two job offers: one with higher pay but longer hours, another with better work-life balance but lower salary. What do you prioritize?",
    options: [
      { text: "Always choose the higher salary", weight: 60 },
      { text: "Evaluate your current life stage, values, and long-term goals", weight: 95 },
      { text: "Choose based on which company has a better name", weight: 75 },
      { text: "Flip a coin to decide", weight: 30 },
    ],
    category: "Personal Life Decisions",
    explanation: "Career decisions should align with your values, life stage, and long-term objectives."
  },
  {
    id: 17,
    question: "A friend asks to borrow a significant amount of money. You can afford it but it would impact your savings goals. What do you do?",
    options: [
      { text: "Lend the full amount immediately", weight: 30 },
      { text: "Discuss their situation, set clear terms, and decide based on your relationship and their plan", weight: 95 },
      { text: "Refuse without explanation", weight: 75 },
      { text: "Lend it but secretly resent them", weight: 60 },
    ],
    category: "Personal Life Decisions",
    explanation: "Transparent communication about financial boundaries protects relationships and your own goals."
  },
  {
    id: 18,
    question: "You're considering buying a house, but the market is volatile and interest rates are rising. What's your approach?",
    options: [
      { text: "Buy immediately before prices rise further", weight: 75 },
      { text: "Analyze your financial stability, market trends, and long-term plans before deciding", weight: 95 },
      { text: "Wait indefinitely until conditions are perfect", weight: 60 },
      { text: "Buy the most expensive house you can qualify for", weight: 30 },
    ],
    category: "Personal Life Decisions",
    explanation: "Major financial decisions require careful analysis of multiple factors and personal circumstances."
  },
  {
    id: 19,
    question: "A family member is pressuring you to attend an event, but you have an important work deadline. How do you handle this?",
    options: [
      { text: "Always prioritize family over work", weight: 75 },
      { text: "Explain your situation, explore compromises, and make a decision based on priorities", weight: 95 },
      { text: "Lie about being sick to avoid the event", weight: 30 },
      { text: "Attend but secretly resent the work pressure", weight: 60 },
    ],
    category: "Personal Life Decisions",
    explanation: "Honest communication and compromise help balance competing priorities respectfully."
  },
  {
    id: 20,
    question: "You're offered an opportunity to relocate for a dream job, but it means leaving aging parents. What factors do you consider?",
    options: [
      { text: "Take the job immediately without considering family", weight: 75 },
      { text: "Discuss with family, explore support options, and evaluate long-term implications", weight: 95 },
      { text: "Reject the job without discussion", weight: 30 },
      { text: "Make the decision based only on salary", weight: 60 },
    ],
    category: "Personal Life Decisions",
    explanation: "Major life decisions benefit from considering multiple stakeholders and long-term impacts."
  },
  {
    id: 21,
    question: "You want to start a business, but it requires using your retirement savings. How do you evaluate this decision?",
    options: [
      { text: "Use all retirement savings for the business", weight: 60 },
      { text: "Assess risk tolerance, create a detailed business plan, and consider partial funding options", weight: 95 },
      { text: "Give up on the business idea completely", weight: 30 },
      { text: "Start the business without any planning", weight: 75 },
    ],
    category: "Personal Life Decisions",
    explanation: "Entrepreneurial decisions require careful risk assessment and thorough planning."
  },
  {
    id: 22,
    question: "You're in a relationship that's comfortable but not exciting. A new person shows interest. What do you do?",
    options: [
      { text: "Immediately pursue the new relationship", weight: 75 },
      { text: "Reflect on your current relationship, communicate with your partner, and make an honest decision", weight: 95 },
      { text: "Stay in the current relationship without addressing issues", weight: 60 },
      { text: "Keep both relationships secret", weight: 30 },
    ],
    category: "Personal Life Decisions",
    explanation: "Relationship decisions require honest self-reflection and transparent communication."
  },
  {
    id: 23,
    question: "You want to change careers but are worried about starting over financially. What's your approach?",
    options: [
      { text: "Quit your job immediately to pursue the new career", weight: 60 },
      { text: "Research the transition, build skills gradually, and create a financial safety net", weight: 95 },
      { text: "Stay in your current career forever", weight: 30 },
      { text: "Change careers without any preparation", weight: 75 },
    ],
    category: "Personal Life Decisions",
    explanation: "Career transitions benefit from careful planning and gradual implementation."
  },
  {
    id: 24,
    question: "You're invited to an expensive destination wedding that would strain your budget. How do you decide?",
    options: [
      { text: "Attend regardless of financial impact", weight: 75 },
      { text: "Evaluate your relationship with the couple, explore cost-saving options, and set a budget limit", weight: 95 },
      { text: "Refuse without explanation", weight: 60 },
      { text: "Go into debt to attend", weight: 30 },
    ],
    category: "Personal Life Decisions",
    explanation: "Social obligations should be balanced with financial responsibility and relationship value."
  },
  {
    id: 25,
    question: "You're considering adopting a pet, but you travel frequently for work. What factors do you weigh?",
    options: [
      { text: "Adopt immediately because you want a pet", weight: 75 },
      { text: "Consider your lifestyle, research pet care options, and evaluate if you can provide proper care", weight: 95 },
      { text: "Never adopt a pet due to travel", weight: 30 },
      { text: "Adopt multiple pets at once", weight: 60 },
    ],
    category: "Personal Life Decisions",
    explanation: "Pet ownership decisions should prioritize the animal's welfare and your ability to provide care."
  },
  {
    id: 26,
    question: "A family member asks you to co-sign a loan, but you're concerned about their financial responsibility. What do you do?",
    options: [
      { text: "Co-sign immediately to help family", weight: 60 },
      { text: "Discuss their financial situation, understand the loan terms, and set clear expectations", weight: 95 },
      { text: "Refuse without explanation", weight: 75 },
      { text: "Co-sign but don't ask questions", weight: 30 },
    ],
    category: "Personal Life Decisions",
    explanation: "Financial commitments require understanding risks and setting clear boundaries."
  },
  {
    id: 27,
    question: "You're offered a promotion that requires moving to a different city. Your partner has a great job locally. How do you decide?",
    options: [
      { text: "Take the promotion without discussion", weight: 60 },
      { text: "Discuss with your partner, explore options for both careers, and make a joint decision", weight: 95 },
      { text: "Reject the promotion immediately", weight: 30 },
      { text: "Take the promotion and expect your partner to follow", weight: 60 },
    ],
    category: "Personal Life Decisions",
    explanation: "Major life decisions in relationships require mutual consideration and collaboration."
  },
  {
    id: 28,
    question: "You're considering going back to school for an advanced degree, but it would require significant time and money. What's your process?",
    options: [
      { text: "Enroll immediately in the most prestigious program", weight: 60 },
      { text: "Research career benefits, evaluate ROI, and consider part-time or online options", weight: 95 },
      { text: "Give up on further education", weight: 75 },
      { text: "Choose the cheapest program without considering quality", weight: 30 },
    ],
    category: "Personal Life Decisions",
    explanation: "Educational investments require careful analysis of costs, benefits, and alternatives."
  },
  {
    id: 29,
    question: "You're invited to invest in a friend's business venture. You believe in the idea but have limited investment experience. What do you do?",
    options: [
      { text: "Invest your entire savings in the venture", weight: 75 },
      { text: "Research the opportunity, understand the risks, and invest only what you can afford to lose", weight: 95 },
      { text: "Refuse all investment opportunities", weight: 30 },
      { text: "Invest without asking any questions", weight: 60 },
    ],
    category: "Personal Life Decisions",
    explanation: "Investment decisions should be based on thorough research and risk assessment."
  },
  {
    id: 30,
    question: "You're considering having children, but you're concerned about financial stability and career impact. How do you approach this decision?",
    options: [
      { text: "Have children immediately without planning", weight: 30 },
      { text: "Discuss with your partner, evaluate your situation, and create a plan for both financial and career considerations", weight: 95 },
      { text: "Never have children due to concerns", weight: 75 },
      { text: "Have children and figure it out later", weight: 60 },
    ],
    category: "Personal Life Decisions",
    explanation: "Major life decisions like having children benefit from thoughtful planning and mutual agreement."
  },

  // Category 3: Ethical Dilemmas (15 questions)
  {
    id: 31,
    question: "You discover your company is dumping toxic waste illegally. You're the only witness. What do you do?",
    options: [
      { text: "Ignore it to keep your job", weight: 75 },
      { text: "Document the evidence and report it through proper channels", weight: 95 },
      { text: "Blackmail the company for money", weight: 60 },
      { text: "Only tell your close friends", weight: 30 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Environmental violations require reporting through proper channels to protect public safety."
  },
  {
    id: 32,
    question: "A friend confides they're cheating on their partner, who is also your friend. What's your approach?",
    options: [
      { text: "Immediately tell the partner being cheated on", weight: 75 },
      { text: "Encourage your friend to be honest with their partner directly", weight: 95 },
      { text: "Keep the secret to maintain both friendships", weight: 30 },
      { text: "Spread the information to other friends", weight: 60 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Encouraging honesty while not betraying confidence helps maintain integrity in relationships."
  },
  {
    id: 33,
    question: "You find a wallet with $500 cash and an ID. The person lives far away. What do you do?",
    options: [
      { text: "Keep the money and throw away the wallet", weight: 75 },
      { text: "Contact the person and arrange to return the wallet with all contents", weight: 95 },
      { text: "Donate the money to charity and keep the wallet", weight: 30 },
      { text: "Split the money with friends", weight: 60 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Returning lost property demonstrates integrity and respect for others' belongings."
  },
  {
    id: 34,
    question: "Your boss asks you to lie to a client about project delays. What's your response?",
    options: [
      { text: "Lie as requested to keep your job", weight: 60 },
      { text: "Suggest an honest approach that addresses the client's concerns", weight: 95 },
      { text: "Lie but feel guilty about it", weight: 75 },
      { text: "Quit your job immediately", weight: 30 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Finding honest alternatives maintains integrity while addressing business concerns."
  },
  {
    id: 35,
    question: "You witness a colleague taking office supplies home regularly. What do you do?",
    options: [
      { text: "Join them in taking supplies", weight: 60 },
      { text: "Have a private conversation about the policy and suggest they stop", weight: 95 },
      { text: "Report them immediately to management", weight: 30 },
      { text: "Ignore it completely", weight: 75 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Addressing minor violations privately first allows for correction without escalation."
  },
  {
    id: 36,
    question: "You're offered a bribe to approve a substandard product. What's your decision?",
    options: [
      { text: "Accept the bribe and approve the product", weight: 60 },
      { text: "Refuse the bribe and report the attempt to appropriate authorities", weight: 95 },
      { text: "Accept the bribe but reject the product", weight: 30 },
      { text: "Negotiate for a higher bribe", weight: 75 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Bribery compromises integrity and safety; reporting protects others and maintains standards."
  },
  {
    id: 37,
    question: "A friend asks you to write a fake reference letter for them. They're struggling to find work. What do you do?",
    options: [
      { text: "Write the fake reference immediately", weight: 60 },
      { text: "Offer to help them improve their qualifications or find legitimate references", weight: 95 },
      { text: "Write a vague reference that doesn't lie but isn't helpful", weight: 75 },
      { text: "Refuse without offering alternatives", weight: 30 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Helping someone improve legitimately maintains integrity while providing real assistance."
  },
  {
    id: 38,
    question: "You discover your company's product has a safety flaw, but fixing it would delay a major launch. What do you do?",
    options: [
      { text: "Hide the flaw to meet the launch deadline", weight: 30 },
      { text: "Report the flaw immediately and insist on proper testing and fixes", weight: 95 },
      { text: "Only mention it to your immediate supervisor", weight: 75 },
      { text: "Ignore the flaw and hope for the best", weight: 60 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Safety issues must be addressed regardless of business pressures to protect consumers."
  },
  {
    id: 39,
    question: "You're asked to fire someone you know is innocent of the accusations against them. What's your approach?",
    options: [
      { text: "Fire them as requested to keep your job", weight: 30 },
      { text: "Investigate thoroughly, present evidence of their innocence, and refuse to fire them", weight: 95 },
      { text: "Fire them but secretly help them find another job", weight: 60 },
      { text: "Quit your job to avoid the situation", weight: 75 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Standing up for innocent people demonstrates courage and integrity in leadership."
  },
  {
    id: 40,
    question: "You accidentally damage someone's property and no one witnesses it. What do you do?",
    options: [
      { text: "Leave immediately without saying anything", weight: 60 },
      { text: "Leave a note with your contact information and offer to pay for repairs", weight: 95 },
      { text: "Only pay if they find you", weight: 75 },
      { text: "Blame someone else if questioned", weight: 30 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Taking responsibility for accidents demonstrates honesty and respect for others' property."
  },
  {
    id: 41,
    question: "You're offered insider information about a stock that would guarantee profit. What's your decision?",
    options: [
      { text: "Use the information to make profitable trades", weight: 75 },
      { text: "Refuse to use insider information as it's illegal and unfair", weight: 95 },
      { text: "Share the information with friends", weight: 30 },
      { text: "Use the information but only for small amounts", weight: 30 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Insider trading is illegal and unethical; refusing maintains integrity and legal compliance."
  },
  {
    id: 42,
    question: "A colleague asks you to cover for them while they attend a personal matter during work hours. What do you do?",
    options: [
      { text: "Always cover without asking questions", weight: 30 },
      { text: "Understand the situation and help if it's reasonable and doesn't compromise work", weight: 95 },
      { text: "Never cover for anyone", weight: 75 },
      { text: "Report them to management immediately", weight: 60 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Balancing compassion with professional responsibility shows thoughtful judgment."
  },
  {
    id: 43,
    question: "You witness a crime but reporting it would put you in danger. What's your approach?",
    options: [
      { text: "Report it immediately regardless of personal risk", weight: 75 },
      { text: "Report it anonymously through safe channels if possible", weight: 95 },
      { text: "Ignore it completely to avoid danger", weight: 60 },
      { text: "Only report if you can get a reward", weight: 30 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Anonymous reporting balances civic duty with personal safety considerations."
  },
  {
    id: 44,
    question: "You're asked to participate in a charity event that you know is a scam. What do you do?",
    options: [
      { text: "Participate to avoid confrontation", weight: 30 },
      { text: "Refuse to participate and report the scam to appropriate authorities", weight: 95 },
      { text: "Participate but warn others privately", weight: 60 },
      { text: "Participate and keep the money for yourself", weight: 60 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Refusing to participate in scams and reporting them protects others from fraud."
  },
  {
    id: 45,
    question: "You discover your child cheated on a test. What's your response?",
    options: [
      { text: "Punish them severely without discussion", weight: 75 },
      { text: "Discuss the importance of honesty, understand why they cheated, and help them improve", weight: 95 },
      { text: "Ignore it because they got a good grade", weight: 60 },
      { text: "Help them cheat better next time", weight: 30 },
    ],
    category: "Ethical Dilemmas",
    explanation: "Teaching honesty while understanding underlying issues helps children develop integrity."
  },

  // Category 4: Crisis Management (15 questions)
  {
    id: 46,
    question: "A major system failure occurs during peak business hours. Customers are affected and revenue is being lost. What's your first priority?",
    options: [
      { text: "Blame the IT department publicly", weight: 60 },
      { text: "Assess the situation, communicate with stakeholders, and implement immediate fixes", weight: 95 },
      { text: "Wait for the IT department to fix it without communication", weight: 30 },
      { text: "Focus on documenting the incident for later", weight: 75 },
    ],
    category: "Crisis Management",
    explanation: "Crisis management requires immediate assessment, communication, and action to minimize damage."
  },
  {
    id: 47,
    question: "A natural disaster has damaged your facility. Operations are severely impacted. What's your immediate response?",
    options: [
      { text: "Focus on insurance claims first", weight: 30 },
      { text: "Ensure employee safety, assess damage, and develop a recovery plan", weight: 95 },
      { text: "Wait for government assistance", weight: 75 },
      { text: "Blame the weather service", weight: 60 },
    ],
    category: "Crisis Management",
    explanation: "Safety first, then assessment and planning ensures effective disaster recovery."
  },
  {
    id: 48,
    question: "A key supplier suddenly goes out of business, leaving you without critical components. What do you do?",
    options: [
      { text: "Panic and shut down operations", weight: 30 },
      { text: "Immediately seek alternative suppliers and communicate with customers about potential delays", weight: 95 },
      { text: "Wait for the supplier to recover", weight: 75 },
      { text: "Blame the supplier publicly", weight: 60 },
    ],
    category: "Crisis Management",
    explanation: "Supply chain disruptions require immediate action to find alternatives and manage customer expectations."
  },
  {
    id: 49,
    question: "A data breach is discovered. Customer information may be compromised. What's your first step?",
    options: [
      { text: "Hide the breach to protect company reputation", weight: 60 },
      { text: "Contain the breach, notify authorities and affected customers, and begin investigation", weight: 95 },
      { text: "Wait to see if anyone notices", weight: 30 },
      { text: "Blame the IT security team", weight: 75 },
    ],
    category: "Crisis Management",
    explanation: "Data breaches require immediate containment, notification, and transparent response to protect stakeholders."
  },
  {
    id: 50,
    question: "A workplace accident occurs. An employee is injured. What's your immediate priority?",
    options: [
      { text: "Focus on preventing lawsuits", weight: 30 },
      { text: "Ensure medical attention, secure the scene, and begin investigation", weight: 95 },
      { text: "Wait for HR to handle everything", weight: 75 },
      { text: "Blame the employee for being careless", weight: 60 },
    ],
    category: "Crisis Management",
    explanation: "Workplace safety incidents require immediate medical attention and proper investigation procedures."
  },
  {
    id: 51,
    question: "A competitor launches a product that makes yours obsolete. What's your response?",
    options: [
      { text: "Give up and close the business", weight: 60 },
      { text: "Analyze the threat, pivot strategy, and focus on competitive advantages", weight: 95 },
      { text: "Copy their product exactly", weight: 75 },
      { text: "File lawsuits against them", weight: 30 },
    ],
    category: "Crisis Management",
    explanation: "Competitive threats require strategic analysis and adaptive responses rather than defensive reactions."
  },
  {
    id: 52,
    question: "A major client threatens to cancel a large contract due to service issues. What do you do?",
    options: [
      { text: "Accept the cancellation without discussion", weight: 30 },
      { text: "Immediately address their concerns, propose solutions, and work to restore the relationship", weight: 95 },
      { text: "Ignore their complaints", weight: 60 },
      { text: "Threaten legal action", weight: 75 },
    ],
    category: "Crisis Management",
    explanation: "Client relationship crises require immediate attention and proactive problem-solving."
  },
  {
    id: 53,
    question: "A regulatory violation is discovered that could result in fines and penalties. What's your approach?",
    options: [
      { text: "Hide the violation and hope it's not discovered", weight: 75 },
      { text: "Report the violation proactively, implement corrective measures, and cooperate with authorities", weight: 95 },
      { text: "Blame previous management", weight: 60 },
      { text: "Ignore it completely", weight: 30 },
    ],
    category: "Crisis Management",
    explanation: "Regulatory issues require proactive reporting and cooperation to minimize penalties and demonstrate compliance commitment."
  },
  {
    id: 54,
    question: "A key employee suddenly quits without notice during a critical project. What do you do?",
    options: [
      { text: "Panic and delay the project indefinitely", weight: 75 },
      { text: "Assess the impact, redistribute responsibilities, and develop a plan to complete the project", weight: 95 },
      { text: "Blame the employee publicly", weight: 60 },
      { text: "Wait for them to come back", weight: 30 },
    ],
    category: "Crisis Management",
    explanation: "Sudden departures require quick assessment and adaptive planning to maintain project continuity."
  },
  {
    id: 55,
    question: "A public relations crisis erupts due to negative social media coverage. What's your response?",
    options: [
      { text: "Ignore social media as it's not important", weight: 60 },
      { text: "Monitor the situation, respond appropriately, and develop a communication strategy", weight: 95 },
      { text: "Delete negative comments", weight: 30 },
      { text: "Sue the people posting negative content", weight: 75 },
    ],
    category: "Crisis Management",
    explanation: "PR crises require monitoring, appropriate response, and strategic communication management."
  },
  {
    id: 56,
    question: "A financial crisis threatens the company's ability to meet payroll. What's your priority?",
    options: [
      { text: "Hide the financial problems from employees", weight: 75 },
      { text: "Communicate transparently with stakeholders and develop emergency financial solutions", weight: 95 },
      { text: "Lay off employees immediately", weight: 30 },
      { text: "Blame the economy", weight: 60 },
    ],
    category: "Crisis Management",
    explanation: "Financial crises require transparent communication and collaborative problem-solving with stakeholders."
  },
  {
    id: 57,
    question: "A product recall is necessary due to safety concerns. How do you handle the announcement?",
    options: [
      { text: "Recall the product secretly without public notice", weight: 60 },
      { text: "Issue immediate public recall notice with clear safety instructions and customer support", weight: 95 },
      { text: "Wait to see if more problems arise", weight: 75 },
      { text: "Blame the manufacturer", weight: 30 },
    ],
    category: "Crisis Management",
    explanation: "Product recalls require immediate, transparent communication to protect consumer safety and maintain trust."
  },
  {
    id: 58,
    question: "A strike is threatened by employees due to working conditions. What's your approach?",
    options: [
      { text: "Threaten to fire all employees who strike", weight: 75 },
      { text: "Engage in good faith negotiations and address legitimate concerns", weight: 95 },
      { text: "Ignore the threat", weight: 30 },
      { text: "Call in replacement workers immediately", weight: 60 },
    ],
    category: "Crisis Management",
    explanation: "Labor disputes require good faith negotiation and addressing legitimate employee concerns."
  },
  {
    id: 59,
    question: "A major contract is cancelled unexpectedly, representing 30% of your revenue. What do you do?",
    options: [
      { text: "Close the business immediately", weight: 75 },
      { text: "Assess financial impact, diversify revenue sources, and adjust operations accordingly", weight: 95 },
      { text: "Sue the client for breach of contract", weight: 30 },
      { text: "Wait for another contract to replace it", weight: 60 },
    ],
    category: "Crisis Management",
    explanation: "Revenue crises require immediate financial assessment and strategic adjustments to maintain business viability."
  },
  {
    id: 60,
    question: "A cyber attack disrupts operations and demands ransom payment. What's your response?",
    options: [
      { text: "Pay the ransom immediately to restore operations", weight: 60 },
      { text: "Don't pay ransom, restore from backups, and report to authorities", weight: 95 },
      { text: "Ignore the attack and hope it goes away", weight: 30 },
      { text: "Negotiate with the attackers", weight: 75 },
    ],
    category: "Crisis Management",
    explanation: "Ransomware attacks require not paying ransoms, restoring from backups, and proper reporting to authorities."
  },

  // Category 5: Strategic Thinking (15 questions)
  {
    id: 61,
    question: "Your industry is being disrupted by new technology. Your current business model is becoming obsolete. What's your strategic approach?",
    options: [
      { text: "Ignore the disruption and continue as usual", weight: 75 },
      { text: "Analyze the disruption, adapt your business model, and invest in new capabilities", weight: 95 },
      { text: "Sue the companies causing disruption", weight: 60 },
      { text: "Wait for the disruption to pass", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "Industry disruption requires proactive adaptation and strategic transformation to remain competitive."
  },
  {
    id: 62,
    question: "You're considering entering a new market but lack local knowledge and connections. What's your strategy?",
    options: [
      { text: "Enter immediately with your current approach", weight: 60 },
      { text: "Research the market, find local partners, and develop market-specific strategies", weight: 95 },
      { text: "Never enter new markets", weight: 75 },
      { text: "Copy what competitors are doing exactly", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "Market expansion requires thorough research and local adaptation for successful entry."
  },
  {
    id: 63,
    question: "Your company needs to reduce costs by 20% while maintaining quality and morale. What's your approach?",
    options: [
      { text: "Cut salaries across the board", weight: 30 },
      { text: "Analyze operations, identify inefficiencies, and implement process improvements", weight: 95 },
      { text: "Lay off 20% of employees randomly", weight: 60 },
      { text: "Reduce product quality to cut costs", weight: 75 },
    ],
    category: "Strategic Thinking",
    explanation: "Cost reduction requires strategic analysis and operational improvements rather than across-the-board cuts."
  },
  {
    id: 64,
    question: "A new competitor with deep pockets is entering your market with aggressive pricing. How do you respond strategically?",
    options: [
      { text: "Match their prices immediately regardless of profitability", weight: 60 },
      { text: "Analyze your competitive advantages, focus on differentiation, and develop a sustainable strategy", weight: 95 },
      { text: "Exit the market immediately", weight: 75 },
      { text: "Sue them for predatory pricing", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "Competitive threats require strategic analysis of strengths and differentiation rather than reactive price matching."
  },
  {
    id: 65,
    question: "You're considering a merger that would create market dominance but face regulatory scrutiny. What factors do you evaluate?",
    options: [
      { text: "Proceed without considering regulations", weight: 75 },
      { text: "Assess regulatory landscape, prepare compliance strategy, and evaluate long-term benefits vs. risks", weight: 95 },
      { text: "Avoid all mergers due to complexity", weight: 60 },
      { text: "Merge secretly to avoid scrutiny", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "Strategic mergers require comprehensive evaluation of regulatory, financial, and operational factors."
  },
  {
    id: 66,
    question: "Your business is seasonal with 80% of revenue in 3 months. How do you strategically address this challenge?",
    options: [
      { text: "Accept the seasonality without changes", weight: 30 },
      { text: "Diversify offerings, develop off-season revenue streams, and optimize cash flow management", weight: 95 },
      { text: "Close during off-season", weight: 60 },
      { text: "Increase prices dramatically during peak season", weight: 75 },
    ],
    category: "Strategic Thinking",
    explanation: "Seasonal businesses require diversification and strategic planning to ensure year-round sustainability."
  },
  {
    id: 67,
    question: "You need to decide between investing in new technology or expanding current operations. What's your decision framework?",
    options: [
      { text: "Always choose technology investment", weight: 75 },
      { text: "Analyze ROI, market conditions, competitive position, and long-term strategic goals", weight: 95 },
      { text: "Always choose operational expansion", weight: 30 },
      { text: "Flip a coin to decide", weight: 60 },
    ],
    category: "Strategic Thinking",
    explanation: "Strategic investment decisions require comprehensive analysis of multiple factors and long-term objectives."
  },
  {
    id: 68,
    question: "Your company is growing rapidly but struggling with quality control. What's your strategic response?",
    options: [
      { text: "Continue growing without addressing quality issues", weight: 30 },
      { text: "Implement quality systems, invest in training, and balance growth with quality standards", weight: 95 },
      { text: "Stop growing completely", weight: 75 },
      { text: "Lower quality standards to meet demand", weight: 60 },
    ],
    category: "Strategic Thinking",
    explanation: "Growth requires balancing expansion with quality systems to maintain reputation and customer satisfaction."
  },
  {
    id: 69,
    question: "You're considering acquiring a competitor, but integration would be complex and risky. What's your evaluation process?",
    options: [
      { text: "Acquire without due diligence", weight: 60 },
      { text: "Conduct thorough analysis of synergies, integration challenges, and strategic value", weight: 95 },
      { text: "Never consider acquisitions", weight: 75 },
      { text: "Acquire and figure out integration later", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "Acquisitions require comprehensive due diligence and strategic evaluation of integration challenges."
  },
  {
    id: 70,
    question: "Your market is becoming commoditized with price as the only differentiator. What's your strategic response?",
    options: [
      { text: "Compete only on price", weight: 60 },
      { text: "Differentiate through innovation, service, and value-added offerings", weight: 95 },
      { text: "Exit the market", weight: 75 },
      { text: "Form a price-fixing cartel", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "Commoditized markets require strategic differentiation to avoid competing solely on price."
  },
  {
    id: 71,
    question: "You need to choose between short-term profitability and long-term market position. What's your approach?",
    options: [
      { text: "Always prioritize short-term profits", weight: 75 },
      { text: "Balance short-term needs with long-term strategic investments based on company stage and goals", weight: 95 },
      { text: "Always prioritize long-term position", weight: 30 },
      { text: "Make decisions randomly", weight: 60 },
    ],
    category: "Strategic Thinking",
    explanation: "Strategic leadership requires balancing short-term and long-term considerations based on company context."
  },
  {
    id: 72,
    question: "Your industry is consolidating with larger players acquiring smaller companies. What's your strategic position?",
    options: [
      { text: "Ignore consolidation trends", weight: 60 },
      { text: "Evaluate whether to be an acquirer, target, or remain independent based on strategic fit", weight: 95 },
      { text: "Immediately sell to the largest company", weight: 75 },
      { text: "Fight consolidation through legal means", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "Industry consolidation requires strategic evaluation of positioning options and value creation opportunities."
  },
  {
    id: 73,
    question: "You're considering vertical integration to control your supply chain. What factors do you analyze?",
    options: [
      { text: "Integrate immediately without analysis", weight: 75 },
      { text: "Evaluate costs, capabilities, market power, and strategic benefits vs. focus trade-offs", weight: 95 },
      { text: "Never consider vertical integration", weight: 30 },
      { text: "Integrate only the most profitable parts", weight: 60 },
    ],
    category: "Strategic Thinking",
    explanation: "Vertical integration requires comprehensive analysis of strategic benefits, costs, and capability requirements."
  },
  {
    id: 74,
    question: "Your company has excess cash but limited growth opportunities in current markets. What's your strategic approach?",
    options: [
      { text: "Distribute all cash to shareholders immediately", weight: 60 },
      { text: "Evaluate new markets, acquisitions, R&D investments, and shareholder returns", weight: 95 },
      { text: "Keep cash idle indefinitely", weight: 75 },
      { text: "Invest in speculative ventures", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "Excess cash requires strategic evaluation of multiple investment and return options."
  },
  {
    id: 75,
    question: "You're facing pressure to go public but prefer maintaining private control. What's your decision framework?",
    options: [
      { text: "Go public immediately for the money", weight: 60 },
      { text: "Evaluate capital needs, growth plans, control preferences, and market conditions", weight: 95 },
      { text: "Never consider going public", weight: 75 },
      { text: "Go public but maintain controlling interest", weight: 30 },
    ],
    category: "Strategic Thinking",
    explanation: "IPO decisions require careful evaluation of capital needs, growth requirements, and control preferences."
  }
]

// Function to get random decision making questions
export const getRandomDecisionMakingQuestions = (): Question[] => {
  const categories = {
    'Workplace Leadership': decisionMakingQuestions.filter(q => q.category === 'Workplace Leadership'),
    'Personal Life Decisions': decisionMakingQuestions.filter(q => q.category === 'Personal Life Decisions'),
    'Ethical Dilemmas': decisionMakingQuestions.filter(q => q.category === 'Ethical Dilemmas'),
    'Crisis Management': decisionMakingQuestions.filter(q => q.category === 'Crisis Management'),
    'Strategic Thinking': decisionMakingQuestions.filter(q => q.category === 'Strategic Thinking')
  }
  
  const selectedQuestions: Question[] = []
  
  // Get 3 questions from each category (15 total)
  Object.entries(categories).forEach(([, questions]) => {
    const shuffled = [...questions]
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    // Take first 3 questions from this category
    selectedQuestions.push(...shuffled.slice(0, 3))
  })
  
  // Final shuffle of all selected questions
  for (let i = selectedQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[selectedQuestions[i], selectedQuestions[j]] = [selectedQuestions[j], selectedQuestions[i]]
  }
  
  // Reassign IDs to be sequential
  return selectedQuestions.map((question, index) => ({
    ...question,
    id: index + 1
  }))
}

// Function to calculate decision making score
export function calculateDecisionMakingScore(
  answers: { [questionId: number]: number },
  questions: Question[],
  answerTimes: { [questionId: number]: number }
): {
  accuracy: number
  speedFeedback: string
  correctAnswers: number
  totalQuestions: number
  totalPoints: number
  maxPossiblePoints: number
  categoryScores: { [category: string]: number }
  level: string
  description: string
} {
  let totalPoints = 0
  let speedPoints = 0
  let maxPossiblePoints = questions.length * 100 // 100 points per question max
  
  // Calculate category scores
  const categoryScores: { [category: string]: number } = {}
  const categoryMaxPoints: { [category: string]: number } = {}
  
  questions.forEach(question => {
    if (!categoryScores[question.category]) {
      categoryScores[question.category] = 0
      categoryMaxPoints[question.category] = 0
    }
    
    categoryMaxPoints[question.category] += 100 // Max 100 points per question
    
    const userAnswer = answers[question.id]
    if (userAnswer !== undefined && question.options[userAnswer]) {
      const basePoints = question.options[userAnswer].weight
      totalPoints += basePoints
      
      // Speed penalty based on response time
      let speedMultiplier = 1.0
      if (answerTimes[question.id] < 10) {
        speedMultiplier = 1.0  // No penalty - Lightning Fast
      } else if (answerTimes[question.id] < 20) {
        speedMultiplier = 0.9  // 10% penalty - Quick
      } else {
        speedMultiplier = 0.8  // 20% penalty - Slow
      }
      speedPoints += basePoints * speedMultiplier
      
      categoryScores[question.category] += basePoints
    }
  })
  
  const accuracy = maxPossiblePoints > 0 ? (totalPoints / maxPossiblePoints) * 100 : 0
  const speedAccuracy = maxPossiblePoints > 0 ? (speedPoints / maxPossiblePoints) * 100 : 0
  
  let level = ''
  let description = ''
  let speedFeedback = ''
  
  if (accuracy >= 90) {
    level = 'Decision Expert'
    description = 'Exceptional decision-making skills with consistently excellent choices'
    speedFeedback = speedAccuracy >= 90 ? 'Lightning Fast Decision Maker' : speedAccuracy >= 80 ? 'Quick Decision Maker' : 'Thoughtful Decision Maker'
  } else if (accuracy >= 75) {
    level = 'Strong Decision Maker'
    description = 'Good decision-making abilities with mostly effective choices'
    speedFeedback = speedAccuracy >= 75 ? 'Quick Decision Maker' : speedAccuracy >= 65 ? 'Steady Decision Maker' : 'Careful Decision Maker'
  } else if (accuracy >= 60) {
    level = 'Developing Decision Maker'
    description = 'Adequate decision-making skills with room for improvement'
    speedFeedback = speedAccuracy >= 60 ? 'Steady Decision Maker' : speedAccuracy >= 50 ? 'Careful Decision Maker' : 'Methodical Decision Maker'
  } else if (accuracy >= 45) {
    level = 'Learning Decision Maker'
    description = 'Basic decision-making skills that need significant development'
    speedFeedback = speedAccuracy >= 45 ? 'Careful Decision Maker' : speedAccuracy >= 35 ? 'Methodical Decision Maker' : 'Deliberate Decision Maker'
  } else {
    level = 'Novice Decision Maker'
    description = 'Decision-making skills require substantial improvement'
    speedFeedback = speedAccuracy >= 35 ? 'Methodical Decision Maker' : 'Deliberate Decision Maker'
  }
  
  return {
    accuracy: Math.round(accuracy),
    speedScore: Math.round(speedAccuracy),
    speedFeedback,
    correctAnswers: Math.round(totalPoints / 100), // Approximate correct answers
    totalQuestions: questions.length,
    totalPoints: Math.round(totalPoints),
    maxPossiblePoints,
    categoryScores,
    level,
    description
  }
}
