import { create } from 'zustand';

interface EmailState {
  showEmailBar: boolean;
  setShowEmailBar: (show: boolean) => void;
  hideBar: () => void;
  initialize: () => void;
}

export const STORAGE_KEY = 'td-newsletter-dismissed';
const BANNER_DELAY_MS = 30000;

export const useEmailStore = create<EmailState>((set) => ({
  showEmailBar: false,
  setShowEmailBar: (show: boolean) => set({ showEmailBar: show }),
  hideBar: () => {
    set({ showEmailBar: false });
    sessionStorage.setItem(STORAGE_KEY, 'true');
  },
  initialize: () => {
    const isDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (isDismissed) return;

    setTimeout(() => {
      set({ showEmailBar: true });
    }, BANNER_DELAY_MS);
  }
}));
