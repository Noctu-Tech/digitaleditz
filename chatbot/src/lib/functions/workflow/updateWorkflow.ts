import { getWorkflowApi, updateWorkflowApi } from "@/lib/api/workflow/workflow";
import waitFor from "@/lib/helper/waitFor";
import { WorkflowStatus } from "@/types/workflow";
import { revalidatePath } from "next/cache";

export const UpdateWorkflow=async({id,definition}:{id:string,definition:string})=>{
    await waitFor(3000);
      const workflowId=id
    const result=await getWorkflowApi({workflowId});
    if(!result){
        throw new Error("Failed to create new workflow");
    }
    if(result.status !== WorkflowStatus.DRAFT){
        throw new Error("Workflow is not a Draft");
    }
    await updateWorkflowApi({data: definition,id});
    console.log(definition)
    revalidatePath('/workflows')
 }