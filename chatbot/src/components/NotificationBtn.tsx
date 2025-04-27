import { Bell } from "lucide-react"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "./ui/sheet"
import { useQuery } from "@tanstack/react-query"
import { fetchNotifications } from "@/lib/functions/username/notification"
import { ScrollArea } from "./ui/scroll-area"

function NotificationBtn() {
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 1000 * 60 * 2,
  })

  const unreadCount = notifications.filter((n: any) => !n.read).length
  const isNew = unreadCount > 0

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="absolute right-16 top-4" variant="outline">
          <Bell size={24} />
          {isNew && (
            <span className="ml-2 w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[500px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Notifications</SheetTitle>
          <SheetClose className="absolute right-4 top-4 text-muted-foreground hover:text-primary transition-colors duration-200">
            ✕
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="h-[70vh] pr-4">
          {isLoading && <p>Loading notifications...</p>}
          {isError && <p className="text-red-500">Failed to load notifications.</p>}
          {!isLoading && notifications.length === 0 && <p>No new notifications.</p>}
          <ul className="space-y-3">
            {notifications.map((notification: any) => (
              <li
                key={notification.id}
                className={`p-3 rounded-md border ${
                  notification.read ? "bg-muted" : "bg-primary/10"
                }`}
              >
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.description}
                </p>
                <p className="text-[10px] mt-1 text-muted-foreground italic">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </li> 
            ))}
          </ul>
        </ScrollArea>

        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button variant="secondary" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default NotificationBtn
