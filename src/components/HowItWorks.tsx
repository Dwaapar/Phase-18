import React from "react";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose",
    desc: "Browse guides, quizzes, and marketplace to find exactly what you need.",
  },
  {
    number: "02",
    title: "Deploy",
    desc: "One-click deployment or book a 72h pilot build for custom solutions.",
  },
  {
    number: "03",
    title: "Scale",
    desc: "Monitor metrics, iterate, and automate everything that works.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-display font-bold text-monks-black">
                How it works
              </h2>
              <p className="text-xl text-monks-gray leading-relaxed">
                Three simple steps to transform your business operations and accelerate growth.
              </p>
            </div>
            
            <a
              href="/signup"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Get Started Free
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
          
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-monks-accent rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-monks-black">{step.title}</h3>
                  <p className="text-monks-gray leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}