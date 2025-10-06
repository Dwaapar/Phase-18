import React from "react";
import { Link } from "react-router-dom";
import { EnterpriseShowcase } from "../ui/EnterpriseShowcase";
import { WorldClassFeatures } from "../ui/WorldClassFeatures";

export default function EnterpriseOutcomes() {
  return (
    <>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="text-5xl sm:text-6xl font-bold text-monks-black">350+</div>
              <div className="text-monks-gray text-sm sm:text-base">Workflows</div>
            </div>
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="text-5xl sm:text-6xl font-bold text-monks-black">10,000+</div>
              <div className="text-monks-gray text-sm sm:text-base">Teams</div>
            </div>
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="text-5xl sm:text-6xl font-bold text-monks-black">1M+</div>
              <div className="text-monks-gray text-sm sm:text-base">Hours Saved</div>
            </div>
          </div>
          
          <div className="bg-monks-light-gray rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl font-medium text-monks-black mb-2">
              72h Revenue Lift Case Study
            </p>
            <p className="text-monks-gray mb-4 text-base sm:text-lg">
              3 workflows + 1 SDR agent → <span className="text-monks-accent font-semibold">23% MQL uplift</span> in one week
            </p>
            <Link 
              to="/case-studies/saas-72h-uptick" 
              className="text-monks-accent hover:text-monks-black transition-colors font-medium text-base sm:text-lg"
            >
              Read the case →
            </Link>
          </div>
        </div>
      </section>
      
      <WorldClassFeatures />
      <EnterpriseShowcase />
    </>
  );
}