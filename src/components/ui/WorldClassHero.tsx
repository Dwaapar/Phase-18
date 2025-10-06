import React from 'react';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { TypewriterText } from './TypewriterText';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingElements } from './FloatingElements';

interface WorldClassHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  videoCta?: {
    label: string;
    href: string;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundVideo?: string;
  className?: string;
}

export const WorldClassHero: React.FC<WorldClassHeroProps> = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  videoCta,
  stats,
  backgroundVideo,
  className
}) => {
  return (
    <section className={cn('relative min-h-screen bg-monks-black text-white overflow-hidden', className)}>
      {/* Background Elements */}
      <AnimatedBackground variant="gradient" />
      <FloatingElements count={8} />
      
      {/* Background Video */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-monks-black/90 via-monks-black/70 to-monks-black/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-5xl">
            {/* Subtitle */}
            {subtitle && (
              <div className="flex items-center gap-2 mb-8 animate-fade-in">
                <Sparkles size={20} className="text-monks-accent" />
                <span className="text-monks-accent font-medium text-lg">{subtitle}</span>
              </div>
            )}
            
            {/* Main headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none animate-fade-in">
              {title}
            </h1>
            
            {/* Description */}
            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link
                to={primaryCta.href}
                className="group bg-white text-monks-black px-8 py-4 rounded-full font-medium text-lg hover:bg-monks-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                {primaryCta.label}
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
              
              {secondaryCta && (
                <Link
                  to={secondaryCta.href}
                  className="group border-2 border-white/30 text-white px-8 py-4 rounded-full font-medium text-lg hover:border-white hover:bg-white hover:text-monks-black transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {secondaryCta.label}
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              )}
              
              {videoCta && (
                <Link
                  to={videoCta.href}
                  className="group border-2 border-monks-accent text-monks-accent px-8 py-4 rounded-full font-medium text-lg hover:bg-monks-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Play size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  {videoCta.label}
                </Link>
              )}
            </div>
            
            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};