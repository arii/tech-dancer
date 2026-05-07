import { create } from 'zustand';

interface EmailState {
  showEmailBar: boolean;
  setShowEmailBar: (show: boolean) => void;
  hideBar: () => void;
}

export const STORAGE_KEY = 'td-newsletter-dismissed';

export const useEmailStore = create<EmailState>((set) => ({
  showEmailBar: false,
  setShowEmailBar: (show: boolean) => set({ showEmailBar: show }),
  hideBar: () => {
    set({ showEmailBar: false });
    sessionStorage.setItem(STORAGE_KEY, 'true');
  },
}));
