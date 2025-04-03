"use client"

import { AlertDialog, AlertDialogTitle,AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { deleteProperty } from "@/lib/functions/property/deleteproperty";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
interface Props{
  open:boolean;
  setOpen:(open:boolean)=>void;
  propertyName:string;
  propertyId:string;
}
function DeletepropertyDialog({open,setOpen,propertyId,propertyName}:Props) {
  const [confirmText,setConfirmtext]=useState("");
  const deleteMutation=useMutation({
mutationFn:deleteProperty,
onSuccess:()=>{
  toast.success("property Deleted Successfully",{id:propertyId});
  setConfirmtext("");
},
onError:()=>{
  toast.error("Something went Wrong",{id:propertyId});
}
  })
  return (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          if you delete this property you will not be able to recover it
          <div className="flex flex-col py-4 gap-2">
            <p>if you are sure enter <b>{propertyName}</b> to confirm:</p>
            <Input value={confirmText} onChange={(e)=>{setConfirmtext(e.target.value)}}>
            </Input>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>{setConfirmtext("")}}>Cancel</AlertDialogCancel>
        <AlertDialogAction disabled={confirmText!==propertyName || deleteMutation.isPending} onClick={()=>{
          toast.loading("Deleting property.....",{id:propertyId});
          deleteMutation.mutate(propertyId);
        }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeletepropertyDialog
