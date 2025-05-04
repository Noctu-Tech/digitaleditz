'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {  MoreVertical, Edit2, Trash2Icon } from 'lucide-react'
import {  WorkFlow, WorkflowStatus } from '@/types/workflow'
import { Suspense, useState } from 'react'
import FallbackUserWorkflow from './FallbackUserWorkflow'

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DeleteWorkFlowDialog from './DeleteWorkFlowDialog'
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

        </div>
        <>
        <DeleteWorkFlowDialog open={showdelete} setOpen={setShowdelete} workFlowName={workflow.name} workFlowId={workflow._id}/>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
            <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
              <DropdownMenuItem className='w-ful h-full text-amber-500' onSelect={()=>{router.push(`/workflows/studio/${workflow._id}`)}}><Edit2/>Edit</DropdownMenuItem>
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