import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface MasonryProps {
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
  className?: string;
}

export const Masonry: React.FC<MasonryProps> = ({
  children,
  columns = 3,
  gap = 16,
  className
}) => {
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColumnHeights(new Array(columns).fill(0));
  }, [columns]);

  const getShortestColumnIndex = () => {
    return columnHeights.indexOf(Math.min(...columnHeights));
  };

  const renderColumns = () => {
    const columnElements: React.ReactNode[][] = Array.from({ length: columns }, () => []);
    
    React.Children.forEach(children, (child, index) => {
      const columnIndex = index % columns;
      columnElements[columnIndex].push(
        <div key={index} style={{ marginBottom: gap }}>
          {child}
        </div>
      );
    });

    return columnElements.map((columnChildren, columnIndex) => (
      <div
        key={columnIndex}
        className="flex flex-col"
        style={{ marginRight: columnIndex < columns - 1 ? gap : 0 }}
      >
        {columnChildren}
      </div>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={cn('flex', className)}
      style={{ gap }}
    >
      {renderColumns()}
    </div>
  );
};