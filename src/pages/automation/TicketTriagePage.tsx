import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MessageSquare, Clock, Users } from "lucide-react";

export default function TicketTriagePage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Support Ticket Triage</h1>
            <p className="text-xl text-white/80">
              Smart ticket categorization and routing that reduces resolution time by 40%.
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
                  Support tickets pile up in generic queues. Urgent issues get buried. 
                  Agents waste time on misrouted tickets.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MessageSquare className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Auto-Categorization</h3>
                    <p className="text-monks-gray">AI-powered classification of tickets by type, urgency, and required expertise.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Priority Scoring</h3>
                    <p className="text-monks-gray">Dynamic priority assignment based on customer tier, issue impact, and SLA requirements.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Agent Assignment</h3>
                    <p className="text-monks-gray">Smart routing to agents based on expertise, workload, and availability.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-monks-light-gray rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-monks-black mb-6">Workflow Map</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <span>Ticket received from any channel</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <span>AI analysis and categorization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <span>Priority and urgency scoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <span>Agent matching and assignment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
                  <span>SLA monitoring and escalation</span>
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
              <div className="text-4xl font-bold text-monks-accent mb-2">40%</div>
              <div className="text-monks-gray">Faster Resolution Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">92%</div>
              <div className="text-monks-gray">Routing Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">35%</div>
              <div className="text-monks-gray">Agent Productivity Increase</div>
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