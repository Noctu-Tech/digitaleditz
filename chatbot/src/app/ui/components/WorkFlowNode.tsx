'use client'
import React, { useState, useRef, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
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

// Sidebar Node Item
const SidebarNodeItem: React.FC<{ type: NodeType }> = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NODE',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const config = NODE_TYPE_CONFIG[type];

  return (
    <div 
      ref={(node) => {drag(node)}}
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
  const canvasRef = useRef<HTMLDivElement>(null);

  // Drop handler for canvas
  const [, drop] = useDrop({
    accept: 'NODE',
    drop: (item: { type: NodeType }, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      if (offset && canvasRect) {
        const newNode: WorkflowNode = {
          id: `node-${Date.now()}`,
          x: offset.x - canvasRect.left,
          y: offset.y - canvasRect.top,
          type: item.type,
          title: `${NODE_TYPE_CONFIG[item.type].label} Node`
        };
        setNodes(prev => [...prev, newNode]);
      }
    }
  });

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

  // Render connections
  const renderConnections = () => {
    return connections.map(conn => {
      const sourceNode = nodes.find(n => n.id === conn.source);
      const targetNode = nodes.find(n => n.id === conn.target);
      
      if (!sourceNode || !targetNode) return null;

      return (
        <svg 
          key={conn.id} 
          className="absolute top-0 left-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          <line
            x1={sourceNode.x + 96}
            y1={sourceNode.y + 50}
            x2={targetNode.x + 96}
            y2={targetNode.y + 50}
            stroke="#4a5568"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      );
    });
  };

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
        <div 
          ref={(node) => {
            canvasRef.current = node;
            drop(node);
          }}
          className="flex-grow relative bg-gray-100 border"
        >
          {/* Workflow Nodes */}
          {nodes.map(node => (
            <Rnd
              key={node.id}
              default={{
                x: node.x,
                y: node.y,
                width: 192,
                height: 'auto'
              }}
              bounds="parent"
              onDragStop={(e, d) => {
                setNodes(prev => 
                  prev.map(n => 
                    n.id === node.id 
                      ? { ...n, x: d.x, y: d.y } 
                      : n
                  )
                );
              }}
            >
              <div 
                className={`
                  p-4 rounded-lg shadow-lg text-white 
                  ${NODE_TYPE_CONFIG[node.type].color} 
                  w-48 cursor-move
                `}
              >
                <div className="flex justify-between items-center mb-2">
                  <input 
                    type="text" 
                    value={node.title}
                    onChange={(e) => updateNode(node.id, e.target.value)}
                    className="bg-transparent text-white w-full outline-none"
                    placeholder="Node Title"
                  />
                  <button 
                    onClick={() => deleteNode(node.id)}
                    className="ml-2 text-white hover:text-red-200"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm opacity-75">
                  {NODE_TYPE_CONFIG[node.type].label} Type
                </div>
              </div>
            </Rnd>
          ))}

          {/* Connections */}
          <svg 
            className="absolute top-0 left-0 pointer-events-none" 
            style={{ width: '100%', height: '100%' }}
          >
            <defs>
              <marker 
                id="arrowhead" 
                markerWidth="10" 
                markerHeight="7" 
                refX="9" 
                refY="3.5" 
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#4a5568" />
              </marker>
            </defs>
            {renderConnections()}
          </svg>
        </div>
      </div>
    </DndProvider>
  );
};

export default WorkflowBuilder;