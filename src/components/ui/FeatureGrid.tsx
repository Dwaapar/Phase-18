import React from 'react';
import { Video as LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Feature {
  title: string;
  description: string;
  icon?: LucideIcon;
  features?: string[];
  href?: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
  variant?: 'default' | 'cards' | 'minimal';
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  className,
  variant = 'cards'
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  };

  const renderFeature = (feature: Feature, index: number) => {
    const Icon = feature.icon;
    
    if (variant === 'minimal') {
      return (
        <div key={index} className="space-y-4">
          {Icon && (
            <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
              <Icon size={20} className="text-monks-accent" />
            </div>
          )}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-monks-black">{feature.title}</h3>
            <p className="text-monks-gray">{feature.description}</p>
          </div>
        </div>
      );
    }

    const content = (
      <div className="space-y-6">
        {Icon && (
          <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
            <Icon size={24} className="text-monks-accent" />
          </div>
        )}
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-monks-black">{feature.title}</h3>
          <p className="text-monks-gray leading-relaxed">{feature.description}</p>
        </div>
        
        {feature.features && (
          <ul className="space-y-2">
            {feature.features.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-monks-gray">
                <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );

    if (feature.href) {
      return (
        <a
          key={index}
          href={feature.href}
          className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300 block"
        >
          {content}
        </a>
      );
    }

    return (
      <div key={index} className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300">
        {content}
      </div>
    );
  };

  return (
    <div className={cn(
      'grid gap-8 grid-cols-1',
      gridCols[columns],
      className
    )}>
      {features.map(renderFeature)}
    </div>
  );
};