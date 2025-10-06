import React from 'react';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface PricingPlan {
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
  color?: string;
}

interface PricingComparisonProps {
  plans: PricingPlan[];
  className?: string;
}

export const PricingComparison: React.FC<PricingComparisonProps> = ({
  plans,
  className
}) => {
  return (
    <div className={cn('grid gap-8 md:grid-cols-2 lg:grid-cols-3', className)}>
      {plans.map((plan, i) => (
        <div
          key={i}
          className={cn(
            'relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-card',
            plan.popular
              ? 'border-monks-accent shadow-card scale-105'
              : 'border-monks-gray/10 hover:border-monks-accent/30'
          )}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-1 bg-monks-accent text-white px-4 py-2 rounded-full text-sm font-medium">
                <Star size={14} className="fill-current" />
                Most Popular
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-monks-black mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-monks-black">{plan.price}</span>
                {plan.period && (
                  <span className="text-monks-gray">{plan.period}</span>
                )}
              </div>
              <p className="text-monks-gray">{plan.description}</p>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3">
                  <Check size={16} className="text-monks-accent flex-shrink-0" />
                  <span className="text-monks-gray">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to={plan.cta.href}
              className={cn(
                'block w-full text-center px-6 py-4 rounded-full font-medium transition-all duration-300',
                plan.popular
                  ? 'bg-monks-accent text-white hover:bg-monks-hover'
                  : 'bg-monks-black text-white hover:bg-monks-accent'
              )}
            >
              {plan.cta.label}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};