import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  className
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const selectDate = (day: number) => {
    const selectedDate = new Date(year, month, day);
    onChange?.(selectedDate);
  };
  
  const isSelected = (day: number) => {
    if (!value) return false;
    return value.getDate() === day && 
           value.getMonth() === month && 
           value.getFullYear() === year;
  };
  
  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-card', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-monks-light-gray rounded-full transition-colors duration-300"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h2 className="text-xl font-semibold text-monks-black">
          {monthNames[month]} {year}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-monks-light-gray rounded-full transition-colors duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-monks-gray py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={i} className="h-10" />
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => selectDate(day)}
              className={cn(
                'h-10 w-10 rounded-full text-sm font-medium transition-all duration-300 hover:bg-monks-accent hover:text-white',
                isSelected(day) && 'bg-monks-accent text-white',
                isToday(day) && !isSelected(day) && 'bg-monks-light-gray text-monks-black',
                !isSelected(day) && !isToday(day) && 'text-monks-black hover:bg-monks-accent/10'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};