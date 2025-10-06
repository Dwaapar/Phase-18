import React from 'react';
import { cn } from '../../lib/utils';

interface HeatmapData {
  x: number;
  y: number;
  value: number;
  label?: string;
}

interface HeatmapProps {
  data: HeatmapData[];
  width?: number;
  height?: number;
  cellSize?: number;
  colorScale?: string[];
  className?: string;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  width = 400,
  height = 200,
  cellSize = 20,
  colorScale = ['#F4F4F4', '#C6E48B', '#7BC96F', '#239A3B', '#196127'],
  className
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const getColor = (value: number) => {
    const normalized = (value - minValue) / range;
    const index = Math.floor(normalized * (colorScale.length - 1));
    return colorScale[Math.min(index, colorScale.length - 1)];
  };

  const maxX = Math.max(...data.map(d => d.x));
  const maxY = Math.max(...data.map(d => d.y));

  return (
    <div className={cn('bg-white rounded-2xl p-6', className)}>
      <svg width={(maxX + 1) * cellSize} height={(maxY + 1) * cellSize}>
        {data.map((point, i) => (
          <rect
            key={i}
            x={point.x * cellSize}
            y={point.y * cellSize}
            width={cellSize - 1}
            height={cellSize - 1}
            fill={getColor(point.value)}
            className="hover:stroke-monks-accent hover:stroke-2 cursor-pointer transition-all duration-300"
          >
            <title>{point.label || `Value: ${point.value}`}</title>
          </rect>
        ))}
      </svg>
      
      <div className="flex items-center justify-between mt-4 text-sm text-monks-gray">
        <span>Less</span>
        <div className="flex items-center gap-1">
          {colorScale.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};