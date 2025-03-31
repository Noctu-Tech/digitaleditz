import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
export default function TooltipWrapper({children,content}:{children:React.ReactNode,content:string}){  
    return(
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    {children}</TooltipTrigger>
    <TooltipContent>
      <p>{content}</p>
    </TooltipContent>
  </Tooltip>
  
</TooltipProvider>)}
