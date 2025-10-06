import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers, Settings, Shield, BarChart, Puzzle } from "lucide-react";

const platformFeatures = [
  {
    title: "Architecture",
    description: "Seven integrated engines working as one unified system",
    icon: Layers,
    details: ["Microservices architecture", "Event-driven communication", "Scalable infrastructure"]
  },
  {
    title: "Orchestration",
    description: "Intelligent workflow coordination across all platforms",
    icon: Settings,
    details: ["Cross-platform automation", "Smart routing", "Dependency management"]
  },
  {
    title: "Guardrails",
    description: "Built-in safety and compliance controls",
    icon: Shield,
    details: ["Approval workflows", "Risk assessment", "Audit trails"]
  },
  {
    title: "Observability",
    description: "Real-time monitoring and performance insights",
    icon: BarChart,
    details: ["Live dashboards", "Performance metrics", "Alert systems"]
  },
  {
    title: "Extensibility",
    description: "Open APIs and custom integrations",
    icon: Puzzle,
    details: ["REST APIs", "Webhooks", "Custom connectors"]
  }
];

export default function PlatformPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">
              Seven engines.<br />One motion.
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              The Findawise platform unifies automation, intelligence, and decision-making 
              into a single, powerful ecosystem designed for enterprise scale.
            </p>
            <Link
              to="/contact?type=solutions"
              className="inline-flex items-center gap-2 bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300 group"
            >
              Talk to Solutions
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">
              Built for Enterprise Scale
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Every component designed with security, compliance, and performance at its core.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-monks-light-gray rounded-3xl p-8 space-y-6">
                  <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
                    <Icon size={24} className="text-monks-accent" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-monks-black">{feature.title}</h3>
                    <p className="text-monks-gray">{feature.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {feature.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-3 text-monks-gray">
                        <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-display font-bold text-monks-black">
              Ready to See the Platform in Action?
            </h2>
            <p className="text-xl text-monks-gray">
              Schedule a personalized demo and discover how Findawise can transform your operations.
            </p>
            <Link
              to="/contact?type=solutions"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Schedule Demo
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}