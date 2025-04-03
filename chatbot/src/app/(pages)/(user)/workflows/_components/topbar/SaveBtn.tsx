"use client"
import { Button } from '@/components/ui/button'
import { UpdateWorkflow } from '@/lib/functions/workflow/updateWorkflow';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { CheckIcon } from 'lucide-react'
import { toast } from 'sonner';


function SaveBtn({workflowId}:{workflowId:string}) {
    const {toObject}=useReactFlow();
    const saveMutation=useMutation({
      mutationFn:UpdateWorkflow,
      onSuccess: ()=>{
        toast.success("Flow saved Succeessfully",{id:"save-workflow"});
      },
      onError:()=>{toast.error(
        "Something went wrong",{id:"save-workflow"}
      );}
    });
return (
<Button
disabled={saveMutation.isPending}
variant="outline" className='flex items-center gap-2 ' onClick={()=>{
  const workflowDefinition=JSON.stringify(toObject())
  toast.loading("Saving Workflow...")  
  saveMutation.mutate({
      id:workflowId,
      definition:workflowDefinition,
    });
  }}>
   <CheckIcon size={16} className="stroke-green-500"/> Save
</Button>
)
}

export default SaveBtn
