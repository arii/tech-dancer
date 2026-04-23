import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'General Feedback',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const validate = () => {
    const newErrors: ContactFormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Personnel name required';

    if (!formData.email.trim()) {
      newErrors.email = 'Signal destination required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid signal coordinate';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Data payload missing';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Payload below minimum threshold (10 chars)';
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field when changed
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const submit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Submission failed');
      } else {
        // Simulate form submission if no endpoint is configured
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Feedback', message: '' });
      return true;
    } catch (err) {
      setErrors({ message: 'System error: Unable to transmit payload. Please try again later.' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setErrors({});
  };

  return {
    formData,
    handleChange,
    errors,
    isSubmitting,
    submitted,
    submit,
    reset
  };
}
