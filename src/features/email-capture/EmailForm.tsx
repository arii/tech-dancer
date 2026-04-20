import { useEffect } from 'react';
import { useState } from 'react';
import { Stack, Box, Text, Button } from '@/layouts/Primitives';
import { useEmailCaptureContext } from './EmailCaptureContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { inputs } from '@/styles/design-tokens';

export function EmailForm() {
  const { status, submitForm } = useEmailCaptureContext();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (status === 'success') {
      setEmail('');
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    submitForm(email);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md" className="w-full md:w-auto">
      <Stack direction={{ base: 'col', sm: 'row' }} gap={{ base: 2, sm: 0 }} position="relative" className="w-full">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          className={`${inputs.base} min-h-[44px] w-full`}
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          minWidth={180}
          className="min-h-[44px] w-full sm:w-auto"
        >
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <Stack
                as={motion.div}
                key="loading"
                direction="row"
                align="center"
                gap={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Box
                  as={motion.div}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4 text-bg" />
                </Box>
                <Text variant="mono" size="micro" weight="font-bold" color="bg">AUTHENTICATING...</Text>
              </Stack>
            ) : status === 'success' ? (
              <Stack
                as={motion.div}
                key="success"
                direction="row"
                align="center"
                gap={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check className="w-4 h-4 text-bg" />
                <Text variant="mono" size="micro" weight="font-bold" color="bg">ACCESS_GRANTED</Text>
              </Stack>
            ) : (
              <Box
                as={motion.div}
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ArrowRight className="w-4 h-4 text-bg" />
              </Box>
            )}
          </AnimatePresence>
        </Button>
      </Stack>
    </Box>
  );
}
