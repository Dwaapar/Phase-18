import React, { useState } from 'react';
import { Copy, Check, Download, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  showRunButton?: boolean;
  onRun?: () => void;
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  readOnly = false,
  showLineNumbers = true,
  showCopyButton = true,
  showRunButton = false,
  onRun,
  className
}) => {
  const [copied, setCopied] = useState(false);
  const lines = value.split('\n');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={cn('bg-monks-dark-gray rounded-2xl overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="text-white/60 text-sm">{language}</span>
        <div className="flex items-center gap-2">
          {showRunButton && (
            <button
              onClick={onRun}
              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300"
            >
              <Play size={16} className="text-white" />
            </button>
          )}
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-white/60" />
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Editor */}
      <div className="relative">
        <div className="flex">
          {showLineNumbers && (
            <div className="flex-shrink-0 px-4 py-6 text-white/40 text-sm font-mono select-none">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            readOnly={readOnly}
            className="flex-1 p-6 bg-transparent text-white/90 text-sm font-mono resize-none outline-none leading-6"
            style={{ minHeight: '200px' }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};