import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, CreditCard, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar } from './Avatar';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  onSignOut?: () => void;
  className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  onSignOut,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: HelpCircle, label: 'Support', href: '/support' }
  ];

  return (
    <div className={cn('relative', className)}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-full hover:bg-monks-light-gray transition-colors duration-300"
      >
        <Avatar src={user.avatar} name={user.name} size="md" />
        <div className="text-left hidden md:block">
          <div className="font-medium text-monks-black">{user.name}</div>
          <div className="text-sm text-monks-gray">{user.role || 'User'}</div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-monks-gray/10">
            <div className="flex items-center gap-3">
              <Avatar src={user.avatar} name={user.name} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-monks-black truncate">{user.name}</div>
                <div className="text-sm text-monks-gray truncate">{user.email}</div>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300"
                >
                  <Icon size={16} className="text-monks-gray" />
                  <span className="text-monks-black">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Sign Out */}
          <div className="border-t border-monks-gray/10 pt-2">
            <button
              onClick={() => {
                onSignOut?.();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors duration-300"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};