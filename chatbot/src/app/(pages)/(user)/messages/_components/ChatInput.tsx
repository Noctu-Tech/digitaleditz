import { Button } from "@/components/ui/button"
import { Paperclip, Send } from "lucide-react"
interface Props{
    handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void,
    message:string,
    setMessage:(message:string)=>void
}
function ChatInput({handleSubmit,message,setMessage}:Props) {
  return (
    <div className="border-t p-4">
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <Button
        type="button"
        size="icon"
        variant="ghost"
      >
        <Paperclip size={20} />
      </Button>
      
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2"
      />
      
      
      <Button
        type="submit"
        size="icon"
        variant="default"
      >
        <Send size={20} />
      </Button>
    </form>
  </div>
  )
}

export default ChatInput