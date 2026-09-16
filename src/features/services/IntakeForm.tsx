import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';
import { useState } from 'react';

export function IntakeForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const deploymentId = import.meta.env.VITE_MAILING_LIST_DEPLOYMENT_ID;

    if (!deploymentId) {
      console.warn("Mailing list deployment ID is not set. Simulating success.");
      setStatus('success');
      return;
    }

    try {
      await fetch(`https://script.google.com/macros/s/${deploymentId}/exec`, {
        method: 'POST',
        body: formData,
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
      <Box border radius="lg" padding={12} surface="accent" className="text-center">
        <Stack gap={4} align="center">
          <Text variant="headline" size="2xl" weight="font-bold">Thank you for inquiring!</Text>
          <Text variant="body" size="lg">We'll review your details and get back to you to schedule a consultation.</Text>
        </Stack>
      </Box>
    );
  }

  const inputProps = {
    width: "full",
    radius: "md",
    border: true,
    paddingX: 4,
    paddingY: 3,
    className: "bg-surface-alt/50 border-line/30 text-main focus:outline-none focus:ring-2 focus:ring-accent/50"
  } as const;

  return (
    <Box id="intake-form" border radius="lg" padding={8} surface="default" maxWidth="3xl" marginX="auto" className="border-line/50">
      <Stack gap={8}>
        <Stack gap={2} className="text-center">
          <Text as="h2" variant="headline" size="2xl" weight="font-bold">Request Studio Consultation</Text>
          <Text variant="body" size="lg" color="dim">Fill out the form below to get started.</Text>
        </Stack>

        {status === 'error' && (
          <Box border radius="md" padding={4} surface="alt" className="border-error/50 bg-error/10 text-error">
            <Text variant="body" size="sm" weight="font-bold">
              There was a network error submitting your request. Please try again or email Ari@boomtick.blog directly.
            </Text>
          </Box>
        )}

        <Box as="form" onSubmit={handleSubmit} width="full">
          <Stack gap={6}>
            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              <Stack gap={2}>
                <label htmlFor="fullName" className="text-sm font-bold font-mono">Full Name</label>
                <Box as="input" type="text" id="fullName" name="fullName" required {...inputProps} />
              </Stack>
              <Stack gap={2}>
                <label htmlFor="email" className="text-sm font-bold font-mono">Email Address</label>
                <Box as="input" type="email" id="email" name="email" required {...inputProps} />
              </Stack>
            </Grid>

            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              <Stack gap={2}>
                <label htmlFor="businessName" className="text-sm font-bold font-mono">Business / Practice Name</label>
                <Box as="input" type="text" id="businessName" name="businessName" required {...inputProps} />
              </Stack>
              <Stack gap={2}>
                <label htmlFor="industry" className="text-sm font-bold font-mono">Industry / Niche</label>
                <Box as="select" id="industry" name="industry" required {...inputProps}>
                  <option value="">Select an option</option>
                  <option value="Hair & Beauty">Hair & Beauty</option>
                  <option value="Dance & Movement">Dance & Movement</option>
                  <option value="Fitness & Health">Fitness & Health</option>
                  <option value="Education & Tutoring">Education & Tutoring</option>
                  <option value="Therapy & Coaching">Therapy & Coaching</option>
                  <option value="Other">Other</option>
                </Box>
              </Stack>
            </Grid>

            <Stack gap={2}>
              <label htmlFor="website" className="text-sm font-bold font-mono">Current Website or Social Handle</label>
              <Box as="input" type="text" id="website" name="website" placeholder="e.g. instagram.com/mybusiness" {...inputProps} />
            </Stack>

            <Box as="fieldset">
              <Stack gap={3}>
                <Text as="legend" variant="mono" size="sm" weight="font-bold">Primary Operational Challenge</Text>
                <Stack gap={2}>
                  <label className="cursor-pointer">
                    <Stack direction="row" align="center" gap={3}>
                      <input type="radio" name="challenge" value="Need a new website" required className="text-accent focus:ring-accent/50 w-4 h-4 bg-surface-alt/50 border-line/30" />
                      <span className="text-sm text-main">Need a new website</span>
                    </Stack>
                  </label>
                  <label className="cursor-pointer">
                    <Stack direction="row" align="center" gap={3}>
                      <input type="radio" name="challenge" value="Booking & scheduling is messy" className="text-accent focus:ring-accent/50 w-4 h-4 bg-surface-alt/50 border-line/30" />
                      <span className="text-sm text-main">Booking & scheduling is messy</span>
                    </Stack>
                  </label>
                  <label className="cursor-pointer">
                    <Stack direction="row" align="center" gap={3}>
                      <input type="radio" name="challenge" value="Need better Google search visibility" className="text-accent focus:ring-accent/50 w-4 h-4 bg-surface-alt/50 border-line/30" />
                      <span className="text-sm text-main">Need better Google search visibility</span>
                    </Stack>
                  </label>
                  <label className="cursor-pointer">
                    <Stack direction="row" align="center" gap={3}>
                      <input type="radio" name="challenge" value="All of the above" className="text-accent focus:ring-accent/50 w-4 h-4 bg-surface-alt/50 border-line/30" />
                      <span className="text-sm text-main">All of the above</span>
                    </Stack>
                  </label>
                </Stack>
              </Stack>
            </Box>

            <Stack gap={2}>
              <label htmlFor="notes" className="text-sm font-bold font-mono">Message / Timeline Notes</label>
              <Box as="textarea" id="notes" name="notes" rows={4} {...inputProps} className={`${inputProps.className} resize-none`} />
            </Stack>

            <Stack gap={4} className="text-center">
              <Text variant="body" size="sm" color="dim">
                🔒 We respect your time. Your details remain strictly confidential and will never be shared.
              </Text>
              <Button type="submit" variant="primary" size="lg" width="full" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Request Studio Consultation →'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
