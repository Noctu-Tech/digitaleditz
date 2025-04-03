import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion'
interface FAQ {
    question: string;
    answer: string;
  }
const Faqs = ({search}:{search:string}) => {
    
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
  
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase()
  )
  );
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
      {filteredFaqs.map((faq, index) => (
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
          <AccordionContent className="px-6 py-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Faqs