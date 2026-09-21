// src/components/services/FeatureTabs.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings, Check, Lightbulb } from 'lucide-react';

const TABS_DATA = [
  { id: 'website', title: 'Website & Digital Presence', shortTitle: 'Website & Digital Presence', icon: <Globe className="w-4 h-4 mr-2" /> },
  { id: 'booking', title: 'Booking & Customer Workflows', shortTitle: 'Booking & Workflows', icon: <Calendar className="w-4 h-4 mr-2" /> },
  { id: 'ecommerce', title: 'Ecommerce', shortTitle: 'Ecommerce', icon: <ShoppingBag className="w-4 h-4 mr-2" /> },
  { id: 'events', title: 'Events & Experiences', shortTitle: 'Events', icon: <Ticket className="w-4 h-4 mr-2" /> },
  { id: 'marketing', title: 'Marketing & Growth', shortTitle: 'Marketing', icon: <TrendingUp className="w-4 h-4 mr-2" /> },
  { id: 'automation', title: 'Automation & Integrations', shortTitle: 'Automation', icon: <Settings className="w-4 h-4 mr-2" /> },
];

export const FeatureTabs = () => {
  return (
    <Tabs defaultValue="website" className="w-full">
      <div className="w-full overflow-x-auto whitespace-nowrap pb-2 scrollbar-none border-b border-slate-800">
        <TabsList className="bg-transparent h-auto p-0 inline-flex w-max min-w-full justify-start border-none">
          {TABS_DATA.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-400 rounded-none px-4 py-3 text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              <div className="flex items-center">
                {tab.icon}
                {tab.shortTitle}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {TABS_DATA.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-xl font-bold">{tab.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {tab.id === 'website' && "A fast, beautiful website built specifically for independent practitioners. We handle the technical details so your business is easy to find on Google and ready to grow."}
                {tab.id === 'booking' && "Streamline your scheduling process with automated booking workflows that save you time and provide a professional experience for your clients."}
                {tab.id === 'ecommerce' && "Expand your revenue streams by selling physical products, digital goods, or merchandise directly to your audience."}
                {tab.id === 'events' && "Easily manage workshops, retreats, and group classes with integrated ticketing and attendee management."}
                {tab.id === 'marketing' && "Increase your visibility and attract new clients with targeted marketing strategies tailored for creative businesses."}
                {tab.id === 'automation' && "Eliminate manual tasks by connecting your favorite tools and automating repetitive workflows."}
              </p>
            </div>

            <div className="md:col-span-4 space-y-3">
              {tab.id === 'website' && (
                <>
                  <div className="flex items-start gap-3"><Check className="w-5 h-5 text-cyan-400 shrink-0" /><span className="text-sm text-slate-300">Custom website design & development</span></div>
                  <div className="flex items-start gap-3"><Check className="w-5 h-5 text-cyan-400 shrink-0" /><span className="text-sm text-slate-300">Mobile-first, responsive design</span></div>
                  <div className="flex items-start gap-3"><Check className="w-5 h-5 text-cyan-400 shrink-0" /><span className="text-sm text-slate-300">Portfolio, services, and pricing pages</span></div>
                  <div className="flex items-start gap-3"><Check className="w-5 h-5 text-cyan-400 shrink-0" /><span className="text-sm text-slate-300">Domain setup and hosting</span></div>
                  <div className="flex items-start gap-3"><Check className="w-5 h-5 text-cyan-400 shrink-0" /><span className="text-sm text-slate-300">SEO foundation for local search</span></div>
                  <div className="flex items-start gap-3"><Check className="w-5 h-5 text-cyan-400 shrink-0" /><span className="text-sm text-slate-300">Ongoing maintenance and updates</span></div>
                </>
              )}
              {tab.id !== 'website' && (
                <div className="text-sm text-slate-400 italic">Features list available upon request.</div>
              )}
            </div>

            <div className="md:col-span-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-semibold text-sm">Real-world example</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {tab.id === 'website' && "A stylist can showcase their services, let customers book appointments, and appear in local search results — all from one integrated website."}
                  {tab.id !== 'website' && "Example coming soon."}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
