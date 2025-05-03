import { useState, useMemo } from 'react';
import { GetFAQs } from '@/lib/functions/username/help';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 5;

const Faqs = ({ search }: { search: string }) => {
  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['FAQs'],
    queryFn: () => GetFAQs()
  });

  const [page, setPage] = useState(1);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
    );
  }, [faqs, search]);

  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE);
  const paginatedFaqs = filteredFaqs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="space-y-4">
        {paginatedFaqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="border rounded-lg shadow-sm"
          >
            <AccordionTrigger className="flex justify-between w-full px-6 py-4 text-left">
              <span className="text-lg font-medium">{faq.question}</span>
              <svg 
                className="w-5 h-5 transition-transform duration-200 transform group-data-[state=open]:rotate-180" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 line-clamp-3">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="self-center text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Faqs;
