import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import CreateWorkFlowDialog from './CreateWorkFlowDialog'

function NewFlowButton() {
  return (<div className='h-full w-full'>
    <CreateWorkFlowDialog 
      triggerEl ={
        <Card className="border-2 border-dashed hover:border-blue-500 transition-colors cursor-pointer group">
          <CardContent className="flex flex-col items-center justify-center min-h-[200px] p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-50">
              <Plus size={24} className="group-hover:text-blue-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">Create New Workflow</h3>
            <p className="text-sm text-center">Start from scratch and build your custom workflow</p>
          </CardContent>
        </Card>
      }
    />
</div>  )
}

export default NewFlowButton