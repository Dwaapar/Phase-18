import React, { useState } from "react";
import { CheckCircle, Clock, Users, Shield } from "lucide-react";

const trustBadges = [
  { icon: Clock, text: "72h delivery guarantee" },
  { icon: Users, text: "Senior architects only" },
  { icon: Shield, text: "Observable pipelines" },
  { icon: CheckCircle, text: "Ownership handoff included" }
];

const miniCases = [
  {
    title: "SaaS Lead Routing",
    result: "23% MQL uplift in 1 week",
    industry: "B2B SaaS"
  },
  {
    title: "E-commerce Support Triage",
    result: "40% faster resolution time",
    industry: "E-commerce"
  },
  {
    title: "Fintech KPI Dashboard",
    result: "Real-time compliance reporting",
    industry: "Fintech"
  }
];

export default function AutomationPilotPage() {
  const [formData, setFormData] = useState({
    useCase: "",
    stack: "",
    dataAccess: "",
    timeline: "",
    company: "",
    email: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pilot form submitted:", formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">
              Ship Automations in 72 Hours.<br />
              No Extra Headcount.
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We audit, architect, and ship end-to-end workflows—then keep them healthy with SLAs.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustBadges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="text-center space-y-3">
                  <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon size={20} className="text-monks-accent" />
                  </div>
                  <p className="text-sm font-medium text-monks-black">{badge.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Cases */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="bg-white rounded-3xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-monks-black mb-4">
                  Book Your 72h Pilot
                </h2>
                <p className="text-monks-gray">
                  Tell us about your use case and we'll confirm a meeting slot within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Use Case *
                  </label>
                  <select
                    value={formData.useCase}
                    onChange={(e) => handleInputChange("useCase", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  >
                    <option value="">Select your primary use case</option>
                    <option value="lead-routing">Lead Routing & Qualification</option>
                    <option value="finance-ops">Finance Operations</option>
                    <option value="ticket-triage">Support Ticket Triage</option>
                    <option value="kpi-reporting">KPI Reporting & Dashboards</option>
                    <option value="other">Other (specify in timeline)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Current Stack
                  </label>
                  <input
                    type="text"
                    value={formData.stack}
                    onChange={(e) => handleInputChange("stack", e.target.value)}
                    placeholder="e.g., Salesforce, HubSpot, Slack, etc."
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Data Access Level
                  </label>
                  <select
                    value={formData.dataAccess}
                    onChange={(e) => handleInputChange("dataAccess", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  >
                    <option value="">Select access level</option>
                    <option value="full">Full API access available</option>
                    <option value="limited">Limited API access</option>
                    <option value="export">Data export only</option>
                    <option value="none">No current access</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Timeline & Notes
                  </label>
                  <textarea
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                    placeholder="When do you need this live? Any specific requirements?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-monks-black mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-monks-black mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
                >
                  Book 72h Pilot
                </button>
              </form>
            </div>

            {/* Mini Cases */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-monks-black mb-6">
                  Recent 72h Pilots
                </h3>
                <div className="space-y-6">
                  {miniCases.map((case_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-monks-black">{case_.title}</h4>
                        <span className="px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-xs">
                          {case_.industry}
                        </span>
                      </div>
                      <p className="text-monks-accent font-medium">{case_.result}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h4 className="font-semibold text-monks-black mb-3">What Happens Next?</h4>
                <div className="space-y-3 text-sm text-monks-gray">
                  <div className="flex gap-3">
                    <span className="text-monks-accent">1.</span>
                    <span>We review your use case within 24 hours</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-monks-accent">2.</span>
                    <span>30-minute scoping call to confirm requirements</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-monks-accent">3.</span>
                    <span>72 hours later: your automation is live</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-monks-accent">4.</span>
                    <span>Handoff with documentation and monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}