import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TicketListProps } from '@/lib/functions/username/help'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Edit2, Eye } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'


const TicketList = (props:TicketListProps) => {
  const router=useRouter();
  return (
    <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{props.ticket.subject}</h3>
        <div className='flex gap-2'><Badge variant={props.ticket.status === 'open' ? 'default' : 'secondary'}>
          {props.ticket.status}
        </Badge>
        <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Button variant={'outline'} size={'sm'}>
                      <EllipsisVertical size={10}/>
                      </Button>
                    </DropdownMenuTrigger>
                  <DropdownMenuGroup>
                  <DropdownMenuContent side={'bottom'}>
                    
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <Separator/>
                    <DropdownMenuItem onSelect={()=>{router.push(`tickets/${props.ticket._id}`)}}>{<><Eye/>View Details</>}</DropdownMenuItem>
                  </DropdownMenuContent></DropdownMenuGroup></DropdownMenu>
      </div></div>
      <p className="text-gray-600 mb-2">{props.ticket.description}</p>
      <p className="text-sm text-gray-500">
        Created: {new Date(props.ticket.createdAt).toLocaleDateString()}
      </p>
    </CardContent>
  </Card>
  )
}

export default TicketList