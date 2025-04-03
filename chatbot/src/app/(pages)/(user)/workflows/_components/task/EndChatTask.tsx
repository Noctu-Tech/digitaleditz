import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTasks } from "@/types/workflow";
import { LucideProps, MessageCircle } from "lucide-react";

export const EndChatTask = {
    type: TaskType.END_CHAT,
    label: "END CHAT",
    inputs: [{
        name: "Message Request",
        type:TaskParamType.STRING,
        helperText: "Text user might send to start a chat session could be a greeting or a question like 'Hi' or 'Hello'",
        required: true,
        hideHandle: false,
    },],
    outputs:[{  name: "END CHAT",
        type:TaskParamType.STRING,}],
    icon: (props: LucideProps) => (<MessageCircle className="stroke-blue-600" {...props} />),
    isEntryPoint: false,
}satisfies WorkflowTasks
