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
  return ( <Accordion type="single" collapsible>
    {filteredFaqs.map((faq, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>{faq.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
  )
}

export default Faqs