"use client"
import { AccordionItem,AccordionTrigger,Accordion,AccordionContent } from "@/components/ui/accordion"
import { TaskType } from "@/types/task"
import { TaskRegistry } from "../task/registry"
import { Button } from "@/components/ui/button"
function EventBar() {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 h-full overflow-auto px-4 p-2">
      <Accordion 
      type="multiple" 
      className="w-full"
      defaultValue={["action"]}
      >
        <AccordionItem value="action">
          <AccordionTrigger className="font-bold">
            Action
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
          <EventBtn taskType={TaskType.AUTHENTICATION_TASK}/>
          <EventBtn taskType={TaskType.ACTION_MESSAGE}/>
          <EventBtn taskType={TaskType.PRODUCT_MESSAGE}/>
          <EventBtn taskType={TaskType.END_CHAT}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
1
export default EventBar


function EventBtn({taskType}:{taskType:TaskType}) {
  const task=TaskRegistry[taskType];
  const OnDragStart =(event:React.DragEvent,type:TaskType)=>{
    event.dataTransfer.setData("application/reactflow",type);
    event.dataTransfer.effectAllowed="move";
  }
  return (
<Button variant={"secondary"} className="flex justify-between items-center gap-2 border w-full" draggable
onDragStart={event=>OnDragStart(event,taskType)}
>
  <div className="flex gap-2">
  <task.icon size={20}/>
  {task.label}
  </div>
</Button>      
  )
}
