import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Layout, Copy, ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import FallBackWorkflowTemplate from './FallBackWorkflowTemplate'
import { useRouter } from 'next/navigation'

function Template({template}: {template: any}) {
const router=useRouter();
  return (
    <Suspense fallback={<FallBackWorkflowTemplate/>}>
    <Card className="hover:shadow-md transition-shadow">
                <div className={`h-3 bg-${template.color}-500 rounded-t-lg`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4 ">
                    <div className={`w-10 h-10 ${template.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                      <Layout size={20} className={`text-${template.color}-200`} />
                    </div>
                   
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">{template.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{template.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" className="flex items-center gap-2" onClick={()=>{router.push(`workflows/studio/${template._id}`)}}>
                      Use template
                      <ArrowRight size={16} />
                    </Button>
                    
                  </div>
                </CardContent>
              </Card>
              </Suspense>
  )
}

export default Template
