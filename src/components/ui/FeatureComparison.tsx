import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ComparisonFeature {
  name: string;
  description?: string;
  values: (boolean | string | null)[];
}

interface FeatureComparisonProps {
  products: Array<{
    name: string;
    price?: string;
    popular?: boolean;
    color?: string;
  }>;
  features: ComparisonFeature[];
  className?: string;
}

export const FeatureComparison: React.FC<FeatureComparisonProps> = ({
  products,
  features,
  className
}) => {
  const renderValue = (value: boolean | string | null) => {
    if (value === true) {
      return <Check size={20} className="text-green-500 mx-auto" />;
    }
    if (value === false) {
      return <X size={20} className="text-red-500 mx-auto" />;
    }
    if (value === null) {
      return <Minus size={20} className="text-monks-gray mx-auto" />;
    }
    return <span className="text-monks-black text-center block">{value}</span>;
  };

  return (
    <div className={cn('bg-white rounded-3xl overflow-hidden shadow-card', className)}>
      {/* Header */}
      <div className="grid" style={{ gridTemplateColumns: `300px repeat(${products.length}, 1fr)` }}>
        <div className="p-6 bg-monks-light-gray">
          <h3 className="font-semibold text-monks-black">Features</h3>
        </div>
        {products.map((product, i) => (
          <div
            key={i}
            className={cn(
              'p-6 text-center relative',
              product.popular ? 'bg-monks-accent text-white' : 'bg-monks-light-gray'
            )}
          >
            {product.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <h3 className={cn(
              'font-bold text-xl mb-2',
              product.popular ? 'text-white' : 'text-monks-black'
            )}>
              {product.name}
            </h3>
            {product.price && (
              <div className={cn(
                'text-2xl font-bold',
                product.popular ? 'text-white' : 'text-monks-accent'
              )}>
                {product.price}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="divide-y divide-monks-gray/10">
        {features.map((feature, i) => (
          <div
            key={i}
            className="grid hover:bg-monks-light-gray/50 transition-colors duration-300"
            style={{ gridTemplateColumns: `300px repeat(${products.length}, 1fr)` }}
          >
            <div className="p-4">
              <div className="font-medium text-monks-black">{feature.name}</div>
              {feature.description && (
                <div className="text-sm text-monks-gray mt-1">{feature.description}</div>
              )}
            </div>
            {feature.values.map((value, j) => (
              <div key={j} className="p-4 flex items-center justify-center">
                {renderValue(value)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};