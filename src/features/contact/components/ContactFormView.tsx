import { Send } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { inputs } from '@/styles/design-tokens';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';
import type { BaseSyntheticEvent } from 'react';

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

export function ContactFormView({ register, errors, isSubmitting, onSubmit }: ContactFormViewProps) {
  return (
    <Box as="section" minHeight="[calc(100vh-64px)]">
      <Stack gap={12} maxWidth="3xl" marginX="auto">
        <PageHeader
          label="CONTACT"
          title="Get in Touch"
          description="Questions about West Coast Swing training, travel, gear, or data? Send a note and I’ll reply soon."
          border="b"
        />

        <Stack gap={8}>
          <Stack gap={2}>
            <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Inquiries</Text>
            <Text variant="body" size="base" color="main">
              Send blog ideas, event notes, gear suggestions, or anything you want featured on boomtick.blog.
            </Text>
          </Stack>

          <Stack as="form" onSubmit={onSubmit} gap={6} noValidate>
            <FormField label="Your Name" error={errors.name?.message}>
              <Box as="input"
                {...register('name')}
                type="text"
                placeholder="Jane Doe"
                aria-required="true"
                className={cn(
                  inputs.base,
                  errors.name ? inputs.error : 'border-line'
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
                  inputs.base,
                  errors.email ? inputs.error : 'border-line'
                )}
              />
            </FormField>

            <FormField label="Subject" error={errors.subject?.message}>
              <Box as="select"
                {...register('subject')}
                className={cn(inputs.select, "border-line")}
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
                  inputs.base,
                  "resize-none",
                  errors.message ? inputs.error : 'border-line'
                )}
              />
            </FormField>

            {errors.root && (
              <Text color="error" size="sm" align="center" as="p" marginTop={2}>
                {errors.root.message}
              </Text>
            )}

            <Box display="flex" justify="end">
              <Button
                type="submit"
                variant="professional"
                disabled={isSubmitting}
                paddingX={8}
                className="font-semibold text-base min-h-12"
              >
                {isSubmitting ? (
                  <Stack direction="row" align="center" gap={3}>
                    <Box width={4} height={4} border={2} className="border-current border-t-transparent animate-spin" />
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
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
