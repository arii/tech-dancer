import React, { createContext, useContext, useState, ReactNode } from 'react';

type FormStatus = 'idle' | 'loading' | 'success';

interface EmailCaptureContextType {
  status: FormStatus;
  showEmailBar: boolean;
  submitForm: (email: string) => void;
  setShowEmailBar: (show: boolean) => void;
}

const EmailCaptureContext = createContext<EmailCaptureContextType | undefined>(undefined);

export function EmailCaptureProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [showEmailBar, setShowEmailBar] = useState(true);

  const [loadingTimer, setLoadingTimer] = useState<NodeJS.Timeout | null>(null);
  const [successTimer, setSuccessTimer] = useState<NodeJS.Timeout | null>(null);

  const submitForm = (email: string) => {
    console.log(`[SYSTEM_ACTION: CAPTURING_EMAIL] ${email}`);
    setStatus('loading');

    const lt = setTimeout(() => {
      setStatus('success');
      const st = setTimeout(() => setShowEmailBar(false), 2000);
      setSuccessTimer(st);
    }, 800);
    setLoadingTimer(lt);
  };

  React.useEffect(() => {
    return () => {
      if (loadingTimer) clearTimeout(loadingTimer);
      if (successTimer) clearTimeout(successTimer);
    };
  }, [loadingTimer, successTimer]);

  return (
    <EmailCaptureContext.Provider value={{ status, showEmailBar, submitForm, setShowEmailBar }}>
      {children}
    </EmailCaptureContext.Provider>
  );
}

export function useEmailCaptureContext() {
  const context = useContext(EmailCaptureContext);
  if (context === undefined) {
    throw new Error('useEmailCaptureContext must be used within an EmailCaptureProvider');
  }
  return context;
}
