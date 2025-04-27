import { TaskParam, TaskParamType} from "@/types/task"
import NodeParamField from "./NodeParamField"


export default function NodeBody({body,nodeId}:{body?:TaskParam,nodeId:string}) {
  return (
    <div className="flex  justify-end relative p-3 bg-secondary">
   
      <NodeParamField param={body} nodeId={nodeId}/>
    </div>
  )
}
