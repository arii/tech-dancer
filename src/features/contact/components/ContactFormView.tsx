import { BaseSyntheticEvent } from 'react';
import { Send, MessageSquare, Sparkles, BarChart2 } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormViewProps {
  register: UseFormRegister<ContactFormData>;
  errors: FieldErrors<ContactFormData>;
  isSubmitting: boolean;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
}

const inputClasses = "w-full min-h-12 bg-white/5 border border-white/10 px-5 py-4 text-white font-sans rounded-xl transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white/10 placeholder:text-text-dim/80";

export function ContactFormView({ register, errors, isSubmitting, onSubmit }: ContactFormViewProps) {
  return (
    <Box as="section">
      <Stack gap={12}>
        <PageHeader
          label="COMMUNICATIONS"
          title="Direct Line"
          description="Inquiries regarding West Coast Swing lifestyle, engineering consulting, or specialized data projects. I respond to all professional outreach within 48 hours."
        />

        <Box padding={{ base: 6, md: 10 }} border radius="3xl" surface="surface" className="border-line/50 shadow-2xl relative overflow-hidden">
          <Box position="absolute" top={-16} left={-16} width={64} height={64} surface="secondary" opacity={0.05} radius="full" className="blur-3xl" />
          
          <Stack gap={10} position="relative" zIndex={10}>
            <Stack gap={2}>
              <Text as="h2" size="3xl" weight="font-black" className="tracking-tight text-white">System Inquiries</Text>
              <Text size="lg" className="max-w-2xl leading-relaxed text-text-body/90">
                Choose a channel for your message to ensure it reaches the right workflow.
              </Text>
            </Stack>

            <Grid gap={4} cols={{ base: 1, md: 3 }}>
              {[
                { label: 'Data Inquiry', channel: 'ANALYTICS', icon: BarChart2 },
                { label: 'Gear Review', channel: 'HARDWARE', icon: Sparkles },
                { label: 'General', channel: 'COMMUNITY', icon: MessageSquare },
              ].map((item) => (
                <Box key={item.label} padding={6} border radius="2xl" className="border-line/40 bg-bg/40 group hover:border-primary/40 transition-colors">
                  <Stack direction="row" align="center" gap={3} marginBottom={4}>
                     <item.icon size={18} className="text-primary" />
                     <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-widest text-primary group-hover:text-primary transition-colors">{item.channel}</Text>
                  </Stack>
                  <Text size="base" weight="font-black" className="text-white">{item.label}</Text>
                </Box>
              ))}
            </Grid>

            <Box as="form" onSubmit={onSubmit} noValidate>
              <Stack gap={6}>
                <Grid cols={{ base: 1, md: 2 }} gap={6}>
                  <FormField label="Your Name" error={errors.name?.message}>
                    <Box as="input"
                      {...register('name')}
                      type="text"
                      placeholder="Identification (Name)"
                      aria-required="true"
                      className={cn(inputClasses, errors.name && "border-error/50")}
                    />
                  </FormField>

                  <FormField label="Your Email" error={errors.email?.message}>
                    <Box as="input"
                      {...register('email')}
                      type="email"
                      placeholder="Return Address (Email)"
                      aria-required="true"
                      className={cn(inputClasses, errors.email && "border-error/50")}
                    />
                  </FormField>
                </Grid>

                <FormField label="Subject" error={errors.subject?.message}>
                  <Box as="input"
                    {...register('subject')}
                    type="text"
                    placeholder="Inquiry Subject"
                    aria-required="true"
                    className={cn(inputClasses, errors.subject && "border-error/50")}
                  />
                </FormField>

                <FormField label="Message" error={errors.message?.message}>
                  <Box as="textarea"
                    {...register('message')}
                    rows={6}
                    placeholder="Message payload..."
                    aria-required="true"
                    className={cn(inputClasses, "resize-none min-h-[200px]", errors.message && "border-error/50")}
                  />
                </FormField>

                {errors.root && (
                  <Text color="error" size="sm" align="center" as="p">
                    {errors.root.message}
                  </Text>
                )}

                <Box display="flex" justify="end">
                  <Box 
                    as="button"
                    type="submit"
                    disabled={isSubmitting}
                    radius="xl"
                    surface="primary"
                    paddingX={10}
                    paddingY={4}
                    className="w-full sm:w-auto font-black uppercase tracking-widest text-bg transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? (
                      <Stack direction="row" align="center" justify="center" gap={3}>
                        <Box width={5} height={5} border={3} radius="full" className="border-current border-t-transparent animate-spin" />
                        <span>Transmitting...</span>
                      </Stack>
                    ) : (
                      <Stack direction="row" align="center" justify="center" gap={3}>
                        <Send size={18} />
                        <span>Submit Inquiry</span>
                      </Stack>
                    )}
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
