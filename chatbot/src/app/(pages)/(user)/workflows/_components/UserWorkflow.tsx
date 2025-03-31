import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Users, MoreVertical, Edit2, Delete, PauseCircle, PlayCircle } from 'lucide-react'
import { UserWorkFlow } from '@/types/workflow'
import { Suspense } from 'react'
import FallbackUserWorkflow from './FallbackUserWorkflow'

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DeleteWorkFlowDialog from './DeleteWorkFlowDialog'
const UserWorkflow = ({workflow}: {workflow: UserWorkFlow}) => {
  return ( 
  <Suspense fallback={<FallbackUserWorkflow/>}>
  <Card>
    <CardContent className="p-6">
      {/* <pre>{JSON.stringify(workflow,null)}</pre> */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium">{workflow.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              workflow.status === 'Active' ? 'text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {workflow.status}
            </span>
          </div>
          <p className="text-sm mb-4">{workflow.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {workflow.lastEdited}
            </span>
            <span className="flex items-center gap-1">
              <Users size={16} />
              {workflow.collaborators} collaborators
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
            <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
              <DropdownMenuItem><Edit2/>Edit</DropdownMenuItem>
              {workflow.status==="Active" && <DropdownMenuItem><PauseCircle/>Disable</DropdownMenuItem>}
              {/* {workflow.status==="Active" && <DropdownMenuItem>Disable</DropdownMenuItem>} */}
              {workflow.status==="Draft" && <DropdownMenuItem className='text-green-600'><PlayCircle/>Activate</DropdownMenuItem>}
            <DropdownMenuSeparator/>
            <DropdownMenuItem className=' text-red-600'><DeleteWorkFlowDialog/></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  </Card>
  </Suspense>
  )
}

export default UserWorkflow