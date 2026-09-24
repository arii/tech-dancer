import { useEffect, useState, useCallback } from 'react';
import {
  isOptOutSignalActive,
  isGpcActive,
  isDntActive,
  getStoredConsent,
  setStoredConsent,
  isTrackingAllowed,
  applyGa4DisableFlag,
  ConsentState,
} from '@/lib/privacyConsent';

export function usePrivacyConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => getStoredConsent());

  const hasOptOutSignal = isOptOutSignalActive();
  const gpcActive = isGpcActive();
  const dntActive = isDntActive();

  const [isBannerOpen, setIsBannerOpen] = useState<boolean>(() => !getStoredConsent() && !hasOptOutSignal);

  useEffect(() => {
    applyGa4DisableFlag();

    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ consent: ConsentState }>;
      setConsent(customEvent.detail.consent);
    };

    window.addEventListener('boomtick_privacy_consent_changed', handleConsentChange);
    return () => {
      window.removeEventListener('boomtick_privacy_consent_changed', handleConsentChange);
    };
  }, [hasOptOutSignal]);

  const grantConsent = useCallback(() => {
    setStoredConsent('granted');
    setConsent('granted');
    setIsBannerOpen(false);
  }, []);

  const denyConsent = useCallback(() => {
    setStoredConsent('denied');
    setConsent('denied');
    setIsBannerOpen(false);
  }, []);

  const openBanner = useCallback(() => {
    setIsBannerOpen(true);
  }, []);

  const closeBanner = useCallback(() => {
    setIsBannerOpen(false);
  }, []);

  return {
    consent,
    isBannerOpen,
    hasOptOutSignal,
    gpcActive,
    dntActive,
    trackingAllowed: isTrackingAllowed(),
    grantConsent,
    denyConsent,
    openBanner,
    closeBanner,
  };
}
