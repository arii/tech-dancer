// impeccable-ignore-file
import { Sparkles } from 'lucide-react';

export const ServicesHero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div className="lg:col-span-8 space-y-6">
        <h4 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase">Services</h4>
        <h1 className="text-5xl font-bold tracking-tight leading-tight">
          Digital business systems for independent creatives
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl">
          We build and manage the digital side of your business—from your website and online booking to marketing, ecommerce, and automation.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest pt-4">
          <span>Artists</span> • <span>Stylists</span> • <span>Makers</span> • <span>Instructors</span> • <span>Performers</span>
        </div>
      </div>

      <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-8">
        <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5" />
          More than a website.
        </h3>
        <p className="text-slate-300 leading-relaxed text-sm">
          We're your digital business partner—helping you get found, book clients, sell your work, and grow your audience.
        </p>
      </div>
    </div>
  );
};
