import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Target, Zap, BarChart } from "lucide-react";

export default function LeadRoutingPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Lead Routing & Qualification</h1>
            <p className="text-xl text-white/80">
              Intelligent lead distribution and scoring that maximizes conversion rates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-display font-bold text-monks-black mb-6">The Problem</h2>
                <p className="text-xl text-monks-gray leading-relaxed">
                  Leads get lost in manual handoffs. Sales reps waste time on unqualified prospects. 
                  Hot leads go cold while waiting for assignment.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Target className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Smart Scoring</h3>
                    <p className="text-monks-gray">Real-time lead qualification based on behavior, demographics, and intent signals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Zap className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Instant Routing</h3>
                    <p className="text-monks-gray">Automatic assignment to the right rep based on territory, expertise, and availability.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <BarChart className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Performance Tracking</h3>
                    <p className="text-monks-gray">Monitor conversion rates, response times, and rep performance in real-time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-monks-light-gray rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-monks-black mb-6">Workflow Map</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <span>Lead captured from form/CRM</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <span>AI scoring based on 15+ data points</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <span>Territory and expertise matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <span>Instant notification to assigned rep</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
                  <span>Follow-up tracking and escalation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">23%</div>
              <div className="text-monks-gray">MQL Conversion Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">67%</div>
              <div className="text-monks-gray">Faster Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">89%</div>
              <div className="text-monks-gray">Lead Assignment Accuracy</div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/automation/pilot"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Book 72h Pilot
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}