import React from 'react';
import { Video as LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  features?: string[];
  className?: string;
  variant?: 'default' | 'highlighted';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  features,
  className,
  variant = 'default'
}) => {
  return (
    <div className={cn(
      'rounded-3xl p-8 transition-all duration-300',
      variant === 'highlighted' 
        ? 'bg-gradient-to-br from-monks-accent/5 to-monks-accent/10 border-2 border-monks-accent/20' 
        : 'bg-white border border-monks-gray/10 hover:shadow-card',
      className
    )}>
      <div className="space-y-6">
        {Icon && (
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center',
            variant === 'highlighted' 
              ? 'bg-monks-accent/20' 
              : 'bg-monks-accent/10'
          )}>
            <Icon size={24} className="text-monks-accent" />
          </div>
        )}
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-monks-black">{title}</h3>
          <p className="text-monks-gray leading-relaxed">{description}</p>
        </div>
        
        {features && (
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-monks-gray">
                <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};