"use client"
import React, { useState, useRef, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { 
  DndProvider, 
  useDrag, 
  useDrop, 
  DragSourceMonitor,
  DropTargetMonitor
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Enum for Node Types
export enum NodeType {
  START = 'start',
  ACTION = 'action',
  CONDITION = 'condition',
  WAIT = 'wait',
  API_CALL = 'api_call',
  FILTER = 'filter',
  TRANSFORM = 'transform',
  END = 'end'
}

// Node Type Configuration
const NODE_TYPE_CONFIG = {
  [NodeType.START]: { 
    label: 'Start', 
    color: 'bg-green-500', 
    icon: '🟢' 
  },
  [NodeType.ACTION]: { 
    label: 'Action', 
    color: 'bg-blue-500', 
    icon: '🔵' 
  },
  [NodeType.CONDITION]: { 
    label: 'Condition', 
    color: 'bg-yellow-500', 
    icon: '🟡' 
  },
  [NodeType.WAIT]: { 
    label: 'Wait', 
    color: 'bg-purple-500', 
    icon: '⏳' 
  },
  [NodeType.API_CALL]: { 
    label: 'API Call', 
    color: 'bg-indigo-500', 
    icon: '🌐' 
  },
  [NodeType.FILTER]: { 
    label: 'Filter', 
    color: 'bg-pink-500', 
    icon: '🧩' 
  },
  [NodeType.TRANSFORM]: { 
    label: 'Transform', 
    color: 'bg-teal-500', 
    icon: '🔄' 
  },
  [NodeType.END]: { 
    label: 'End', 
    color: 'bg-red-500', 
    icon: '🔴' 
  }
};

// Interfaces
export interface WorkflowNode {
  id: string;
  x: number;
  y: number;
  type: NodeType;
  title: string;
}

export interface WorkflowConnection {
  id: string;
  source: string;
  target: string;
}

// Canvas Drop Zone Component
const CanvasDropZone: React.FC<{ 
  onNodeDrop: (type: NodeType, x: number, y: number) => void 
}> = ({ onNodeDrop }) => {
  const [, drop] = useDrop({
    accept: 'SIDEBAR_NODE',
    drop: (item: { type: NodeType }, monitor: DropTargetMonitor) => {
      const offset = monitor.getSourceClientOffset();
      const dropTargetOffset = monitor.getSourceClientOffset();

      if (offset && dropTargetOffset) {
        onNodeDrop(item.type, dropTargetOffset.x, dropTargetOffset.y);
      }
    }
  });

  return (
    <div 
      ref={(node)=>{drop(node)}}
      className="flex-grow relative bg-gray-100 border h-full"
    />
  );
};

// Sidebar Node Item
const SidebarNodeItem: React.FC<{ type: NodeType }> = ({ type }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SIDEBAR_NODE',
    item: { type },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const config = NODE_TYPE_CONFIG[type];

  return (
    <div 
      ref={(node)=>{drag(node)}}
      className={`
        p-2 mb-2 rounded flex items-center cursor-move 
        ${config.color} text-white 
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <span className="mr-2">{config.icon}</span>
      {config.label}
    </div>
  );
};

// Main Workflow Builder Component
const WorkflowBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<WorkflowConnection[]>([]);

  // Add new node to canvas
  const handleNodeDrop = useCallback((type: NodeType, x: number, y: number) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      x,
      y,
      type,
      title: `${NODE_TYPE_CONFIG[type].label} Node`
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  // Delete node
  const deleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setConnections(prev => 
      prev.filter(conn => conn.source !== id && conn.target !== id)
    );
  }, []);

  // Update node
  const updateNode = useCallback((
    id: string, 
    newTitle: string, 
    newType?: NodeType
  ) => {
    setNodes(prev => 
      prev.map(node => 
        node.id === id 
          ? { 
              ...node, 
              title: newTitle, 
              type: newType || node.type 
            } 
          : node
      )
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Node Types</h2>
          {Object.values(NodeType).map(type => (
            <SidebarNodeItem key={type} type={type} />
          ))}
        </div>

        {/* Canvas */}
        <CanvasDropZone onNodeDrop={handleNodeDrop} />
      </div>
    </DndProvider>
  );
};

export default WorkflowBuilder;