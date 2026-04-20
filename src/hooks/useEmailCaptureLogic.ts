import { useState, useEffect, useCallback } from 'react';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useEmailCaptureLogic() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [showEmailBar, setShowEmailBar] = useState(true);
  const [email, setEmail] = useState('');

  const submitForm = useCallback((emailToSubmit: string) => {
    if (!emailToSubmit) return;
    setStatus('loading');

    // Simulate API delay
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
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
    setShowEmailBar
  };
}
