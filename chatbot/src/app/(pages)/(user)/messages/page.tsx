'use client'
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, User, Search, Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Page = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState({ id: 1, name: 'John Doe', status: 'online', unread: 3, lastMessage: 'Hey, how are you?', lastActive: '2m ago' });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock contacts data
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', status: 'online', unread: 3, lastMessage: 'Hey, how are you?', lastActive: '2m ago' },
    { id: 2, name: 'Alice Smith', status: 'offline', unread: 0, lastMessage: 'Thanks for your help!', lastActive: '1h ago' },
    { id: 3, name: 'Bob Johnson', status: 'online', unread: 1, lastMessage: 'Can we meet tomorrow?', lastActive: '5m ago' },
    { id: 4, name: 'Emma Wilson', status: 'busy', unread: 0, lastMessage: 'The project is ready', lastActive: '30m ago' },
  ]);

  interface ChatMessage {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
    isSender: boolean;
  }

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    '1': [
      { id: 1, sender: 'John Doe', content: 'Hey, how are you?', timestamp: '10:30 AM', isSender: false },
      { id: 2, sender: 'Me', content: 'I\'m good, thanks! How about you?', timestamp: '10:31 AM', isSender: true },
      { id: 3, sender: 'John Doe', content: 'Great! Just finished working on the new design.', timestamp: '10:32 AM', isSender: false },
    ],
    2: [
      { id: 1, sender: 'Alice Smith', content: 'Thanks for your help!', timestamp: '9:30 AM', isSender: false },
    ],
    3: [
      { id: 1, sender: 'Bob Johnson', content: 'Can we meet tomorrow?', timestamp: '11:30 AM', isSender: false },
    ],
    4: [
      { id: 1, sender: 'Emma Wilson', content: 'The project is ready', timestamp: '12:30 PM', isSender: false },
    ],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
    // Reset unread count when selecting contact
    const updatedContacts = contacts.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    );
    setContacts(updatedContacts);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage: ChatMessage = {
        id: chatMessages[selectedContact.id].length + 1,
        sender: 'Me',
        content: message.trim(),
        timestamp: currentTime,
        isSender: true,
      };
      
      // Update chat messages
      setChatMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...prev[selectedContact.id], newMessage]
      }));

      // Update contact's last message and time
      const updatedContacts = contacts.map(c => 
        c.id === selectedContact.id 
          ? { ...c, lastMessage: message.trim(), lastActive: 'just now' }
          : c
      );
      setContacts(updatedContacts);
      
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex">
      {/* Contacts Sidebar */}
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

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
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
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
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

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages[selectedContact.id]?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
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
              ))}
              <div ref={messagesEndRef} /> {/* Add this for auto-scroll */}
            </div>

            {/* Message Input */}
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
                  type="button"
                  size="icon"
                  variant="ghost"
                >
                  <Smile size={20} />
                </Button>
                
                <Button
                  type="submit"
                  size="icon"
                  variant="default"
                >
                  <Send size={20} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;