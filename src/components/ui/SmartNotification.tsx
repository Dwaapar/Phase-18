import React, { useState, useEffect } from 'react';
import { X, Bell, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SmartNotificationProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  onDismiss?: () => void;
  className?: string;
}

export const SmartNotification: React.FC<SmartNotificationProps> = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  persistent = false,
  actions = [],
  onDismiss,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (persistent) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (duration / 100));
        if (newProgress <= 0) {
          setIsVisible(false);
          onDismiss?.();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, persistent, onDismiss]);

  const typeConfig = {
    info: {
      icon: Info,
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      iconColor: 'text-blue-600',
      progressColor: '#3B82F6'
    },
    success: {
      icon: CheckCircle,
      color: 'bg-green-50 border-green-200 text-green-800',
      iconColor: 'text-green-600',
      progressColor: '#10B981'
    },
    warning: {
      icon: AlertTriangle,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      iconColor: 'text-yellow-600',
      progressColor: '#F59E0B'
    },
    error: {
      icon: AlertCircle,
      color: 'bg-red-50 border-red-200 text-red-800',
      iconColor: 'text-red-600',
      progressColor: '#EF4444'
    }
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  if (!isVisible) return null;

  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl border p-4 shadow-card animate-slide-up',
      config.color,
      className
    )}>
      {/* Progress Bar */}
      {!persistent && (
        <div className="absolute bottom-0 left-0 h-1 transition-all duration-100 ease-linear"
             style={{ 
               width: `${progress}%`, 
               backgroundColor: config.progressColor 
             }} />
      )}
      
      <div className="flex gap-3">
        <Icon size={20} className={cn('flex-shrink-0 mt-0.5', config.iconColor)} />
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-sm opacity-90">{message}</p>
            </div>
            
            <button
              onClick={() => {
                setIsVisible(false);
                onDismiss?.();
              }}
              className="text-current hover:opacity-70 transition-opacity duration-300"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex items-center gap-2 pt-2">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.action}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium transition-all duration-300',
                    action.variant === 'primary'
                      ? 'bg-current text-white hover:opacity-90'
                      : 'bg-white/50 hover:bg-white/70'
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};