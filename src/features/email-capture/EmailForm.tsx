import { Stack, Box, Text, Button, Motion, Icon, Input } from '@/components/layout/Primitives';
import { useEmailCapture } from './useEmailCapture';
import { AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';

export function EmailForm() {
  const { email, setEmail, status, handleSubmit } = useEmailCapture();

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md">
      <Stack direction="row" gap={0} position="relative">
        <Input
          type="email"
          placeholder="ENTER_EMAIL_FOR_LOGS"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          flex="full"
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          minWidth={60}
          radius="none"
        >
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <Motion
                key="loading"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon icon={Loader2} size="sm" />
              </Motion>
            ) : status === 'success' ? (
              <Motion
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon icon={Check} size="md" />
              </Motion>
            ) : (
              <Motion
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon icon={ArrowRight} size="sm" />
              </Motion>
            )}
          </AnimatePresence>
        </Button>
      </Stack>
      {status === 'success' && (
        <Text variant="micro" color="brand" marginTop="xs" weight="font-bold">
          SYSTEM: TRANSMISSION_RECEIVED // WELCOME_TO_THE_REGISTRY
        </Text>
      )}
    </Box>
  );
}
