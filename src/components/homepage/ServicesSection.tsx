import React from "react";

const services = [
  {
    title: "Automation Services",
    description: "Custom automation built and maintained by our team. From lead routing to finance ops.",
    icon: "⚡"
  },
  {
    title: "Workflow Store",
    description: "350+ pre-built workflows with one-click deployment. Env/secrets, patch notes, evergreen guides.",
    icon: "🔄"
  },
  {
    title: "AI Agents",
    description: "Agents that act, not just chat. SDR, Support, Ops with managed or self-hosted deployment.",
    icon: "🤖"
  },
  {
    title: "Decision Platform",
    description: "Clarity in the chaos. Best-X-for-Y guides, comparisons, and adaptive quizzes.",
    icon: "🎯"
  },
];

export default function ServicesSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="max-width-container">
        <div className="text-center mb-20">
          <h2 className="text-display font-bold text-monks-black mb-6">
            What We Do
          </h2>
          <p className="text-xl text-monks-text-gray text-container leading-relaxed">
            We help businesses navigate the complex automation landscape with integrated solutions 
            that span decision-making, workflow automation, AI agents, and intelligent execution.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div key={i} className="group text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mb-6">
                <div className="w-16 h-16 bg-monks-light-gray rounded-2xl flex items-center justify-center mx-auto group-hover:bg-monks-accent transition-colors duration-300">
                  <div className="text-2xl">
                    {service.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-monks-black mb-4 group-hover:text-monks-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-monks-text-gray leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}