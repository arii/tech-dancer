import React, { useState, FormEvent, useEffect } from 'react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { AlertCircle, CheckCircle2, Loader2, Mail, X, CheckCircle } from 'lucide-react';

interface MailingListSignupProps {
  variant?: 'popup' | 'inline';
}

export default function MailingListSignup({ variant = 'popup' }: MailingListSignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Initialize state based on variant without using an effect
  const [initialized] = useState(() => variant === 'inline');

  const DEPLOYMENT_ID = import.meta.env.VITE_MAILING_LIST_DEPLOYMENT_ID;

  // Delayed appearance effect for popup variant
  useEffect(() => {
    if (variant !== 'popup') return;

    // In test environments or when unconfigured, don't show the popup
    // to prevent blocking UI interactions in E2E tests
    if (!DEPLOYMENT_ID && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return;
    }

    // Only show if not previously dismissed
    const hasDismissed = sessionStorage.getItem('ariel_profile_mailing_list_dismissed');
    if (hasDismissed === 'true') return;

    // Disable popup in automated testing environments to prevent blocking UI interactions
    if (typeof window !== 'undefined' && window.navigator?.webdriver) {
      return;
    }

    // Show after scrolling or small delay
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsDismissed(false);
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Also set a fallback timer in case they don't scroll
    const timer = setTimeout(() => {
      setIsDismissed(false);
      setIsVisible(true);
      window.removeEventListener('scroll', handleScroll);
    }, 5000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [variant]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      if (!DEPLOYMENT_ID) {
        throw new Error('Mailing list configuration is missing');
      }

      const SCRIPT_URL = `https://script.google.com/macros/s/${DEPLOYMENT_ID}/exec`;

      const formData = new FormData();
      if (name) formData.append('name', name);
      formData.append('email', email);

      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for static sites calling Google Apps Script
      });

      // With no-cors, we don't get a readable response body or status code
      // We have to assume success if the fetch didn't throw an error
      setStatus('success');
      setMessage('Thanks for subscribing! Check your inbox soon.');
      setName('');
      setEmail('');

    } catch (error) {
      console.error('Mailing list signup error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('ariel_profile_mailing_list_dismissed', 'true');
  };

  if (!initialized && (!isVisible || isDismissed)) return null;

  if (variant === 'inline') {
    return (
      <Box
        width="full"
        maxWidth="md"
        background="slate-900"
        borderColor="slate-800"
        borderWidth={1}
        radius="xl"
        padding={8}
        shadow="lg"
        marginX="auto"
      >
        {status === 'success' ? (
          <Stack align="center" gap={4} paddingY={6}>
            <Box background="emerald-500/10" padding={4} radius="full" display="inline-flex" color="emerald-400">
              <CheckCircle className="w-8 h-8" />
            </Box>
            <Text as="h3" align="center" weight="bold" size="xl" color="white">
              You're on the list!
            </Text>
            <Text align="center" color="slate-400">
              Thanks for subscribing. We'll be in touch soon.
            </Text>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack gap={5}>
              <Stack align="center" gap={3}>
                <Box background="sky-500/10" padding={3} radius="full" display="inline-flex" color="sky-400">
                  <Mail className="w-6 h-6" />
                </Box>
                <Text as="h3" weight="bold" size="xl" color="white" align="center">
                  Join the Newsletter
                </Text>
                <Text size="sm" color="slate-400" align="center">
                  Updates on articles, research, and gear. No spam.
                </Text>
              </Stack>

              <Stack gap={4}>
                <Stack gap={1.5}>
                  <Text as="label" htmlFor="inline-name" size="sm" weight="medium" color="text-dim">
                    First Name <span className="opacity-50 font-normal">(optional)</span>
                  </Text>
                  <Box
                    as="input"
                    id="inline-name"
                    type="text"
                    name="name"
                    placeholder="e.g. Ariel"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    disabled={status === 'loading'}
                    width="full"
                    background="surface-raised"
                    borderColor="line"
                    borderWidth={1}
                    radius="lg"
                    paddingX={4}
                    paddingY={3}
                    color="text-main"
                    className={`placeholder-text-dim focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all ${status === 'idle' ? '' : 'shadow-glow'}`}
                  />
                </Stack>
                <Stack gap={1.5}>
                  <Text as="label" htmlFor="inline-email" size="sm" weight="medium" color="text-dim">
                    Email Address <span className="text-brand-cyan">*</span>
                  </Text>
                  <Box
                    as="input"
                    id="inline-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    width="full"
                    background="surface-raised"
                    borderColor="line"
                    borderWidth={1}
                    radius="lg"
                    paddingX={4}
                    paddingY={3}
                    color="text-main"
                    className={`placeholder-text-dim focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all ${status === 'idle' ? '' : 'shadow-glow'}`}
                  />
                </Stack>
                <Button
                  type="submit"
                  variant="primary"
                  width="full"
                  disabled={status === 'loading'}
                  size="lg"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </Stack>

              {status === 'error' && (
                <Box
                  marginTop={3}
                  padding={2}
                  radius="md"
                  display="flex"
                  align="start"
                  gap={2}
                  aria-live="polite"
                  background="red-500/10"
                  color="red-400"
                  borderColor="red-500/20"
                  borderWidth={1}
                  className="text-xs"
                >
                  <Box paddingTop={0.5}><AlertCircle size={14} className="shrink-0" /></Box>
                  <Text size="xs">{message}</Text>
                </Box>
              )}
            </Stack>
          </form>
        )}
      </Box>
    );
  }

  // Popup variant
  return (
    <Box
      as="aside"
      position="fixed"
      bottom={4}
      left={4}
      right={4}
      marginX="auto"
      zIndex={50}
      maxWidth="sm"
      padding={4}
      radius="xl"
      border
      className="animate-in slide-in-from-bottom-5 fade-in duration-300 border-line bg-surface/95 backdrop-blur shadow-xl"
    >
      <Box position="absolute" top={2} right={2} zIndex={10}>
        <Box
          as="button"
          onClick={handleDismiss}
          padding={1.5}
          radius="full"
          color="text-dim"
          className="hover:text-text-main hover:bg-surface/80 transition-colors"
          aria-label="Dismiss newsletter signup"
        >
          <X size={16} />
        </Box>
      </Box>

      <Stack gap={4}>
        <Stack gap={1} paddingRight={6}>
          <Box display="flex" align="center" gap={2}>
            <Mail size={16} className="text-brand-cyan" />
            <Text as="h3" variant="heading" size="sm" weight="font-semibold">
              Join the Newsletter
            </Text>
          </Box>
          <Text variant="body" size="xs" className="text-text-dim">
            Updates on articles, research, and gear. No spam.
          </Text>
        </Stack>

        <Box as="form" onSubmit={handleSubmit} width="full" className="relative">
          <Stack gap={4}>
            <Stack gap={1.5}>
              <Text as="label" htmlFor="popup-name" size="sm" weight="medium" color="text-dim">
                First Name <span className="opacity-50 font-normal">(optional)</span>
              </Text>
              <Box
                as="input"
                id="popup-name"
                type="text"
                name="name"
                placeholder="e.g. Ariel"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                width="full"
                background="surface-raised"
                borderColor="line"
                borderWidth={1}
                radius="lg"
                paddingX={4}
                paddingY={3}
                color="text-main"
                className={`placeholder-text-dim focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all ${status === 'idle' ? '' : 'shadow-glow'}`}
              />
            </Stack>

            <Stack gap={1.5}>
              <Text as="label" htmlFor="popup-email" size="sm" weight="medium" color="text-dim">
                Email Address <span className="text-brand-cyan">*</span>
              </Text>
              <Box
                as="input"
                id="popup-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                width="full"
                background="surface-raised"
                borderColor="line"
                borderWidth={1}
                radius="lg"
                paddingX={4}
                paddingY={3}
                color="text-main"
                className={`placeholder-text-dim focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all ${status === 'idle' ? '' : 'shadow-glow'}`}
              />
            </Stack>

            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success' || !email}
              size="sm"
              className="w-full"
            >
              {status === 'loading' ? (
                <Box display="flex" align="center" gap={2}>
                  <Loader2 size={14} className="animate-spin" />
                  Subscribing...
                </Box>
              ) : status === 'success' ? (
                'Subscribed'
              ) : (
                'Subscribe'
              )}
            </Button>
          </Stack>

          {message && (
            <Box
              marginTop={3}
              padding={2}
              radius="md"
              display="flex"
              align="start"
              gap={2}
              aria-live="polite"
              className={`text-xs ${
                status === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {status === 'success' ? (
                <Box paddingTop={0.5}><CheckCircle2 size={14} className="shrink-0" /></Box>
              ) : (
                <Box paddingTop={0.5}><AlertCircle size={14} className="shrink-0" /></Box>
              )}
              <Text size="xs">{message}</Text>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
