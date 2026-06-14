import { create } from 'zustand';

const STORAGE_KEY = 'td-newsletter-dismissed';

interface EmailState {
  showEmailBar: boolean;
  setShowEmailBar: (show: boolean) => void;
  hideBar: () => void;
}

const getInitialShowState = () => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEY) !== 'true';
};

export const useEmailStore = create<EmailState>((set) => ({
  showEmailBar: getInitialShowState(),
  setShowEmailBar: (show: boolean) => set({ showEmailBar: show }),
  hideBar: () => {
    set({ showEmailBar: false });
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
  },
}));
