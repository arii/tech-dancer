import { Grid } from '@/layouts/Primitives';
// impeccable-ignore-file
import React, { useState } from 'react';
import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const FEATURES = [
  { id: 'website', title: 'Website & Digital Presence', shortTitle: 'Website & Digital Presence', icon: <Globe className="w-4 h-4" /> },
  { id: 'booking', title: 'Booking & Customer Workflows', shortTitle: 'Booking & Workflows', icon: <Calendar className="w-4 h-4" /> },
  { id: 'ecommerce', title: 'Ecommerce', shortTitle: 'Ecommerce', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'events', title: 'Events & Experiences', shortTitle: 'Events', icon: <Ticket className="w-4 h-4" /> },
  { id: 'marketing', title: 'Marketing & Growth', shortTitle: 'Marketing', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'automation', title: 'Automation & Integrations', shortTitle: 'Automation', icon: <Settings className="w-4 h-4" /> },
];

export const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState('website');
  const activeFeature = FEATURES.find(f => f.id === activeTab);

  return (
    <div className="space-y-8">
      {/* Scrollable Tabs Container */}
      <div className="border-b border-slate-800">
        <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide">
          {FEATURES.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium pb-2 transition-colors",
                activeTab === feature.id
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {React.cloneElement(feature.icon, {
                className: cn("w-4 h-4", activeTab === feature.id ? "text-cyan-400" : "text-slate-500")
              })}
              {feature.shortTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <Grid cols={{ base: 1, lg: 3 }} gap={8} align="start">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-bold">{activeFeature?.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            A fast, beautiful website built specifically for independent practitioners. We handle the technical details so your business is easy to find on Google and ready to grow.
          </p>
        </div>

        <div className="lg:col-span-1">
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-3"><span className="text-cyan-400">✓</span> Custom website design & development</li>
            <li className="flex gap-3"><span className="text-cyan-400">✓</span> Mobile-first, responsive design</li>
            <li className="flex gap-3"><span className="text-cyan-400">✓</span> Portfolio, services, and pricing pages</li>
            <li className="flex gap-3"><span className="text-cyan-400">✓</span> Domain setup and hosting</li>
            <li className="flex gap-3"><span className="text-cyan-400">✓</span> SEO foundation for local search</li>
            <li className="flex gap-3"><span className="text-cyan-400">✓</span> Ongoing maintenance and updates</li>
          </ul>
        </div>

        <div className="lg:col-span-1 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex gap-3 items-start">
            <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-slate-200 mb-2">Real-world example</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A stylist can showcase their services, let customers book appointments, and appear in local search results — all from one integrated website.
              </p>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};
