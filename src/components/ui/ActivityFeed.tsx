import React from 'react';
import { formatRelativeTime } from '../../utils/formatters';
import { cn } from '../../lib/utils';

interface ActivityItem {
  id: string;
  type: 'workflow' | 'agent' | 'asset' | 'user' | 'system';
  title: string;
  description?: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: Record<string, any>;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  showAvatars?: boolean;
  groupByDate?: boolean;
  className?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  showAvatars = true,
  groupByDate = false,
  className
}) => {
  const getActivityIcon = (type: string) => {
    const icons = {
      workflow: '⚡',
      agent: '🤖',
      asset: '📦',
      user: '👤',
      system: '⚙️'
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  const getActivityColor = (type: string) => {
    const colors = {
      workflow: 'bg-blue-100 text-blue-600',
      agent: 'bg-purple-100 text-purple-600',
      asset: 'bg-green-100 text-green-600',
      user: 'bg-yellow-100 text-yellow-600',
      system: 'bg-gray-100 text-gray-600'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  const groupedActivities = groupByDate
    ? activities.reduce((groups, activity) => {
        const date = activity.timestamp.toDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(activity);
        return groups;
      }, {} as Record<string, ActivityItem[]>)
    : { 'All Activities': activities };

  return (
    <div className={cn('space-y-6', className)}>
      {Object.entries(groupedActivities).map(([date, items]) => (
        <div key={date}>
          {groupByDate && (
            <h3 className="text-lg font-semibold text-monks-black mb-4 sticky top-0 bg-white/80 backdrop-blur-sm py-2">
              {date === new Date().toDateString() ? 'Today' : date}
            </h3>
          )}
          
          <div className="space-y-4">
            {items.map((activity, i) => (
              <div key={activity.id} className="relative flex gap-4">
                {/* Timeline line */}
                {i < items.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-monks-gray/20" />
                )}
                
                {/* Activity indicator */}
                <div className={cn(
                  'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg',
                  getActivityColor(activity.type)
                )}>
                  {getActivityIcon(activity.type)}
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-4 border border-monks-gray/10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-monks-black">{activity.title}</h4>
                      {activity.description && (
                        <p className="text-sm text-monks-gray">{activity.description}</p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-monks-gray">
                        {formatRelativeTime(activity.timestamp)}
                      </div>
                      {activity.user && (
                        <div className="flex items-center gap-2 mt-1">
                          {showAvatars && activity.user.avatar && (
                            <img
                              src={activity.user.avatar}
                              alt={activity.user.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                          <span className="text-xs text-monks-gray">{activity.user.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {activity.metadata && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <span
                          key={key}
                          className="px-2 py-1 bg-monks-light-gray text-monks-gray rounded text-xs"
                        >
                          {key}: {String(value)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {activities.length === 0 && (
        <div className="text-center py-12 text-monks-gray">
          No activities yet
        </div>
      )}
    </div>
  );
};