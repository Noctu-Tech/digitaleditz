
import { useAuth } from '@/hooks/auth';
import Studio from '../../_components/studio/Studio'
import { getWorkflow } from '@/lib/functions/workflow/getWorkflow';
import apiClientNew from '@/lib/functionapis/apiclientnew';
import apiClient from '@/lib/functionapis/apiclient';
async function Page({params}:{params:{workflowId:string}}){
  const { workflowId } = params;
  
  const {data:workflow} = await apiClient.get(`/workflow/get/${workflowId}`);
  if(!workflow){
    return <div>workflow not found</div>
  }
  return <Studio workflow={workflow}/>
}

export default Page