import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar } from './Avatar';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  avatar?: string;
  name?: string;
}

interface LiveChatProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
  isTyping?: boolean;
  agentName?: string;
  agentAvatar?: string;
  className?: string;
}

export const LiveChat: React.FC<LiveChatProps> = ({
  messages,
  onSendMessage,
  isTyping = false,
  agentName = 'Support Agent',
  agentAvatar,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage?.(newMessage);
      setNewMessage('');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 w-14 h-14 bg-monks-accent text-white rounded-full shadow-card hover:shadow-elevated transition-all duration-300 flex items-center justify-center z-40',
          className
        )}
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className={cn(
      'fixed bottom-6 right-6 w-80 bg-white rounded-3xl shadow-elevated border border-monks-gray/10 z-40 overflow-hidden',
      isMinimized && 'h-16',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-monks-accent text-white">
        <div className="flex items-center gap-3">
          <Avatar src={agentAvatar} name={agentName} size="sm" />
          <div>
            <p className="font-medium">{agentName}</p>
            <p className="text-xs text-white/80">Online</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors duration-300"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors duration-300"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'agent' && (
                  <Avatar src={message.avatar || agentAvatar} name={message.name || agentName} size="sm" />
                )}
                
                <div className={cn(
                  'max-w-[70%] p-3 rounded-2xl',
                  message.sender === 'user'
                    ? 'bg-monks-accent text-white'
                    : 'bg-monks-light-gray text-monks-black'
                )}>
                  <p className="text-sm">{message.content}</p>
                  <p className={cn(
                    'text-xs mt-1',
                    message.sender === 'user' ? 'text-white/70' : 'text-monks-gray'
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {message.sender === 'user' && (
                  <Avatar name="You" size="sm" />
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <Avatar src={agentAvatar} name={agentName} size="sm" />
                <div className="bg-monks-light-gray p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-monks-gray rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-monks-gray rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-monks-gray rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-monks-gray/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2 bg-monks-accent text-white rounded-full hover:bg-monks-hover disabled:opacity-50 transition-all duration-300"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};