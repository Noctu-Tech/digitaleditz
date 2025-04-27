import { User } from "lucide-react";

interface Contact {
    contact:any;
    selectedContact:any;
    handleContactSelect:(contact:any) => void;
}

function ContactItem({contact,selectedContact,handleContactSelect}: Contact) {
  return (
<div
              onClick={() => handleContactSelect(contact)}
              className={`p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                selectedContact?.id === contact.id 
                  ? 'bg-gray-100 dark:bg-gray-800 border-l-4 border-l-blue-500' 
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User size={24} className="text-gray-500" />
                  </div>
                  <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 ${
                    contact.status === 'online' ? 'bg-green-500' :
                    contact.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${contact.unread > 0 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500">{contact.lastActive}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <div className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
  )
}

export default ContactItem