"use client"

import TooltipWrapper from "@/components/tooltip-wrapper";
import SaveBtn from "./SaveBtn"
import { ChevronLeftIcon, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ActivateDialog from "../ActivateDialog";
interface Props{
  title:string;
  subtitle?:string;
  workflowId:string;
}
function TopBar({title,subtitle,workflowId}:Props) {
  const router=useRouter();
  return (
   <header className="flex p-2 border-b-2 border-separate justify-between w-ful h-[60px] sticky top-0 bg-background z-10">
    <div className="flex gap-1 flex-1 ">
      <TooltipWrapper content="Back">
        <Button variant={"ghost"} size={"icon"} onClick={()=> router.back()} ><ChevronLeftIcon size={20}/></Button>
      </TooltipWrapper>
      <div><p className="font-bold text-ellipsis truncate">{title}</p>
      {subtitle && (<p className="text-xs text-muted-foreground truncate text-ellipsis">{subtitle}</p>)}
      </div>
      <div className="flex gap-1 justify-end flex-1 ">
        <ActivateDialog triggerEl={
    <Button variant={"ghost"} className="flex items-center gap-2">
        <Play size={16} className="stroke-orange-400"/>
        Activate
    </Button>} workflowId={workflowId}/>
      <SaveBtn workflowId={workflowId}/>
      </div>
    </div>

   </header>
  )
}


export default TopBar
