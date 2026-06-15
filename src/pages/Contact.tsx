import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SuccessState } from '@/features/contact/components/SuccessState';
import { ContactFormView } from '@/features/contact/components/ContactFormView';
import { SEO } from '@/components/SEO';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().min(1, 'Email address required').email('Invalid email address'),
  subject: z.string().min(1, 'Subject required'),
  message: z.string().min(1, 'Message required').min(10, 'Message below minimum threshold (10 chars)'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const intent = searchParams.get('intent');
    const isSubscribePath = location.pathname === '/subscribe';

    if (intent === 'subscribe' || isSubscribePath) {
      // Small delay to ensure the DOM is fully ready
      const timer = setTimeout(() => {
        const section = document.getElementById('newsletter-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams, location.pathname]);

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
      const isTestOrDev = import.meta.env.DEV || import.meta.env.MODE === 'test' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      if (endpoint && !isTestOrDev) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Submission failed');
      } else {
        // Simulate form submission if no endpoint is configured or in dev/test/local envs
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSubmitted(true);
      resetForm();
    } catch {
      setError('root', { message: 'Something went wrong while sending your message. Please try again later.' });
    }
  };

  if (submitted) {
    return (
      <>
        <SEO
          title="Message Sent"
          description="Your message has been successfully received. We will respond shortly."
        />
        <SuccessState onReset={() => setSubmitted(false)} />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with tech-dancer. Send your feedback, inquiries, or collaboration proposals regarding West Coast Swing and robotics."
      />
      <ContactFormView
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
