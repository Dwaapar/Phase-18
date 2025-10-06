import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: React.ReactNode;
  data?: any;
}

interface TreeViewProps {
  nodes: TreeNode[];
  onNodeSelect?: (node: TreeNode) => void;
  selectedNodeId?: string;
  className?: string;
}

export const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  onNodeSelect,
  selectedNodeId,
  className
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNodeId === node.id;

    return (
      <div key={node.id}>
        <div
          className={cn(
            'flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-300',
            isSelected ? 'bg-monks-accent text-white' : 'hover:bg-monks-light-gray',
            'text-sm'
          )}
          style={{ paddingLeft: level * 20 + 8 }}
          onClick={() => onNodeSelect?.(node)}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              className="p-1 hover:bg-monks-gray/10 rounded"
            >
              {isExpanded ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}
          
          <div className="flex-shrink-0">
            {node.icon || (hasChildren ? (
              <Folder size={16} className={isSelected ? 'text-white' : 'text-monks-accent'} />
            ) : (
              <File size={16} className={isSelected ? 'text-white' : 'text-monks-gray'} />
            ))}
          </div>
          
          <span className="flex-1 truncate">{node.label}</span>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('space-y-1', className)}>
      {nodes.map(node => renderNode(node))}
    </div>
  );
};