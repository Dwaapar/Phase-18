import React from 'react';
import { MoreHorizontal, Maximize2, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DashboardWidgetProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }>;
  refreshable?: boolean;
  onRefresh?: () => void;
  expandable?: boolean;
  onExpand?: () => void;
  loading?: boolean;
  className?: string;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  subtitle,
  children,
  actions = [],
  refreshable = false,
  onRefresh,
  expandable = false,
  onExpand,
  loading = false,
  className
}) => {
  return (
    <div className={cn('bg-white rounded-3xl border border-monks-gray/10 overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-monks-gray/10">
        <div>
          <h3 className="font-semibold text-monks-black">{title}</h3>
          {subtitle && (
            <p className="text-sm text-monks-gray mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {refreshable && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          )}
          
          {expandable && (
            <button
              onClick={onExpand}
              className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
            >
              <Maximize2 size={16} />
            </button>
          )}
          
          {actions.length > 0 && (
            <div className="relative group">
              <button className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300">
                <MoreHorizontal size={16} />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                {actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.action}
                    className="w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300 flex items-center gap-3"
                  >
                    {action.icon}
                    <span className="text-monks-black">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw size={24} className="animate-spin text-monks-gray" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};