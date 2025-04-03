import { X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { handleClearNotification } from "@/lib/functions/username/notification"

interface NotificationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notifications: Array<{ id: number; text: string; time: string }>
  onClearAll: () => void
  setShowNotificationDot: (show: boolean) => void
}

export function NotificationDrawer({ 
  open, 
  onOpenChange, 
  notifications, 
  onClearAll,
  setShowNotificationDot 
}: NotificationDrawerProps) {
  
  const handleClearAll = () => {
    onClearAll();
    setShowNotificationDot(false);
  };

  return (<>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[380px] sm:w-[440px]">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between pr-4">
            <div className="flex items-center gap-4">
              <SheetTitle>Notifications</SheetTitle>
              {notifications.length > 0 && (
                <button 
                  onClick={handleClearAll}
                  className="text-sm"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </SheetHeader>
        <div className="mt-4 space-y-4 overflow-auto max-h-[calc(100vh-100px)]">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border rounded-lg flex justify-between">
              <div>
              <p className="text-sm">{notification.text}</p>
              <span className="text-xs ">{notification.time}</span>
              </div>
              <div>
                <Button variant={"outline"} onClick={()=>{handleClearNotification(notification.id)}}><X size={16}/></Button></div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
 </> 
 )
}
