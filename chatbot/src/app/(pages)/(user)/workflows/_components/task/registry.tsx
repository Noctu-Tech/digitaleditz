import { TaskType } from "@/types/task";
import { ActionMessageTask } from "./ActionMessage";
import { EndChatTask } from "./EndChatTask";
import { ProductMessageTask } from "./ProductMessage";
import { StartChatTask } from "./StartChat";
import {  WorkflowTasks } from "@/types/workflow";
import { AuthenticationTask } from "./Authentication";
type Registry={
    [K in TaskType]:WorkflowTasks & {type:K}
}
export const TaskRegistry:Registry = {
    START_CHAT: StartChatTask,
    ACTION_MESSAGE:ActionMessageTask,
    PRODUCT_MESSAGE:ProductMessageTask,
    AUTHENTICATION_TASK:AuthenticationTask,
    END_CHAT:EndChatTask
}