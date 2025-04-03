"use client"

import { AlertDialog, AlertDialogTitle,AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { deleteWorkflow } from "@/lib/functions/workflow/deleteWorkflow";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
interface Props{
  open:boolean;
  setOpen:(open:boolean)=>void;
  workFlowName:string;
  workFlowId:string;
}
function DeleteWorkFlowDialog({open,setOpen,workFlowId,workFlowName}:Props) {
  const [confirmText,setConfirmtext]=useState("");
  const deleteMutation=useMutation({
mutationFn:deleteWorkflow,
onSuccess:()=>{
  toast.success("Workflow Deleted Successfully",{id:workFlowId});
  setConfirmtext("");
},
onError:()=>{
  toast.error("Something went Wrong",{id:workFlowId});
}
  })
  return (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          if you delete this workflow you will not be able to recover it
          <div className="flex flex-col py-4 gap-2">
            <p>if you are sure enter <b>{workFlowName}</b> to confirm:</p>
            <Input value={confirmText} onChange={(e)=>{setConfirmtext(e.target.value)}}>
            </Input>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>{setConfirmtext("")}}>Cancel</AlertDialogCancel>
        <AlertDialogAction disabled={confirmText!==workFlowName || deleteMutation.isPending} onClick={()=>{
          toast.loading("Deleting Workflow.....",{id:workFlowId});
          deleteMutation.mutate(workFlowId);
        }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteWorkFlowDialog
