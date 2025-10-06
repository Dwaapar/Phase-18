import React from 'react';
import { cn } from '../../lib/utils';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface LineChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 400,
  height = 200,
  className
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const points = data.map((point, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((point.value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={cn('bg-white rounded-2xl p-6', className)}>
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke="#0F62FE"
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        
        {data.map((point, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((point.value - minValue) / range) * height;
          
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#0F62FE"
              className="hover:r-6 transition-all duration-300 cursor-pointer"
            />
          );
        })}
      </svg>
      
      <div className="flex justify-between mt-4 text-sm text-monks-gray">
        {data.map((point, i) => (
          <span key={i}>{point.label}</span>
        ))}
      </div>
    </div>
  );
};

interface BarChartProps {
  data: ChartDataPoint[];
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, className }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className={cn('bg-white rounded-2xl p-6', className)}>
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-monks-black font-medium">{item.label}</span>
              <span className="text-monks-gray">{item.value}</span>
            </div>
            <div className="w-full bg-monks-light-gray rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || '#0F62FE'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DonutChartProps {
  data: ChartDataPoint[];
  size?: number;
  className?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  className
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativePercentage = 0;

  return (
    <div className={cn('bg-white rounded-2xl p-6', className)}>
      <div className="flex items-center gap-8">
        <div className="relative">
          <svg width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#F4F4F4"
              strokeWidth="20"
            />
            
            {data.map((item, i) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -cumulativePercentage / 100 * circumference;
              
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={item.color || '#0F62FE'}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              );
            })}
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-monks-black">{total}</div>
              <div className="text-sm text-monks-gray">Total</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || '#0F62FE' }}
              />
              <span className="text-sm text-monks-black">{item.label}</span>
              <span className="text-sm text-monks-gray">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};