import { CheckCircle2, Clock, PhoneCall, XCircle } from 'lucide-react'
import { Button } from './ui/button'

export const VerificationTimeline = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Account Activation Status</h2>
        <p className="text-muted-foreground">Your account is pending activation</p>
      </div>

      <div className="space-y-8">
        {/* Timeline Items */}
        <div className="text-green-600 flex gap-4">
          <div className="flex flex-col items-center">
            <div className="rounded-full  p-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1 w-0.5  my-2"></div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-medium">Account Created</h3>
            <p className="text-sm text-muted-foreground">Your account has been successfully created</p>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </div>
        </div>

        <div className="flex text-yellow-600 gap-4">
          <div className="flex flex-col items-center">
            <div className="rounded-full  p-2">
              <Clock className="w-6 h-6 " />
            </div>
            <div className="flex-1 w-0.5 my-2"></div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-medium">Activation In Progress</h3>
            <p className="text-sm text-muted-foreground">Our team is reviewing your account details</p>
            <p className="text-xs text-muted-foreground mt-1">In Progress</p>
          </div>
        </div>

        <div className="flex text-slate-500  gap-4">
          <div className="flex flex-col  items-center">
            <div className="rounded-full p-2">
              <PhoneCall className="w-6 h-6 " />
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-medium">Awaiting Activation Call</h3>
            <p className="text-sm text-muted-foreground">You will receive a activation call from our team</p>
            <p className="text-xs text-muted-foreground mt-1">Pending</p>
          </div>
        </div>
      </div>

      {/* Customer Support Section */}
      <div className="mt-12 rounded-lg p-6">
        <h3 className="font-medium mb-4">Need Assistance?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          If you haven't received a verification call or need immediate assistance,
          please contact our customer support.
        </p>
        <div className="flex gap-4">
          <Button variant="outline">
            <PhoneCall className="w-4 h-4 mr-2" />
            Call Support: 1-800-XXX-XXXX
          </Button>
        </div>
      </div>
    </div>
  )
}
