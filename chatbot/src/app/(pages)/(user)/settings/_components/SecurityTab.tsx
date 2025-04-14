import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Key, Shield, Settings } from "lucide-react"
import { CustomSwitch } from "./CustomSwitch"

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2">
                <Key className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-medium">Password</h2>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
          
          <p className="text-sm opacity-70">
            We recommend updating your password regularly.
          </p>
        </CardContent>
      </Card>
      
      {/* <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-medium">Two-Factor Authentication</h2>
            </div>
            <CustomSwitch defaultChecked />
          </div>
          
          <div className="space-y-4">
            <p className="text-sm opacity-70">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            
            <div className="flex items-center gap-2">
              <Button variant="outline">
                Setup Authenticator App
              </Button>
              <Button variant="outline">
                Setup SMS Verification
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2">
                <Settings className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-medium">Active Sessions</h2>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p>Current Session</p>
                <p className="text-sm opacity-70">San Francisco, CA • Chrome on Mac</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <p>Mobile Session</p>
                <p className="text-sm opacity-70">San Francisco, CA • iOS App</p>
              </div>
              <Button variant="outline" className="text-xs px-2 py-1 h-auto">
                Log Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}

export default SecurityTab
