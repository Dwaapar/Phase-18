import React, { useState } from 'react';
import { X, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NotificationBannerProps {
  message: string;
  type?: 'info' | 'warning' | 'success';
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  message,
  type = 'info',
  dismissible = true,
  action,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle
  };

  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      'flex items-center gap-3 p-4 border rounded-2xl',
      colors[type],
      className
    )}>
      <Icon size={20} className="flex-shrink-0" />
      
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="font-medium hover:underline"
        >
          {action.label}
        </button>
      )}

      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="text-current hover:opacity-70 transition-opacity duration-300"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};