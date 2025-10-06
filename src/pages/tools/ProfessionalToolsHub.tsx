import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Mail, Briefcase, TrendingUp, Target,
  MessageSquare, DollarSign, Award, Sparkles, Lock,
  ArrowRight, Clock, Check
} from 'lucide-react';
import { professionalToolsService, ProfessionalTool } from '../../services/professional-tools.service';
import { useAuth } from '../../contexts/AuthContext';

const toolIcons: Record<string, any> = {
  resume: FileText,
  cover_letter: Mail,
  portfolio: Briefcase,
  email: TrendingUp,
  pitch: Target,
  interview: MessageSquare,
  salary: DollarSign,
  brand: Award
};

export default function ProfessionalToolsHub() {
  const { user } = useAuth();
  const [tools, setTools] = useState<ProfessionalTool[]>([]);
  const [usageStats, setUsageStats] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const toolsData = await professionalToolsService.getAllTools();
      setTools(toolsData);

      if (user) {
        const stats = await professionalToolsService.getUserUsageStats(user.id);
        setUsageStats(stats);
      }
    } catch (error) {
      console.error('Error loading tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const getToolPath = (slug: string) => {
    const pathMap: Record<string, string> = {
      'resume-builder': '/tools/resume',
      'cover-letter-generator': '/tools/cover-letter',
      'portfolio-builder': '/tools/portfolio',
      'email-optimizer': '/tools/email-optimizer',
      'pitch-deck-builder': '/tools/pitch-deck',
      'interview-prep': '/tools/interview-prep',
      'salary-calculator': '/tools/salary-calculator',
      'brand-audit': '/tools/brand-audit'
    };
    return pathMap[slug] || `/tools/${slug}`;
  };

  const categories = [
    { id: 'career', name: 'Career Tools', description: 'Build your professional brand' },
    { id: 'business', name: 'Business Tools', description: 'Optimize your communications' },
    { id: 'creative', name: 'Creative Tools', description: 'Showcase your work' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            Professional Tools Suite
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Ready-to-Use Career Tools
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Everything you need to grow your career and optimize your professional presence.
            Get 3 free uses per month, or upgrade for unlimited access.
          </p>

          {!user && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Sign up for free access</h3>
              <p className="mb-6 text-blue-100">
                Create an account to start using our professional tools with 3 free uses per month
              </p>
              <Link
                to="/auth/sign-up"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>

        {categories.map(category => {
          const categoryTools = tools.filter(t => t.category === category.id);
          if (categoryTools.length === 0) return null;

          return (
            <div key={category.id} className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{category.name}</h2>
                <p className="text-slate-600">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map(tool => {
                  const Icon = toolIcons[tool.tool_type] || FileText;
                  const usage = usageStats[tool.slug];
                  const isUnlimited = usage?.has_unlimited;
                  const remaining = usage?.remaining || 0;

                  return (
                    <Link
                      key={tool.id}
                      to={getToolPath(tool.slug)}
                      className="group bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
                          <Icon size={24} />
                        </div>
                        {tool.templates_count > 0 && (
                          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {tool.templates_count}+ templates
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {tool.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {(tool.features as string[]).slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <Check size={14} className="text-green-500 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {user && (
                        <div className="pt-4 border-t border-slate-200">
                          {isUnlimited ? (
                            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                              <Sparkles size={14} />
                              Unlimited uses
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">Uses remaining:</span>
                              <span className={`font-bold ${remaining > 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                                {remaining} / {tool.free_uses_per_month}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mt-4 group-hover:gap-3 transition-all">
                        Launch Tool
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <Lock size={48} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Unlock Unlimited Access</h2>
            <p className="text-xl text-blue-100 mb-8">
              Upgrade to Professional and get unlimited access to all tools, premium templates,
              and advanced features to supercharge your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                View Pricing
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/tools/comparison"
                className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </div>

        {user && (
          <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Recent Activity</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Object.values(usageStats).reduce((acc, stat) => acc + (stat.usage_count || 0), 0)}
                </div>
                <div className="text-sm text-slate-600">Total Uses This Month</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {tools.length}
                </div>
                <div className="text-sm text-slate-600">Tools Available</div>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-xl">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {Object.values(usageStats).reduce((acc, stat) => acc + (stat.remaining || 0), 0)}
                </div>
                <div className="text-sm text-slate-600">Remaining Free Uses</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
