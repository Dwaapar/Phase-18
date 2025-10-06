import React from "react";
import { HelpCircle, CheckCircle, ArrowRight } from "lucide-react";

export default function DecisionPage() {
  const quizQuestions = [
    "What's your primary business goal?",
    "What's your current biggest challenge?",
    "How technical is your team?",
    "What's your budget range?"
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Decision Platform</h1>
          <p className="text-xl text-mist max-w-3xl mx-auto">
            Cut through the noise with our intelligent decision engine. 
            Get personalized recommendations in minutes, not hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-slate/80 rounded-xl2 p-8 border border-white/5">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo to-violet rounded-lg flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Take the 2-Minute Quiz</h3>
            <p className="text-mist text-center mb-6">
              Answer a few questions and get personalized recommendations
            </p>
            <div className="space-y-3 mb-6">
              {quizQuestions.map((question, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-emerald" size={20} />
                  <span className="text-sm">{question}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-gradient-to-r from-indigo to-violet px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              Start Quiz
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-slate/80 rounded-xl2 p-8 border border-white/5">
            <h3 className="text-2xl font-bold mb-6">Popular Comparisons</h3>
            <div className="space-y-4">
              <div className="p-4 bg-ink/50 rounded-lg border border-white/5">
                <h4 className="font-semibold mb-2">Best CRM for Startups</h4>
                <p className="text-mist text-sm">Compare HubSpot, Pipedrive, and Salesforce</p>
              </div>
              <div className="p-4 bg-ink/50 rounded-lg border border-white/5">
                <h4 className="font-semibold mb-2">Marketing Automation Tools</h4>
                <p className="text-mist text-sm">Mailchimp vs ActiveCampaign vs ConvertKit</p>
              </div>
              <div className="p-4 bg-ink/50 rounded-lg border border-white/5">
                <h4 className="font-semibold mb-2">Project Management Solutions</h4>
                <p className="text-mist text-sm">Asana, Monday.com, and ClickUp comparison</p>
              </div>
            </div>
            <button className="w-full mt-6 border border-indigo text-indigo px-6 py-3 rounded-lg font-semibold hover:bg-indigo hover:text-white transition-colors">
              Browse All Guides
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo to-violet rounded-xl2 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Clarity on Your Next Move</h2>
          <p className="text-lg mb-6">Stop second-guessing. Start with our 2-minute quiz.</p>
          <button className="bg-ink px-8 py-3 rounded-xl font-semibold hover:bg-slate transition-colors">
            Take the Quiz
          </button>
        </div>
      </div>
    </div>
  );
}