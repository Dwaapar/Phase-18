import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface DomainCardProps {
  title: string;
  subtitle: string;
  bullets: string[];
  mainCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  index?: number;
}

export default function DomainCard({
  title,
  subtitle,
  bullets,
  mainCta,
  secondaryCta,
  index = 0,
}: DomainCardProps) {
  return (
    <div 
      className="bg-white rounded-3xl p-8 shadow-subtle hover:shadow-card transition-all duration-500 group animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="space-y-6">
        <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-monks-accent/20 transition-colors duration-300">
          <div className="w-8 h-8 bg-monks-accent rounded-xl"></div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-monks-black">{title}</h3>
          <p className="text-monks-gray text-lg">{subtitle}</p>
        </div>
        
        <ul className="space-y-2">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-center gap-3 text-monks-gray">
              <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
              <span className="text-sm">{bullet}</span>
            </li>
          ))}
        </ul>
        
        <div className="pt-4 space-y-3">
          <Link
            to={mainCta.href}
            className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            {mainCta.label}
            <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </Link>
          {secondaryCta && (
            <Link 
              to={secondaryCta.href} 
              className="text-monks-gray hover:text-monks-accent transition-colors duration-300 text-center block font-medium"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

{/* Minimal card variant */}
export function MinimalDomainCard({ title, subtitle, mainCta }: DomainCardProps) {
  return (
    <div className="group p-6 border border-monks-gray/10 rounded-2xl hover:border-monks-accent/30 transition-all duration-300">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-monks-gray">{subtitle}</p>
        <Link
          to={mainCta.href}
          className="inline-flex items-center gap-2 text-monks-black hover:text-monks-accent transition-colors duration-300 font-medium"
        >
          {mainCta.label}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}