'use client'

import { useState, useRef, useEffect } from 'react';
import ProtectedRoute from '@/context/ProtectedRoute';
import ChatMessage from './_components/ChatMessage';
import ChatHeader from './_components/ChatHeader';
import ContactSidebar from './_components/ContactSidebar';
import { CardContent, Card } from '@/components/ui/card';
import { MessageCircleOff } from 'lucide-react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useChatData } from '@/hooks/useChatData';

const Page = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();\

  // Fetch and prime chat data (contacts and chatMessages)
  useChatData();

  const { data: contacts = [] } = useQuery(['contacts']);
  const { data: chatMessages = {} } = useQuery(['chatMessages']);

  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [message, setMessage] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, selectedContact]);

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);

    // Reset unread count
    const updated = contacts.map(c =>
      c.id === contact.id ? { ...c, unread: 0 } : c
    );
    queryClient.setQueryData(['contacts'], updated);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message.trim() && selectedContact) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage = {
        id: (chatMessages[selectedContact.id]?.length || 0) + 1,
        sender: 'Me',
        content: message.trim(),
        timestamp: currentTime,
        isSender: true,
      };

      // Update messages cache
      queryClient.setQueryData(['chatMessages'], (prev: any) => ({
        ...prev,
        [selectedContact.id]: [...(prev?.[selectedContact.id] || []), newMessage],
      }));

      // Update contact preview cache
      const updatedContacts = contacts.map(c =>
        c.id === selectedContact.id
          ? { ...c, lastMessage: message.trim(), lastActive: 'just now' }
          : c
      );
      queryClient.setQueryData(['contacts'], updatedContacts);

      setMessage('');
    }
  };

  if (contacts.length > 0 && Object.keys(chatMessages).length > 0) {
    return (
      <ProtectedRoute>
        <div className="h-screen flex">
          <ContactSidebar contacts={contacts} handleContactSelect={handleContactSelect} />
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                <ChatHeader selectedContact={selectedContact} />
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {(chatMessages[selectedContact.id] || []).map((msg: any) => (
                    <ChatMessage key={msg.id} msg={msg} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="p-4 border-t">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                </form>
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
  }

  return (
    <div className="flex items-center justify-center h-full w-full p-6">
      <Card className="w-full max-w-md border border-dashed bg-muted/10">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-5">
          <MessageCircleOff />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">No Conversations Found</h3>
            <p className="text-sm text-muted-foreground">
              This might be because there are no active workflows or no messages from the users
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
