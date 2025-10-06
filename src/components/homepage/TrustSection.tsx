import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Headphones } from "lucide-react";

const trustPoints = [
  {
    title: "Security",
    description: "Bank-grade encryption and security protocols",
    icon: Shield,
    link: "/trust/security"
  },
  {
    title: "Compliance",
    description: "GDPR, CCPA, DPA ready with full audit trails",
    icon: Lock,
    link: "/trust/compliance"
  },
  {
    title: "Support",
    description: "24/7 humans + agents always available",
    icon: Headphones,
    link: "/support"
  }
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-white border-y border-monks-gray/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {trustPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <Link
                key={i}
                to={point.link}
                className="group text-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-monks-light-gray transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-monks-accent/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto group-hover:bg-monks-accent/20 transition-colors duration-300">
                  <Icon size={20} className="sm:w-6 sm:h-6 text-monks-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-monks-gray text-sm sm:text-base">{point.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}