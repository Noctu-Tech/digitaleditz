import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'closed';
  createdAt: string;
  attachments?: File[];
}
export interface TicketListProps {
  ticket: Ticket;}
const TicketList = (props:TicketListProps) => {
  return (
    <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{props.ticket.subject}</h3>
        <Badge variant={props.ticket.status === 'open' ? 'default' : 'secondary'}>
          {props.ticket.status}
        </Badge>
      </div>
      <p className="text-gray-600 mb-2">{props.ticket.description}</p>
      <p className="text-sm text-gray-500">
        Created: {new Date(props.ticket.createdAt).toLocaleDateString()}
      </p>
    </CardContent>
  </Card>
  )
}

export default TicketList