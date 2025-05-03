import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { Separator } from "@/components/ui/separator"
import { ENV } from "@/lib/functionapis/config"
import { User } from "lucide-react"

function AdminSpec() {
  const URL=ENV.BACKEND_URL;
  return (
    
      <> <Card className="bg-muted/50">
                         <CardHeader className="pb-3">
                             <CardTitle className="flex items-center">
                                 <User className="mr-2 h-5 w-5" />
                                 Admin Section
                             </CardTitle>
                         </CardHeader>
                         <CardContent>
                             <div>
                                 <p className="text-sm text-muted-foreground">Webhook</p>
                                 <p className="font-medium">{`${URL}/whatsapp/webhook`}</p>
                             </div>
                         </CardContent>
                     </Card>
        </>         
  )
}

export default AdminSpec