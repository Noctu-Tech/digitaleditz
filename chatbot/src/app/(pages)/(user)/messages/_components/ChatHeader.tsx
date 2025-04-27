import { User } from "lucide-react"
interface Props {
    selectedContact:any;
}
function ChatHeader({selectedContact}:Props) {
  return (<>
    <div className="border-b px-6 py-4 flex items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">{selectedContact.name}</h2>
                  <p className="text-sm">{selectedContact.status}</p>
                </div>
              </div>
            </div>
  </>
  )
}

export default ChatHeader