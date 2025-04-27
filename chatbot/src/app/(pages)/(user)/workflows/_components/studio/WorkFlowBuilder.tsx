"use client"
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, MiniMap, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";

import '@xyflow/react/dist/style.css';
import { CreateFlowNode } from "../CreateFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "../nodes/NodeComponent";
import { WorkFlow } from "@/types/workflow";
import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";
import { AppNode } from "@/types/appNode";
import { set } from "zod";
import DeletableEdge from "../edges/DeletableEdge";
import { TaskRegistry } from "../task/registry";

const nodeTypes = {
  Node:NodeComponent,
}
const edgeTypes: Record<string, React.ComponentType<any>> = {
  default: DeletableEdge,
};
const fitViewOptions={padding:1};
const snapGrid:[number,number]=[50,50];
const WorkflowBuilder = ({workflow}:{workflow:WorkFlow}) => {
  const [nodes, setNodes,onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges,onEdgesChange] = useEdgesState<Edge>([]);
  const {updateNodeData,setViewport,screenToFlowPosition}=useReactFlow();
  useEffect(()=>{
    try{
      const flow=JSON.parse(workflow.definition);
      console.log("flow",flow);
      if(!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if(!flow.viewport)return;
      const {x=0,y=0,zoom=1}=flow.viewport;
      setViewport({x,y,zoom})
    } catch (error){

    }
  },[setViewport,workflow.definition,setEdges,setNodes])
 const onDragOver = useCallback((event:React.DragEvent)=>{
  event.preventDefault();
  event.dataTransfer.dropEffect="move";

 },[])
   const onDrop = useCallback((event:React.DragEvent)=>{
     event.preventDefault();
     const taskType=event.dataTransfer.getData("application/reactflow");
     if (typeof taskType === undefined || !taskType) return;
     const position = screenToFlowPosition({
      x:event.clientX,
      y:event.clientY
     });
     
   const newNode = CreateFlowNode(taskType as TaskType,
    position
  );
   setNodes((nds)=>nds.concat(newNode))
   },[screenToFlowPosition,setNodes])
   const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    
    if (!connection.targetHandle) return;
  
    const node = nodes.find((nd) => nd.id === connection.target);
    if (!node) return;
  
    const nodeInputs = node.data.inputs;
    delete nodeInputs[connection.targetHandle];
  
    updateNodeData(node.id, {
      inputs: nodeInputs,
    });
  
  }, [setEdges, updateNodeData, nodes]);
  
  const isValidConnection = useCallback((connection: Edge | Connection) => {
    // No self-connection
    if (connection.source === connection.target) {
      return false;
    }
  
    const source = nodes.find((node) => node.id === connection.source);
    const target = nodes.find((node) => node.id === connection.target);
  
    if (!source || !target) {
      console.error("Invalid connection: source or target not found");
      return false;
    }
  
    const sourceTask = TaskRegistry[source.data.type];
    const targetTask = TaskRegistry[target.data.type];
  
    // Get dynamic outputs from source node
    const dynamicOutputs = Array.isArray(source.data.outputs) ? source.data.outputs : [];
    const dynamicOutput = dynamicOutputs.find((o: any) => o.name === connection.sourceHandle);
  
    // Fallback to static TaskRegistry output if dynamic not found
    const staticOutput = sourceTask.outputs?.find((o) => o.name === connection.sourceHandle);
  
    const output = dynamicOutput || staticOutput;
  
    const input = targetTask.inputs.find((i) => i.name === connection.targetHandle);
  
    if (!output || !input) {
      console.error("Invalid connection: missing input or output definition");
      return false;
    }
  
    if (input.type !== output.type) {
      console.error("Invalid connection: type mismatch");
      return false;
    }
  
    // Cycle detection
    const hasCycle = (node: AppNode, visited = new Set<string>()): boolean => {
      if (visited.has(node.id)) return false;
      visited.add(node.id);
  
      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
  
      return false;
    };
  
    const detectedCycle = hasCycle(target);
    return !detectedCycle;
  
  }, [nodes, edges]);
  
  return (
    <main className='w-full h-full'>
      <ReactFlow 
      isValidConnection={isValidConnection}
       nodes={nodes}
       onNodesChange={onNodesChange}
       edges={edges}
       onEdgesChange={onEdgesChange}
       nodeTypes={nodeTypes}
       edgeTypes={edgeTypes}
       snapToGrid
       onDragOver={onDragOver}
       onDrop={onDrop}
       onConnect={onConnect}
       fitViewOptions={fitViewOptions}
       snapGrid={snapGrid}
      >
        
      <Controls 
        className={cn("bg-background border-border", 
          "!shadow-sm [&>button]:border-border [&>button]:bg-background [&>button]:hover:bg-accent"
        )} 
        fitViewOptions={fitViewOptions} 
        position="top-left"
      />
      <Background variant={BackgroundVariant.Dots} size={2} gap={10}/>
      <MiniMap 
        zoomable pannable
        className={cn("bg-background !shadow-sm",
          "[&>svg]:bg-background [&>svg]:text-foreground"
        )}
      />

      </ReactFlow>
      
    </main>
  );
};

export default WorkflowBuilder;