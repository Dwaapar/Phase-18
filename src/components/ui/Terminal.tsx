import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

interface TerminalProps {
  lines: TerminalLine[];
  onCommand?: (command: string) => void;
  prompt?: string;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  onCommand,
  prompt = '$',
  className
}) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    onCommand?.(currentCommand);
    setCommandHistory(prev => [...prev, currentCommand]);
    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        }
        break;
    }
  };

  return (
    <div className={cn('bg-monks-dark-gray rounded-2xl overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
        <TerminalIcon size={16} className="text-white/60" />
        <span className="text-white/60 text-sm">Terminal</span>
        <div className="flex gap-2 ml-auto">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>
      
      {/* Content */}
      <div
        ref={terminalRef}
        className="p-6 h-96 overflow-y-auto font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Previous lines */}
        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            {line.type === 'command' && (
              <span className="text-green-400">{prompt} </span>
            )}
            <span className={cn(
              line.type === 'command' ? 'text-white' : 'text-white/80'
            )}>
              {line.content}
            </span>
          </div>
        ))}
        
        {/* Current input */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};