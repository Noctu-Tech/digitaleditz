'use client'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import { handleSignout } from '@/lib/functions/auth'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
interface Props {
  
  open:boolean;
  setOpen:(open:boolean)=>void;
}
function SignoutAlert({open,setOpen}:Props) {
  const router=useRouter()
  const onSignOut = async () => {
    try {
        toast.loading("Signing out...", {id: "user-signout"});
        setOpen(false);
        const result = await handleSignout();
        
        if (result?.success) {
            toast.success("Signed out successfully", {id: "user-signout"});
            router.refresh(); 
            router.push('/signin');
        }
    } catch (error) {
      toast.error("Failed to sign out", {id: "user-signout"});
        console.error("Signout error:", error);
    }
};

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>
       
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onSignOut} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Sign out</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
 )
}

export default SignoutAlert
