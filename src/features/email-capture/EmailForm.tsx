import { Stack, Box, Text } from '@/layouts/Primitives';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { ActionButton } from '@/components/ui/ActionButton';
import { inputs } from '@/styles/design-tokens';
import { useEmailForm } from './useEmailForm';

export function EmailForm() {
  const { status, submitForm } = useEmailForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const emailValue = new FormData(form).get('email') as string;
      if (emailValue) submitForm(emailValue);
    } else {
      form.reportValidity();
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} noValidate width={{ base: "full", md: "auto" }} maxWidth="md">
      <Stack direction="row" gap={0} position="relative" width="full">
        <Box
          as="input"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          disabled={status === 'loading' || status === 'success'}
          className={inputs.base}
          minHeight={11}
          width="full"
        />
        <ActionButton
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          minHeight={11}
          width="auto"
          minWidth={{ base: 36, sm: 44 }}
          paddingX={6}
          radius="none"
          className="border-l border-accent/20"
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
        </ActionButton>
      </Stack>
    </Box>
  );
}
