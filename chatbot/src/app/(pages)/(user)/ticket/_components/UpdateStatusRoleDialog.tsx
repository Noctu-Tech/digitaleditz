import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpdateStatusRole } from "@/lib/functions/username/dashboard"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { useCallback } from "react"
import { Form, useForm } from "react-hook-form"
import { toast } from "sonner"




interface Props{
    open:boolean
    onOpenChange:(open:boolean)=>void
    user:any
}
function UpdateStatusRoleDialog({open,onOpenChange,user}:Props) {
    const form = useForm({
        defaultValues: {
            status: user?.status,
            role: user?.role,
        }
    })
    const{mutate,isPending}=useMutation({
        mutationFn:UpdateStatusRole,
        onSuccess:()=>{
            toast.success("User Status and Role Updated", {id:"update-user-status-role"})
            onOpenChange(false)
        },
        onError:()=>{
            toast.error("Failed to update user status and role", {id:"update-user-status-role"})
        }
    })
const onSubmit = useCallback((values:any) => {
    toast.loading("Updating User Status or Role...", {id:"update-user-status-role"})
    mutate({
        // userId:user?.id,
        status:values.status,
        role:values.role
    })
},[mutate])
  return (
    <>
<Dialog open={open} onOpenChange={onOpenChange}>
    <DialogOverlay>
        <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                <DialogTitle>Update User Status & Role</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
           
           <h3>User: 
            {/* {user.name} */}

           </h3>
           <h3>User-Id: 
            {/* {user._id} */}
            </h3>

            <FormField
      control={form.control}
      name="status"
      rules={{ required: "Status is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
         
         <FormField
      control={form.control}
      name="role"
      rules={{ required: "Role is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

<DialogFooter>
    <Button variant={'outline'} onClick={() => onOpenChange(false)}>
        Cancel
    </Button>
    <Button type={'submit'} variant={'secondary'} className="ml-2" disabled={isPending}>
        {isPending && <Loader2Icon className="animate-spin mr-2" size={16} />}
        Save changes
    </Button>
</DialogFooter></form></Form>
         </DialogContent>
    </DialogOverlay>
</Dialog>
    </>
  )
}

export default UpdateStatusRoleDialog