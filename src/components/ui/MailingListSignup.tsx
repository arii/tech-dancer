import React, { useState, FormEvent } from 'react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { AlertCircle, Mail, CheckCircle } from 'lucide-react';

export default function MailingListSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const DEPLOYMENT_ID = import.meta.env.VITE_MAILING_LIST_DEPLOYMENT_ID;

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
              <CheckCircle size={32} />
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
                  <Mail size={24} />
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
                    First Name <Text as="span" opacity={50} weight="normal">(optional)</Text>
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
                    outline="none"
                    transition="all"
                    style={{
                      '--tw-ring-color': 'var(--color-brand-cyan)',
                      boxShadow: status === 'idle' ? 'none' : '0 0 15px rgba(0, 240, 255, 0.3)'
                    } as React.CSSProperties}
                  />
                </Stack>
                <Stack gap={1.5}>
                  <Text as="label" htmlFor="inline-email" size="sm" weight="medium" color="text-dim">
                    Email Address <Text as="span" color="brand-cyan">*</Text>
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
                    outline="none"
                    transition="all"
                    style={{
                      '--tw-ring-color': 'var(--color-brand-cyan)',
                      boxShadow: status === 'idle' ? 'none' : '0 0 15px rgba(0, 240, 255, 0.3)'
                    } as React.CSSProperties}
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
                >
                  <Box paddingTop={0.5} flexShrink={0}><AlertCircle size={14} /></Box>
                  <Text size="xs">{message}</Text>
                </Box>
              )}
            </Stack>
          </form>
        )}
    </Box>
  );
}
