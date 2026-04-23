import { useState } from 'react';
import { useEmailStore, STORAGE_KEY } from './emailStore';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useEmailForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [email, setEmail] = useState('');
  const setShowEmailBar = useEmailStore((state) => state.setShowEmailBar);

  const submitForm = (emailToSubmit: string) => {
    if (!emailToSubmit) return;
    setStatus('loading');

    // Simulate API delay
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      sessionStorage.setItem(STORAGE_KEY, 'true');

      // Auto hide the bar after success
      setTimeout(() => setShowEmailBar(false), 2000);
    }, 800);
  };

  return {
    status,
    email,
    setEmail,
    submitForm
  };
}
