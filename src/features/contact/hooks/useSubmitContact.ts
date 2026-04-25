import type { ContactFormData } from '../schemas/contact-schema';

export function useSubmitContact() {
  const submitContact = async (data: ContactFormData) => {
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
    } catch {
      const message = 'System error: Unable to transmit payload. Please try again later.';
      return { success: false, error: message };
    }
  };

  return { submitContact };
}
