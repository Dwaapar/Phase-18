import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Copy } from 'lucide-react';
import { cn } from '../../lib/utils';

interface JsonViewerProps {
  data: any;
  collapsed?: boolean;
  className?: string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  collapsed = false,
  className
}) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggleKey = (key: string) => {
    const newExpanded = new Set(expandedKeys);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedKeys(newExpanded);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  const renderValue = (value: any, key: string, depth: number = 0): React.ReactNode => {
    const indent = depth * 20;

    if (value === null) {
      return <span className="text-red-400">null</span>;
    }

    if (typeof value === 'boolean') {
      return <span className="text-blue-400">{value.toString()}</span>;
    }

    if (typeof value === 'number') {
      return <span className="text-green-400">{value}</span>;
    }

    if (typeof value === 'string') {
      return <span className="text-yellow-400">"{value}"</span>;
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedKeys.has(key);
      
      return (
        <div>
          <button
            onClick={() => toggleKey(key)}
            className="flex items-center gap-1 text-white/80 hover:text-white"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span className="text-purple-400">[{value.length}]</span>
          </button>
          
          {isExpanded && (
            <div className="ml-4 border-l border-white/20 pl-4 mt-2">
              {value.map((item, i) => (
                <div key={i} className="mb-2">
                  <span className="text-white/60">{i}: </span>
                  {renderValue(item, `${key}.${i}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (typeof value === 'object') {
      const isExpanded = expandedKeys.has(key);
      const keys = Object.keys(value);
      
      return (
        <div>
          <button
            onClick={() => toggleKey(key)}
            className="flex items-center gap-1 text-white/80 hover:text-white"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span className="text-purple-400">{`{${keys.length}}`}</span>
          </button>
          
          {isExpanded && (
            <div className="ml-4 border-l border-white/20 pl-4 mt-2">
              {keys.map(objKey => (
                <div key={objKey} className="mb-2">
                  <span className="text-blue-300">"{objKey}"</span>
                  <span className="text-white/60">: </span>
                  {renderValue(value[objKey], `${key}.${objKey}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return <span className="text-white">{String(value)}</span>;
  };

  return (
    <div className={cn('bg-monks-dark-gray rounded-2xl overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="text-white/60 text-sm font-mono">JSON</span>
        <button
          onClick={copyToClipboard}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
        >
          <Copy size={16} className="text-white/60" />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6 font-mono text-sm max-h-96 overflow-auto">
        {renderValue(data, 'root')}
      </div>
    </div>
  );
};