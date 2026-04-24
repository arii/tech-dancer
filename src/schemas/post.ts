import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().optional().default('Untitled'),
  date: z.string().optional().default(() => new Date().toISOString().split('T')[0]),
  author: z.string().optional().default('Ariel Anders, PhD'),
  category: z.string().optional().default('General'),
  excerpt: z.string().optional().default(''),
  image: z.string().optional().transform(val => val === "" ? undefined : val),
  tags: z.array(z.string()).optional().default([]),
  affiliateIds: z.array(z.string()).optional().default([]),
  slug: z.string().optional().default(''),
  content: z.string().optional().default(''),
});
