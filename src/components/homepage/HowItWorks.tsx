import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search, Zap, BarChart } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose",
    desc: "Browse guides, quizzes, and marketplace to find exactly what you need.",
    icon: Search,
    color: "from-blue-400 to-cyan-500"
  },
  {
    number: "02", 
    title: "Deploy",
    desc: "One-click deployment or book a 72h pilot build for custom solutions.",
    icon: Zap,
    color: "from-yellow-400 to-orange-500"
  },
  {
    number: "03",
    title: "Scale",
    desc: "Monitor metrics, iterate, and automate everything that works.",
    icon: BarChart,
    color: "from-green-400 to-emerald-500"
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-40 bg-monks-light-gray relative overflow-hidden">
      {/* Monks-style background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-monks-accent/10 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-px bg-gradient-to-r from-monks-accent to-transparent"></div>
                  <span className="text-monks-accent font-light text-lg tracking-[0.2em] uppercase">
                    How It Works
                  </span>
                </div>
                <h2 className="text-8xl lg:text-9xl font-bold text-monks-black leading-[0.8] tracking-tight">
                  Three Simple<br/>
                  <span className="italic font-light">Steps</span>
                </h2>
              </div>
              
              <p className="text-3xl text-monks-gray leading-[1.4] font-light max-w-2xl">
                Transform your business operations and accelerate growth with our proven methodology.
              </p>
            </div>
            
            <Link
              to="/signup"
              className="inline-flex items-center gap-4 bg-monks-black text-white px-12 py-6 rounded-full font-semibold text-2xl hover:bg-monks-accent transition-all duration-500 group shadow-2xl"
            >
              Start Free
              <ArrowUpRight size={24} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-10 animate-slide-up group" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="flex-shrink-0">
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={36} className="text-white" />
                    </div>
                  </div>
                  <div className="space-y-6 pt-2">
                    <div className="flex items-center gap-6">
                      <span className="text-8xl font-bold text-monks-gray/10">{step.number}</span>
                      <h3 className="text-4xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-2xl text-monks-gray leading-relaxed font-light max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}