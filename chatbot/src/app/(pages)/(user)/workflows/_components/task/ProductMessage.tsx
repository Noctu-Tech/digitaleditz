import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTasks } from "@/types/workflow";
import { BoxIcon, LucideProps, MessageCircle } from "lucide-react";

export const ProductMessageTask = {
    type: TaskType.PRODUCT_MESSAGE,
    label: "PRODUCT MESSAGE",
    inputs: [{
        name: "Select Product",
        type:TaskParamType.PRODUCT,
        required: true,
    },],
    outputs:[{name:"Product",type:TaskParamType.STRING}],
    icon: (props: LucideProps) => (<BoxIcon className="stroke-pink-600" {...props} />),
    isEntryPoint: false,
}satisfies WorkflowTasks
