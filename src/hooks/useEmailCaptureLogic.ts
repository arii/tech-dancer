import { useState, useEffect, useCallback } from 'react';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const STORAGE_KEY = 'td-newsletter-dismissed';
const BANNER_DELAY_MS = 30000; // 30s delay

export function useEmailCaptureLogic() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [showEmailBar, setShowEmailBar] = useState(false);
  const [email, setEmail] = useState('');

  const hideBar = useCallback(() => {
    sessionStorage.setItem('newsletter-dismissed', '1');
    setShowEmailBar(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }, []);

  const submitForm = useCallback((emailToSubmit: string) => {
    if (!emailToSubmit) return;
    setStatus('loading');

    // Simulate API delay
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }, 800);
  }, []);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setShowEmailBar(true);
    }, BANNER_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setShowEmailBar(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return {
    status,
    showEmailBar,
    email,
    setEmail,
    submitForm,
    setShowEmailBar,
    hideBar
  };
}
