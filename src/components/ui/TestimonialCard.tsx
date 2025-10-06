import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  quote: string;
  avatar: string;
  rating?: number;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  quote,
  avatar,
  rating,
  className
}) => {
  return (
    <div className={cn(
      'bg-white rounded-3xl p-8 space-y-6 hover:shadow-card transition-all duration-300',
      className
    )}>
      {rating && (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-monks-gray/30'
              )}
            />
          ))}
        </div>
      )}
      
      <blockquote className="text-lg text-monks-black leading-relaxed">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-monks-black">{name}</p>
          <p className="text-monks-gray text-sm">
            {role}{company && `, ${company}`}
          </p>
        </div>
      </div>
    </div>
  );
};