import { useState, FormEvent, useEffect } from 'react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { AlertCircle, CheckCircle2, Loader2, Mail } from 'lucide-react';

const MailingListSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Delayed appearance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 second delay before showing

    return () => clearTimeout(timer);
  }, []);

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

  if (!isVisible) return null;

  return (
    <Box
      as="section"
      maxWidth="3xl"
      marginX="auto"
      paddingX={4}
      marginTop={{ base: 16, lg: 24 }}
      paddingTop={{ base: 12, lg: 16 }}
      paddingBottom={{ base: 12, lg: 16 }}
      border="t"
      className="border-line/80"
    >
      <Stack gap={6} align="center" className="text-center">
        <Box
          padding={3}
          radius="full"
          className="bg-brand-cyan/10 text-brand-cyan"
        >
          <Mail size={24} />
        </Box>

        <Stack gap={2}>
          <Text as="h3" variant="heading" size="xl">
            Join the Newsletter
          </Text>
          <Text variant="body" className="text-text-dim max-w-md mx-auto">
            Get occasional updates on new articles, research, and gear reviews. No spam, ever.
          </Text>
        </Stack>

        <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md" className="relative mt-4">
          <Stack gap={4}>
            <input
              type="text"
              name="name"
              placeholder="First Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-4 py-3 bg-surface/50 border border-line rounded-lg focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 disabled:opacity-50 text-text-main transition-colors"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-4 py-3 bg-surface/50 border border-line rounded-lg focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 disabled:opacity-50 text-text-main transition-colors"
            />

            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success' || !email}
              className="w-full py-3"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Subscribing...
                </>
              ) : status === 'success' ? (
                'Subscribed'
              ) : (
                'Subscribe'
              )}
            </Button>
          </Stack>

          {message && (
            <Box
              marginTop={4}
              padding={3}
              radius="md"
              className={`flex items-start gap-2 text-sm ${
                status === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
              )}
              <Text>{message}</Text>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default MailingListSignup;
