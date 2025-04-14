"use client"

import { TaskType } from "@/types/task"
import { TaskRegistry } from "../task/registry"
import { Badge } from "@/components/ui/badge";
import { CoinsIcon, CopyIcon, GripVerticalIcon, icons, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipTrigger, Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNode";
import { CreateFlowNode } from "../CreateFlowNode";


function NodeHeader({ taskType, nodeId }: { taskType: TaskType, nodeId: string }) {
    const task = TaskRegistry[taskType];
    const { deleteElements,getNode,addNodes } = useReactFlow();
    return (
        <div className="flex items-center justify-between gap-2 p-2">
            <task.icon size={16} />
            <div className="flex justify-between items-center w-full">
                <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
                <div className="flex gap-1 items-center">
                    {task.isEntryPoint && <Badge>Entry Point</Badge>}
                    {task.isAuthPoint && <Badge variant="secondary">Auth Point</Badge>}
                    {task.isEndPoint && <Badge variant="secondary">End Point</Badge>}
                    {!task.isEntryPoint  && (
                    <>
                    <TooltipWrapper content="Delete node">
                        <Button 
                        variant={"ghost"} 
                        onClick={() => {
                            const node = getNode(nodeId) as AppNode;
                            if (!node.data.isSpecial) {
                                deleteElements({ nodes: [{ id: nodeId }] });
                            }
                        }}
                        size={"icon"}
                        disabled={task.isEntryPoint || task.isAuthPoint || task.isEndPoint}>
                            <Trash2Icon size={12} />
                        </Button>
                    </TooltipWrapper>
                    {(!task.isAuthPoint && !task.isEndPoint)&&<TooltipWrapper content="Duplicate node">
                        <Button
                        variant={"ghost"}
                        onClick={()=>{
                            const node = getNode(nodeId) as AppNode;
                            const newX = node.position.x;
                            const newY = node.position.y + node.measured?.height! + 20;
                            const newNode = CreateFlowNode(node.data.type, {
                                x: newX,
                                y: newY,
                            });
                            addNodes([newNode]);
                        }}
                        size={"icon"}>
                            <CopyIcon size={12} />
                        </Button>
                    </TooltipWrapper>}
                    </>
                    )}
                   
                    <TooltipWrapper content="drag">
                        <Button variant={"ghost"} size={"icon"} className="drag-handle cursor-grab">
                            <GripVerticalIcon size={20} />
                        </Button></TooltipWrapper>
                </div>
            </div>

        </div>
    )
}

export default NodeHeader
