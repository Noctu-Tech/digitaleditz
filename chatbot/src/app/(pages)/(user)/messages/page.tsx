'use client'
import { useState, useRef, useEffect } from 'react';
import ProtectedRoute from '@/context/ProtectedRoute';
import ChatMessage from './_components/ChatMessage';
import ChatInput from './_components/ChatInput';
import ChatHeader from './_components/ChatHeader';
import ContactSidebar from './_components/ContactSidebar';

const Page = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(
    // { id: 1, name: 'John Doe', status: 'online', unread: 3, lastMessage: 'Hey, how are you?', lastActive: '2m ago' }
  );
 

  // Mock contacts data
  const [contacts, setContacts] = useState([
    // { id: 1, name: 'John Doe', status: 'online', unread: 3, lastMessage: 'Hey, how are you?', lastActive: '2m ago' },
    // { id: 2, name: 'Alice Smith', status: 'offline', unread: 0, lastMessage: 'Thanks for your help!', lastActive: '1h ago' },
    // { id: 3, name: 'Bob Johnson', status: 'online', unread: 1, lastMessage: 'Can we meet tomorrow?', lastActive: '5m ago' },
    // { id: 4, name: 'Emma Wilson', status: 'busy', unread: 0, lastMessage: 'The project is ready', lastActive: '30m ago' },
  ]);

  interface ChatMessage {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
    isSender: boolean;
  }

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    // '1': [
    //   { id: 1, sender: 'John Doe', content: 'Hey, how are you?', timestamp: '10:30 AM', isSender: false },
    //   { id: 2, sender: 'Me', content: 'I\'m good, thanks! How about you?', timestamp: '10:31 AM', isSender: true },
    //   { id: 3, sender: 'John Doe', content: 'Great! Just finished working on the new design.', timestamp: '10:32 AM', isSender: false },
    // ],
    // 2: [
    //   { id: 1, sender: 'Alice Smith', content: 'Thanks for your help!', timestamp: '9:30 AM', isSender: false },
    // ],
    // 3: [
    //   { id: 1, sender: 'Bob Johnson', content: 'Can we meet tomorrow?', timestamp: '11:30 AM', isSender: false },
    // ],
    // 4: [
    //   { id: 1, sender: 'Emma Wilson', content: 'The project is ready', timestamp: '12:30 PM', isSender: false },
    // ],
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
    <ProtectedRoute>
    <div className="h-screen flex">
      {/* Contacts Sidebar */}
      
<ContactSidebar contacts={contacts} handleContactSelect={handleContactSelect}/>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
          <ChatHeader selectedContact={selectedContact} />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages[selectedContact.id]?.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} />
              ))}
              <div ref={messagesEndRef} /> {/* Add this for auto-scroll */}
            </div>

            {/* Message Input */}
           <ChatInput handleSubmit={handleSubmit} message={message} setMessage={setMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Page;