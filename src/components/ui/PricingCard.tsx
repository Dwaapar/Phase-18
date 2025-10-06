import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  popular?: boolean;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period,
  description,
  features,
  cta,
  popular = false,
  className
}) => {
  return (
    <div
      className={cn(
        'relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-card',
        popular
          ? 'border-monks-accent shadow-card'
          : 'border-monks-gray/10 hover:border-monks-accent/30',
        className
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-monks-accent text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-monks-black">{name}</h3>
          <div className="mt-2">
            <span className="text-4xl font-bold text-monks-black">{price}</span>
            {period && (
              <span className="text-monks-gray">{period}</span>
            )}
          </div>
          <p className="text-monks-gray mt-2">{description}</p>
        </div>

        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <Check size={16} className="text-monks-accent" />
              <span className="text-monks-gray">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to={cta.href}
          className={cn(
            'block w-full text-center px-6 py-3 rounded-full font-medium transition-all duration-300 group',
            popular
              ? 'bg-monks-accent text-white hover:bg-monks-hover'
              : 'bg-monks-black text-white hover:bg-monks-accent'
          )}
        >
          <span className="flex items-center justify-center gap-2">
            {cta.label}
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </Link>
      </div>
    </div>
  );
};