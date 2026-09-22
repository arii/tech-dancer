// impeccable-ignore-file
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings } from 'lucide-react';

const SERVICES = [
  { id: 'website', title: 'Website & Digital Presence', icon: <Globe className="w-5 h-5 text-cyan-400" /> },
  { id: 'booking', title: 'Booking & Customer Workflows', icon: <Calendar className="w-5 h-5 text-cyan-400" /> },
  { id: 'ecommerce', title: 'Ecommerce', icon: <ShoppingBag className="w-5 h-5 text-cyan-400" /> },
  { id: 'events', title: 'Events & Experiences', icon: <Ticket className="w-5 h-5 text-cyan-400" /> },
  { id: 'marketing', title: 'Marketing & Growth', icon: <TrendingUp className="w-5 h-5 text-cyan-400" /> },
  { id: 'automation', title: 'Automation & Integrations', icon: <Settings className="w-5 h-5 text-cyan-400" /> },
];

export const CoreServicesGrid = () => {
  return (
    // items-start is critical here so collapsed accordions don't stretch to match expanded ones
    <Accordion
      type="single"
      collapsible
      defaultValue="website"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
    >
      {SERVICES.map((service) => (
        <AccordionItem
          key={service.id}
          value={service.id}
          className="border border-slate-800 bg-slate-900/50 rounded-xl px-6 py-2 overflow-hidden data-[state=open]:border-slate-700"
        >
          <AccordionTrigger className="hover:no-underline flex gap-4 text-lg font-semibold">
            <div className="flex items-center gap-3">
              {service.icon}
              {service.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6 text-slate-300">
            {/* Replace with actual content based on ID */}
            <div className="space-y-4">
              <p>A professional online home for your work.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">✓ Custom website design</li>
                <li className="flex items-center gap-2">✓ Mobile-first, responsive</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
