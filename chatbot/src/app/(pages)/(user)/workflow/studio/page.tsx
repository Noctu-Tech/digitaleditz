import EventList from '@/app/ui/components/EventList'
import WorkflowBuilder from '@/app/ui/components/WorkFlowNode'
import React from 'react'

const Studio = () => {
  return (<div className='w-full h-full relative flex'>
    <WorkflowBuilder />
    
  <div className=' w-80 h-full  absolute right-0 border-2'>
    <EventList />
  </div>
  </div>
  )
}

export default Studio