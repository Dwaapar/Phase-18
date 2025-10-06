import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  label?: string;
  presetColors?: string[];
  className?: string;
}

const defaultColors = [
  '#000000', '#FFFFFF', '#0F62FE', '#525252', '#F4F4F4',
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#000000',
  onChange,
  label,
  presetColors = defaultColors,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 focus:ring-2 focus:ring-monks-accent transition-all duration-300 flex items-center gap-3"
        >
          <div
            className="w-6 h-6 rounded-full border border-monks-gray/30"
            style={{ backgroundColor: value }}
          />
          <span className="text-monks-black">{value}</span>
          <Palette size={16} className="text-monks-gray ml-auto" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 p-4 z-50">
            <div className="grid grid-cols-5 gap-2 mb-4">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onChange?.(color);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110',
                    value === color ? 'border-monks-accent' : 'border-monks-gray/30'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <input
              type="color"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full h-10 rounded-lg border border-monks-gray/30 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};