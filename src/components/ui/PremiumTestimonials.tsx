import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PremiumTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  videoUrl?: string;
  companyLogo?: string;
  results?: Array<{
    metric: string;
    value: string;
  }>;
}

interface PremiumTestimonialsProps {
  testimonials: PremiumTestimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export const PremiumTestimonials: React.FC<PremiumTestimonialsProps> = ({
  testimonials,
  autoPlay = true,
  interval = 8000,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
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

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={cn('py-24 bg-monks-light-gray', className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-monks-black mb-6">
            Customer Success Stories
          </h2>
          <p className="text-xl text-monks-gray max-w-3xl mx-auto">
            See how industry leaders are transforming their operations with Findawise.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white rounded-3xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-monks-accent/5 to-transparent rounded-full -translate-y-32 translate-x-32" />
            
            <div className="relative">
              {/* Quote Icon */}
              <Quote size={64} className="text-monks-accent/20 mb-8" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={cn(
                      i < currentTestimonial.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-monks-gray/30'
                    )}
                  />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-3xl font-medium text-monks-black mb-12 leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>
              
              {/* Results */}
              {currentTestimonial.results && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                  {currentTestimonial.results.map((result, i) => (
                    <div key={i} className="text-center p-4 bg-monks-light-gray rounded-2xl">
                      <div className="text-2xl font-bold text-monks-accent mb-1">{result.value}</div>
                      <div className="text-sm text-monks-gray">{result.metric}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    {currentTestimonial.videoUrl && (
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                      >
                        <Play size={24} className="text-white ml-1" />
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-monks-black">{currentTestimonial.name}</p>
                    <p className="text-monks-gray">{currentTestimonial.role}</p>
                    <p className="text-monks-accent font-medium">{currentTestimonial.company}</p>
                  </div>
                </div>
                
                {currentTestimonial.companyLogo && (
                  <img
                    src={currentTestimonial.companyLogo}
                    alt={currentTestimonial.company}
                    className="h-12 opacity-60"
                  />
                )}
              </div>
            </div>
            
            {/* Navigation */}
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/80 hover:bg-white rounded-full shadow-card transition-all duration-300"
            >
              <ChevronLeft size={24} className="text-monks-black" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/80 hover:bg-white rounded-full shadow-card transition-all duration-300"
            >
              <ChevronRight size={24} className="text-monks-black" />
            </button>
          </div>
          
          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  i === currentIndex ? 'bg-monks-accent scale-125' : 'bg-monks-gray/30 hover:bg-monks-gray/50'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};