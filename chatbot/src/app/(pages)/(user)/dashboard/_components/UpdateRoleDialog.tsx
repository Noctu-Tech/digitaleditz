import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpdateRole } from "@/lib/functions/username/dashboard"
import { UserRole } from "@/types/auth"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { useCallback } from "react"
import { Form, useForm } from "react-hook-form"
import { toast } from "sonner"




interface Props{
    open:boolean
    onOpenChange:(open:boolean)=>void
    role?:"admin"|"client"
    userId:string[]|string
}
interface valueProps{
    role?:"admin"|"client"
}
function UpdateRoleDialog({open,onOpenChange,role,userId}:Props) {
    const form = useForm({
        defaultValues: {
            role:role
        }
    })
    const{mutate,isPending}=useMutation({
        mutationFn:UpdateRole,
        onSuccess:()=>{
            toast.success("User Role Updated", {id:"update-user-role"})
            onOpenChange(false)
        },
        onError:()=>{
            toast.error("Failed to update user role", {id:"update-user-role"})
        }
    })
const onSubmit = useCallback((values:valueProps) => {
    toast.loading("Updating User Role...", {id:"update-user-role"})
    mutate({
        // userId:user?.id,
        
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
                <DialogTitle>Update User Role</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
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

export default UpdateRoleDialog