import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  position = 'bottom-right',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const actionPositions = {
    'bottom-right': 'bottom-16',
    'bottom-left': 'bottom-16',
    'top-right': 'top-16',
    'top-left': 'top-16'
  };

  return (
    <div className={cn('fixed z-40', positions[position], className)}>
      {/* Action Buttons */}
      {isOpen && (
        <div className={cn('absolute right-0 space-y-3 mb-3', actionPositions[position])}>
          {actions.map((action, i) => (
            <button
              key={action.id}
              onClick={() => {
                action.action();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 bg-white text-monks-black px-4 py-3 rounded-full shadow-card hover:shadow-elevated transition-all duration-300 group animate-slide-up"
              style={{
                animationDelay: `${i * 50}ms`,
                backgroundColor: action.color || '#FFFFFF'
              }}
            >
              <div className="flex-shrink-0">{action.icon}</div>
              <span className="font-medium whitespace-nowrap">{action.label}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 bg-monks-accent text-white rounded-full shadow-card hover:shadow-elevated transition-all duration-300 flex items-center justify-center group',
          isOpen && 'rotate-45'
        )}
      >
        <Plus size={24} className="transition-transform duration-300" />
      </button>
    </div>
  );
};