import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FeatureStep {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
}

interface FeatureShowcaseProps {
  features: FeatureStep[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  features,
  autoPlay = true,
  interval = 5000,
  className
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % features.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, features.length]);

  const activeFeature = features[activeIndex];

  return (
    <div className={cn('grid lg:grid-cols-2 gap-12 items-center', className)}>
      {/* Content */}
      <div className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-monks-black">
            {activeFeature.title}
          </h2>
          <p className="text-xl text-monks-gray leading-relaxed">
            {activeFeature.description}
          </p>
        </div>
        
        {/* Step Navigation */}
        <div className="space-y-4">
          {features.map((feature, i) => (
            <button
              key={feature.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'w-full text-left p-4 rounded-2xl transition-all duration-300',
                i === activeIndex
                  ? 'bg-monks-accent text-white'
                  : 'bg-monks-light-gray hover:bg-monks-gray/10'
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                  i === activeIndex ? 'bg-white text-monks-accent' : 'bg-white/20'
                )}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className={cn(
                    'font-semibold',
                    i === activeIndex ? 'text-white' : 'text-monks-black'
                  )}>
                    {feature.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-monks-light-gray rounded-full hover:bg-monks-gray/10 transition-colors duration-300"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          
          <div className="flex gap-2">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i === activeIndex ? 'bg-monks-accent' : 'bg-monks-gray/30'
                )}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Media */}
      <div className="relative">
        <div className="aspect-video bg-monks-light-gray rounded-3xl overflow-hidden">
          {activeFeature.video ? (
            <video
              src={activeFeature.video}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : activeFeature.image ? (
            <img
              src={activeFeature.image}
              alt={activeFeature.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-monks-gray">
              <div className="text-center">
                <div className="text-4xl mb-4">🎬</div>
                <p>Feature Demo</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        {isPlaying && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="w-full bg-black/20 rounded-full h-1">
              <div
                className="bg-white h-1 rounded-full transition-all duration-100"
                style={{
                  width: `${((Date.now() % interval) / interval) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};