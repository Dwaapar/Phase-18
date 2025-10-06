import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Settings, Play, Monitor } from "lucide-react";

const steps = [
  {
    icon: Download,
    title: "Browse & Select",
    description: "Choose from 350+ pre-built workflows organized by department and use case.",
    details: ["Filter by complexity", "Read reviews and ratings", "Preview workflow steps"]
  },
  {
    icon: Settings,
    title: "Configure Environment",
    description: "Set up your environment variables and API connections securely.",
    details: ["Encrypted credential storage", "Test connections", "Set custom parameters"]
  },
  {
    icon: Play,
    title: "One-Click Deploy",
    description: "Deploy instantly to your infrastructure with automated setup.",
    details: ["Automatic dependency installation", "Health checks", "Rollback capability"]
  },
  {
    icon: Monitor,
    title: "Monitor & Scale",
    description: "Track performance with real-time logs and metrics.",
    details: ["Live execution logs", "Performance metrics", "Error alerts"]
  }
];

export default function HowItWorksPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">How 1-Click Deploy Works</h1>
            <p className="text-xl text-white/80">
              From selection to production in minutes, not hours. Our deployment system 
              handles the complexity so you can focus on results.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`space-y-6 ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
                        <Icon size={24} className="text-monks-accent" />
                      </div>
                      <div className="text-4xl font-bold text-monks-gray/20">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-monks-black">{step.title}</h2>
                      <p className="text-xl text-monks-gray leading-relaxed">{step.description}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, j) => (
                        <li key={j} className="flex items-center gap-3 text-monks-gray">
                          <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`bg-monks-light-gray rounded-3xl p-12 ${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="aspect-square bg-white rounded-2xl flex items-center justify-center">
                      <div className="text-center text-monks-gray">
                        <Icon size={48} className="mx-auto mb-4 text-monks-accent" />
                        <p className="text-lg font-medium">Step {i + 1} Visual</p>
                        <p className="text-sm mt-2">Interactive demo or<br />screenshot placeholder</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">
              Enterprise-Grade Deployment
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Built with security, reliability, and scale in mind from day one.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Secure by Default",
                description: "All credentials encrypted at rest and in transit with enterprise-grade security."
              },
              {
                title: "Automatic Rollbacks",
                description: "Failed deployments automatically rollback to the last known good state."
              },
              {
                title: "Health Monitoring",
                description: "Continuous health checks with automatic alerts for any issues."
              },
              {
                title: "Version Control",
                description: "Full version history with the ability to rollback to any previous version."
              },
              {
                title: "Audit Trails",
                description: "Complete audit logs for compliance and debugging purposes."
              },
              {
                title: "Multi-Environment",
                description: "Deploy to dev, staging, and production with environment-specific configs."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 space-y-3">
                <h3 className="font-semibold text-monks-black">{feature.title}</h3>
                <p className="text-monks-gray text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-display font-bold text-monks-black">
              Ready to Deploy Your First Workflow?
            </h2>
            <p className="text-xl text-monks-gray">
              Browse our library of 350+ workflows and deploy in minutes.
            </p>
            <Link
              to="/workflows"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Browse Workflows
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}