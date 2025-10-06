import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Zap, RefreshCw, Package, Bot, Link2, Target, Wrench } from "lucide-react";

const engines = [
  {
    title: "Automation Services",
    subtitle: "We build it for you.",
    bullets: ["Lead routing", "Finance ops", "Ticket triage", "KPI reporting"],
    primaryCta: { label: "Book 72h Pilot", href: "/automation/pilot" },
    secondaryCta: { label: "Delivery & SLAs", href: "/automation" },
    icon: Zap,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    bgPattern: "from-amber-50 to-orange-50",
    accentColor: "text-amber-600",
    hoverGlow: "hover:shadow-[0_20px_60px_-12px_rgba(251,146,60,0.4)]"
  },
  {
    title: "Workflow Store",
    subtitle: "Prebuilt flows, 1-click deploy.",
    bullets: ["Env/secrets", "Patch notes", "Evergreen guides"],
    primaryCta: { label: "Browse 350+", href: "/workflows" },
    secondaryCta: { label: "How deploy works", href: "/workflows/how-it-works" },
    icon: RefreshCw,
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
    bgPattern: "from-blue-50 to-cyan-50",
    accentColor: "text-blue-600",
    hoverGlow: "hover:shadow-[0_20px_60px_-12px_rgba(59,130,246,0.4)]"
  },
  {
    title: "Digital Assets",
    subtitle: "Accelerators for growth.",
    bullets: ["Prompt packs", "Datasets", "Playbooks", "Design kits"],
    primaryCta: { label: "Download & Go Live", href: "/assets" },
    secondaryCta: { label: "My Library", href: "/dashboard/library" },
    icon: Package,
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    bgPattern: "from-emerald-50 to-green-50",
    accentColor: "text-emerald-600",
    hoverGlow: "hover:shadow-[0_20px_60px_-12px_rgba(16,185,129,0.4)]"
  },
  {
    title: "AI Agents",
    subtitle: "Agents that act, not just chat.",
    bullets: ["SDR", "Support", "Ops", "Managed/Self-host"],
    primaryCta: { label: "Deploy Your First Agent", href: "/agents/new" },
    secondaryCta: { label: "Gallery", href: "/agents" },
    icon: Bot,
    gradient: "from-purple-400 via-violet-500 to-purple-600",
    bgPattern: "from-purple-50 to-violet-50",
    accentColor: "text-purple-600",
    hoverGlow: "hover:shadow-[0_20px_60px_-12px_rgba(147,51,234,0.4)]"
  },
  {
    title: "Affiliate Hub",
    subtitle: "Promote the best brands.",
    bullets: ["Smart links", "Creative rotation", "Real-time EPC/CVR"],
    primaryCta: { label: "Open Affiliate Hub", href: "/affiliate" },
    secondaryCta: { label: "My Offers", href: "/dashboard/affiliate" },
    icon: Link2,
    gradient: "from-indigo-400 via-blue-500 to-purple-500",
    bgPattern: "from-indigo-50 to-blue-50",
    accentColor: "text-indigo-600",
    hoverGlow: "hover:shadow-[0_20px_60px_-12px_rgba(99,102,241,0.4)]"
  },
  {
    title: "Decision Platform",
    subtitle: "Clarity in the chaos.",
    bullets: ["Best-X-for-Y", "Comparisons", "Adaptive quiz"],
    primaryCta: { label: "Take the 2-Minute Quiz", href: "/decision/quiz" },
    secondaryCta: { label: "Guides", href: "/decision/guides" },
    icon: Target,
    gradient: "from-rose-400 via-pink-500 to-red-500",
    bgPattern: "from-rose-50 to-pink-50",
    accentColor: "text-rose-600",
    hoverGlow: "hover:shadow-[0_20px_60px_-12px_rgba(244,63,94,0.4)]"
  },
  {
    title: "Services & Tools",
    subtitle: "Everyday essentials.",
    bullets: ["Resume", "Cover Letter", "Portfolio", "Email Optimizer"],
    primaryCta: { label: "Try Tools Now", href: "/tools" },
    icon: Wrench,
    gradient: "from-teal-400 via-cyan-500 to-blue-500",
    bgPattern: "from-teal-50 to-cyan-50",
    accentColor: "text-teal-600",
    hoverGlow: "hover:shadow-[0_20px_60px_-12px_rgba(20,184,166,0.4)]"
  },
];

