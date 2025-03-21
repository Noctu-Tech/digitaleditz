'use client'
import React, { useState } from 'react';
import { Send, Paperclip, Smile, User, Search, Mail, Phone, MessageCircle } from 'lucide-react';

const Page = () => {
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState({ id: 1, name: 'John Doe', status: 'online', unread: 3, lastMessage: 'Hey, how are you?', lastActive: '2m ago' });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock contacts data
  const contacts = [
    { id: 1, name: 'John Doe', status: 'online', unread: 3, lastMessage: 'Hey, how are you?', lastActive: '2m ago' },
    { id: 2, name: 'Alice Smith', status: 'offline', unread: 0, lastMessage: 'Thanks for your help!', lastActive: '1h ago' },
    { id: 3, name: 'Bob Johnson', status: 'online', unread: 1, lastMessage: 'Can we meet tomorrow?', lastActive: '5m ago' },
    { id: 4, name: 'Emma Wilson', status: 'busy', unread: 0, lastMessage: 'The project is ready', lastActive: '30m ago' },
  ];

  // Mock chat data
  const messages = [
    { id: 1, sender: 'John Doe', content: 'Hey, how are you?', timestamp: '10:30 AM', isSender: false },
    { id: 2, sender: 'Me', content: 'I\'m good, thanks! How about you?', timestamp: '10:31 AM', isSender: true },
    { id: 3, sender: 'John Doe', content: 'Doing great! Just working on the new project.', timestamp: '10:32 AM', isSender: false },
    { id: 4, sender: 'Me', content: 'That sounds interesting! Need any help?', timestamp: '10:33 AM', isSender: true },
  ];

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (message.trim()) {
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
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b hover:bg-opacity-50 cursor-pointer ${
                selectedContact?.id === contact.id ? 'bg-opacity-10' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 ${
                    contact.status === 'online' ? 'bg-green-500' :
                    contact.status === 'busy' ? 'bg-red-500' : ''
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{contact.name}</h3>
                    <span className="text-xs">{contact.lastActive}</span>
                  </div>
                  <p className="text-sm truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <div className="text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
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
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm`}>
                    {!msg.isSender && (
                      <p className="text-sm font-medium mb-1">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <button
                  type="button"
                  className="p-2 rounded-full transition-colors"
                >
                  <Paperclip size={20} />
                </button>
                
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2"
                />
                
                <button
                  type="button"
                  className="p-2 rounded-full transition-colors"
                >
                  <Smile size={20} />
                </button>
                
                <button
                  type="submit"
                  className="p-3 rounded-full transition-colors"
                >
                  <Send size={20} />
                </button>
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