import { useState } from 'react';
import type { ContactFormData } from '../schemas/contact-schema';

export function useSubmitContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitContact = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Submission failed');
      } else {
        // Simulate form submission if no endpoint is configured
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      return { success: true };
    } catch (err) {
      const message = 'System error: Unable to transmit payload. Please try again later.';
      setSubmitError(message);
      return { success: false, error: message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitContact,
    isSubmitting,
    submitError,
    clearError: () => setSubmitError(null)
  };
}
