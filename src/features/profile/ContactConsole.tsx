import React from 'react';
import { useContactForm } from '@/hooks/use-contact-form';
import { ContactForm } from './components/ContactForm';
import { ContactSuccess } from './components/ContactSuccess';

export default function ContactConsole() {
  const { 
    formData, 
    handleChange, 
    errors, 
    isSubmitting, 
    submitted, 
    submit, 
    reset 
  } = useContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return submitted ? (
    <ContactSuccess onReset={reset} />
  ) : (
    <ContactForm 
      formData={formData} 
      errors={errors} 
      isSubmitting={isSubmitting} 
      onChange={handleChange} 
      onSubmit={handleSubmit} 
    />
  );
}
