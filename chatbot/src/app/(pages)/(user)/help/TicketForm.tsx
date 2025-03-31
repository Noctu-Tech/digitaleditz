"use client"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { handleTicketSubmit } from '@/lib/functions/username/help'
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Ticket } from './TicketList'
const TicketForm = () => {
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>("");
  
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

const [showTicketForm, setShowTicketForm] = useState(false);
const [newTicket, setNewTicket] = useState({ subject: '', description: '' });
  return (
    <Card className="mb-8">
    <CardContent className="pt-6">
      <form onSubmit={handleTicketSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newTicket.description}
            onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
            rows={4}
            required
          />
        </div>
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
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button type="submit">Submit Ticket</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowTicketForm(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
  )
}

export default TicketForm