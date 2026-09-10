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

  // Delayed appearance effect for popup variant
  useEffect(() => {
    if (variant === 'inline') {
      setIsVisible(true);
      return;
    }

    // Only show if not previously dismissed
    const hasDismissed = sessionStorage.getItem('ariel_profile_mailing_list_dismissed');
    if (hasDismissed === 'true') return;

    const timer = setTimeout(() => {
      setIsDismissed(false);
      setIsVisible(true);
    }, 2000); // 2 second delay before showing

    return () => clearTimeout(timer);
  }, [variant]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const DEPLOYMENT_ID = import.meta.env.VITE_MAILING_LIST_DEPLOYMENT_ID;

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

  if (!isVisible || isDismissed) return null;

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
            <Box background="emerald-500/10" padding={4} radius="full" display="inline-flex">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
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
                <Box background="sky-500/10" padding={3} radius="full" display="inline-flex">
                  <Mail className="w-6 h-6 text-sky-400" />
                </Box>
                <Text as="h3" weight="bold" size="xl" color="white" align="center">
                  Join the Newsletter
                </Text>
                <Text size="sm" color="slate-400" align="center">
                  Updates on articles, research, and gear. No spam.
                </Text>
              </Stack>

              <Stack gap={4}>
                <Box
                  as="input"
                  type="text"
                  name="name"
                  placeholder="First Name (optional)"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  disabled={status === 'loading'}
                  width="full"
                  background="slate-950"
                  borderColor="slate-800"
                  borderWidth={1}
                  radius="lg"
                  padding={3}
                  color="white"
                  className="placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <Box
                  as="input"
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  width="full"
                  background="slate-950"
                  borderColor="slate-800"
                  borderWidth={1}
                  radius="lg"
                  padding={3}
                  color="white"
                  className="placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
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
                  className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs"
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
      left="1/2"
      zIndex={50}
      maxWidth="sm"
      width="full"
      padding={4}
      radius="xl"
      border
      className="animate-in slide-in-from-bottom-5 fade-in duration-300 border-line bg-surface/95 backdrop-blur shadow-xl -translate-x-1/2 w-[calc(100%-2rem)] md:w-full"
    >
      <Box position="absolute" top={2} right={2}>
        <Box
          as="button"
          onClick={handleDismiss}
          padding={1.5}
          radius="full"
          className="text-text-dim hover:text-text-main hover:bg-surface/80 transition-colors"
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
          <Stack gap={3}>
            <Box
              as="input"
              type="text"
              name="name"
              placeholder="First Name (optional)"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              paddingX={3}
              paddingY={2}
              radius="md"
              border
              className="w-full text-sm bg-surface/50 border-line focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 disabled:opacity-50 text-text-main transition-colors"
            />

            <Box
              as="input"
              type="email"
              name="email"
              placeholder="Email Address *"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              paddingX={3}
              paddingY={2}
              radius="md"
              border
              className="w-full text-sm bg-surface/50 border-line focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 disabled:opacity-50 text-text-main transition-colors"
            />

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
