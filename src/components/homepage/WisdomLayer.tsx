import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers, Zap, Target } from "lucide-react";

export default function WisdomLayer() {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      {/* Monks-style background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#000000_1px,transparent_0)] bg-[length:60px_60px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-px bg-gradient-to-r from-monks-black to-transparent"></div>
                  <span className="text-monks-black font-light text-lg tracking-[0.2em] uppercase">
                    What We Do
                  </span>
                </div>
                <h2 className="text-8xl lg:text-9xl font-bold text-monks-black leading-[0.8] tracking-tight">
                  The Wisdom<br/>
                  <span className="italic font-light">Layer</span>
                </h2>
              </div>
              
              <p className="text-3xl text-monks-gray leading-[1.4] font-light max-w-2xl">
                We connect the dots between decision-making, workflow automation, 
                AI agents, and intelligent execution—turning complexity into momentum 
                for businesses worldwide.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <Link
                to="/platform"
                className="group bg-monks-black text-white px-10 py-5 rounded-full font-semibold text-xl hover:bg-monks-accent transition-all duration-500 flex items-center justify-center gap-4 shadow-xl"
              >
                Explore Platform
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/case-studies"
                className="group border-2 border-monks-black/20 text-monks-black px-10 py-5 rounded-full font-semibold text-xl hover:border-monks-black hover:bg-monks-black hover:text-white transition-all duration-500 flex items-center justify-center gap-4"
              >
                See Results
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
          
          {/* Monks-style visual element */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-monks-light-gray via-white to-monks-light-gray rounded-3xl p-16 shadow-2xl relative overflow-hidden">
              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#000_75%),linear-gradient(-45deg,transparent_75%,#000_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]"></div>
              </div>
              
              <div className="w-full h-full bg-gradient-to-br from-monks-accent/5 to-purple-500/5 rounded-2xl flex items-center justify-center relative">
                {/* Floating geometric elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-monks-accent/30 rounded-2xl rotate-12 animate-float"></div>
                  <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-monks-accent/20 rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-monks-accent/30 rounded-xl animate-float" style={{ animationDelay: '3s' }}></div>
                </div>
                
                {/* Central element - monks.com inspired */}
                <div className="text-center z-10">
                  <div className="w-32 h-32 bg-gradient-to-br from-monks-black to-monks-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
                    <div className="w-16 h-16 bg-white rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 rounded-3xl"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-monks-black mb-3">
                    Seven Engines
                  </h3>
                  <p className="text-xl text-monks-gray font-light">
                    One Ecosystem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}