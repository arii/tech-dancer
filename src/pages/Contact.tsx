import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SuccessState } from '@/features/contact/components/SuccessState';
import { ContactFormView } from '@/features/contact/components/ContactFormView';
import { contactSchema, type ContactFormData } from '@/features/contact/schemas/contact-schema';

/**
 * Contact Page Container
 * Follows separation of concerns by keeping orchestration logic here
 * and presentation logic in the feature components.
 * Now using react-hook-form and zod for type-safe validation.
 */
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: 'General Feedback',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
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

      setSubmitted(true);
      reset();
    } catch (err) {
      setError('message', {
        type: 'manual',
        message: 'System error: Unable to transmit payload. Please try again later.',
      });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    reset();
  };

  if (submitted) {
    return <SuccessState onReset={handleReset} />;
  }

  return (
    <ContactFormView
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
