import React from "react";
import { FileText, User, Briefcase, Mail } from "lucide-react";

export default function ToolsPage() {
  const tools = [
    {
      title: "Resume Maker",
      description: "Create professional resumes in minutes",
      icon: FileText,
      features: ["ATS-optimized", "Multiple templates", "PDF export"]
    },
    {
      title: "Cover Letter Generator",
      description: "Personalized cover letters for any job",
      icon: Mail,
      features: ["Job-specific content", "AI-powered writing", "Multiple formats"]
    },
    {
      title: "Portfolio Builder",
      description: "Showcase your work professionally",
      icon: Briefcase,
      features: ["Responsive design", "Custom domains", "Analytics"]
    },
    {
      title: "Email Optimizer",
      description: "Improve your email open rates",
      icon: User,
      features: ["Subject line testing", "Content analysis", "Performance tracking"]
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Services & Tools</h1>
          <p className="text-xl text-mist max-w-3xl mx-auto">
            Practical utilities to help you grow your career and optimize your business communications.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div key={i} className="bg-slate/80 rounded-xl2 p-6 border border-white/5 hover:shadow-glow transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo to-violet rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-mist mb-4">{tool.description}</p>
                <ul className="space-y-1 mb-4">
                  {tool.features.map((feature, j) => (
                    <li key={j} className="text-sm text-mist flex items-center gap-2">
                      <span className="text-emerald">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-indigo to-violet px-4 py-2 rounded-lg font-semibold">
                  Try Now
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-indigo to-violet rounded-xl2 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">All Tools, One Platform</h2>
          <p className="text-lg mb-6">Access our complete suite of professional tools</p>
          <button className="bg-ink px-8 py-3 rounded-xl font-semibold hover:bg-slate transition-colors">
            Try All Tools
          </button>
        </div>
      </div>
    </div>
  );
}