import { X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"

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
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
              )}
            </div>
            <SheetClose asChild>
              <button><X size={16} /></button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="mt-4 space-y-4 overflow-auto max-h-[calc(100vh-100px)]">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border rounded-lg hover:bg-gray-50">
              <p className="text-sm">{notification.text}</p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
 </> 
 )
}
