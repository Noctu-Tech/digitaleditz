import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTasks } from "@/types/workflow";
import { LucideProps, MessageCircle } from "lucide-react";

export const EndChatTask = {
    type: TaskType.END_CHAT,
    label: "END CHAT",
    inputs: [{
        name: "Message Trigger",
        type:TaskParamType.STRING,
        helperText: "Text user might send to start a chat session could be a greeting or a question like 'Hi' or 'Hello'",
        required: true,
        hideHandle: false,
    },],
   body:{name:"Message Body",varaint:'textarea',type:TaskParamType.STRING,helperText:"Message Body",required:true,hidehandle:true},
    icon: (props: LucideProps) => (<MessageCircle className="stroke-blue-600" {...props} />),
    isEntryPoint: false,
    isAuthPoint: false,
    isEndPoint:true
}satisfies WorkflowTasks
