import React, { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What's your primary business goal?",
    options: [
      { id: "revenue", label: "Increase revenue", weight: { growth: 3, efficiency: 1, cost: 1 } },
      { id: "efficiency", label: "Improve efficiency", weight: { growth: 1, efficiency: 3, cost: 1 } },
      { id: "cost", label: "Reduce costs", weight: { growth: 1, efficiency: 1, cost: 3 } },
      { id: "scale", label: "Scale operations", weight: { growth: 2, efficiency: 2, cost: 1 } }
    ]
  },
  {
    id: 2,
    question: "What's your current biggest challenge?",
    options: [
      { id: "manual", label: "Too much manual work", weight: { automation: 3, tools: 1, strategy: 1 } },
      { id: "decisions", label: "Slow decision making", weight: { automation: 1, tools: 1, strategy: 3 } },
      { id: "tools", label: "Disconnected tools", weight: { automation: 2, tools: 3, strategy: 1 } },
      { id: "scaling", label: "Can't scale processes", weight: { automation: 2, tools: 2, strategy: 2 } }
    ]
  },
  {
    id: 3,
    question: "How technical is your team?",
    options: [
      { id: "low", label: "Non-technical", weight: { managed: 3, selfhost: 0, hybrid: 1 } },
      { id: "medium", label: "Some technical skills", weight: { managed: 2, selfhost: 1, hybrid: 3 } },
      { id: "high", label: "Very technical", weight: { managed: 1, selfhost: 3, hybrid: 2 } },
      { id: "mixed", label: "Mixed team", weight: { managed: 2, selfhost: 1, hybrid: 3 } }
    ]
  },
  {
    id: 4,
    question: "What's your budget range?",
    options: [
      { id: "starter", label: "Under $1,000/month", weight: { starter: 3, pro: 1, enterprise: 0 } },
      { id: "growth", label: "$1,000 - $5,000/month", weight: { starter: 1, pro: 3, enterprise: 1 } },
      { id: "scale", label: "$5,000 - $20,000/month", weight: { starter: 0, pro: 2, enterprise: 3 } },
      { id: "enterprise", label: "$20,000+/month", weight: { starter: 0, pro: 1, enterprise: 3 } }
    ]
  }
];

const recommendations = {
  automation_managed_starter: {
    title: "Start with Workflow Automation",
    description: "Perfect for getting started with automation without technical complexity",
    solutions: ["Workflow Store", "Managed AI Agents", "Basic Analytics"],
    nextSteps: ["Browse 350+ workflows", "Deploy your first automation", "Book a consultation"]
  },
  automation_hybrid_pro: {
    title: "Hybrid Automation Platform",
    description: "Combine managed services with some self-hosted flexibility",
    solutions: ["Custom Workflows", "Hybrid AI Agents", "Advanced Analytics"],
    nextSteps: ["Book 72h pilot", "Custom workflow consultation", "Team training session"]
  },
  strategy_selfhost_enterprise: {
    title: "Enterprise Decision Platform",
    description: "Full control with enterprise-grade decision automation",
    solutions: ["Decision Platform", "Self-hosted Agents", "Enterprise Support"],
    nextSteps: ["Enterprise consultation", "Custom implementation", "Dedicated success manager"]
  }
};

export default function DecisionQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: optionId };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendation
      const scores: Record<string, number> = {};
      
      questions.forEach((question) => {
        const answer = newAnswers[question.id];
        const option = question.options.find(opt => opt.id === answer);
        if (option) {
          Object.entries(option.weight).forEach(([key, value]) => {
            scores[key] = (scores[key] || 0) + value;
          });
        }
      });

      // Simple recommendation logic (in real app, this would be more sophisticated)
      const topScores = Object.entries(scores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([key]) => key);
      
      const recKey = topScores.join('_');
      const rec = recommendations[recKey as keyof typeof recommendations] || recommendations.automation_managed_starter;
      
      setRecommendation(rec);
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendation(null);
  };

  if (showResults && recommendation) {
    return (
      <div className="pt-20 min-h-screen bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-monks-black mb-4">
              Your Personalized Recommendation
            </h1>
            
            <div className="bg-monks-light-gray rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-monks-black mb-4">
                {recommendation.title}
              </h2>
              <p className="text-xl text-monks-gray mb-6">
                {recommendation.description}
              </p>
              
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                {recommendation.solutions.map((solution: string, i: number) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <span className="font-medium text-monks-black">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-monks-black">Recommended Next Steps:</h3>
              <div className="space-y-2">
                {recommendation.nextSteps.map((step: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 justify-center">
                    <span className="w-6 h-6 bg-monks-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-monks-gray">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                Get Started Now
              </button>
              <button 
                onClick={restartQuiz}
                className="border border-monks-gray text-monks-gray px-8 py-4 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-monks-gray">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-monks-gray">
                {Math.round(progress)}% complete
              </span>
            </div>
            <div className="w-full bg-monks-light-gray rounded-full h-2">
              <div 
                className="bg-monks-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-monks-black mb-6">
              {question.question}
            </h1>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-12">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className="w-full p-6 text-left bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{option.label}</span>
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={goBack}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            
            <div className="text-sm text-monks-gray">
              Select an option to continue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}