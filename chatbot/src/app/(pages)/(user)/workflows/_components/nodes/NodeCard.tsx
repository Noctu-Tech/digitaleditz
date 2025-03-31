"use client"
import { cn } from "@/lib/utils"
import { useReactFlow } from "@xyflow/react"
import { ReactNode } from "react"
function NodeCard({children,nodeId,isSelected}:{children:ReactNode,nodeId:string,isSelected:boolean}) {
  const {getNode,setCenter}=useReactFlow()
  return (
<div onDoubleClick={()=>{
    const node=getNode(nodeId)
    if(!node)return;
    const {position,measured}=node;
    if(!position||!measured)return;
    const { width ,height } = measured;
    if(width===undefined||height===undefined)return;
    const x=position.x + width/2;
    const y=position.y + height/2;
    if(x===undefined||y===undefined)return;
    setCenter(x,y,{
        zoom:1,
        duration:500
    })
}} className={cn("w-[420px] text-xs flex flex-col gap-1 bg-background border-2 cursor-pointer rounded-md border-separate",isSelected&&"border-primary")}>{children}</div>
  )
}
export default NodeCard
