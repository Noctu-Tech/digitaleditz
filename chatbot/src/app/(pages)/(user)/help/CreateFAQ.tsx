"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface FAQData {
  question: string;
  answer: string;
}

function CreateFAQ({triggerText}:{triggerText?:string}) {
  const [formData, setFormData] = useState<FAQData>({
    question: '',
    answer: ''
  });

  const handleInputChange = (field: keyof FAQData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    // Handle your form submission here
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
        <ScrollArea className="h-[70vh]">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Question</Label>
              <Input 
                id="question" 
                placeholder="Enter the question"
                value={formData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="answer">Answer</Label>
              <textarea
                id="answer"
                className="min-h-[150px] rounded-md border p-3"
                placeholder="Enter the answer..."
                value={formData.answer}
                onChange={(e) => handleInputChange('answer', e.target.value)}
              />
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="w-full">Create FAQ</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFAQ
