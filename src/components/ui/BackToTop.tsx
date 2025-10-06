import React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollPosition } from '../../hooks/useScrollPosition';

interface BackToTopProps {
  threshold?: number;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 400,
  className
}) => {
  const { y: scrollY } = useScrollPosition();
  const isVisible = scrollY > threshold;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 w-12 h-12 bg-monks-accent text-white rounded-full shadow-card hover:shadow-elevated transition-all duration-300 z-40',
        'hover:scale-110 active:scale-95',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
    >
      <ArrowUp size={20} className="mx-auto" />
    </button>
  );
};