import React, { useState } from 'react';
import { MoreHorizontal, Trash2, CreditCard as Edit, Archive, Download } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BulkAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: (selectedItems: any[]) => void;
  destructive?: boolean;
  requiresConfirmation?: boolean;
}

interface BulkActionsProps {
  selectedItems: any[];
  actions?: BulkAction[];
  onClearSelection?: () => void;
  className?: string;
}

const defaultActions: BulkAction[] = [
  {
    id: 'edit',
    label: 'Edit Selected',
    icon: <Edit size={16} />,
    action: (items) => console.log('Edit', items)
  },
  {
    id: 'archive',
    label: 'Archive Selected',
    icon: <Archive size={16} />,
    action: (items) => console.log('Archive', items),
    requiresConfirmation: true
  },
  {
    id: 'export',
    label: 'Export Selected',
    icon: <Download size={16} />,
    action: (items) => console.log('Export', items)
  },
  {
    id: 'delete',
    label: 'Delete Selected',
    icon: <Trash2 size={16} />,
    action: (items) => console.log('Delete', items),
    destructive: true,
    requiresConfirmation: true
  }
];

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedItems,
  actions = defaultActions,
  onClearSelection,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmingAction, setConfirmingAction] = useState<string | null>(null);

  const handleAction = (action: BulkAction) => {
    if (action.requiresConfirmation) {
      setConfirmingAction(action.id);
    } else {
      action.action(selectedItems);
      onClearSelection?.();
    }
  };

  const confirmAction = () => {
    const action = actions.find(a => a.id === confirmingAction);
    if (action) {
      action.action(selectedItems);
      onClearSelection?.();
    }
    setConfirmingAction(null);
  };

  if (selectedItems.length === 0) return null;

  return (
    <>
      <div className={cn(
        'fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-elevated border border-monks-gray/10 px-6 py-4 z-40 animate-slide-up',
        className
      )}>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-monks-black">
            {selectedItems.length} item{selectedItems.length === 1 ? '' : 's'} selected
          </span>
          
          <div className="flex items-center gap-2">
            {actions.slice(0, 3).map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  action.destructive
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-monks-black hover:bg-monks-light-gray'
                )}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
            
            {actions.length > 3 && (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 text-monks-gray hover:text-monks-black rounded-full hover:bg-monks-light-gray transition-all duration-300"
                >
                  <MoreHorizontal size={16} />
                </button>
                
                {isOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2">
                    {actions.slice(3).map((action) => (
                      <button
                        key={action.id}
                        onClick={() => {
                          handleAction(action);
                          setIsOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300 flex items-center gap-3',
                          action.destructive && 'text-red-600 hover:bg-red-50'
                        )}
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={onClearSelection}
            className="text-monks-gray hover:text-monks-black transition-colors duration-300"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmingAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-monks-black mb-4">Confirm Action</h3>
            <p className="text-monks-gray mb-6">
              Are you sure you want to {actions.find(a => a.id === confirmingAction)?.label.toLowerCase()} {selectedItems.length} item{selectedItems.length === 1 ? '' : 's'}?
            </p>
            
            <div className="flex items-center gap-3">
              <button
                onClick={confirmAction}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-full font-medium hover:bg-red-700 transition-all duration-300"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmingAction(null)}
                className="flex-1 border border-monks-gray text-monks-gray px-4 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};