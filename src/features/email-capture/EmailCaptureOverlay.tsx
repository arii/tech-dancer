import { AnimatePresence } from 'motion/react';
import { EmailCaptureBar } from './EmailCaptureBar';
import { useEmailCaptureContext } from './EmailCaptureContext';

export function EmailCaptureOverlay() {
  const { showEmailBar } = useEmailCaptureContext();

  return (
    <AnimatePresence>
      {showEmailBar && <EmailCaptureBar />}
    </AnimatePresence>
  );
}
