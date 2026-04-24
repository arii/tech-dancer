import { Stack, Box, Text, Button } from '@/layouts/Primitives';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { inputs } from '@/styles/design-tokens';
import { motionTokens } from '@/styles/motion';
import { useEmailForm } from './useEmailForm';

export function EmailForm() {
  const { status, email, setEmail, submitForm } = useEmailForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm(email);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md" className="w-full md:w-auto">
      <Stack direction="row" gap={0} position="relative" className="w-full">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          className={`${inputs.base} min-h-12 w-full`}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading' || status === 'success'}
          minHeight={12}
          width="auto"
          minWidth={{ base: 36, sm: 44 }}
          paddingX={6}
        >
          <AnimatePresence mode="wait">
            <Box
              as={motion.div}
              key={status}
              initial={motionTokens.fade.initial}
              animate={motionTokens.fade.animate}
              exit={motionTokens.fade.exit}
              transition={motionTokens.fade.transition}
              display="flex"
              align="center"
              justify="center"
              gap={2}
            >
              {status === 'loading' && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-bg" />
                  <Text variant="mono" size="micro" weight="font-bold" color="bg">AUTHENTICATING...</Text>
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
            </Box>
          </AnimatePresence>
        </Button>
      </Stack>
    </Box>
  );
}
