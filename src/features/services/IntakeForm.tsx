import { useState } from 'react';
import { Shield } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

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
      console.warn("Mailing list deployment ID is not set. Simulating success.");
      setStatus('success');
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });

      await fetch(`https://script.google.com/macros/s/${deploymentId}/exec`, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });
      setStatus('success');
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Box border radius="2xl" padding={10} surface="default" marginX="auto" maxWidth="2xl" className="text-center border-line/40 bg-surface/50 shadow-md">
        <Stack gap={3} align="center">
          <Text variant="headline" size="2xl" weight="font-bold">Thank You for Reaching Out!</Text>
          <Text variant="body" size="base" color="dim" maxWidth="md">
            We will review your business requirements and reply promptly to coordinate an operational consultation.
          </Text>
        </Stack>
      </Box>
    );
  }

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

        {status === 'error' && (
          <Box border radius="md" padding={3} surface="alt" className="border-error/50 bg-error/10 text-error text-center">
            <Text variant="body" size="xs" weight="font-bold">
              There was a network error submitting your request. Please email ari@boomtick.blog directly.
            </Text>
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
                className="shadow-md font-semibold"
              >
                {status === 'submitting' ? 'Sending Message...' : 'Send Message →'}
              </Button>
              <Box display="flex" align="center" justify="center" gap={1.5} className="text-dim text-xs text-center">
                <Shield size={13} className="text-accent" />
                <span>Strict confidentiality guaranteed · Zero spam policy</span>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
