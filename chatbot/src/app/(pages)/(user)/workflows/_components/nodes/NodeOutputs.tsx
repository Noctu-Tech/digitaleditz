"use client"

import { cn } from "@/lib/utils"
import { TaskParam } from "@/types/task"
import { Handle, Position, useEdges } from "@xyflow/react"
import { colorForHandle } from "./Common"
import NodeParamField from "./NodeParamField"

export function NodeOutputs({ children }:{ children: React.ReactNode}) {
  return (
    <div className="flex flex-col divide-y gap-1 ">
      {children}
    </div>
  )
}   
export function NodeOutput({
  nodeId,
  output,
  isDynamic = false,
}: {
  output: TaskParam,
  nodeId: string,
  isDynamic?: boolean
  
}) {
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.source === nodeId && edge.sourceHandle === (isDynamic ? output.id : output.name)
  );
  
  // Use the output.id as the handle ID for dynamic outputs, otherwise use output.name
  const handleId = isDynamic ? output.id : output.name;
  
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <NodeParamField param={output} nodeId={nodeId} disabled={isConnected} />
      
      <Handle
        id={handleId}
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