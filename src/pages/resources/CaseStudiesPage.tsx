import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, Users, Clock, DollarSign, Heart, Zap, ShieldCheck, Target, MessageSquare, Activity, Search } from "lucide-react";
import { mockCaseStudies } from "../../data/mockData";

const industries = ['All', 'B2B SaaS', 'E-commerce', 'Financial Services', 'Healthcare', 'Manufacturing', 'Real Estate', 'Media & Publishing', 'Logistics'];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    TrendingUp,
    Clock,
    Users,
    DollarSign,
    Heart,
    Zap,
    ShieldCheck,
    Target,
    MessageSquare,
    Activity,
    Search
  };
  return icons[iconName] || TrendingUp;
};

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const filteredCaseStudies = selectedIndustry === 'All'
    ? mockCaseStudies
    : mockCaseStudies.filter(study => study.industry === selectedIndustry);

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-b from-monks-black to-monks-gray text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
              <Target size={16} />
              <span>Real Results from Real Companies</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Customer Success Stories
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              See how businesses across industries are transforming operations,
              reducing costs, and accelerating growth with Findawise.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">1,000+</div>
                <div className="text-sm text-white/70">Companies Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">75%</div>
                <div className="text-sm text-white/70">Avg Efficiency Gain</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">$10M+</div>
                <div className="text-sm text-white/70">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-sm text-white/70">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-monks-black mb-2">Filter by Industry</h2>
              <p className="text-monks-gray">Explore success stories from companies in your sector</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedIndustry === industry
                      ? "bg-monks-accent text-white"
                      : "bg-monks-light-gray text-monks-gray hover:bg-monks-gray/10"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-monks-gray">
              Showing {filteredCaseStudies.length} case {filteredCaseStudies.length === 1 ? 'study' : 'studies'}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {filteredCaseStudies.map((study, i) => (
              <div key={study.id} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-6 ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-1.5 bg-monks-accent/10 text-monks-accent rounded-full text-sm font-semibold">
                        {study.industry}
                      </span>
                      <span className="text-sm text-monks-gray font-medium">{study.company}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-monks-black leading-tight">
                      {study.title}
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div className="p-5 bg-monks-light-gray rounded-2xl">
                      <h3 className="font-semibold text-monks-black mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        The Challenge
                      </h3>
                      <p className="text-monks-gray leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="p-5 bg-emerald-50 rounded-2xl">
                      <h3 className="font-semibold text-monks-black mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        The Solution
                      </h3>
                      <p className="text-monks-gray leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {study.results.map((result, j) => {
                      const Icon = getIconComponent(result.icon);
                      return (
                        <div key={j} className="text-center p-5 bg-white border-2 border-monks-gray/10 rounded-2xl hover:border-monks-accent/30 hover:shadow-card transition-all duration-300">
                          <div className="w-10 h-10 bg-monks-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Icon size={20} className="text-monks-accent" />
                          </div>
                          <div className="text-2xl md:text-3xl font-bold text-monks-black mb-1">{result.value}</div>
                          <div className="text-xs md:text-sm text-monks-gray leading-tight">{result.metric}</div>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    to={`/case-studies/${study.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-monks-accent text-white rounded-xl font-semibold hover:bg-monks-hover transition-colors group"
                  >
                    Read Full Case Study
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

                <div className={`${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
                    <img
                      src={study.image}
                      alt={study.company}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-monks-black mb-6">
              Impact Across All Metrics
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Our customers consistently see improvements in efficiency, cost savings,
              and customer satisfaction across all areas of their business.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-emerald-600" />
              </div>
              <div className="text-4xl font-bold text-monks-black mb-2">75%</div>
              <div className="text-sm text-monks-gray">Average Efficiency Gain</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-monks-black mb-2">60%</div>
              <div className="text-sm text-monks-gray">Time Savings</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign size={28} className="text-amber-600" />
              </div>
              <div className="text-4xl font-bold text-monks-black mb-2">$10M+</div>
              <div className="text-sm text-monks-gray">Total Cost Savings</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-red-600" />
              </div>
              <div className="text-4xl font-bold text-monks-black mb-2">4.9/5</div>
              <div className="text-sm text-monks-gray">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-monks-black to-monks-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            Join the companies already transforming their operations with Findawise.
            Book a demo to see how we can help you achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact?type=demo"
              className="inline-flex items-center justify-center gap-2 bg-white text-monks-black px-8 py-4 rounded-xl font-semibold hover:bg-monks-accent hover:text-white transition-all duration-300 group"
            >
              Schedule a Demo
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact?type=solutions"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Talk to Solutions Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
