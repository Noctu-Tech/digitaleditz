import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTasks } from "@/types/workflow";
import { BoxIcon, LucideProps, MessageCircle } from "lucide-react";

export const ProductMessageTask = {
    type: TaskType.PRODUCT_MESSAGE,
    label: "PRODUCT MESSAGE",
    inputs: [{
        name: "Message Trigger  ",
        helperText:"Product Message Action",
        type:TaskParamType.STRING,
        required: true,
    },],
    body:{name:"Message Body",variant:'textarea',type:TaskParamType.STRING,helperText:"Message Body",required:true,hidehandle:true},
    outputs:[ {
        name:"Action-1",
        type:TaskParamType.STRING,
    }
    , {
        name:"Action-2",
        type:TaskParamType.STRING,
    },
    {
        name:"Action-3",
        type:TaskParamType.STRING,
    }
],
    icon: (props: LucideProps) => (<BoxIcon className="stroke-pink-600" {...props} />),
    isEntryPoint: false,
    isAuthPoint:false,
    isEndPoint:false
}satisfies WorkflowTasks
