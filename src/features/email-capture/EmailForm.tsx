import { useEmailCaptureContext } from './EmailCaptureContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { inputs } from '@/styles/design-tokens';

export function EmailForm() {
  const { status, submitForm, email, setEmail } = useEmailCaptureContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm(email);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-auto max-w-md">
      <div className="flex flex-row gap-0 relative w-full">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          className={`${inputs.base} min-h-[44px] w-full`}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="cursor-pointer w-full bg-text-main text-bg py-4 font-bold uppercase tracking-[3px] text-xs hover:bg-accent transition-all flex items-center justify-center gap-3 min-h-[44px] w-auto min-w-[140px] sm:min-w-[180px] px-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-2"
            >
              {status === 'loading' && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-bg" />
                  <span className="font-mono uppercase tracking-widest text-[8px] font-bold text-bg">AUTHENTICATING...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <Check className="w-4 h-4 text-bg" />
                  <span className="font-mono uppercase tracking-widest text-[8px] font-bold text-bg">ACCESS_GRANTED</span>
                </>
              )}
              {status === 'idle' && (
                <>
                  <span className="font-mono uppercase tracking-widest text-[8px] font-bold text-bg">SUBSCRIBE</span>
                  <ArrowRight className="w-4 h-4 text-bg" />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </form>
  );
}
