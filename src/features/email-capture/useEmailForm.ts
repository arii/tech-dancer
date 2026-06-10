import { useState } from 'react';
import { useEmailStore } from './emailStore';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useEmailForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [email, setEmail] = useState('');
  const hideBar = useEmailStore((state) => state.hideBar);

  const submitForm = (emailToSubmit: string) => {
    if (!emailToSubmit) return;
    setStatus('loading');

    // Simulate API delay
    setTimeout(() => {
      setStatus('success');
      setEmail('');

      // Use the centralized dismissal logic from the store
      // Auto hide the bar after success delay
      setTimeout(() => {
        hideBar();
      }, 2000);
    }, 800);
  };

  return {
    status,
    email,
    setEmail,
    submitForm
  };
}
