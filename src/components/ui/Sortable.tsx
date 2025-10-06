import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SortableItem {
  id: string;
  content: React.ReactNode;
}

interface SortableProps {
  items: SortableItem[];
  onReorder?: (items: SortableItem[]) => void;
  className?: string;
}

export const Sortable: React.FC<SortableProps> = ({
  items,
  onReorder,
  className
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    setDragOverItem(itemId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, dropItemId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === dropItemId) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const dropIndex = items.findIndex(item => item.id === dropItemId);

    const newItems = [...items];
    const [draggedItemData] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItemData);

    onReorder?.(newItems);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={(e) => handleDragOver(e, item.id)}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, item.id)}
          className={cn(
            'flex items-center gap-3 p-4 bg-white rounded-2xl border transition-all duration-300 cursor-move',
            draggedItem === item.id && 'opacity-50 scale-95',
            dragOverItem === item.id && 'border-monks-accent bg-monks-accent/5',
            !draggedItem && 'hover:shadow-card'
          )}
        >
          <GripVertical size={16} className="text-monks-gray" />
          <div className="flex-1">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};