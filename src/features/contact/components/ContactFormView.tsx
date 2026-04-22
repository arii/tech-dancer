import { Send, MessageSquare, Sparkles, BarChart2 } from 'lucide-react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';
import { inputs } from '@/styles/design-tokens';
import type { ChangeEvent, FormEvent } from 'react';

// Specific types for the data managed by use-contact-form
interface ContactFormViewProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
  isSubmitting: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

const inputClasses = cn(
  inputs.base,
  "rounded-lg focus:ring-2 focus:ring-accent-brand/20 placeholder:text-text-dim/50"
);

export function ContactFormView({ formData, errors, isSubmitting, onChange, onSubmit }: ContactFormViewProps) {
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
                <Box paddingBottom={4} border="b">
                  <Text as="h3" variant="display" size="2xl" weight="font-black" color="brand">Inquiries</Text>
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
                    <Box width={12} height={12} border surface="muted" display="flex" align="center" justify="center" color="dim" radius="lg" shrink={false} marginRight={6} className="group-hover:border-accent-brand group-hover:bg-accent-brand/5 transition-colors">
                      <item.icon size={24} className="stroke-1" />
                    </Box>
                    <Stack gap={1}>
                      <Text variant="sans" size="base" weight="font-bold" color="brand">{item.label}</Text>
                      <Text variant="mono" color="dim" size="xs" weight="font-semibold" tracking="widest" uppercase>{item.channel}</Text>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Box surface="default" padding={{ base: 8, md: 12 }}>
            <Box maxWidth="xl" marginX="auto">
              <Stack gap={6} as="form" onSubmit={onSubmit}>
                <FormField label="Your Name" error={errors.name}>
                  <Box as="input"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    aria-required="true"
                    className={cn(
                      inputClasses,
                      errors.name ? 'border-accent-brand' : 'border-line'
                    )}
                    value={formData.name}
                    onChange={onChange}
                  />
                </FormField>

                <FormField label="Your Email" error={errors.email}>
                  <Box as="input"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    aria-required="true"
                    className={cn(
                      inputClasses,
                      errors.email ? 'border-accent-brand' : 'border-line'
                    )}
                    value={formData.email}
                    onChange={onChange}
                  />
                </FormField>

                <FormField label="Subject">
                  <Box as="select"
                    name="subject"
                    className={cn(inputClasses, "border-line")}
                    value={formData.subject}
                    onChange={onChange}
                  >
                    <option>General Feedback</option>
                    <option>Content Request</option>
                    <option>Gear Review Request</option>
                    <option>Dance Statistics</option>
                  </Box>
                </FormField>

                <FormField label="Message" error={errors.message}>
                  <Box as="textarea"
                    name="message"
                    rows={5}
                    placeholder="How can I help you?"
                    aria-required="true"
                    className={cn(
                      inputClasses,
                      "resize-none",
                      errors.message ? 'border-accent-brand' : 'border-line'
                    )}
                    value={formData.message}
                    onChange={onChange}
                  />
                </FormField>

                <Button
                  type="submit"
                  variant="professional"
                  disabled={isSubmitting}
                  fullWidth
                  paddingY={4}
                  size="lg"
                >
                  {isSubmitting ? (
                    <Stack direction="row" align="center" gap={3}>
                      <Box width={4} height={4} className="border-2 border-current border-t-transparent animate-spin" />
                      <Text variant="sans" color="inherit" size="sm" weight="font-semibold">Sending...</Text>
                    </Stack>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
