import { ActionMessageTask } from "./ActionMessage";
import { EndChatTask } from "./EndChatTask";
import { ProductMessageTask } from "./ProductMessage";
import { StartChatTask } from "./StartChat";

export const TaskRegistry = {
    START_CHAT: StartChatTask,
    ACTION_MESSAGE:ActionMessageTask,
    PRODUCT_MESSAGE:ProductMessageTask,
    END_CHAT:EndChatTask
}