import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './Calendar';
import { cn } from '../../lib/utils';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select a date",
  label,
  error,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateSelect = (date: Date) => {
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 flex items-center justify-between',
            error && 'ring-2 ring-red-500',
            className
          )}
        >
          <span className={value ? 'text-monks-black' : 'text-monks-gray'}>
            {value ? formatDate(value) : placeholder}
          </span>
          <CalendarIcon size={20} className="text-monks-gray" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-50">
            <Calendar
              value={value}
              onChange={handleDateSelect}
            />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};