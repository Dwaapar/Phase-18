import React from "react";

const services = [
  {
    title: "Strategy & Consulting",
    description: "Digital transformation strategies that drive business growth and innovation.",
  },
  {
    title: "Creative & Content",
    description: "Compelling content and creative solutions that engage and inspire audiences.",
  },
  {
    title: "Technology & Data",
    description: "Cutting-edge technology solutions powered by data-driven insights.",
  },
  {
    title: "Media & Performance",
    description: "Integrated media strategies that maximize reach and performance.",
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
            We help brands navigate the complex digital landscape with integrated solutions 
            that span strategy, creativity, technology, and media.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div key={i} className="group text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mb-6">
                <div className="w-16 h-16 bg-monks-light-gray rounded-2xl flex items-center justify-center mx-auto group-hover:bg-monks-accent transition-colors duration-300">
                  <div className="text-2xl">
                    {i === 0 && "📊"}
                    {i === 1 && "🎨"}
                    {i === 2 && "⚡"}
                    {i === 3 && "📈"}
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