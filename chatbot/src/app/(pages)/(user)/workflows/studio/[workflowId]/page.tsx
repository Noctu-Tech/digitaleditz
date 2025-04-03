
import { useAuth } from '@/hooks/auth';
import Studio from '../../_components/studio/Studio'
import { getWorkflow } from '@/lib/functions/workflow/getWorkflow';
async function Page({params}:{params:{workflowId:string}}){
  const {workflowId} = await params;
  
  const workflow = await getWorkflow({workflowId});
  if(!workflow){
    return <div>workflow not found</div>
  }
  
  return <Studio workflow={workflow}/>
}

export default Page