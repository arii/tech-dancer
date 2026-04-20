import React, { createContext, useContext, useState, ReactNode } from 'react';

type FormStatus = 'idle' | 'loading' | 'success';

interface EmailCaptureContextType {
  status: FormStatus;
  showEmailBar: boolean;
  submitForm: (email: string) => void;
  setShowEmailBar: (show: boolean) => void;
}

const EmailCaptureContext = createContext<EmailCaptureContextType | undefined>(undefined);

interface EmailCaptureProviderProps {
  children: ReactNode;
  status: FormStatus;
  showEmailBar: boolean;
  submitForm: (email: string) => void;
  setShowEmailBar: (show: boolean) => void;
}

export function EmailCaptureProvider({
  children,
  status,
  showEmailBar,
  submitForm,
  setShowEmailBar
}: EmailCaptureProviderProps) {
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
