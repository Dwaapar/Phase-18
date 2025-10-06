import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  title,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={cn('bg-monks-dark-gray rounded-2xl overflow-hidden', className)}>
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className="text-white font-medium">{title}</span>
          <span className="text-white/60 text-sm">{language}</span>
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="text-white/60" />
          )}
        </button>
        
        <pre className="p-6 text-white/90 text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};