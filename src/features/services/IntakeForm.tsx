import { useState } from 'react';
import { Shield } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

const SPINNER_STYLE = { marginRight: '0.5rem' };

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-current inline-block"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    style={SPINNER_STYLE}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

export function IntakeForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const deploymentId = import.meta.env.VITE_MAILING_LIST_DEPLOYMENT_ID;

    if (!deploymentId) {
      console.warn("Deployment ID is not set. Simulating success.");
      setStatus('success');
      return;
    }

    try {
      const data = new FormData();
      // Map form fields to GAS parameter names: name, email, message
      data.append('name', formData.fullName);
      data.append('email', formData.email);
      data.append('message', formData.notes);

      await fetch(`https://script.google.com/macros/s/${deploymentId}/exec`, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });
      setStatus('success');
      setFormData({ fullName: '', email: '', notes: '' });
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus('error');
    }
  };

  const inputProps = {
    width: "full",
    radius: "lg",
    border: true,
    paddingX: 4,
    paddingY: 3,
    className: "bg-surface-alt border-line/60 text-main placeholder-dim/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm font-sans"
  } as const;

  return (
    <Box
      id="intake-form"
      border
      radius="2xl"
      padding={{ base: 6, sm: 8, md: 10 }}
      surface="default"
      maxWidth="2xl"
      marginX="auto"
      className="border-line/60 bg-surface/90 shadow-2xl relative"
    >
      <Stack gap={6}>
        <Stack gap={2} className="text-center">
          <Text as="h2" variant="headline" size="2xl" weight="font-bold" tracking="wordmark">Request a Consultation</Text>
          <Text variant="body" size="sm" color="dim" leading="relaxed" marginX="auto" maxWidth="lg">
            Whether you're looking to build a new site or need ongoing management for your existing systems, tell us about your practice, current setup, and goals.
          </Text>
        </Stack>

        {status === 'success' && (
          <Box
            role="status"
            aria-live="polite"
            padding={4}
            radius="lg"
            border
            className="bg-success/20 border-success/40 text-success text-sm"
          >
            <strong>Message sent!</strong> Thanks for reaching out. I&apos;ll review your project details and get back to you shortly.
          </Box>
        )}

        {status === 'error' && (
          <Box
            role="alert"
            aria-live="assertive"
            padding={4}
            radius="lg"
            border
            className="bg-error/20 border-error/40 text-error text-sm"
          >
            <strong>Something went wrong.</strong> Please try again later, or reach out directly at{' '}
            <a
              href="mailto:ari@boomtick.blog"
              className="underline hover:text-white transition-colors"
            >
              ari@boomtick.blog
            </a>.
          </Box>
        )}

        <Box as="form" onSubmit={handleSubmit} width="full">
          <Stack gap={4}>
            <Grid cols={{ base: 1, sm: 2 }} gap={4}>
              <Stack gap={1.5}>
                <label htmlFor="fullName" className="text-xs font-medium font-sans text-main/90">Full Name *</label>
                <Box
                  as="input"
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  {...inputProps}
                />
              </Stack>
              <Stack gap={1.5}>
                <label htmlFor="email" className="text-xs font-medium font-sans text-main/90">Email Address *</label>
                <Box
                  as="input"
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  {...inputProps}
                />
              </Stack>
            </Grid>

            <Stack gap={1.5}>
              <label htmlFor="notes" className="text-xs font-medium font-sans text-main/90">Project Scope & Notes *</label>
              <Box
                as="textarea"
                id="notes"
                name="notes"
                required
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                placeholder=""
                {...inputProps}
                className={`${inputProps.className} resize-none`}
              />
            </Stack>

            <Stack gap={2.5} marginTop={1}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                width="full"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="shadow-md font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                <Stack direction="row" align="center" justify="center">
                  {status === 'submitting' ? (
                    <>
                      <Spinner />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </Stack>
              </Button>
              <Stack direction="row" align="center" justify="center" gap={1.5} className="text-dim text-xs text-center">
                <Shield size={13} className="text-accent" />
                <span>Strict confidentiality guaranteed · Zero spam policy</span>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
