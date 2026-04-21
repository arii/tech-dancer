import { EmailForm } from './EmailForm';
import { Mail, X } from 'lucide-react';
import { motionTokens } from '@/styles/motion';
import { motion } from 'motion/react';
import { useEmailCaptureContext } from './EmailCaptureContext';

export function NewsletterBanner() {
  const { hideBar } = useEmailCaptureContext();

  return (
    <motion.div
      initial={motionTokens.overlay.initial}
      animate={motionTokens.overlay.animate}
      exit={motionTokens.overlay.exit}
      transition={motionTokens.overlay.transition}
      className="bg-white/80 backdrop-blur-xl border-t border-line/50 rounded-t-3xl shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05),0_-8px_10px_-6px_rgba(0,0,0,0.05)] mx-auto py-4 px-6 md:px-12 fixed z-50"
      style={{ bottom: 0, left: '1rem', right: '1rem', width: 'calc(100% - 2rem)' }}
    >
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={hideBar}
          aria-label="Dismiss"
          className="p-1 min-h-0 min-w-0 cursor-pointer border border-line hover:border-accent-brand hover:text-accent-brand transition-colors text-text-dim hover:text-accent rounded-sm p-1"
        >
          <X className="w-4 h-4 text-text-dim hover:text-accent transition-colors" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 w-full">
        <div className="flex flex-row items-center gap-4 w-full md:w-auto">
          <div className="hidden sm:block p-4 bg-accent/5">
            <Mail className="w-5 h-5 text-accent-brand" />
          </div>
          <div className="flex flex-col gap-0">
            <span className="font-display font-bold uppercase tracking-tight leading-none text-base uppercase tracking-tight">
              Weekly Insights
            </span>
            <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim uppercase tracking-widest">
              Dance Analytics // Gear Reviews // Community Updates
            </span>
          </div>
        </div>
        
        <EmailForm />
      </div>
    </motion.div>
  );
}
