import React, { useState } from 'react';
import { Bell, Check, X, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatRelativeTime } from '../../utils/formatters';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColor = (type: string) => {
    const colors = {
      info: 'border-l-blue-500',
      success: 'border-l-green-500',
      warning: 'border-l-yellow-500',
      error: 'border-l-red-500'
    };
    return colors[type as keyof typeof colors] || 'border-l-gray-500';
  };

  return (
    <div className={cn('relative', className)}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-monks-gray/10">
            <h3 className="font-semibold text-monks-black">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-sm text-monks-accent hover:text-monks-black transition-colors duration-300"
                >
                  Mark all read
                </button>
              )}
              <button className="p-1 text-monks-gray hover:text-monks-black transition-colors duration-300">
                <Settings size={16} />
              </button>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-monks-gray/10">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-4 hover:bg-monks-light-gray/50 transition-colors duration-300 border-l-4',
                      getNotificationColor(notification.type),
                      !notification.read && 'bg-monks-accent/5'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <h4 className={cn(
                          'font-medium',
                          notification.read ? 'text-monks-gray' : 'text-monks-black'
                        )}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-monks-gray">{notification.message}</p>
                        <div className="text-xs text-monks-gray">
                          {formatRelativeTime(notification.timestamp)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead?.(notification.id)}
                            className="p-1 text-monks-gray hover:text-green-500 transition-colors duration-300"
                            title="Mark as read"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => onDelete?.(notification.id)}
                          className="p-1 text-monks-gray hover:text-red-500 transition-colors duration-300"
                          title="Delete"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        className="inline-block mt-2 text-sm text-monks-accent hover:text-monks-black transition-colors duration-300"
                      >
                        View details →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-monks-gray">
                <Bell size={32} className="mx-auto mb-4 opacity-50" />
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};