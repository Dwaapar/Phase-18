import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart, TrendingUp, AlertTriangle } from "lucide-react";

export default function KPIReportingPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">KPI Reporting & Dashboards</h1>
            <p className="text-xl text-white/80">
              Real-time performance dashboards with automated insights and alerts.
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
                  KPI reports are outdated by the time they're created. Data lives in silos. 
                  Teams react to problems instead of preventing them.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <BarChart className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Real-time Metrics</h3>
                    <p className="text-monks-gray">Live dashboards that update automatically from all your data sources.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <TrendingUp className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Custom Dashboards</h3>
                    <p className="text-monks-gray">Tailored views for different roles and departments with drag-and-drop customization.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <AlertTriangle className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Alert Systems</h3>
                    <p className="text-monks-gray">Proactive notifications when metrics deviate from targets or trends.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-monks-light-gray rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-monks-black mb-6">Workflow Map</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <span>Connect to data sources (CRM, Analytics, etc.)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <span>Define KPIs and target thresholds</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <span>Build custom dashboards by role</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <span>Set up automated alerts and notifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
                  <span>Schedule and distribute reports</span>
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
              <div className="text-4xl font-bold text-monks-accent mb-2">90%</div>
              <div className="text-monks-gray">Time Savings on Reporting</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">24/7</div>
              <div className="text-monks-gray">Real-time Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">50%</div>
              <div className="text-monks-gray">Faster Issue Detection</div>
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