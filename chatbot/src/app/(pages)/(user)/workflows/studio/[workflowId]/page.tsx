
import useAuth from '@/hooks/use-auth';
import Studio from '../../_components/studio/Studio'
import {getWorkflow} from "../../../../../../lib/functions/username/workflow";
async function Page({params}:{params:{workflowId:string}}){
  const {workflowId} = await params;
  const {userId}=useAuth();
  if(!userId){
    return <div>user is not authenticated</div>
  }
  const workflow = await getWorkflow({workflowId,userId});
  if(!workflow){
    return <div>workflow not found</div>
  }
  
  return <Studio workflow={workflow}/>
}

export default Page