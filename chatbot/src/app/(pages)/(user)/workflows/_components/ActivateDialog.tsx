"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import CustomDialogHeader from "./CustomDialogHeader";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import handleActivateWorkflow from "@/lib/functions/workflow/activateWorkflow";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function ActivateDialog({ 
  triggerText, 
  triggerEl, 
  workflowId 
}: { 
  triggerText?: string, 
  triggerEl?: React.ReactNode, 
  workflowId: string 
}) {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleActivate = async () => {
        setError('');
        
        // Basic phone validation
        if (!phoneNumber || phoneNumber.trim() === '') {
            setError('Please enter a phone number');
            return;
        }
        
        try {
            setIsPending(true);
            const data = { phone_number: phoneNumber, workflow_id: workflowId };
            const result = await handleActivateWorkflow(phoneNumber,workflowId);
            console.log("Result",result)
            if (!result){
                toast.error("something went wrong",{id:'activate-workflow'})
            }
            toast.success("Successfully executed workflow",{id:'activate-workflow'})
            setOpen(false);
            // Reset the form
            setPhoneNumber('');
            
            // You could add toast notification here if you have a toast system
            
        } catch (error) {
            // Error handling
            console.error("Failed to activate workflow:", error);
            toast.error("something went wrong",{id:'activate-workflow'})
            
        } finally {
            setIsPending(false);
        }
    };

    const handleDialogClose = () => {
        setError('');
        setPhoneNumber('');
        setIsPending(false);
    };

    return (
        <Dialog 
            open={open} 
            onOpenChange={(open) => {
                if (!open) {
                    handleDialogClose();
                }
                setOpen(open);
            }}
        >
            <DialogTrigger asChild>
                {triggerEl ? triggerEl : <Button>{triggerText ?? "Activate workflow"}</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw] max-h-[80vh]">
                <ScrollArea className="max-h-[70vh]">
                    <CustomDialogHeader 
                        icon={PlayIcon}
                        title="Activate Workflow"
                        subtitle="Activate your workflow and start using it"
                    />
                    <DialogDescription className="p-6 text-sm text-muted-foreground mb-4">
                        Are you sure you want to activate this workflow? Once activated, it will be live and accessible to users.
                        If any other workflow is already active, it will be deactivated automatically.
                        <br />
                        Please ensure that all configurations are correct before proceeding.
                    </DialogDescription>
                    
                    <div className="space-y-4 p-6">
                        <label htmlFor="phone-number" className="text-sm font-medium">
                            Phone Number
                        </label>
                        <Input 
                            id="phone-number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            disabled={isPending}
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    
                    <div className="p-6">
                        <DialogFooter className="flex justify-center gap-8 items-center">
                            <DialogClose asChild>
                                <Button 
                                    variant="outline" 
                                    className="w-full" 
                                    onClick={handleDialogClose}
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button 
                                type="button" 
                                className="w-full" 
                                disabled={isPending} 
                                onClick={handleActivate}
                            >
                                {isPending ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {isPending ? "Activating..." : "Activate Workflow"}
                            </Button>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default ActivateDialog;