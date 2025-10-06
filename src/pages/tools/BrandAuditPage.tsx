import React, { useState } from 'react';
import { Award, Linkedin, Globe, Search, TrendingUp } from 'lucide-react';

export default function BrandAuditPage() {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAudit = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        overall_score: 72,
        linkedin: { score: 85, completeness: 90, engagement: 65 },
        portfolio: { score: 68, seo: 55, mobile: 90 },
        social: { score: 60, consistency: 70, activity: 55 }
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-purple-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Personal Brand Audit</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Analyze your online presence and get actionable insights to improve your professional brand
          </p>
        </div>

        {!results ? (
          <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Enter Your Profiles</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Linkedin size={16} className="text-blue-600" />
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourname"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-pink-500 focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Globe size={16} className="text-green-600" />
                  Portfolio/Website
                </label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-pink-500 focus:ring-0"
                />
              </div>

              <button
                onClick={handleAudit}
                disabled={analyzing || (!linkedinUrl && !portfolioUrl)}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:from-pink-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {analyzing ? (
                  <>Analyzing Your Brand...</>
                ) : (
                  <>
                    <Search size={20} />
                    Audit My Brand
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <Award size={64} className="mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">{results.overall_score}/100</h2>
              <p className="text-pink-100 text-lg">Overall Brand Score</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <Linkedin size={24} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">LinkedIn</h3>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-4">{results.linkedin.score}/100</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Completeness</span>
                    <span className="font-semibold">{results.linkedin.completeness}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Engagement</span>
                    <span className="font-semibold">{results.linkedin.engagement}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <Globe size={24} className="text-green-600" />
                  <h3 className="font-bold text-slate-900">Portfolio</h3>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-4">{results.portfolio.score}/100</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">SEO Score</span>
                    <span className="font-semibold">{results.portfolio.seo}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mobile Friendly</span>
                    <span className="font-semibold">{results.portfolio.mobile}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp size={24} className="text-purple-600" />
                  <h3 className="font-bold text-slate-900">Social Media</h3>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-4">{results.social.score}/100</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Consistency</span>
                    <span className="font-semibold">{results.social.consistency}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Activity Level</span>
                    <span className="font-semibold">{results.social.activity}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Recommendations</h3>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">!</div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Improve Portfolio SEO</h4>
                    <p className="text-sm text-red-800">Add meta descriptions and optimize images for better search visibility</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">!</div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Increase LinkedIn Activity</h4>
                    <p className="text-sm text-yellow-800">Post regularly and engage with your network to boost visibility</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setResults(null)}
              className="w-full bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              Run Another Audit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
