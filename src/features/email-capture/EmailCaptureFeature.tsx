import { AnimatePresence } from 'motion/react';
import { EmailCaptureProvider } from './EmailCaptureContext';
import { EmailCaptureBar } from './EmailCaptureBar';
import { useEmailCaptureLogic } from '@/hooks/useEmailCaptureLogic';

export function EmailCaptureFeature() {
  const logic = useEmailCaptureLogic();

  return (
    <EmailCaptureProvider {...logic}>
      <AnimatePresence>
        {logic.showEmailBar && <EmailCaptureBar />}
      </AnimatePresence>
    </EmailCaptureProvider>
  );
}
