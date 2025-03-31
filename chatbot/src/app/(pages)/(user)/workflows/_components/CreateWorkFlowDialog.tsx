"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CustomDialogHeader from "./CustomDialogHeader";
import { Layers2Icon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { createWorkFlowSchema } from "../../../../../schema/workflow";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateWorkflow } from "@/lib/functions/username/workflow";
import { toast } from "sonner";
import { CreateWorkflowSchemaType } from "../../../../../schema/workflow";
function CreateWorkFlowDialog({ triggerText,triggerEl }: { triggerText?: string,triggerEl?:React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof createWorkFlowSchema>>({
        resolver: zodResolver(createWorkFlowSchema),
        defaultValues: {}
    })
    const {mutate,isPending}=useMutation({
        mutationFn: CreateWorkflow,
        onSuccess:()=>{
        toast.success("WorkFlow created",{id:"create-workflow"});
        },
        onError:()=>{
            toast.error("Failed to create workflow",{id:"create-workflow"})
        }
    })
    const onSubmit=useCallback((values: CreateWorkflowSchemaType)=>{
        toast.loading("Creating Workflow...",{id:"create-workflow"});
        mutate(values)
    },[mutate])
    return (
        <Dialog open={open} onOpenChange={(open)=>{form.reset();setOpen(open);}}>
            <DialogTrigger asChild>
                {triggerEl ? triggerEl : <Button>{triggerText ?? "Create workflow"}</Button>}
            </DialogTrigger>
            <DialogContent>
                <CustomDialogHeader icon={Layers2Icon}
                    title="Create Workflow"
                    subtitle="Start building your workflow"
                />
                <div className="p-6">
                    <Form {...form}>
                        <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                             control={form.control}
                             name="name"
                             render={({ field }) => (
                             <FormItem>
                                <FormLabel className="flex gap-1  items-center">Name
                                    <p className="text-xs text-primary">(required)</p>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                        <FormDescription>Choose descriptive and unique name</FormDescription>
                        <FormMessage/>
                        </FormItem>   
                        )}/>
  <FormField 
                             control={form.control}
                             name="description"
                             render={({ field }) => (
                             <FormItem>
                                <FormLabel className="flex gap-1  items-center">Description
                                    <p className="text-xs text-muted-foreground">(optional)</p>
                                </FormLabel>
                                <FormControl>
                                    <Textarea className="resize-none" {...field} />
                                </FormControl>
                        <FormDescription>Provide a brief description of what your workflow does.<br/> This is optional but can help you remember the workflow&apos;s purpose</FormDescription>
                        <FormMessage/>
                        </FormItem>   
                        )}/>
                        <Button type="submit" className="w-full" disabled={isPending}>{isPending?<Loader2Icon className="animate-spin"/>:"Create Workflow"}</Button>
                </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkFlowDialog
