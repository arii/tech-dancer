import { useState, FormEvent, ChangeEvent } from 'react';
import { Stack, Box, Text, Button } from '@/layouts/Primitives';
import { useEmailCaptureContext } from './EmailCaptureContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check, AlertCircle } from 'lucide-react';
import { inputs } from '@/styles/design-tokens';

export function EmailForm() {
  const { status, submitForm, email, setEmail } = useEmailCaptureContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm(email);
  };

  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md" className="w-full md:w-auto group">
      <Stack direction="row" gap={0} position="relative" className="w-full">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
          required
          disabled={status === 'loading' || status === 'success'}
          className={`${inputs.base} min-h-[44px] w-full ${!isValid ? inputs.error : ''}`}
        />
        {!isValid && email && (
          <Stack direction="row" align="center" gap={1} position="absolute" className="-bottom-6 left-0 text-red-500">
             <AlertCircle className="w-3 h-3" />
             <Text variant="mono" size="micro">INVALID_ENCODING</Text>
          </Stack>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading' || status === 'success'}
          className="min-h-[44px] w-auto min-w-[140px] sm:min-w-[180px] px-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-2"
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
            </motion.div>
          </AnimatePresence>
        </Button>
      </Stack>
    </Box>
  );
}
