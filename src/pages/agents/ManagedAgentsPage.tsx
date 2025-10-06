import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Bot, Shield, Zap, BarChart, CheckCircle, Clock, Users } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";
import { FeatureGrid } from "../../components/ui/FeatureGrid";
import { ComparisonTable } from "../../components/ui/ComparisonTable";
import { TestimonialCard } from "../../components/ui/TestimonialCard";

const managedFeatures = [
  {
    title: "Zero Infrastructure Management",
    description: "We handle all the technical complexity so you can focus on business outcomes",
    icon: Shield,
    features: ["Automatic scaling", "Security updates", "Performance monitoring", "Backup & recovery"]
  },
  {
    title: "24/7 Monitoring & Support",
    description: "Round-the-clock monitoring with proactive issue resolution and expert support",
    icon: Clock,
    features: ["Real-time monitoring", "Proactive alerts", "Expert support", "SLA guarantees"]
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security with SOC 2 compliance and enterprise-grade data protection",
    icon: Shield,
    features: ["SOC 2 certified", "End-to-end encryption", "Access controls", "Audit trails"]
  },
  {
    title: "Intelligent Optimization",
    description: "AI-powered performance optimization and continuous learning from interactions",
    icon: Zap,
    features: ["Performance tuning", "Learning algorithms", "Response optimization", "Behavior analysis"]
  },
  {
    title: "Advanced Analytics",
    description: "Comprehensive insights into agent performance and business impact",
    icon: BarChart,
    features: ["Performance dashboards", "Conversation analytics", "ROI tracking", "Custom reports"]
  },
  {
    title: "Seamless Integration",
    description: "Pre-built integrations with popular business tools and custom API connections",
    icon: Users,
    features: ["CRM integration", "Help desk tools", "Communication platforms", "Custom APIs"]
  }
];

const comparisonData = {
  products: ["Managed Agents", "Self-Hosted", "Traditional Chatbots"],
  features: [
    { name: "Setup Time", values: ["< 5 minutes", "2-4 weeks", "1-2 weeks"] },
    { name: "Infrastructure Management", values: [true, false, false] },
    { name: "Automatic Updates", values: [true, false, false] },
    { name: "24/7 Support", values: [true, false, false] },
    { name: "Enterprise Security", values: [true, "DIY", "Basic"] },
    { name: "Custom Training", values: [true, true, false] },
    { name: "Advanced Analytics", values: [true, "Limited", "Basic"] },
    { name: "Scalability", values: ["Automatic", "Manual", "Limited"] },
    { name: "Total Cost of Ownership", values: ["Low", "High", "Medium"] }
  ]
};

const managedAgentTypes = [
  {
    name: "SDR Agent",
    description: "Automated sales development and lead qualification",
    capabilities: ["Lead outreach", "Email sequences", "Meeting booking", "CRM updates"],
    pricing: "Starting at $299/month",
    setupTime: "< 5 minutes"
  },
  {
    name: "Support Agent",
    description: "24/7 customer support with intelligent escalation",
    capabilities: ["Instant responses", "Ticket routing", "Knowledge base", "Escalation workflows"],
    pricing: "Starting at $199/month",
    setupTime: "< 5 minutes"
  },
  {
    name: "Operations Agent",
    description: "Process automation and workflow management",
    capabilities: ["Task automation", "Process monitoring", "Alert management", "Reporting"],
    pricing: "Starting at $399/month",
    setupTime: "< 10 minutes"
  }
];

const benefits = [
  "No technical expertise required",
  "Instant deployment and scaling",
  "Guaranteed uptime and performance",
  "Continuous learning and improvement",
  "Enterprise-grade security",
  "24/7 expert support",
  "Predictable monthly pricing",
  "Regular feature updates"
];

const testimonial = {
  name: "Rachel Green",
  role: "VP of Customer Success",
  company: "TechFlow Solutions",
  quote: "Our managed support agent has been incredible. It handles 80% of our customer inquiries automatically, and our team can focus on complex issues. The setup was literally 5 minutes, and it's been running flawlessly for 6 months.",
  avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  rating: 5
};

export default function ManagedAgentsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Managed AI Agents"
        description="Deploy enterprise-grade AI agents in minutes with zero infrastructure management. We handle the complexity, you get the results."
        variant="dark"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-green-400" />
            <span>5-Minute Setup</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-green-400" />
            <span>Enterprise Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-green-400" />
            <span>24/7 Support</span>
          </div>
        </div>
      </PageHeader>

      <ContentSection
        title="Why Choose Managed Agents?"
        description="Focus on your business while we handle all the technical complexity of running enterprise-grade AI agents."
        variant="default"
      >
        <FeatureGrid features={managedFeatures} columns={3} />
      </ContentSection>

      <ContentSection
        title="Available Managed Agents"
        description="Choose from our library of pre-trained, production-ready AI agents designed for specific business functions."
        variant="gray"
      >
        <div className="grid gap-8 md:grid-cols-3">
          {managedAgentTypes.map((agent, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Bot size={24} className="text-white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-monks-black">{agent.name}</h3>
                  <p className="text-monks-gray">{agent.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-monks-black mb-3">Capabilities:</h4>
                  <ul className="space-y-2">
                    {agent.capabilities.map((capability, j) => (
                      <li key={j} className="flex items-center gap-3 text-monks-gray">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-sm">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-monks-gray/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-monks-gray">Pricing:</span>
                    <span className="text-monks-black font-medium">{agent.pricing}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-monks-gray">Setup Time:</span>
                    <span className="text-monks-accent font-medium">{agent.setupTime}</span>
                  </div>
                </div>
                
                <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                  Deploy {agent.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Managed vs Self-Hosted Comparison"
        description="Compare deployment options to choose what's best for your organization."
        variant="default"
      >
        <ComparisonTable
          products={comparisonData.products}
          features={comparisonData.features}
        />
      </ContentSection>

      <ContentSection
        title="Why Teams Choose Managed"
        description="The benefits that make managed agents the preferred choice for most organizations."
        variant="gray"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-monks-black font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Customer Success Story"
        variant="default"
      >
        <div className="max-w-3xl mx-auto">
          <TestimonialCard {...testimonial} />
        </div>
      </ContentSection>

      <ContentSection
        title="Ready to Deploy Your First Managed Agent?"
        description="Get started in minutes with our most popular agents, or contact our team for a custom solution."
        variant="gray"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8">
            <Bot size={48} className="text-monks-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-monks-black mb-4">Start with SDR Agent</h3>
            <p className="text-monks-gray mb-6">
              Our most popular agent for sales development and lead qualification. Deploy in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/agents/new?type=sdr"
                className="flex-1 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
              >
                Deploy SDR Agent
              </Link>
              <Link
                to="/contact?type=agents"
                className="flex-1 border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300"
              >
                Custom Solution
              </Link>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}