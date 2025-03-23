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