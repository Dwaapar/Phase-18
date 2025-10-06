import React from "react";

export default function ProofStrip() {
  return (
    <section className="py-16 bg-white border-y border-monks-gray/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-monks-gray text-lg">Trusted by forward-thinking teams</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-monks-black">350+</div>
            <div className="text-monks-gray">Deployable Workflows</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-monks-black">1,000+</div>
            <div className="text-monks-gray">Teams Helped</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-monks-black">100k+</div>
            <div className="text-monks-gray">Hours Saved</div>
          </div>
        </div>
        
        <div className="bg-monks-light-gray rounded-3xl p-8 text-center max-w-4xl mx-auto">
          <p className="text-xl font-medium text-monks-black mb-2">
            72h Revenue Lift Case Study
          </p>
          <p className="text-monks-gray mb-4">
            3 workflows + 1 SDR agent → <span className="text-monks-accent font-semibold">23% MQL uplift</span> in one week
          </p>
          <a href="/case-studies" className="text-monks-accent hover:text-monks-black transition-colors font-medium">
            View Case Study →
          </a>
        </div>
      </div>
    </section>
  );
}