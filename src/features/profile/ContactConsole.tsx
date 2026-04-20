import { motion } from 'motion/react';
import { Mail, Send, MessageSquare, HelpCircle, Sparkles, BarChart2, Shield } from 'lucide-react';
import React from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
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
    <Box as="section" padding="panel" display="flex" direction="col" align="center" justify="center" textAlign="center">
      <Stack gap={12} align="center">
        <Box width={24} height={24} border surface="dim" display="flex" align="center" justify="center" color="accent">
          <Sparkles className="w-12 h-12 stroke-1" />
        </Box>
        <Stack gap={4}>
          <Text variant="headline" size="6xl">Message Received.</Text>
          <Text variant="body" maxWidth="md" marginX="auto">
            Thank you for reaching out. I've received your message and will get back to you as soon as possible.
          </Text>
        </Stack>
        <Box 
          as={motion.button} 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          variant="mono"
          weight="font-bold"
          uppercase
          size="micro"
          border
          paddingX={8}
          paddingY={4}
          color="accent"
          cursor="pointer"
          className="hover:bg-accent-brand/5 transition-colors"
        >
          Send Another Message
        </Box>
      </Stack>
    </Box>
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
    <Box as="section">
      <Stack gap={12}>
        <PageHeader 
          label="CONTACT"
          title="Get in Touch"
          description="Have a burning analytical question regarding WCS? Want a lifestyle post about financial literacy or building community? Or just have feedback on a gear review? I'd love to hear from you."
        />

        <Grid cols={1} md={2} gap={0} border maxWidth="6xl" marginBottom={20} overflow="hidden">
        <Box surface="default" padding={{ base: 8, md: 12 }} border={{ base: "b", md: { b: false, r: true } }}>
          <Stack gap={8}>
            <Stack gap={6}>
              <Box paddingBottom={4} className="border-b border-slate-200">
                <Text as="h3" variant="display" size="2xl" weight="font-black" className="text-accent-navy">Inquiries</Text>
              </Box>
              <Text variant="body" size="base" maxWidth="md" color="dim">
                I&apos;m always open to new ideas, questions about my reviews, or just chat about the dance scene.
              </Text>
            </Stack>
            
            <Stack gap={6}>
              {[
                { label: 'Data Inquiry', channel: 'Dance Stats', icon: BarChart2 },
                { label: 'Gear Review', channel: 'Product Feedback', icon: Sparkles },
                { label: 'General', channel: 'Discussion', icon: MessageSquare },
              ].map((item) => (
                <Box key={item.label} display="flex" align="center" gap={6} className="group">
                  <Box width={12} height={12} border surface="muted" display="flex" align="center" justify="center" color="dim" className="group-hover:border-accent-brand group-hover:bg-accent-brand/5 transition-colors">
                    <item.icon className="w-6 h-6 stroke-1" />
                  </Box>
                  <Stack gap={1}>
                    <Text variant="sans" size="base" weight="font-bold" className="text-accent-navy">{item.label}</Text>
                    <Text variant="mono" color="dim" size="xs" weight="font-semibold" className="tracking-[0.15em] uppercase">{item.channel}</Text>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Box surface="default" padding={{ base: 8, md: 12 }}>
          <Box as="form" onSubmit={onSubmit} className="space-y-8">
            <Stack gap={3}>
              <Box display="flex" justify="between" align="center">
                <Text as="label" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Your Name</Text>
                {errors.name && <Text variant="mono" weight="font-semibold" color="brand" size="xs">{errors.name}</Text>}
              </Box>
              <Box as="input" 
                name="name"
                type="text" 
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
                  errors.name ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.name}
                onChange={onChange}
              />
            </Stack>
            <Stack gap={3}>
              <Box display="flex" justify="between" align="center">
                <Text as="label" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Your Email</Text>
                {errors.email && <Text variant="mono" weight="font-semibold" color="brand" size="xs">{errors.email}</Text>}
              </Box>
              <Box as="input" 
                name="email"
                type="email" 
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
                  errors.email ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.email}
                onChange={onChange}
              />
            </Stack>
            <Stack gap={3}>
              <Text as="label" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Subject</Text>
              <Box as="select" 
                name="subject"
                className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors"
                value={formData.subject}
                onChange={onChange}
              >
                <option>General Feedback</option>
                <option>Content Request</option>
                <option>Gear Review Request</option>
                <option>Dance Statistics</option>
              </Box>
            </Stack>
            <Stack gap={3}>
              <Box display="flex" justify="between" align="center">
                <Text as="label" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Message</Text>
                {errors.message && <Text variant="mono" weight="font-semibold" color="brand" size="xs">{errors.message}</Text>}
              </Box>
              <Box as="textarea" 
                name="message"
                rows={5}
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors resize-none",
                  errors.message ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.message}
                onChange={onChange}
              />
            </Stack>
            <Box as="button" 
              disabled={isSubmitting}
              className="w-full bg-text-main text-bg py-5 font-bold uppercase tracking-[3px] text-xs hover:bg-accent-brand transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              cursor="pointer"
            >
              {isSubmitting ? (
                <Stack direction="row" align="center" gap={3}>
                  <div className="w-4 h-4 border-2 border-bg-muted border-t-accent-brand animate-spin" />
                  <Text variant="mono" color="dim" size="micro">Sending...</Text>
                </Stack>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Box>
          </Box>
        </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
