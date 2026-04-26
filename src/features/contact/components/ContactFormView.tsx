import { Send, MessageSquare, Sparkles, BarChart2 } from 'lucide-react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';
import React from 'react';
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
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const inputClasses = "w-full min-h-12 bg-bg border px-4 py-3 text-base sm:text-sm font-sans rounded-lg transition-all focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:text-text-dim/50";

export function ContactFormView({ register, errors, isSubmitting, onSubmit }: ContactFormViewProps) {
  return (
    <Box as="section" minHeight="[calc(100vh-64px)]">
      <Stack gap={12}>
        <PageHeader
          label="CONTACT"
          title="Get in Touch"
          description="Have a burning analytical question regarding WCS? Want a lifestyle post about financial literacy or building community? Or just have feedback on a gear review? I'd love to hear from you."
        />

        <Grid cols={1} md={2} gap={0} border maxWidth="6xl" marginBottom={{ base: 40, md: 0 }} overflow="hidden" radius="lg">
          <Box surface="default" padding={{ base: 8, md: 12 }} border={{ base: "b", md: { b: false, r: true } }}>
            <Stack gap={12}>
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
                    <Box width={12} height={12} border surface="muted" display="flex" align="center" justify="center" color="dim" className="group-hover:border-accent group-hover:bg-bg transition-colors" radius="lg">
                      <item.icon className="w-6 h-6 stroke-1" />
                    </Box>
                    <Stack gap={1}>
                      <Text variant="sans" size="base" weight="font-bold" className="text-accent-navy">{item.label}</Text>
                      <Text variant="mono" color="dim" size="xs" weight="font-semibold" tracking="widest" uppercase>{item.channel}</Text>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Box surface="default" padding={{ base: 8, md: 12 }}>
            <Box maxWidth="xl" marginX="auto">
              <Box as="form" onSubmit={onSubmit} className="space-y-6" noValidate>
                <FormField label="Your Name" error={errors.name?.message}>
                  <Box as="input"
                    {...register('name')}
                    type="text"
                    placeholder="Jane Doe"
                    aria-required="true"
                    className={cn(
                      inputClasses,
                      errors.name ? 'border-accent' : 'border-line'
                    )}
                  />
                </FormField>

                <FormField label="Your Email" error={errors.email?.message}>
                  <Box as="input"
                    {...register('email')}
                    type="email"
                    placeholder="jane@example.com"
                    aria-required="true"
                    className={cn(
                      inputClasses,
                      errors.email ? 'border-accent' : 'border-line'
                    )}
                  />
                </FormField>

                <FormField label="Subject" error={errors.subject?.message}>
                  <Box as="select"
                    {...register('subject')}
                    className={cn(inputClasses, "border-line")}
                  >
                    <option value="General Feedback">General Feedback</option>
                    <option value="Content Request">Content Request</option>
                    <option value="Gear Review Request">Gear Review Request</option>
                    <option value="Dance Statistics">Dance Statistics</option>
                  </Box>
                </FormField>

                <FormField label="Message" error={errors.message?.message}>
                  <Box as="textarea"
                    {...register('message')}
                    rows={5}
                    placeholder="How can I help you?"
                    aria-required="true"
                    className={cn(
                      inputClasses,
                      "resize-none",
                      errors.message ? 'border-accent' : 'border-line'
                    )}
                  />
                </FormField>

                {errors.root && (
                  <Text color="error" size="sm" marginTop={2} className="text-center" as="p">
                    {errors.root.message}
                  </Text>
                )}

                <Button
                  type="submit"
                  variant="professional"
                  disabled={isSubmitting}
                  fullWidth
                  className=" font-semibold text-base min-h-12"
                >
                  {isSubmitting ? (
                    <Stack direction="row" align="center" gap={3}>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
                      <Text variant="sans" color="inherit" size="sm" weight="font-semibold">Sending...</Text>
                    </Stack>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
