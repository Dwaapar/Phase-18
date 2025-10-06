import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Bot, Workflow, HelpCircle, Play, Pause } from "lucide-react";

const tabs = [
  {
    id: "workflows",
    label: "Workflows",
    title: "350+ Ready-to-Deploy Workflows",
    description: "From lead routing to onboarding — one-click deployment.",
    cta: { label: "Browse Workflows", href: "/workflows" },
    icon: Workflow,
  },
  {
    id: "agents", 
    label: "Agents",
    title: "Autonomous AI Agents",
    description: "Deploy bots that think and act for you.",
    cta: { label: "Deploy Your First Agent", href: "/agents/new" },
    icon: Bot,
  },
  {
    id: "quiz",
    label: "Quiz",
    title: "Take the 2-Minute Quiz",
    description: "Answer a few questions. Get instant clarity.",
    cta: { label: "Start the Quiz", href: "/decision/quiz" },
    icon: HelpCircle,
  }
];

const workflowPreviews = [
  { name: "Lead Qualification Pipeline", dept: "Sales", downloads: "1.2k", status: "Popular" },
  { name: "Customer Onboarding Flow", dept: "Success", downloads: "890", status: "New" },
  { name: "Invoice Processing Bot", dept: "Finance", downloads: "650", status: "Featured" },
  { name: "Support Ticket Triage", dept: "Support", downloads: "1.1k", status: "Popular" },
  { name: "Marketing Attribution", dept: "Marketing", downloads: "780", status: "Featured" },
  { name: "Employee Onboarding", dept: "HR", downloads: "420", status: "New" },
];

const agentPreviews = [
  { name: "SDR Agent", type: "Sales Development", status: "Popular", conversations: "2.1k" },
  { name: "Support Agent", type: "Customer Support", status: "New", conversations: "890" },
  { name: "Operations Agent", type: "Process Automation", status: "Featured", conversations: "1.5k" },
];

export default function LivePreviewTabs() {
  const [activeTab, setActiveTab] = useState("workflows");
  const [isPlaying, setIsPlaying] = useState(true);
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case "workflows":
        return (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workflowPreviews.map((workflow, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:bg-white transition-all duration-500 group shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Workflow size={28} className="text-monks-accent" />
                      <span className="px-4 py-2 bg-monks-accent/20 text-monks-accent rounded-full text-sm font-semibold">
                        {workflow.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-monks-black text-xl group-hover:text-monks-accent transition-colors duration-300">
                        {workflow.name}
                      </h4>
                      <p className="text-monks-gray text-lg">{workflow.dept}</p>
                      <p className="text-monks-accent font-semibold text-lg">{workflow.downloads} downloads</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "agents":
        return (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {agentPreviews.map((agent, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:bg-white transition-all duration-500 group text-center shadow-lg">
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                      <Bot size={28} className="text-white" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-monks-black text-xl group-hover:text-monks-accent transition-colors duration-300">
                        {agent.name}
                      </h4>
                      <p className="text-monks-gray text-lg">{agent.type}</p>
                      <div className="flex items-center justify-center gap-6">
                        <span className="px-4 py-2 bg-monks-accent/20 text-monks-accent rounded-full text-sm font-semibold">
                          {agent.status}
                        </span>
                        <span className="text-monks-gray text-lg">{agent.conversations} conversations</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "quiz":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 border border-white/30 shadow-lg">
              <div className="space-y-10">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-monks-accent to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <HelpCircle size={36} className="text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-monks-black mb-6">What's your primary business goal?</h4>
                </div>
                
                <div className="space-y-6">
                  {[
                    "Increase revenue and growth",
                    "Reduce operational costs", 
                    "Improve team efficiency",
                    "Scale operations faster"
                  ].map((option, i) => (
                    <button key={i} className="w-full text-left p-6 bg-white/80 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 group border border-white/50">
                      <div className="flex items-center justify-between">
                        <span className="text-monks-black font-semibold text-xl">{option}</span>
                        <ArrowUpRight size={20} className="text-monks-gray group-hover:text-monks-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </div>
                    </button>
                  ))}
                </div>
                
                <p className="text-center text-monks-gray text-lg">
                  2 more questions to get your personalized recommendations
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="see-it-in-action" className="py-40 bg-gradient-to-br from-monks-dark-gray via-monks-black to-monks-dark-gray text-white relative overflow-hidden">
      {/* Monks-style background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,#0F62FE_2px,transparent_0)] bg-[length:80px_80px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-24">
          <div className="space-y-10">
            <div className="flex items-center justify-center gap-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-monks-accent to-transparent"></div>
              <span className="text-monks-accent font-light text-lg tracking-[0.2em] uppercase">
                Live Platform Demo
              </span>
              <div className="w-20 h-px bg-gradient-to-r from-monks-accent via-transparent to-transparent"></div>
            </div>
            
            <h2 className="text-8xl lg:text-9xl font-bold leading-[0.8] tracking-tight">
              See It In<br/>
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-monks-accent to-white">
                Action
              </span>
            </h2>
            
            <p className="text-3xl text-white/80 max-w-4xl mx-auto leading-[1.4] font-light">
              Don't just read about it—experience how our platform works in real-time.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation - monks.com style */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-full p-3 border border-white/10">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center gap-4 px-10 py-5 rounded-full font-semibold text-xl transition-all duration-500 ${
                      activeTab === tab.id
                        ? "bg-white text-monks-black shadow-2xl scale-105"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={24} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          {activeTabData && (
            <div className="space-y-16 animate-fade-in">
              <div className="text-center space-y-8">
                <h3 className="text-5xl lg:text-6xl font-bold">{activeTabData.title}</h3>
                <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-[1.4] font-light">
                  {activeTabData.description}
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 lg:p-16 border border-white/10 relative overflow-hidden">
                {/* Monks-style animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-monks-accent/3 via-transparent to-purple-500/3"></div>
                
                <div className="relative">
                  {renderTabContent()}
                </div>
              </div>
              
              <div className="text-center">
                <Link
                  to={activeTabData.cta.href}
                  className="inline-flex items-center gap-4 bg-white text-monks-black px-12 py-6 rounded-full font-semibold text-2xl hover:bg-monks-accent hover:text-white transition-all duration-500 group shadow-2xl"
                >
                  {activeTabData.cta.label}
                  <ArrowUpRight size={24} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}