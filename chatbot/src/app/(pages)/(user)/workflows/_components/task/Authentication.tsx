import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTasks } from "@/types/workflow";
import { BoxIcon, KeyRoundIcon, LucideProps, MessageCircle } from "lucide-react";

export const AuthenticationTask = {
    type: TaskType.AUTHENTICATION_TASK,
    label: "AUTHENTICATION HANDLER",
    inputs: [{
        name: "Use Authentication",
        type:TaskParamType.AUTHENTICATION,
        required: true,
    },],
    outputs:[{name:"Product",type:TaskParamType.STRING}],
    icon: (props: LucideProps) => (<KeyRoundIcon className="stroke-amber-600" {...props} />),
    isEntryPoint: false,
    isAuthPoint:true,
    isEndPoint:false
}satisfies WorkflowTasks
