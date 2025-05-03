
import waitFor from "@/lib/helper/waitFor";
export interface Ticket {
  _id: string;
  subject: string;
  description: string;
  status: 'open' | 'closed';
  createdAt: string;
  attachments?: File[];
}
export interface TicketListProps {
  ticket: Ticket;}
interface FAQ {
  question: string;
  answer: string;
}
export const handleTicketSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const ticket: Ticket = {
    id: Math.random().toString(36).substr(2, 9),
    subject: newTicket.subject,
    description: newTicket.description,
    status: 'open',
    createdAt: new Date().toISOString(),
    attachments: attachments,
  };
  setTickets([...tickets, ticket]);
  setNewTicket({ subject: '', description: '' });
  setAttachments([]);
  setShowTicketForm(false);
};

export function GetTickets(){
  waitFor(3000);
  const tickets=[{
    _id: "newt1",
    subject: "This is the First Ticket",
    description: "something here",
    status: 'open',
    createdAt: "25-02-2025"}]
  return tickets
}
export function GetFAQs(){
  waitFor(3000);
  const faqs: FAQ[] = [
    {
      question: "How do I place an order?",
      answer: "You can place an order by selecting the service you need and following the checkout process."
    },
    {
      question: "What are your delivery times?",
      answer: "Standard delivery time is 2-3 business days. Rush orders are available upon request."
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept JPG, PNG, PSD, and TIFF files."
    }
  ];
  return faqs
}
