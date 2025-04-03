'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Ticket } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TicketForm from './TicketForm';
import TicketList from './TicketList';
import Faqs from './Faqs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetTickets } from '@/lib/functions/username/help';
import CreateFAQ from './CreateFAQ';
import { cn } from '@/lib/utils';



export default function HelpPage() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const tickets=  [];

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Help & Support</h1>

      {/* Search Box */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* FAQs Section */}
      <section className="mb-12">
        <div className={cn('w-full flex items-center justify-between mb-6')}>
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2> 
          <CreateFAQ/>
        </div>
        <Faqs search={searchQuery}/>
      </section>

      {/* Support Tickets Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Support Tickets</h2>
          <Button onClick={() => setShowTicketForm(true)}>
            Create New Ticket
          </Button>
        </div>

        {/* Ticket Creation Form */}
        {showTicketForm && (
         <TicketForm/>
        )}

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <Ticket className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No Support Tickets</p>
              <p className="text-sm">Create a new ticket to get help from our support team</p>
            </div>
          )}
          {tickets.length!==0 && tickets.map((ticket) => (
            <TicketList ticket={ticket} key={ticket.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
