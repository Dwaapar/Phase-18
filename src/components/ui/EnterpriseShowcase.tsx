import React from 'react';
import { Building2, Users, Globe, Shield, TrendingUp, Award } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EnterpriseShowcaseProps {
  className?: string;
}

const enterpriseFeatures = [
  {
    icon: Building2,
    title: "Enterprise Scale",
    description: "Built to handle millions of workflows with 99.9% uptime SLA",
    stats: "10M+ workflows executed"
  },
  {
    icon: Shield,
    title: "Security First",
    description: "SOC 2 Type II, ISO 27001, and industry-specific compliance",
    stats: "Zero security incidents"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Advanced team features with role-based access and audit trails",
    stats: "Unlimited team members"
  },
  {
    icon: Globe,
    title: "Global Deployment",
    description: "Multi-region deployment with data residency compliance",
    stats: "50+ countries supported"
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Real-time monitoring with custom dashboards and alerting",
    stats: "Sub-second response times"
  },
  {
    icon: Award,
    title: "Dedicated Support",
    description: "24/7 enterprise support with dedicated success managers",
    stats: "< 15 min response time"
  }
];

const enterpriseLogos = [
  "Fortune 500 Company A",
  "Global Tech Corp",
  "Enterprise Solutions Inc",
  "International Bank",
  "Healthcare System",
  "Government Agency"
];

export const EnterpriseShowcase: React.FC<EnterpriseShowcaseProps> = ({ className }) => {
  return (
    <section className={cn('py-24 bg-monks-black text-white', className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Trusted by Enterprise Leaders
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From Fortune 500 companies to fast-growing startups, organizations worldwide 
            trust Findawise for their mission-critical automation needs.
          </p>
        </div>
        
        {/* Enterprise Logos */}
        <div className="mb-16">
          <p className="text-center text-white/60 mb-8">Trusted by industry leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 opacity-60">
            {enterpriseLogos.map((logo, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Building2 size={24} className="text-white/60" />
                </div>
                <div className="text-xs text-white/60">{logo}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {enterpriseFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/60">Performance</div>
                      <div className="text-lg font-bold text-white">{feature.stats}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-monks-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready for Enterprise-Grade Automation?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join the enterprise leaders already transforming their operations with Findawise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300">
                Schedule Enterprise Demo
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-monks-black transition-all duration-300">
                View Enterprise Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};