"use client"

import { TaskType } from "@/types/task"
import { TaskRegistry } from "../task/registry"
import { Badge } from "@/components/ui/badge";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipTrigger, Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import TooltipWrapper from "@/components/tooltip-wrapper";


function NodeHeader({taskType}:{taskType:TaskType}) {
  const task = TaskRegistry[taskType];
    return (
    <div className="flex items-center justify-between gap-2 p-2">
        <task.icon size={16}/>
        <div className="flex justify-between items-center w-full">
            <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
            <div className="flex gap-1 items-center">
                {task.isEntryPoint&&<Badge>Entry Point</Badge>}

                <Badge className="gap-2 flex items-center text-xs">
                    <CoinsIcon size={16}/>
                    TODO
                </Badge>
                <TooltipWrapper content="drag">
                            <Button variant={"ghost"} size={"icon"} className="drag-handle cursor-grab">
                                <GripVerticalIcon size={20}/>
                            </Button></TooltipWrapper>
            </div>
        </div>
      
    </div>
  )
}

export default NodeHeader
