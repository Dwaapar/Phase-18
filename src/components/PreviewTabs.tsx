import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const tabs = [
  {
    id: "workflows",
    label: "Workflows",
    title: "350+ Ready-to-Deploy Workflows",
    description: "From lead routing to onboarding — one-click deployment.",
    cta: { label: "Browse Workflows", href: "/workflows" }
  },
  {
    id: "agents", 
    label: "Agents",
    title: "Autonomous AI Agents",
    description: "Deploy bots that think and act for you.",
    cta: { label: "Deploy Your First Agent", href: "/agents/new" }
  },
  {
    id: "quiz",
    label: "Quiz",
    title: "Take the 2-Minute Quiz",
    description: "Answer a few questions. Get instant clarity.",
    cta: { label: "Start the Quiz", href: "/decision/quiz" }
  }
];

export default function PreviewTabs() {
  const [activeTab, setActiveTab] = useState("workflows");
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-monks-black mb-6">Experience the Platform</h2>
          <p className="text-xl text-monks-gray max-w-2xl mx-auto">
            Don't just read about it—see how our platform works in real-time.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-monks-light-gray rounded-full p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-monks-black shadow-subtle"
                      : "text-monks-gray hover:text-monks-black"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {activeTabData && (
            <div className="bg-monks-light-gray rounded-3xl p-12 text-center animate-fade-in">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-monks-black">{activeTabData.title}</h3>
                <p className="text-xl text-monks-gray max-w-2xl mx-auto leading-relaxed">
                  {activeTabData.description}
                </p>
                <a
                  href={activeTabData.cta.href}
                  className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
                >
                  {activeTabData.cta.label}
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}