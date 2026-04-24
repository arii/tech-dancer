import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Personnel name required'),
  email: z.string().min(1, 'Signal destination required').email('Invalid signal coordinate'),
  subject: z.string().min(1, 'Subject is required'),
  message: z
    .string()
    .min(1, 'Data payload missing')
    .min(10, 'Payload below minimum threshold (10 chars)'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
