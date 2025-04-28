"use client"
import { cn } from "@/lib/utils"
import { TaskParam } from "@/types/task"
import { Handle, Position, useEdges } from "@xyflow/react"
import { colorForHandle } from "./Common"
import NodeParamField from "./NodeParamField"

export function NodeOutputs({ children }:{ children: React.ReactNode}) {
  return (
    <div className="flex flex-col divide-y gap-1 P-2 ">
      <h3>Options</h3>
      {children}
    </div>
  )
}  

export function NodeOutput({
  nodeId,
  output,
}: {
  output: TaskParam,
  nodeId: string,
}) {
  const edges = useEdges();
  
  // Check if this output is connected to any edge
  const isConnected = edges.some(
    (edge) => edge.source === nodeId && edge.sourceHandle === output.name
  );
  
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <NodeParamField 
        param={output} 
        nodeId={nodeId} 
        disabled={isConnected} 
        dataType="output" 
      />
      
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          colorForHandle[output.type]
        )}
      />
    </div>
  );
}