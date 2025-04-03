
import { WorkFlow } from "@/types/workflow";
import axios from "axios";
import { CreateWorkflowSchemaType } from "@/schema/workflow";
import { ENV } from "@/lib/functions/config";
import waitFor from "@/lib/helper/waitFor";
const url=ENV.BACKEND_URL+"/workflow"
export const getWorkflowApi = async ({ workflowId }: { workflowId: string; }) => {
  const workflow = {
    title:'workflow',
    description:'workflow description',
    workflow_id:workflowId,
    status:'active',
    lastEdited:'2021-09-01',
    collaborators:1
};
    return workflow;
}

export async function updateWorkflowApi({ data, id }: { data: string; id: string;}){
return true;
}
export async function createnewworkflow({data}:{data:CreateWorkflowSchemaType}){
try{
const response=await axios.post(url+'/create')
return response.data.id
}
catch(e){

}
waitFor(2000);
const res={id:"somethinghere"}
return res
}