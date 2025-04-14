"use client"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { handleTicketSubmit } from '@/lib/functions/username/help'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Ticket } from './TicketList'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation } from '@tanstack/react-query'
import { handleImageUpload } from '@/lib/functionapis/uploadMedia'
import { toast } from 'sonner'
import { CreateTicket } from '@/lib/functions/ticket'
import { TicketFormValues, ticketSchema } from '@/schema/ticket'


const TicketForm = () => {
  const [attachments, setAttachments] = useState<File[]>([])
  const [fileError, setFileError] = useState<string>("")
  const [files,setFiles]  =useState<string[]>([])
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  })

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  const invalidFiles = files.filter(file => !validTypes.includes(file.type));
  const oversizedFiles = files.filter(file => file.size > maxSize);
  
  if (invalidFiles.length > 0) {
    setFileError("Only JPEG, PNG and PDF files are allowed");
    return;
  }
  
  if (oversizedFiles.length > 0) {
    setFileError("Files must be less than 5MB");
    return;
  }
  
  setFileError("");
  setAttachments(files);
};
 const {mutate, isPending} = useMutation({
    mutationFn: CreateTicket,
    onSuccess: () => {
      toast.success("Ticket created", { id: "create-ticket" })
      form.reset()
      setAttachments([])
      setFiles([])
    },
    onError: () => {
      toast.error("Failed to create ticket", { id: "create-ticket" })
    }
  });

  function onSubmit(values: TicketFormValues) {
    mutate(values)
  };
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments</Label>
              <Input
                id="attachments"
                type="file"
                onChange={handleFileChange}
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500">
                Accepted formats: JPEG, PNG, PDF (max 5MB per file)
              </p>
              {fileError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {fileError}
                  </AlertDescription>
                </Alert>
              )}
              {attachments.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Selected files:</p>
                  <ul className="text-sm text-gray-500">
                    {attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                  <Button
                    variant="secondary"
                    onClick={()=>{const some= handleImageUpload(attachments)}}
                    className="text-red-500 mt-2">Upload Images</Button>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit">Submit Ticket</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default TicketForm