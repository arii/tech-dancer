// src/components/services/CoreServicesGrid.tsx
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
            {service.id === 'website' && (
              <div className="space-y-4">
                <p>A professional online home for your work.</p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0 w-full sm:w-1/2">
                    <img src="/assets/services/digital-presence.png" alt="Website preview" className="w-full rounded-md" />
                  </div>
                  <ul className="space-y-2 text-sm w-full sm:w-1/2">
                    <li className="flex items-center gap-2">✓ Custom website design & development</li>
                    <li className="flex items-center gap-2">✓ Mobile-first, responsive design</li>
                    <li className="flex items-center gap-2">✓ Portfolio, services, and pricing pages</li>
                    <li className="flex items-center gap-2">✓ Domain setup and hosting</li>
                    <li className="flex items-center gap-2">✓ SEO foundation for local search</li>
                    <li className="flex items-center gap-2">✓ Ongoing maintenance and updates</li>
                    <li className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800 text-cyan-400 font-semibold"><span className="text-xl">✨</span> Starting at $1,500</li>
                  </ul>
                </div>
              </div>
            )}
            {service.id === 'booking' && (
              <div className="space-y-4">
                <p>Let your customers book, pay, and get the information they need—automatically.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">✓ 24/7 calendar availability & sync</li>
                  <li className="flex items-center gap-2">✓ Automated appointment scheduling</li>
                  <li className="flex items-center gap-2">✓ Intake questionnaires & screening</li>
                  <li className="flex items-center gap-2">✓ Deposit & online payment processing</li>
                </ul>
              </div>
            )}
            {service.id === 'ecommerce' && (
              <div className="space-y-4">
                <p>Sell products, services, and digital downloads directly from your site.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">✓ Merchandise & physical products</li>
                  <li className="flex items-center gap-2">✓ Digital downloads & instant delivery</li>
                  <li className="flex items-center gap-2">✓ Custom orders & commission inquiries</li>
                  <li className="flex items-center gap-2">✓ Streamlined checkout & payment integrations</li>
                </ul>
              </div>
            )}
            {service.id === 'events' && (
              <div className="space-y-4">
                <p>Run workshops, classes, and special events with ease.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">✓ Workshop & class scheduling</li>
                  <li className="flex items-center gap-2">✓ Online registration & ticketing</li>
                  <li className="flex items-center gap-2">✓ Automated attendee communications</li>
                  <li className="flex items-center gap-2">✓ Event landing & promotion pages</li>
                </ul>
              </div>
            )}
            {service.id === 'marketing' && (
              <div className="space-y-4">
                <p>Get discovered, build your audience, and turn visitors into loyal customers.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">✓ Local SEO & Google Business Profile</li>
                  <li className="flex items-center gap-2">✓ Editorial content & portfolio strategy</li>
                  <li className="flex items-center gap-2">✓ Email marketing & subscriber capture</li>
                  <li className="flex items-center gap-2">✓ Conversion optimization & site enhancements</li>
                </ul>
              </div>
            )}
            {service.id === 'automation' && (
              <div className="space-y-4">
                <p>Connect your tools and automate the repetitive work so you can focus on your craft.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">✓ Form-to-calendar automated workflows</li>
                  <li className="flex items-center gap-2">✓ Lead routing & CRM/spreadsheet sync</li>
                  <li className="flex items-center gap-2">✓ Automated client status updates</li>
                  <li className="flex items-center gap-2">✓ Custom AI-assisted workflow engines</li>
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
