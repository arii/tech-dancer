import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SuccessState } from '@/features/contact/components/SuccessState';
import { ContactFormView } from '@/features/contact/components/ContactFormView';
import { contactSchema, type ContactFormData } from '@/features/contact/schemas/contact-schema';
import { useSubmitContact } from '@/features/contact/hooks/useSubmitContact';

/**
 * Contact Page Container
 * Follows separation of concerns by keeping orchestration logic here
 * and presentation logic in the feature components.
 * Now using react-hook-form and zod for type-safe validation.
 */
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { submitContact } = useSubmitContact();

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
    const result = await submitContact(data);
    if (result.success) {
      setSubmitted(true);
      reset();
    } else if (result.error) {
      setError('message', {
        type: 'manual',
        message: result.error,
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
