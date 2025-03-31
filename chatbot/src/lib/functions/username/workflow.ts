import { CreateFlowNode } from "@/app/(pages)/(user)/workflows/_components/CreateFlowNode";
import useAuth from "@/hooks/use-auth";
import { createnewworkflow } from "@/lib/api/workflow/workflow";
import { getWorkflowApi, updateWorkflowApi } from "@/lib/api/workflow/workflow";
import waitFor from "@/lib/helper/waitFor";
import { createWorkFlowSchema, CreateWorkflowSchemaType } from "@/schema/workflow";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getWorkflow = async ({ workflowId, userId }: { workflowId: string; userId: string; }) => {
    const workflow = {
      title:'workflow',
      description:'workflow description',
      workflow_id:workflowId,
      user_id:userId,
      status:'active',
      lastEdited:'2021-09-01',
      collaborators:1
  };
      return workflow;
  }
export const CreateWorkflow=async(form:CreateWorkflowSchemaType )=>{
const {success,data}=createWorkFlowSchema.safeParse(form);
if(!success){
    throw new Error("invalid form data")
}
const {userId}=useAuth();
if(!userId){
    throw new Error("unauthenticated")
}
const initialFlow:{nodes:AppNode[];edges:Edge[]}={nodes:[],edges:[]};
initialFlow.nodes.push(CreateFlowNode(TaskType.START_CHAT));
console.log(data);
// const data={userId,status:WorkflowStatus.DRAFT,definition:JSON.stringify(initialFlow)}
const result=await createnewworkflow({data})
console.log(result);
if(!result){
    throw new Error("Failed to create new workflow")
}
redirect(`/workflows/studio/${result.id}`)
}

export const UpdateWorkflow=async({id,definition}:{id:string,definition:string})=>{
    await waitFor(3000);
    const {userId}=useAuth();
    if(!userId){
        throw new Error("Unauthenticated");
    }
    const workflowId=id
    const result=await getWorkflowApi({workflowId,userId});
    if(!result){
        throw new Error("Failed to create new workflow");
    }
    if(result.status !== WorkflowStatus.DRAFT){
        throw new Error("Workflow is not a Draft");
    }
    await updateWorkflowApi({data: definition,id,userId});
    revalidatePath('/workflows')
 }

