
interface Props{
    msg: {
        id: number;
        sender: string;
        content: string;
        timestamp: string;
        isSender: boolean;
    }
}
function ChatMessage({msg}:Props) {
  return (
    <div                  className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      msg.isSender
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                    }`}
                  >
                    {!msg.isSender && (
                      <p className="text-sm font-medium mb-1">{msg.sender}</p>
                    )}
                    <p className="text-sm break-words">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isSender ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
  )
}

export default ChatMessage