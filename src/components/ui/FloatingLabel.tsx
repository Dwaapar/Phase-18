import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface FloatingLabelProps {
  label: string;
  children: React.ReactElement;
  className?: string;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({
  label,
  children,
  className
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const childProps = {
    onFocus: (e: React.FocusEvent) => {
      setIsFocused(true);
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      setIsFocused(false);
      children.props.onBlur?.(e);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      children.props.onChange?.(e);
    },
    className: cn(
      'w-full px-4 pt-6 pb-2 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300',
      children.props.className
    )
  };

  const isFloating = isFocused || hasValue;

  return (
    <div className={cn('relative', className)}>
      <label
        className={cn(
          'absolute left-4 text-monks-gray transition-all duration-300 pointer-events-none',
          isFloating
            ? 'top-2 text-xs'
            : 'top-1/2 transform -translate-y-1/2 text-base'
        )}
      >
        {label}
      </label>
      {React.cloneElement(children, childProps)}
    </div>
  );
};