import { TrendingUp, Zap, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface UpgradePromptProps {
  title: string;
  description: string;
  currentUsage: number;
  limit: number;
  resourceType: string;
  onUpgrade: () => void;
  onDismiss?: () => void;
  variant?: 'warning' | 'error' | 'info';
}

export function UpgradePrompt({
  title,
  description,
  currentUsage,
  limit,
  resourceType,
  onUpgrade,
  onDismiss,
  variant = 'warning',
}: UpgradePromptProps) {
  const percentage = (currentUsage / limit) * 100;

  const variantStyles = {
    warning: 'border-orange-200 bg-orange-50',
    error: 'border-red-200 bg-red-50',
    info: 'border-blue-200 bg-blue-50',
  };

  const iconStyles = {
    warning: 'text-orange-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  };

  return (
    <Card className={`p-6 relative ${variantStyles[variant]}`}>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${variant === 'warning' ? 'bg-orange-100' : variant === 'error' ? 'bg-red-100' : 'bg-blue-100'}`}>
          <Zap className={`w-6 h-6 ${iconStyles[variant]}`} />
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2">{title}</h4>
          <p className="text-sm text-gray-700 mb-4">{description}</p>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Usage</span>
              <span className="text-sm font-bold">
                {currentUsage} / {limit} {resourceType}
              </span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percentage >= 100
                    ? 'bg-red-600'
                    : percentage >= 90
                    ? 'bg-orange-500'
                    : 'bg-blue-600'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={onUpgrade} size="sm" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Upgrade Plan
            </Button>
            <Button variant="outline" size="sm">
              View Add-ons
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
