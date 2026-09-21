import { useState } from 'react';
import { Shield } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

export function IntakeForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    industry: '',
    website: '',
    challenge: '24/7 Booking & Scheduling',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.businessName || !formData.industry) {
      // Let browser validation or basic check handle required fields
      const form = (e.currentTarget.closest('form') as HTMLFormElement | null);
      if (form && !form.reportValidity()) {
        return;
      }
    }
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
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
      <Box border radius="2xl" padding={12} surface="default" className="text-center border-line/40 bg-surface/50 shadow-md">
        <Stack gap={4} align="center">
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
      className="border-line/40 bg-surface/50 shadow-md relative"
    >
      <Stack gap={8}>
        <Stack gap={2} className="text-center">
          <Text as="h2" variant="headline" size="3xl" weight="font-bold">Request a Consultation</Text>
          <Text variant="body" size="md" color="dim">Tell us about your practice, current scheduling setup, and goals.</Text>

          {/* 2-Step Progress Indicator */}
          <Box className="pt-3 max-w-sm mx-auto w-full">
            <Box display="flex" justify="between" align="center" className="text-xs font-mono mb-2">
              <span className={step === 1 ? "text-main font-bold" : "text-dim"}>
                1. Studio & Contact
              </span>
              <span className={step === 2 ? "text-main font-bold" : "text-dim"}>
                2. Focus & Scope
              </span>
            </Box>
            <Box width="full" height={1.5} radius="full" className="bg-surface-alt overflow-hidden border border-line/30">
              <Box
                height="full"
                className={`bg-main transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}
              />
            </Box>
          </Box>
        </Stack>

        {status === 'error' && (
          <Box border radius="lg" padding={4} surface="alt" className="border-error/50 bg-error/10 text-error">
            <Text variant="body" size="sm" weight="font-bold">
              There was a network error submitting your request. Please try again or email ari@boomtick.blog directly.
            </Text>
          </Box>
        )}

        <Box as="form" onSubmit={handleSubmit} width="full">
          {step === 1 && (
            <Stack gap={6}>
              <Grid cols={{ base: 1, md: 2 }} gap={6}>
                <Stack gap={2}>
                  <label htmlFor="fullName" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Full Name *</label>
                  <Box
                    as="input"
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ariel Anders"
                    {...inputProps}
                  />
                </Stack>
                <Stack gap={2}>
                  <label htmlFor="email" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Email Address *</label>
                  <Box
                    as="input"
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ari@example.com"
                    {...inputProps}
                  />
                </Stack>
              </Grid>

              <Grid cols={{ base: 1, md: 2 }} gap={6}>
                <Stack gap={2}>
                  <label htmlFor="businessName" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Business / Practice Name *</label>
                  <Box
                    as="input"
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Studio or Solo Practice"
                    {...inputProps}
                  />
                </Stack>
                <Stack gap={2}>
                  <label htmlFor="industry" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Industry / Niche *</label>
                  <Box
                    as="select"
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    {...inputProps}
                  >
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

              <Stack gap={3} className="pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  width="full"
                  onClick={handleNextStep}
                  className="shadow-lg"
                >
                  Continue to Project Focus →
                </Button>
                <Box display="flex" align="center" justify="center" gap={1.5} className="text-dim text-xs text-center">
                  <Shield size={13} className="text-accent" />
                  <span>Strict confidentiality guaranteed · Zero spam policy</span>
                </Box>
              </Stack>
            </Stack>
          )}

          {step === 2 && (
            <Stack gap={6}>
              <Box as="fieldset">
                <Stack gap={3}>
                  <Text as="legend" variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="wider">
                    Primary Operational Focus
                  </Text>
                  <Grid cols={{ base: 1, sm: 2 }} gap={3}>
                    {[
                      'New Fast Website',
                      '24/7 Booking & Scheduling',
                      'Google Search & Shopping Feeds',
                      'Complete Studio Stack'
                    ].map((focus) => (
                      <label
                        key={focus}
                        className={`cursor-pointer border p-3 rounded-lg bg-surface-alt/30 transition-colors flex items-center gap-3 ${
                          formData.challenge === focus ? 'border-line/80 bg-surface-alt/60' : 'border-line/30 hover:border-line/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="challenge"
                          value={focus}
                          checked={formData.challenge === focus}
                          onChange={handleChange}
                          className="w-4 h-4 bg-surface-alt/50 border-line/30"
                        />
                        <span className="text-xs font-medium text-main">{focus}</span>
                      </label>
                    ))}
                  </Grid>
                </Stack>
              </Box>

              <Stack gap={2}>
                <label htmlFor="website" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Current Website or Social Handle (Optional)</label>
                <Box
                  as="input"
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. instagram.com/mybusiness or domain.com"
                  {...inputProps}
                />
              </Stack>

              <Stack gap={2}>
                <label htmlFor="notes" className="text-xs font-bold font-mono text-dim uppercase tracking-wider">Project Scope & Notes (Optional)</label>
                <Box
                  as="textarea"
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your schedule, client volume, or current tech challenges..."
                  {...inputProps}
                  className={`${inputProps.className} resize-none`}
                />
              </Stack>

              <Grid cols={{ base: 1, sm: 2 }} gap={3} className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  width="full"
                  onClick={handlePrevStep}
                >
                  ← Back to Contact Info
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  width="full"
                  disabled={status === 'submitting'}
                  className="shadow-md"
                >
                  {status === 'submitting' ? 'Submitting Request...' : 'Request a Consultation →'}
                </Button>
              </Grid>
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
