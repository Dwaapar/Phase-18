import React, { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
}

interface KanbanProps {
  columns: KanbanColumn[];
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void;
  onCardAdd?: (columnId: string) => void;
  className?: string;
}

export const Kanban: React.FC<KanbanProps> = ({
  columns,
  onCardMove,
  onCardAdd,
  className
}) => {
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    
    if (!draggedCard) return;

    // Find the source column
    const sourceColumn = columns.find(col => 
      col.cards.some(card => card.id === draggedCard)
    );

    if (sourceColumn && sourceColumn.id !== columnId) {
      onCardMove?.(draggedCard, sourceColumn.id, columnId);
    }

    setDraggedCard(null);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-monks-gray/10 text-monks-gray';
    }
  };

  return (
    <div className={cn('flex gap-6 overflow-x-auto pb-6', className)}>
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 w-80 bg-monks-light-gray rounded-3xl p-6"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {column.color && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
              )}
              <h3 className="font-semibold text-monks-black">{column.title}</h3>
              <span className="px-2 py-1 bg-monks-gray/10 text-monks-gray rounded-full text-xs">
                {column.cards.length}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onCardAdd?.(column.id)}
                className="p-1 hover:bg-monks-gray/10 rounded transition-colors duration-300"
              >
                <Plus size={16} className="text-monks-gray" />
              </button>
              <button className="p-1 hover:bg-monks-gray/10 rounded transition-colors duration-300">
                <MoreHorizontal size={16} className="text-monks-gray" />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {column.cards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card.id)}
                className={cn(
                  'bg-white rounded-2xl p-4 cursor-move transition-all duration-300 hover:shadow-card',
                  draggedCard === card.id && 'opacity-50 scale-95'
                )}
              >
                <div className="space-y-3">
                  <h4 className="font-medium text-monks-black">{card.title}</h4>
                  
                  {card.description && (
                    <p className="text-sm text-monks-gray">{card.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {card.priority && (
                        <span className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          getPriorityColor(card.priority)
                        )}>
                          {card.priority}
                        </span>
                      )}
                      
                      {card.tags && card.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {card.assignee && (
                      <div className="w-6 h-6 bg-monks-accent/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-monks-accent">
                          {card.assignee[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};