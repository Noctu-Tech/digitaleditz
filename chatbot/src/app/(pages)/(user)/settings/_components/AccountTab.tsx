import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Bell, AlertTriangle } from "lucide-react"
import { CustomSwitch } from "./CustomSwitch"
import { useState } from "react";

function AccountTab() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-medium">Account Share Policy</h2>
            </div>
            <Button variant="outline">Set Public</Button>
          </div>
          
          <p className="text-sm opacity-70">
            Set account to public to allow others to view your profile. You can also share specific profile with others.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2">
                <Bell className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-medium">Notification Settings</h2>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-sm">Receive email about account activity</p>
              </div>
              <CustomSwitch />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Billing alerts</p>
                <p className="text-sm">Receive billing notifications</p>
              </div>
              <CustomSwitch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Product updates</p>
                <p className="text-sm">Receive updates about new features</p>
              </div>
              <CustomSwitch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full p-2">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-medium">Delete Account</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            
            {!showDeleteConfirm ? (
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </Button>
            ) : (
              <div className="p-4 border rounded-lg">
                <p className="font-medium mb-3">Are you sure you want to delete your account?</p>
                <p className="text-sm mb-4">
                  This will cancel your subscription and delete all your data. You will lose access immediately.
                </p>
                <div className="flex gap-2">
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white text-sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Yes, Delete My Account
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountTab
