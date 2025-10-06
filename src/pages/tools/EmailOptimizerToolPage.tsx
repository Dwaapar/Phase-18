import React, { useState } from "react";
import { Mail, TrendingUp, Target, BarChart } from "lucide-react";

export default function EmailOptimizerToolPage() {
  const [emailData, setEmailData] = useState({
    subject: "",
    content: "",
    audience: "general"
  });

  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    // Simulate analysis
    setAnalysis({
      subjectScore: 85,
      contentScore: 78,
      suggestions: [
        "Add urgency to your subject line",
        "Include a clear call-to-action",
        "Personalize the greeting"
      ]
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-monks-black mb-6">Email Optimizer</h1>
          <p className="text-xl text-monks-gray max-w-3xl mx-auto">
            Optimize your email campaigns for better open rates and engagement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6">Email Content</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Subject Line</label>
                <input
                  type="text"
                  placeholder="Enter your email subject line..."
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Email Content</label>
                <textarea
                  placeholder="Paste your email content here..."
                  value={emailData.content}
                  onChange={(e) => setEmailData(prev => ({ ...prev, content: e.target.value }))}
                  rows={10}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Target Audience</label>
                <select 
                  value={emailData.audience}
                  onChange={(e) => setEmailData(prev => ({ ...prev, audience: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                >
                  <option value="general">General</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              <button 
                onClick={handleAnalyze}
                className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2"
              >
                <TrendingUp size={16} />
                Analyze Email
              </button>
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6">Analysis Results</h2>
            
            {analysis ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-monks-light-gray rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-monks-accent mb-2">{analysis.subjectScore}</div>
                    <div className="text-sm text-monks-gray">Subject Score</div>
                  </div>
                  <div className="bg-monks-light-gray rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-monks-accent mb-2">{analysis.contentScore}</div>
                    <div className="text-sm text-monks-gray">Content Score</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-monks-black mb-3">Suggestions</h3>
                  <div className="space-y-2">
                    {analysis.suggestions.map((suggestion, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-monks-light-gray rounded-xl">
                        <Target size={16} className="text-monks-accent" />
                        <span className="text-monks-black">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-monks-light-gray rounded-2xl p-4">
                  <h4 className="font-semibold text-monks-black mb-2">Predicted Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-monks-gray">Open Rate:</span>
                      <span className="font-semibold text-monks-black">24.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-monks-gray">Click Rate:</span>
                      <span className="font-semibold text-monks-black">3.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-monks-gray py-12">
                <BarChart size={48} className="mx-auto mb-4" />
                <p>Analysis results will appear here after you analyze your email</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}