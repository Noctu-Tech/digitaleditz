"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreateFaq } from "@/lib/functions/ticket"
import { FaqFormValues, faqSchema } from "@/schema/ticket"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface FAQData {
  question: string;
  answer: string;
}

function CreateFAQ({triggerText}:{triggerText?:string}) {
  const form = useForm<FaqFormValues>({
     resolver: zodResolver(faqSchema),
    defaultValues: {
      question: '',
      answer: ''
    }
  });

  const {mutate, isPending} = useMutation({
    mutationFn: CreateFaq,
    onSuccess: () => {
      toast.success("FAQ created", { id: "create-faq" })
      form.reset()
    },
    onError: () => {
      toast.error("Failed to create FAQ", { id: "create-faq" })
    }
  });

  function onSubmit(values: FaqFormValues) {
    mutate(values)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerText|| 'Add New FAQ'}</Button>
      </DialogTrigger>
      <DialogContent className="p-4 max-h-[90vh] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New FAQ</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="h-[70vh]">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input 
                  id="question" 
                  placeholder="Enter the question"
                  {...form.register("question", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="answer">Answer</Label>
                <textarea
                  id="answer"
                  className="min-h-[150px] rounded-md border p-3"
                  placeholder="Enter the answer..."
                  {...form.register("answer", { required: true })}
                />
              </div>
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating..." : "Create FAQ"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFAQ
