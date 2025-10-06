import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  showRating?: boolean;
  className?: string;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  autoPlay = true,
  interval = 5000,
  showRating = true,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={cn('relative', className)}>
      {/* Main Testimonial */}
      <div className="bg-white rounded-3xl p-12 text-center relative overflow-hidden">
        {/* Quote Icon */}
        <Quote size={48} className="text-monks-accent/20 mx-auto mb-8" />
        
        {/* Rating */}
        {showRating && (
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={cn(
                  i < currentTestimonial.rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-monks-gray/30'
                )}
              />
            ))}
          </div>
        )}
        
        {/* Quote */}
        <blockquote className="text-2xl font-medium text-monks-black mb-8 leading-relaxed">
          "{currentTestimonial.quote}"
        </blockquote>
        
        {/* Author */}
        <div className="flex items-center justify-center gap-4">
          <img
            src={currentTestimonial.avatar}
            alt={currentTestimonial.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-semibold text-monks-black">{currentTestimonial.name}</p>
            <p className="text-monks-gray">
              {currentTestimonial.role}, {currentTestimonial.company}
            </p>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-card transition-all duration-300"
        >
          <ChevronLeft size={20} className="text-monks-black" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-card transition-all duration-300"
        >
          <ChevronRight size={20} className="text-monks-black" />
        </button>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              i === currentIndex ? 'bg-monks-accent' : 'bg-monks-gray/30 hover:bg-monks-gray/50'
            )}
          />
        ))}
      </div>
      
      {/* Thumbnail Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6 overflow-x-auto">
        {testimonials.map((testimonial, i) => (
          <button
            key={testimonial.id}
            onClick={() => goToSlide(i)}
            className={cn(
              'flex-shrink-0 p-3 rounded-2xl transition-all duration-300',
              i === currentIndex
                ? 'bg-monks-accent/10 border-2 border-monks-accent'
                : 'bg-monks-light-gray hover:bg-monks-gray/10 border-2 border-transparent'
            )}
          >
            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-medium text-monks-black text-sm">{testimonial.name}</p>
                <p className="text-xs text-monks-gray">{testimonial.company}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};