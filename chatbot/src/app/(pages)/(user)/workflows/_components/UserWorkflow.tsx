'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Users, MoreVertical, Edit2, Delete, PauseCircle, PlayCircle, PlayIcon, Trash2Icon } from 'lucide-react'
import { UserWorkFlow, WorkFlow, WorkflowStatus } from '@/types/workflow'
import { Suspense, useState } from 'react'
import FallbackUserWorkflow from './FallbackUserWorkflow'

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DeleteWorkFlowDialog from './DeleteWorkFlowDialog'
import ActivateDialog from './ActivateDialog'
import { useRouter } from 'next/navigation'
const UserWorkflow = ({workflow}: {workflow: WorkFlow}) => {
  const router=useRouter();
  const [showdelete,setShowdelete]=useState(false);
  return ( 
  <Suspense fallback={<FallbackUserWorkflow/>}>
  <Card>
    <CardContent className="p-6">
      {/* <pre>{JSON.stringify(workflow,null)}</pre> */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium">{workflow.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              workflow.status === WorkflowStatus.ACTIVE ? 'text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {workflow.status}
            </span>
          </div>
          <p className="text-sm mb-4">{workflow.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {workflow.color}
            </span>
            {/* <span className="flex items-center gap-1">
              <Users size={16} />
              {workflow.collaborators} collaborators
            </span> */}
          </div>
        </div>
        <>
        <DeleteWorkFlowDialog open={showdelete} setOpen={setShowdelete} workFlowName={workflow.name} workFlowId={workflow._id}/>
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
              <DropdownMenuItem><Button variant={'ghost'} className='w-ful h-full' onClick={()=>{router.push(`/workflows/studio/${workflow._id}`)}}><Edit2/>Edit</Button></DropdownMenuItem>
              {workflow.status===WorkflowStatus.ACTIVE && <DropdownMenuItem><PauseCircle/>Disable</DropdownMenuItem>}
              {/* {workflow.status==="Active" && <DropdownMenuItem>Disable</DropdownMenuItem>} */}
              {workflow.status===WorkflowStatus.DRAFT && <DropdownMenuItem className='text-green-600'><ActivateDialog triggerEl={<Button variant={'ghost'}><PlayIcon/>Activate</Button>} workflowId={workflow._id}/></DropdownMenuItem>}
            <DropdownMenuSeparator/>
            <DropdownMenuItem className=' text-red-600' onSelect={()=>{setShowdelete((prev)=>!prev)}}><Trash2Icon/> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
      </div>
    </CardContent>
  </Card>
  </Suspense>
  )
}

export default UserWorkflow