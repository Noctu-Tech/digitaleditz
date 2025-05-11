import { Search } from "lucide-react"
import ContactItem from "./ContactItem"
import { useState } from "react";


function ContactSidebar({contacts,handleContactSelect}:{contacts:any; handleContactSelect:(contact:any)=>void
}) {
    const [searchQuery, setSearchQuery] = useState('');
  return (
<>
<div className="w-80 border-r flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2"
            />
            <Search className="absolute left-3 top-2.5" size={20} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} handleContactSelect={handleContactSelect} selectedContact={contact.id} />
          ))}
        </div>
      </div>
</>
  )
}

export default ContactSidebar