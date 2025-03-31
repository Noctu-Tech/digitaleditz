"use client"
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, MiniMap, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";

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
   },[])
   const onConnect=useCallback((conection:Connection)=>{
    setEdges(eds=>addEdge({...conection,animated:true},eds))
    if(!conection.targetHandle)return;
    const node =nodes.find((nd)=>nd.id===conection.target);
    if(!node)return;
    const nodeInputs = node.data.inputs;
    delete nodeInputs[conection.targetHandle];
    updateNodeData(node.id,{
      inputs:nodeInputs
    })
  },[setEdges,updateNodeData])
  return (
    <main className='w-full h-full'>
      <ReactFlow 
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