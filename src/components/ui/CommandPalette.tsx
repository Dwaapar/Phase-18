import React, { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Command {
  id: string;
  title: string;
  description?: string;
  category?: string;
  action: () => void;
  icon?: React.ReactNode;
}

interface CommandPaletteProps {
  commands: Command[];
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  className?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  commands,
  isOpen,
  onClose,
  placeholder = "Type a command or search...",
  className
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description?.toLowerCase().includes(query.toLowerCase()) ||
    command.category?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32 z-50">
      <div className={cn(
        'bg-white rounded-3xl shadow-elevated w-full max-w-2xl mx-4 overflow-hidden',
        className
      )}>
        {/* Search Input */}
        <div className="flex items-center gap-3 p-6 border-b border-monks-gray/10">
          <Search size={20} className="text-monks-gray" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-monks-black placeholder-monks-gray"
            autoFocus
          />
        </div>

        {/* Commands */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length > 0 ? (
            <div className="p-2">
              {filteredCommands.map((command, i) => (
                <button
                  key={command.id}
                  onClick={() => {
                    command.action();
                    onClose();
                  }}
                  className={cn(
                    'w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3',
                    i === selectedIndex
                      ? 'bg-monks-accent text-white'
                      : 'hover:bg-monks-light-gray text-monks-black'
                  )}
                >
                  {command.icon && (
                    <div className="flex-shrink-0">
                      {command.icon}
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{command.title}</div>
                    {command.description && (
                      <div className={cn(
                        'text-sm',
                        i === selectedIndex ? 'text-white/80' : 'text-monks-gray'
                      )}>
                        {command.description}
                      </div>
                    )}
                  </div>
                  
                  <ArrowRight size={16} className="flex-shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-monks-gray">
              No commands found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};