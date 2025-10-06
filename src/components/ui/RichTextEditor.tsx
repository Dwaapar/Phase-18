import React, { useState } from 'react';
import { Bold, Italic, Underline, Link, List, ListOrdered, Quote, Code } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = "Start writing...",
  label,
  className
}) => {
  const [content, setContent] = useState(value);
  const [selectedText, setSelectedText] = useState('');

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    const newContent = document.querySelector('[contenteditable]')?.innerHTML || '';
    setContent(newContent);
    onChange?.(newContent);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange?.(newContent);
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    setSelectedText(selection?.toString() || '');
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { icon: Link, command: 'createLink', title: 'Link', requiresValue: true },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
    { icon: Code, command: 'formatBlock', value: 'pre', title: 'Code Block' }
  ];

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div className={cn('bg-white rounded-2xl border border-monks-gray/20 overflow-hidden', className)}>
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-3 border-b border-monks-gray/10 bg-monks-light-gray">
          {toolbarButtons.map((button, i) => {
            const Icon = button.icon;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (button.requiresValue) {
                    const url = prompt('Enter URL:');
                    if (url) formatText(button.command, url);
                  } else {
                    formatText(button.command, button.value);
                  }
                }}
                title={button.title}
                className="p-2 hover:bg-white rounded-lg transition-colors duration-300"
              >
                <Icon size={16} className="text-monks-gray" />
              </button>
            );
          })}
        </div>
        
        {/* Editor */}
        <div
          contentEditable
          onInput={handleInput}
          onMouseUp={handleSelection}
          onKeyUp={handleSelection}
          className="p-6 min-h-[200px] outline-none text-monks-black"
          dangerouslySetInnerHTML={{ __html: content }}
          style={{ whiteSpace: 'pre-wrap' }}
        />
        
        {content === '' && (
          <div className="absolute top-[4.5rem] left-6 text-monks-gray pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};