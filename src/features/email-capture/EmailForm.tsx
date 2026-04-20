import { Stack, Box, Text, Button } from '@/layouts/Primitives';
import { useEmailCaptureContext } from './EmailCaptureContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { inputs } from '@/styles/design-tokens';

export function EmailForm() {
  const { status, submitForm, email, setEmail } = useEmailCaptureContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          className="min-h-[44px] w-full sm:w-auto min-w-[140px] sm:min-w-[180px] px-6"
        >
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <motion.div
                key="loading"
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4 text-bg" />
                </motion.div>
                <Text variant="mono" size="micro" weight="font-bold" color="bg">AUTHENTICATING...</Text>
              </motion.div>
            ) : status === 'success' ? (
              <motion.div
                key="success"
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check className="w-4 h-4 text-bg" />
                <Text variant="mono" size="micro" weight="font-bold" color="bg">ACCESS_GRANTED</Text>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ArrowRight className="w-4 h-4 text-bg" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </Stack>
    </Box>
  );
}
