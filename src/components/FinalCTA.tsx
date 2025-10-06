import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-monks-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-display font-bold text-white mb-6">
            Build smarter.<br />
            Scale faster.<br />
            Decide wiser.
          </h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Your business deserves momentum. Start transforming your operations in minutes, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/signup"
              className="bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
            <Link
              to="/automation/pilot"
              className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-monks-black transition-all duration-300"
            >
              Book 72h Pilot
            </Link>
          </div>
          
          <p className="text-white/60 text-sm pt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}