import type { FormEvent } from 'react';
import { useContactForm } from '@/hooks/use-contact-form';
import { SuccessState } from '@/features/contact/components/SuccessState';
import { ContactFormView } from '@/features/contact/components/ContactFormView';

/**
 * Contact Page Container
 * Follows separation of concerns by keeping orchestration logic here
 * and presentation logic in the feature components.
 */
export default function Contact() {
  const {
    formData,
    handleChange,
    errors,
    isSubmitting,
    submitted,
    submit,
    reset
  } = useContactForm();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  if (submitted) {
    return <SuccessState onReset={reset} />;
  }

  return (
    <ContactFormView
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
