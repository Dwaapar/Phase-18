import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

interface CallToActionProps {
  title: string;
  description?: string;
  buttons: CTAButton[];
  className?: string;
  variant?: 'default' | 'dark' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttons,
  className,
  variant = 'default',
  size = 'md'
}) => {
  const variants = {
    default: 'bg-white text-monks-black',
    dark: 'bg-monks-black text-white',
    gradient: 'bg-gradient-to-br from-monks-accent to-monks-hover text-white'
  };

  const sizes = {
    sm: 'py-16',
    md: 'py-24',
    lg: 'py-32'
  };

  const getButtonClasses = (buttonVariant: string) => {
    const base = "inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 group";
    
    switch (buttonVariant) {
      case 'primary':
        return variant === 'dark' || variant === 'gradient'
          ? `${base} bg-white text-monks-black hover:bg-monks-accent hover:text-white`
          : `${base} bg-monks-black text-white hover:bg-monks-accent`;
      case 'secondary':
        return variant === 'dark' || variant === 'gradient'
          ? `${base} bg-white/10 text-white hover:bg-white hover:text-monks-black`
          : `${base} bg-monks-light-gray text-monks-black hover:bg-monks-gray hover:text-white`;
      case 'outline':
        return variant === 'dark' || variant === 'gradient'
          ? `${base} border border-white/30 text-white hover:bg-white hover:text-monks-black`
          : `${base} border border-monks-gray text-monks-gray hover:border-monks-black hover:text-monks-black`;
      default:
        return `${base} bg-monks-accent text-white hover:bg-monks-hover`;
    }
  };

  return (
    <section className={cn(variants[variant], sizes[size], className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          
          {description && (
            <p className={cn(
              'text-xl leading-relaxed',
              variant === 'default' ? 'text-monks-gray' : 'text-white/80'
            )}>
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((button, i) => (
              <Link
                key={i}
                to={button.href}
                className={getButtonClasses(button.variant || 'primary')}
              >
                {button.label}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};