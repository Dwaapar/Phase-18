import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Info,
      iconColor: 'text-blue-600'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: AlertCircle,
      iconColor: 'text-red-600'
    }
  };

  const { container, icon: Icon, iconColor } = variants[variant];

  return (
    <div className={cn('flex gap-3 p-4 border rounded-2xl', container, className)}>
      <Icon size={20} className={cn('flex-shrink-0 mt-0.5', iconColor)} />
      
      <div className="flex-1 space-y-1">
        {title && (
          <div className="font-semibold">{title}</div>
        )}
        <div>{children}</div>
      </div>

      {dismissible && (
        <button
          onClick={onDismiss}
          className="text-current hover:opacity-70 transition-opacity duration-300"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};