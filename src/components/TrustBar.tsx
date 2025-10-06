import React from "react";

const trustPoints = [
  {
    title: "Bank-grade Security",
    desc: "Enterprise protocols & encryption"
  },
  {
    title: "Full Compliance",
    desc: "GDPR, CCPA, DPA ready"
  },
  {
    title: "Support 24/7",
    desc: "Bots + human support always on"
  }
];

export default function TrustBar() {
  return (
    <section className="py-16 bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPoints.map((point, i) => (
            <div key={i} className="text-center space-y-3 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-monks-black">{point.title}</h3>
                <p className="text-monks-gray">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

{/* Alternative minimal version */}
export function MinimalTrustBar() {
  return (
    <section className="py-12 border-y border-monks-gray/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 text-center">
          {trustPoints.map((point, i) => (
            <div key={i} className="space-y-1">
              <div className="text-sm font-medium text-monks-black">{point.title}</div>
              <div className="text-xs text-monks-gray">{point.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

{/* Logo trust bar version */}
export function LogoTrustBar() {
  const logos = [
    "Company A", "Company B", "Company C", "Company D", "Company E"
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-monks-gray">Trusted by industry leaders</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {logos.map((logo, i) => (
            <div key={i} className="text-monks-gray font-medium">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

{/* Feature trust bar */}
export function FeatureTrustBar() {
  return (
    <section className="py-16 bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPoints.map((point, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-6 h-6 bg-monks-accent rounded-lg"></div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-monks-black">{point.title}</h3>
                <p className="text-monks-gray text-sm">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}