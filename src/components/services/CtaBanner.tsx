// impeccable-ignore-file
import { Rocket } from 'lucide-react';

export const CtaBanner = () => {
  return (
    <div className="mt-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-cyan-950/30 rounded-lg">
          <Rocket className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-200 mb-1">Ready to build your digital business?</h3>
          <p className="text-sm text-slate-400">Let's talk about your goals and create a custom plan for your creative business.</p>
        </div>
      </div>
      <button className="shrink-0 bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-6 py-3 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap">
        Start a Conversation →
      </button>
    </div>
  );
};
