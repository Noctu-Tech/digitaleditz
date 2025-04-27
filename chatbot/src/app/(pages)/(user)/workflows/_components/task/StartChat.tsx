import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTasks } from "@/types/workflow";
import { LucideProps, MessageCircle } from "lucide-react";

export const StartChatTask = {
    type: TaskType.START_CHAT,
    label: "Start Chat",
    inputs: [{
        name: "Message Trigger",
        type:TaskParamType.STRING,
        helperText: "Text user might send to start a chat session could be a greeting or a question like 'Hi' or 'Hello'",
        required: true,
        hideHandle: true,
    },],
    body:{name:"Message Body",type:TaskParamType.STRING,helperText:"Message Body",required:true,hidehandle:true},
    outputs:[
    ],
    icon: (props: LucideProps) => (<MessageCircle className="stroke-green-600" {...props} />),
    isEntryPoint: true,
    isAuthPoint: false,
    isEndPoint:false
} satisfies WorkflowTasks