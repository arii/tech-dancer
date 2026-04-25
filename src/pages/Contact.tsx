import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SuccessState } from '@/features/contact/components/SuccessState';
import { ContactFormView } from '@/features/contact/components/ContactFormView';
import { type ContactFormData } from '@/features/contact/schemas/contact-schema';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Personnel name required'),
  email: z.string().min(1, 'Signal destination required').email('Invalid signal coordinate'),
  subject: z.string().min(1, 'Subject required'),
  message: z.string().min(1, 'Data payload missing').min(10, 'Payload below minimum threshold (10 chars)'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
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
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setSubmitted(true);
      resetForm();
    } catch {
      setError('root', { message: 'System error: Unable to transmit payload. Please try again later.' });
    }
  };

  if (submitted) {
    return <SuccessState onReset={() => setSubmitted(false)} />;
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
