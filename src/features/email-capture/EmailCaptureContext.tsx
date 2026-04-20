import React, { createContext, useContext, ReactNode } from 'react';
import { FormStatus } from '@/hooks/useEmailCaptureLogic';

interface EmailCaptureContextType {
  status: FormStatus;
  showEmailBar: boolean;
  email: string;
  setEmail: (email: string) => void;
  submitForm: (email: string) => void;
  setShowEmailBar: (show: boolean) => void;
}

const EmailCaptureContext = createContext<EmailCaptureContextType | undefined>(undefined);

interface EmailCaptureProviderProps extends EmailCaptureContextType {
  children: ReactNode;
}

export function EmailCaptureProvider({ children, ...value }: EmailCaptureProviderProps) {
  return (
    <EmailCaptureContext.Provider value={value}>
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
