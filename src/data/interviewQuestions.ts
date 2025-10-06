import { InterviewQuestion } from '../types/tools.types';

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'tell-me-about-yourself',
    question: 'Tell me about yourself.',
    category: 'behavioral',
    difficulty: 'easy',
    common_follow_ups: ['What made you interested in this field?', 'Why are you looking for a new opportunity?'],
    framework: 'general',
    tips: [
      'Keep it professional and relevant to the role',
      'Follow a present-past-future structure',
      'Highlight your unique value proposition',
      'Keep it under 2 minutes'
    ],
    example_answers: [
      'Currently, I\'m a Senior Software Engineer at TechCorp, where I lead a team building cloud-native applications. Previously, I spent 5 years at StartupXYZ developing scalable microservices. I\'m excited about this opportunity because it aligns with my passion for distributed systems and offers the chance to work on cutting-edge technology.'
    ]
  },
  {
    id: 'greatest-weakness',
    question: 'What is your greatest weakness?',
    category: 'behavioral',
    difficulty: 'medium',
    common_follow_ups: ['How are you working to improve this?', 'Has this ever caused problems at work?'],
    framework: 'CAR',
    tips: [
      'Choose a real weakness, not a strength in disguise',
      'Show self-awareness',
      'Demonstrate active improvement',
      'Keep it professional, not personal'
    ],
    example_answers: [
      'I tend to be overly detail-oriented, which sometimes slows down my initial work pace. I\'ve learned to balance this by setting time limits for tasks and focusing on MVP first, then iterating for perfection.'
    ]
  },
  {
    id: 'conflict-resolution',
    question: 'Tell me about a time you had a conflict with a coworker.',
    category: 'behavioral',
    difficulty: 'hard',
    common_follow_ups: ['What would you do differently?', 'How did this change your working relationship?'],
    framework: 'STAR',
    tips: [
      'Use the STAR method',
      'Focus on your actions, not blame',
      'Show emotional intelligence',
      'Highlight the positive outcome'
    ]
  },
  {
    id: 'leadership-example',
    question: 'Describe a time when you demonstrated leadership.',
    category: 'behavioral',
    difficulty: 'medium',
    common_follow_ups: ['What was the biggest challenge?', 'How did you motivate the team?'],
    framework: 'STAR',
    tips: [
      'Show initiative and ownership',
      'Highlight team collaboration',
      'Quantify results when possible',
      'Demonstrate adaptability'
    ]
  },
  {
    id: 'failure-learning',
    question: 'Tell me about a time you failed.',
    category: 'behavioral',
    difficulty: 'hard',
    common_follow_ups: ['What did you learn?', 'How would you handle it differently now?'],
    framework: 'STAR',
    tips: [
      'Choose a genuine failure with a lesson',
      'Take responsibility',
      'Focus on what you learned',
      'Show how you\'ve grown'
    ]
  },
  {
    id: 'technical-coding',
    question: 'Reverse a linked list.',
    category: 'technical',
    difficulty: 'medium',
    industry: 'technology',
    common_follow_ups: ['What\'s the time complexity?', 'Can you do it recursively?'],
    framework: 'general',
    tips: [
      'Clarify requirements first',
      'Explain your approach',
      'Write clean, readable code',
      'Test with examples'
    ]
  },
  {
    id: 'system-design',
    question: 'Design a URL shortening service like bit.ly.',
    category: 'technical',
    difficulty: 'hard',
    industry: 'technology',
    common_follow_ups: ['How would you handle scaling?', 'What database would you use?'],
    framework: 'general',
    tips: [
      'Clarify requirements and constraints',
      'Start with high-level architecture',
      'Discuss trade-offs',
      'Consider scalability and performance'
    ]
  },
  {
    id: 'why-this-company',
    question: 'Why do you want to work here?',
    category: 'cultural',
    difficulty: 'easy',
    common_follow_ups: ['What do you know about our products?', 'What excites you most?'],
    framework: 'general',
    tips: [
      'Research the company thoroughly',
      'Connect your goals to company mission',
      'Show genuine enthusiasm',
      'Be specific about what attracts you'
    ]
  },
  {
    id: 'where-see-yourself',
    question: 'Where do you see yourself in 5 years?',
    category: 'cultural',
    difficulty: 'medium',
    common_follow_ups: ['How does this role fit into that plan?', 'What skills do you want to develop?'],
    framework: 'general',
    tips: [
      'Show ambition but stay realistic',
      'Align goals with company trajectory',
      'Focus on growth, not specific titles',
      'Show commitment to the field'
    ]
  },
  {
    id: 'salary-expectations',
    question: 'What are your salary expectations?',
    category: 'situational',
    difficulty: 'hard',
    common_follow_ups: ['Is that negotiable?', 'What is your current salary?'],
    framework: 'general',
    tips: [
      'Research market rates first',
      'Provide a range, not a single number',
      'Consider total compensation',
      'Be flexible but know your worth'
    ]
  },
  {
    id: 'handle-pressure',
    question: 'How do you handle pressure or stressful situations?',
    category: 'behavioral',
    difficulty: 'medium',
    common_follow_ups: ['Give me a specific example.', 'What techniques do you use?'],
    framework: 'STAR',
    tips: [
      'Give concrete examples',
      'Show healthy coping mechanisms',
      'Demonstrate problem-solving',
      'Highlight positive outcomes'
    ]
  },
  {
    id: 'questions-for-us',
    question: 'Do you have any questions for us?',
    category: 'cultural',
    difficulty: 'easy',
    common_follow_ups: [],
    framework: 'general',
    tips: [
      'Always have questions prepared',
      'Ask about team culture and growth',
      'Show genuine interest',
      'Avoid asking about salary too early'
    ]
  }
];

export const interviewCategories = [
  { value: 'all', label: 'All Questions', count: interviewQuestions.length },
  { value: 'behavioral', label: 'Behavioral', count: interviewQuestions.filter(q => q.category === 'behavioral').length },
  { value: 'technical', label: 'Technical', count: interviewQuestions.filter(q => q.category === 'technical').length },
  { value: 'situational', label: 'Situational', count: interviewQuestions.filter(q => q.category === 'situational').length },
  { value: 'cultural', label: 'Cultural Fit', count: interviewQuestions.filter(q => q.category === 'cultural').length }
];
