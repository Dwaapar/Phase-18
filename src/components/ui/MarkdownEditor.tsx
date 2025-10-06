import React, { useState } from 'react';
import { Eye, CreditCard as Edit, Bold, Italic, Link, Code, List } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  previewMode?: boolean;
  className?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value = '',
  onChange,
  placeholder = "Write in Markdown...",
  label,
  previewMode = false,
  className
}) => {
  const [content, setContent] = useState(value);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const handleChange = (newValue: string) => {
    setContent(newValue);
    onChange?.(newValue);
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    const newText = content.substring(0, start) + 
                   before + selectedText + after + 
                   content.substring(end);
    
    handleChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), title: 'Italic' },
    { icon: Code, action: () => insertMarkdown('`', '`'), title: 'Inline Code' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), title: 'Link' },
    { icon: List, action: () => insertMarkdown('- '), title: 'List' }
  ];

  // Simple markdown to HTML converter (in production, use a proper library)
  const markdownToHtml = (markdown: string) => {
    return markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-monks-light-gray px-1 rounded">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2">$1</h3>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div className={cn('bg-white rounded-2xl border border-monks-gray/20 overflow-hidden', className)}>
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-monks-gray/10 bg-monks-light-gray">
          <div className="flex items-center gap-1">
            {toolbarButtons.map((button, i) => {
              const Icon = button.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={button.action}
                  title={button.title}
                  className="p-2 hover:bg-white rounded-lg transition-colors duration-300"
                >
                  <Icon size={16} className="text-monks-gray" />
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode('edit')}
              className={cn(
                'p-2 rounded-lg transition-colors duration-300 flex items-center gap-2',
                mode === 'edit' ? 'bg-white text-monks-black' : 'text-monks-gray hover:text-monks-black'
              )}
            >
              <Edit size={16} />
              <span className="text-sm">Edit</span>
            </button>
            <button
              onClick={() => setMode('preview')}
              className={cn(
                'p-2 rounded-lg transition-colors duration-300 flex items-center gap-2',
                mode === 'preview' ? 'bg-white text-monks-black' : 'text-monks-gray hover:text-monks-black'
              )}
            >
              <Eye size={16} />
              <span className="text-sm">Preview</span>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative">
          {mode === 'edit' ? (
            <textarea
              value={content}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={placeholder}
              className="w-full p-6 min-h-[300px] bg-transparent border-0 outline-none text-monks-black placeholder-monks-gray resize-none font-mono text-sm"
            />
          ) : (
            <div
              className="p-6 min-h-[300px] prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
            />
          )}
        </div>
      </div>
      
      <div className="text-sm text-monks-gray">
        Supports Markdown formatting. Use **bold**, *italic*, `code`, # headings, and - lists.
      </div>
    </div>
  );
};