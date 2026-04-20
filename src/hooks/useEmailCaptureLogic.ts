import { useState, useRef, useEffect, useCallback } from 'react';

export type FormStatus = 'idle' | 'loading' | 'success';

export function useEmailCaptureLogic() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [showEmailBar, setShowEmailBar] = useState(true);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  const submitForm = useCallback((email: string) => {
    // Basic validation could go here
    if (!email) return;

    setStatus('loading');

    // Clear any existing timers
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);

    loadingTimerRef.current = setTimeout(() => {
      setStatus('success');

      successTimerRef.current = setTimeout(() => {
        setShowEmailBar(false);
      }, 2000);
    }, 800);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  return {
    status,
    showEmailBar,
    submitForm,
    setShowEmailBar
  };
}
