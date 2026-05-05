import { Stack, Box, Text, Button } from '@/layouts/Primitives';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { inputs } from '@/styles/design-tokens';
import { useEmailForm } from './useEmailForm';

export function EmailForm() {
  const { status, email, setEmail, submitForm } = useEmailForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      submitForm(email);
    } else {
      e.currentTarget.reportValidity();
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} noValidate width={{ base: "full", md: "auto" }} maxWidth="md">
      <Stack direction="row" gap={0} position="relative" width="full">
        <Box
          as="input"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          className={inputs.base}
          minHeight={11}
          width="full"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading' || status === 'success'}
          minHeight={11}
          width="auto"
          minWidth={{ base: 36, sm: 44 }}
          paddingX={6}
          className="bg-accent-navy hover:bg-accent-navy/90 text-bg"
        >
          <AnimatePresence mode="wait">
            <Stack
              as={motion.div}
              key={status}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              direction="row"
              align="center"
              justify="center"
              gap={2}
            >
              {status === 'loading' && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-bg" />
                  <Text variant="mono" size="micro" weight="font-bold" color="bg">PROCESSING...</Text>
                </>
              )}
              {status === 'success' && (
                <>
                  <Check className="w-4 h-4 text-bg" />
                  <Text variant="mono" size="micro" weight="font-bold" color="bg">ACCESS_GRANTED</Text>
                </>
              )}
              {status === 'idle' && (
                <>
                  <Text variant="mono" size="micro" weight="font-bold" color="bg">SUBSCRIBE</Text>
                  <ArrowRight className="w-4 h-4 text-bg" />
                </>
              )}
            </Stack>
          </AnimatePresence>
        </Button>
      </Stack>
    </Box>
  );
}
