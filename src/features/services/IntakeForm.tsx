import { useState } from 'react';
import { Send, Shield, Sparkles } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

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
      <Box border radius="2xl" padding={12} surface="accent" className="text-center bg-gradient-to-b from-surface to-surface-alt/80 border-accent/40 shadow-xl">
        <Stack gap={4} align="center">
          <Box width={12} height={12} radius="full" className="bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
            <Sparkles size={24} />
          </Box>
          <Text variant="headline" size="2xl" weight="font-bold">Thank You for Reaching Out!</Text>
          <Text variant="body" size="lg" color="dim" maxWidth="xl">
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
    className: "bg-surface-alt/50 border-line/40 text-main focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/60 transition-all text-sm font-sans"
  } as const;

  return (
    <Box
      id="intake-form"
      border
      radius="2xl"
      padding={{ base: 6, sm: 8, md: 10 }}
      surface="default"
      maxWidth="3xl"
      marginX="auto"
      className="border-line/60 bg-gradient-to-b from-surface to-surface-alt/40 shadow-xl relative"
    >
      <Stack gap={8}>
        <Stack gap={2} className="text-center">
          <Box display="flex" align="center" justify="center" gap={2}>
            <Box
              paddingX={3}
              paddingY={1}
              radius="full"
              border
              className="border-accent/40 bg-accent/10 text-accent font-mono text-xs font-bold flex items-center gap-1.5"
            >
              <Send size={12} />
              <span>STUDIO INTAKE & INQUIRY</span>
            </Box>
          </Box>
          <Text as="h2" variant="headline" size="3xl" weight="font-bold">Request Studio Consultation</Text>
          <Text variant="body" size="md" color="dim">Tell us about your practice, current bottlenecks, and scheduling goals.</Text>
        </Stack>

        {status === 'error' && (
          <Box border radius="lg" padding={4} surface="alt" className="border-error/50 bg-error/10 text-error">
            <Text variant="body" size="sm" weight="font-bold">
              There was a network error submitting your request. Please try again or email ari@boomtick.blog directly.
            </Text>
          </Box>
        )}

        <Box as="form" onSubmit={handleSubmit} width="full">
          <Stack gap={6}>
            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              <Stack gap={2}>
                <label htmlFor="fullName" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Full Name</label>
                <Box as="input" type="text" id="fullName" name="fullName" required placeholder="Ariel Anders" {...inputProps} />
              </Stack>
              <Stack gap={2}>
                <label htmlFor="email" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Email Address</label>
                <Box as="input" type="email" id="email" name="email" required placeholder="ari@example.com" {...inputProps} />
              </Stack>
            </Grid>

            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              <Stack gap={2}>
                <label htmlFor="businessName" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Business / Practice Name</label>
                <Box as="input" type="text" id="businessName" name="businessName" required placeholder="Studio or Solo Practice" {...inputProps} />
              </Stack>
              <Stack gap={2}>
                <label htmlFor="industry" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Industry / Niche</label>
                <Box as="select" id="industry" name="industry" required {...inputProps}>
                  <option value="">Select an industry</option>
                  <option value="Hair & Beauty">Hair & Beauty</option>
                  <option value="Dance & Movement">Dance & Movement</option>
                  <option value="Fitness & Health">Fitness & Health</option>
                  <option value="Education & Coaching">Education & Coaching</option>
                  <option value="Creative & Design">Creative & Design</option>
                  <option value="Other">Other</option>
                </Box>
              </Stack>
            </Grid>

            <Stack gap={2}>
              <label htmlFor="website" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Current Website or Social Handle</label>
              <Box as="input" type="text" id="website" name="website" placeholder="e.g. instagram.com/mybusiness or domain.com" {...inputProps} />
            </Stack>

            <Box as="fieldset">
              <Stack gap={3}>
                <Text as="legend" variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="wider">
                  Primary Operational Focus
                </Text>
                <Grid cols={{ base: 1, sm: 2 }} gap={3}>
                  <label className="cursor-pointer border border-line/40 hover:border-accent/50 p-3 rounded-lg bg-surface-alt/30 transition-colors flex items-center gap-3">
                    <input type="radio" name="challenge" value="New Fast Website" required className="text-accent focus:ring-accent/50 w-4 h-4 bg-surface-alt/50 border-line/30" />
                    <span className="text-xs font-medium text-main">New Fast Website</span>
                  </label>
                  <label className="cursor-pointer border border-line/40 hover:border-accent/50 p-3 rounded-lg bg-surface-alt/30 transition-colors flex items-center gap-3">
                    <input type="radio" name="challenge" value="24/7 Booking & Scheduling" className="text-accent focus:ring-accent/50 w-4 h-4 bg-surface-alt/50 border-line/30" />
                    <span className="text-xs font-medium text-main">24/7 Booking & Scheduling</span>
                  </label>
                  <label className="cursor-pointer border border-line/40 hover:border-accent/50 p-3 rounded-lg bg-surface-alt/30 transition-colors flex items-center gap-3">
                    <input type="radio" name="challenge" value="Google Search & Shopping Feeds" className="text-accent focus:ring-accent/50 w-4 h-4 bg-surface-alt/50 border-line/30" />
                    <span className="text-xs font-medium text-main">Google Search & Shopping Feeds</span>
                  </label>
                  <label className="cursor-pointer border border-line/40 hover:border-accent/50 p-3 rounded-lg bg-surface-alt/30 transition-colors flex items-center gap-3">
                    <input type="radio" name="challenge" value="Complete Studio Stack" className="text-accent focus:ring-accent/50 w-4 h-4 bg-surface-alt/50 border-line/30" />
                    <span className="text-xs font-medium text-main">Complete Studio Stack</span>
                  </label>
                </Grid>
              </Stack>
            </Box>

            <Stack gap={2}>
              <label htmlFor="notes" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Project Scope & Notes</label>
              <Box as="textarea" id="notes" name="notes" rows={3} placeholder="Tell us about your schedule, client volume, or current tech challenges..." {...inputProps} className={`${inputProps.className} resize-none`} />
            </Stack>

            <Stack gap={4} className="text-center pt-2">
              <Box display="flex" align="center" justify="center" gap={1.5} className="text-dim text-xs">
                <Shield size={13} className="text-accent" />
                <span>Strict confidentiality guaranteed · Zero spam policy</span>
              </Box>
              <Button type="submit" variant="primary" size="lg" width="full" disabled={status === 'submitting'} className="shadow-lg">
                {status === 'submitting' ? 'Submitting Request...' : 'Request Studio Consultation →'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
