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

const inputClasses = "w-full min-h-12 bg-bg border border-line/80 px-4 py-3 text-base sm:text-sm font-sans rounded-lg transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-text-dim/45";

export function ContactFormView({ register, errors, isSubmitting, onSubmit }: ContactFormViewProps) {
  return (
    <Box as="section">
      <Stack gap={12}>
        <PageHeader
          label="CONTACT"
          title="Get in Touch"
          description="Have a question about West Coast Swing, consulting, project work, travel, gear, or the site itself? I'd love to hear from you."
        />

        <Box padding={5} border radius="2xl" className="border-line/80 bg-surface shadow-sm sm:p-6 md:p-8">
          <Stack gap={8}>
            <Stack gap={2}>
              <Text as="h2" size="2xl" weight="font-black">Inquiries</Text>
              <Text size="sm" className="max-w-2xl leading-7 text-text-body/72">
                I'm open to new ideas, questions about reviews, or a good dance-scene conversation.
              </Text>
            </Stack>

            <Grid gap={3} cols={{ base: 1, md: 3 }}>
              {[
                { label: 'Data Inquiry', channel: 'Dance Stats', icon: BarChart2 },
                { label: 'Gear Review', channel: 'Product Feedback', icon: Sparkles },
                { label: 'General', channel: 'Discussion', icon: MessageSquare },
              ].map((item) => (
                <Box key={item.label} padding={4} border radius="lg" className="border-line/80 bg-bg/60 shadow-sm">
                  <Text size="micro" weight="font-bold" className="uppercase tracking-[0.22em] text-text-dim/65">{item.channel}</Text>
                  <Text size="sm" weight="font-bold" className="mt-2">{item.label}</Text>
                </Box>
              ))}
            </Grid>

            <Box as="form" onSubmit={onSubmit} className="space-y-4" noValidate>
              <Grid cols={{ base: 1, md: 2 }} gap={4}>
                <FormField label="Your Name" error={errors.name?.message} hideLabel>
                  <Box as="input"
                    {...register('name')}
                    type="text"
                    placeholder="Your Name"
                    aria-required="true"
                    className={cn(inputClasses, errors.name && "border-error")}
                  />
                </FormField>

                <FormField label="Your Email" error={errors.email?.message} hideLabel>
                  <Box as="input"
                    {...register('email')}
                    type="email"
                    placeholder="Your Email"
                    aria-required="true"
                    className={cn(inputClasses, errors.email && "border-error")}
                  />
                </FormField>
              </Grid>

              <FormField label="Subject" error={errors.subject?.message} hideLabel>
                <Box as="input"
                  {...register('subject')}
                  type="text"
                  placeholder="Subject"
                  aria-required="true"
                  className={cn(inputClasses, errors.subject && "border-error")}
                />
              </FormField>

              <FormField label="Message" error={errors.message?.message} hideLabel>
                <Box as="textarea"
                  {...register('message')}
                  rows={5}
                  placeholder="Message"
                  aria-required="true"
                  className={cn(inputClasses, "resize-none min-h-[176px]", errors.message && "border-error")}
                />
              </FormField>

              {errors.root && (
                <Text color="error" size="sm" align="center" as="p" marginTop={2}>
                  {errors.root.message}
                </Text>
              )}

              <Box 
                as="button"
                type="submit"
                disabled={isSubmitting}
                className="mt-4 min-h-11 w-full sm:w-auto rounded-lg bg-secondary px-8 py-3 font-semibold text-bg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Stack direction="row" align="center" justify="center" gap={3}>
                    <Box width={4} height={4} border={2} radius="full" className="border-current border-t-transparent animate-spin" />
                    <span>Sending...</span>
                  </Stack>
                ) : (
                  <Stack direction="row" align="center" justify="center" gap={2}>
                    <Send size={16} />
                    <span>Send Message</span>
                  </Stack>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
