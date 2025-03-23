import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import React from 'react'

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'closed';
  createdAt: string;
  attachments?: File[];
}

const TicketList = (ticket:Ticket) => {
  return (
    <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{ticket.subject}</h3>
        <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
          {ticket.status}
        </Badge>
      </div>
      <p className="text-gray-600 mb-2">{ticket.description}</p>
      <p className="text-sm text-gray-500">
        Created: {new Date(ticket.createdAt).toLocaleDateString()}
      </p>
    </CardContent>
  </Card>
  )
}

export default TicketList