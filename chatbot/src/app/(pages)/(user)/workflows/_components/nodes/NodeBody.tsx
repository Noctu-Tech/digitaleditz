import { TaskParam } from "@/types/task"
import NodeParamField from "./NodeParamField"


export default function NodeBody({body,nodeId}:{body?:TaskParam,nodeId:string}) {
  return (
    <div className="flex  justify-end relative p-3 bg-secondary">
      
    {body && <NodeParamField param={body} nodeId={nodeId} dataType={"body"} />}
      
  
    </div>
  )
}
