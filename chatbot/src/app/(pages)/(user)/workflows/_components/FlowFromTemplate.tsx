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
import { toast } from "sonner";
import { CreateWorkflowSchemaType } from "../../../../../schema/workflow";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from '@/hooks/auth';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { CreateWorkflow } from "@/lib/functions/workflow/createWorkflow";

function CreateWorkFlowDialog({ triggerText, triggerEl }: { triggerText?: string, triggerEl?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const { hasPermission } = useAuth();
    const canManageTemplates = hasPermission(['admin']);

    const form = useForm<z.infer<typeof createWorkFlowSchema>>({
        resolver: zodResolver(createWorkFlowSchema),
        defaultValues: {
            isTemplate: false,
            color: 'blue'
        }
    });const router=useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: (data) => {
            toast.success("WorkFlow created", { id: "create-workflow" });
            
            router.push(`/workflows/studio/${data.id}`)
        },
        onError: () => {
            toast.error("Failed to create workflow", { id: "create-workflow" });
        }
    });

    const onSubmit = useCallback((values: CreateWorkflowSchemaType) => {
        toast.loading("Creating Workflow...", { id: "create-workflow" });
        mutate(values);
    }, [mutate]);

    return (
        <Dialog open={open} onOpenChange={(open) => { form.reset(); setOpen(open); }}>
            <DialogTrigger asChild>
                {triggerEl ? triggerEl : <Button>{triggerText ?? "Create workflow"}</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw] max-h-[80vh]">
                <ScrollArea className="max-h-[70vh]">
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

                                {canManageTemplates&&(
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="isTemplate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Template Workflow</FormLabel>
                                                        <FormDescription>
                                                            Make this workflow available as a template
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="color"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel>Template Color</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-wrap gap-4"
                                                        >
                                                            {['blue', 'red', 'green', 'purple', 'orange'].map((color) => (
                                                                <FormItem key={color}>
                                                                    <FormControl>
                                                                        <RadioGroupItem
                                                                            value={color}
                                                                            className={`h-6 w-6 bg-${color}-500`}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? <Loader2Icon className="animate-spin" /> : "Create Workflow"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkFlowDialog
