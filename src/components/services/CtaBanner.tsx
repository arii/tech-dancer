// src/components/services/CtaBanner.tsx
import { Rocket, ArrowRight } from 'lucide-react';

export const CtaBanner = () => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4 text-center md:text-left">
        <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700">
          <Rocket className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Ready to build your digital business?</h3>
          <p className="text-slate-400 text-sm">Let's talk about your goals and create a custom plan for your creative business.</p>
        </div>
      </div>

      <button className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap shrink-0">
        Start a Conversation <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
