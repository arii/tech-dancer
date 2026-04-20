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

  const submitForm = (email: string) => {
    // In a real app, you would send the email here.
    // For this simulation, we follow the requested timing logic.
    console.log(`[SYSTEM_ACTION: CAPTURING_EMAIL] ${email}`);
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setShowEmailBar(false), 2000);
    }, 800);
  };

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
