import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ComparisonFeature {
  name: string;
  values: (boolean | string)[];
}

interface ComparisonTableProps {
  products: string[];
  features: ComparisonFeature[];
  className?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  products,
  features,
  className
}) => {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full bg-white rounded-3xl overflow-hidden shadow-card">
        <thead>
          <tr className="bg-monks-light-gray">
            <th className="text-left p-6 font-semibold text-monks-black">Features</th>
            {products.map((product, i) => (
              <th key={i} className="text-center p-6 font-semibold text-monks-black">
                {product}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr key={i} className="border-t border-monks-gray/10">
              <td className="p-6 font-medium text-monks-black">{feature.name}</td>
              {feature.values.map((value, j) => (
                <td key={j} className="p-6 text-center">
                  {typeof value === 'boolean' ? (
                    value ? (
                      <Check size={20} className="text-green-500 mx-auto" />
                    ) : (
                      <X size={20} className="text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-monks-gray">{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};