export default function SevenEngines() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Monks-style background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-monks-accent/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header Section - Monks.com style */}
        <div className="text-center mb-20">
          <div className="space-y-8">
            {/* Monks-style section label */}
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-monks-black to-transparent"></div>
              <span className="text-monks-black font-medium text-sm tracking-[0.3em] uppercase">
                Platform Overview
              </span>
              <div className="w-16 h-px bg-gradient-to-r from-monks-black via-transparent to-transparent"></div>
            </div>
            
            {/* Monks-style massive typography */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-monks-black leading-[0.85] tracking-tight mb-8">
              Seven Integrated<br/>
              <span className="italic font-light bg-gradient-to-r from-monks-black via-monks-accent to-monks-black bg-clip-text text-transparent">
                Engines
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-monks-gray max-w-4xl mx-auto leading-relaxed font-light">
              Each engine is a complete ecosystem designed to accelerate your business operations 
              with precision and intelligence.
            </p>
          </div>
        </div>
        
        {/* Cards Grid - Monks.com inspired design */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-20">
          {engines.map((engine, i) => {
            const Icon = engine.icon;
            return (
              <div 
                key={i}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-subtle transition-all duration-700 border border-monks-gray/5 backdrop-blur-sm animate-slide-up ${engine.hoverGlow} hover:scale-[1.02] hover:-translate-y-2`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${engine.bgPattern} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-monks-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-[1px]">
                  <div className="w-full h-full bg-white rounded-3xl"></div>
                </div>
                
                <div className="relative p-8 space-y-8">
                  {/* Icon and visual element */}
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 bg-gradient-to-br ${engine.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
                      <Icon size={24} className="text-white relative z-10" />
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    
                    {/* Floating accent dot */}
                    <div className={`w-3 h-3 bg-gradient-to-br ${engine.gradient} rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse`}></div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-monks-black group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500" 
                          style={{ 
                            backgroundImage: `linear-gradient(135deg, ${engine.gradient.includes('amber') ? '#f59e0b, #ef4444' : 
                                                                      engine.gradient.includes('blue') ? '#3b82f6, #06b6d4' :
                                                                      engine.gradient.includes('emerald') ? '#10b981, #14b8a6' :
                                                                      engine.gradient.includes('purple') ? '#8b5cf6, #a855f7' :
                                                                      engine.gradient.includes('indigo') ? '#6366f1, #8b5cf6' :
                                                                      engine.gradient.includes('rose') ? '#f43f5e, #ec4899' :
                                                                      '#14b8a6, #3b82f6'})`
                          }}>
                        {engine.title}
                      </h3>
                      <p className="text-lg text-monks-gray font-light leading-relaxed group-hover:text-monks-black transition-colors duration-300">
                        {engine.subtitle}
                      </p>
                    </div>
                    
                    {/* Enhanced bullet points */}
                    <ul className="space-y-3">
                      {engine.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-center gap-3 text-monks-gray group-hover:text-monks-black transition-colors duration-300">
                          <div className={`w-2 h-2 bg-gradient-to-r ${engine.gradient} rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300`} style={{ animationDelay: `${j * 0.1}s` }}></div>
                          <span className="font-medium">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-6 space-y-4">
                    {/* Primary CTA with enhanced styling */}
                    <Link
                      to={engine.primaryCta.href}
                      className={`relative bg-gradient-to-r ${engine.gradient} text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2 group/btn shadow-lg overflow-hidden`}
                    >
                      {/* Button shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      
                      <span className="relative z-10 text-sm">{engine.primaryCta.label}</span>
                      <ArrowUpRight size={16} className="relative z-10 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                    </Link>
                    
                    {/* Secondary CTA */}
                    {engine.secondaryCta && (
                      <Link 
                        to={engine.secondaryCta.href} 
                        className={`${engine.accentColor} hover:text-monks-black transition-colors duration-300 text-center block font-medium text-sm relative group/secondary`}
                      >
                        <span className="relative">
                          {engine.secondaryCta.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover/secondary:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                  <div className={`absolute top-4 right-4 w-1.5 h-1.5 bg-gradient-to-r ${engine.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-bounce`}></div>
                  <div className={`absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r ${engine.gradient} rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 animate-bounce`} style={{ animationDelay: '0.5s' }}></div>
                  <div className={`absolute top-1/3 left-4 w-0.5 h-0.5 bg-gradient-to-r ${engine.gradient} rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-600 animate-bounce`} style={{ animationDelay: '1s' }}></div>
                </div>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${engine.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-3xl rounded-tr-3xl`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom CTA section with monks.com styling */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-monks-black via-monks-dark-gray to-monks-medium-gray rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
            
            <div className="relative space-y-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="text-white/60 font-light text-sm tracking-[0.2em] uppercase">
                  Ready to Transform?
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-white/30 via-transparent to-transparent"></div>
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight">
                Seven engines.<br/>
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-monks-accent to-white">
                  One motion.
                </span>
              </h3>
              
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                Experience the power of integrated automation across every aspect of your business operations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <Link
                  to="/signup"
                  className="group bg-white text-monks-black px-10 py-5 rounded-full font-semibold text-xl hover:bg-monks-accent hover:text-white transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl hover:shadow-glow-xl"
                >
                  Get Started Free
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
                
                <Link
                  to="/platform"
                  className="group border-2 border-white/30 text-white px-10 py-5 rounded-full font-semibold text-xl hover:border-white hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-3"
                >
                  Explore Platform
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
              
              <div className="pt-6 text-white/50 text-sm">
                No credit card required • 14-day free trial • Cancel anytime
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-monks-accent/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}