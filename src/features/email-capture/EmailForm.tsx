import { Stack, Box, Text, Button } from '@/layouts/Primitives';
import { useEmailCapture } from './useEmailCapture';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { inputs } from '@/styles/design-tokens';

export function EmailForm() {
  const { email, setEmail, status, handleSubmit } = useEmailCapture();

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md">
      <Stack direction="row" gap={0} position="relative">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          className={inputs.base}
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          minWidth={60}
        >
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <Box
                as={motion.div}
                key="loading"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader2 className="w-4 h-4" />
              </Box>
            ) : status === 'success' ? (
              <Box
                as={motion.div}
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Check className="w-4 h-4" />
              </Box>
            ) : (
              <Box
                as={motion.div}
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ArrowRight className="w-4 h-4" />
              </Box>
            )}
          </AnimatePresence>
        </Button>
      </Stack>
      {status === 'success' && (
        <Text variant="micro" color="brand" marginTop={2} weight="font-bold">
          Thank you for joining.
        </Text>
      )}
    </Box>
  );
}
