import { motion } from 'motion/react';
import { Send, MessageSquare, Sparkles, BarChart2 } from 'lucide-react';
import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { useContactForm } from '@/hooks/use-contact-form';
import { cn } from '@/lib/utils';

export default function Contact() {
  const { 
    formData, 
    handleChange, 
    errors, 
    isSubmitting, 
    submitted, 
    submit, 
    reset 
  } = useContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return submitted ? (
    <SuccessState onReset={reset} />
  ) : (
    <ContactForm 
      formData={formData} 
      errors={errors} 
      isSubmitting={isSubmitting} 
      onChange={handleChange} 
      onSubmit={handleSubmit} 
    />
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <section className="panel h-full overflow-y-auto w-full flex flex-col items-center justify-center text-center">
      <div className="flex flex-col gap-12 items-center">
        <div className="w-24 h-24 border border-line bg-surface-alt flex items-center justify-center text-accent">
          <Sparkles className="w-12 h-12 stroke-1" />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.9] text-6xl">Message Received.</h1>
          <p className="font-sans leading-relaxed text-text-body max-w-md mx-auto">
            Thank you for reaching out. I've received your message and will get back to you as soon as possible.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="font-mono uppercase tracking-[3px] text-[8px] font-bold border border-line px-8 py-4 text-accent cursor-pointer hover:bg-accent-brand/5 transition-colors"
        >
          Send Another Message
        </motion.button>
      </div>
    </section>
  );
}

interface ContactFormProps {
  formData: any;
  errors: any;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: ContactFormProps) {
  return (
    <section>
      <div className="flex flex-col gap-12">
        <PageHeader 
          label="CONTACT"
          title="Get in Touch"
          description="Have a burning analytical question regarding WCS? Want a lifestyle post about financial literacy or building community? Or just have feedback on a gear review? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-line max-w-6xl mb-20 overflow-hidden">
        <div className="bg-surface p-8 md:p-12 border-b md:border-b-0 md:border-r border-line">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="font-display font-bold uppercase tracking-tight leading-none text-2xl font-black text-accent-navy">Inquiries</h3>
              </div>
              <p className="font-sans leading-relaxed text-text-body text-base max-w-md text-text-dim">
                I&apos;m always open to new ideas, questions about my reviews, or just chat about the dance scene.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              {[
                { label: 'Data Inquiry', channel: 'Dance Stats', icon: BarChart2 },
                { label: 'Gear Review', channel: 'Product Feedback', icon: Sparkles },
                { label: 'General', channel: 'Discussion', icon: MessageSquare },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 border border-line bg-muted flex items-center justify-center text-text-dim group-hover:border-accent-brand group-hover:bg-accent-brand/5 transition-colors">
                    <item.icon className="w-6 h-6 stroke-1" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-sans leading-relaxed text-text-body text-base font-bold text-accent-navy">{item.label}</span>
                    <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold uppercase">{item.channel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 md:p-12">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label htmlFor="contact-name" className="font-mono tracking-[0.15em] text-xs font-semibold text-text-dim uppercase">Your Name</label>
                {errors.name && <span id="name-error" className="font-mono font-semibold text-accent-brand text-xs" role="alert">{errors.name}</span>}
              </div>
              <input
                id="contact-name"
                name="name"
                type="text" 
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
                  errors.name ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.name}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label htmlFor="contact-email" className="font-mono tracking-[0.15em] text-xs font-semibold text-text-dim uppercase">Your Email</label>
                {errors.email && <span id="email-error" className="font-mono font-semibold text-accent-brand text-xs" role="alert">{errors.email}</span>}
              </div>
              <input
                id="contact-email"
                name="email"
                type="email" 
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
                  errors.email ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.email}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="contact-subject" className="font-mono tracking-[0.15em] text-xs font-semibold text-text-dim uppercase">Subject</label>
              <select
                id="contact-subject"
                name="subject"
                className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors"
                value={formData.subject}
                onChange={onChange}
              >
                <option>General Feedback</option>
                <option>Content Request</option>
                <option>Gear Review Request</option>
                <option>Dance Statistics</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label htmlFor="contact-message" className="font-mono tracking-[0.15em] text-xs font-semibold text-text-dim uppercase">Message</label>
                {errors.message && <span id="message-error" className="font-mono font-semibold text-accent-brand text-xs" role="alert">{errors.message}</span>}
              </div>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors resize-none",
                  errors.message ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.message}
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full bg-text-main text-bg py-4 font-bold uppercase tracking-[3px] text-xs hover:bg-accent transition-all flex items-center justify-center gap-3",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <div className="flex flex-row items-center gap-3">
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-white animate-spin rounded-full" />
                  <span className="font-mono text-text-dim text-[8px] uppercase tracking-widest">Sending...</span>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
}
