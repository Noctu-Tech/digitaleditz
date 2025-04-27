"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CustomDialogHeader from "./CustomDialogHeader";
import { Layers2Icon, Loader2Icon, PauseIcon, PlayIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from '@/hooks/auth';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { disableWorkFlowSchema, DisableWorkflowSchemaType } from "@/schema/workflow";
import DisableWorkflow from "@/lib/functions/workflow/disableWorkflow";

function DisableDialog({ triggerText, triggerEl }: { triggerText?: string, triggerEl?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const { hasPermission } = useAuth();
    const canManageTemplates = hasPermission(['admin']);

    const form = useForm<z.infer<typeof disableWorkFlowSchema>>({
        resolver: zodResolver(disableWorkFlowSchema),
     
    });const router=useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: DisableWorkflow,
        onSuccess: (data) => {
            toast.success("WorkFlow Disabled", { id: "Disable-workflow" });
        },
        onError: () => {
            toast.error("Failed to Disable workflow", { id: "Disable-workflow" });
        }
    });

    const onSubmit = useCallback((values: DisableWorkflowSchemaType) => {
        toast.loading("Deactivating Workflow...", { id: "Disable-workflow" });
        mutate(values);
    }, [mutate]);

    return (
        <Dialog open={open} onOpenChange={(open) => { form.reset(); setOpen(open); }}>
            <DialogTrigger asChild>
                {triggerEl ? triggerEl : <Button>{triggerText ?? "Disable workflow"}</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw] max-h-[80vh]">
                <ScrollArea className="max-h-[70vh]">
                    <CustomDialogHeader icon={PauseIcon}
                        title="Disable Workflow"
                        subtitle="Disable your workflow and start using it"
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
                                            <FormMessage />
                                        </FormItem>
                                    )} />
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
                                            <FormDescription>Provide a brief description of what your workflow does.<br /> This is optional but can help you remember the workflow&apos;s purpose</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                              
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? <Loader2Icon className="animate-spin" /> : "Disable Workflow"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default DisableDialog
