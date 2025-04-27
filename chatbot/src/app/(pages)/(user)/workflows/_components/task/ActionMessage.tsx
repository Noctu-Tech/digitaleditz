import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTasks } from "@/types/workflow";
import { LucideProps, MessageCircle } from "lucide-react";

export const ActionMessageTask = {
    type: TaskType.ACTION_MESSAGE,
    label: "ACTION MESSAGE",
    inputs: [{
        name: "Message Trigger",
        type:TaskParamType.STRING,
        helperText: "Text user might send to start a chat session could be a greeting or a question like 'Hi' or 'Hello'",
        required: true,
        hideHandle: false,
    },],
    body:{name:"Message Body",variant:'textarea',type:TaskParamType.STRING,helperText:"Message you want to send to user",required:true,hideHandle:true},
    outputs:[
        {
            name:"action",
            type:TaskParamType.STRING,
        }

    ],
    icon: (props: LucideProps) => (<MessageCircle className="stroke-yellow-600" {...props} />),
    isEntryPoint: false,
    isAuthPoint: false,
    isEndPoint:false
}satisfies WorkflowTasks
