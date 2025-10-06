import React from 'react';
import { Zap, Shield, Globe, Users, BarChart, Rocket } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WorldClassFeaturesProps {
  className?: string;
}

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Deploy automations in minutes, not months",
    metric: "< 5 min",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with SOC 2 compliance",
    metric: "99.9%",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Trusted by companies in 50+ countries",
    metric: "50+",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built for teams with advanced sharing",
    metric: "∞",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: BarChart,
    title: "Real-time Analytics",
    description: "Monitor performance with live dashboards",
    metric: "24/7",
    color: "from-indigo-400 to-blue-500"
  },
  {
    icon: Rocket,
    title: "Continuous Innovation",
    description: "New features shipped every week",
    metric: "Weekly",
    color: "from-red-400 to-pink-500"
  }
];

export const WorldClassFeatures: React.FC<WorldClassFeaturesProps> = ({ className }) => {
  return (
    <section className={cn('py-24 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-monks-black mb-6">
            World-Class Platform
          </h2>
          <p className="text-xl text-monks-gray max-w-3xl mx-auto">
            Built with enterprise-grade capabilities and designed for teams that demand excellence.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative bg-white rounded-3xl p-8 border border-monks-gray/10 hover:shadow-card transition-all duration-500 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500',
                  feature.color
                )} />
                
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br',
                      feature.color
                    )}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-monks-black">{feature.metric}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-monks-gray leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};