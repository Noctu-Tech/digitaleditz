import { TaskParamType, TaskType } from "@/types/task";
import { LucideProps, MessageCircle } from "lucide-react";

export const ProductMessageTask = {
    type: TaskType.PRODUCT_MESSAGE,
    label: "PRODUCT MESSAGE",
    inputs: [{
        name: "Select Product",
        type:TaskParamType.STRING,
        helperText: "Text user might send to start a chat session could be a greeting or a question like 'Hi' or 'Hello'",
        required: true,
        hideHandle: true,
    },],
    icon: (props: LucideProps) => (<MessageCircle className="stroke-pink-600" {...props} />),
    isEntryPoint: false,
}
