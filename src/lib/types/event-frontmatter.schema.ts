import { z } from 'zod';

/**
 * Zod schema for Event Theme validation.
 */
export const EventThemeSchema = z.object({
  name: z.string(),
  label: z.string().optional(),
  description: z.string().optional(),
  colors: z.array(z.string()).optional(),
  outfitIds: z.array(z.string()).optional(),
  accessoryIds: z.array(z.string()).optional(),
});

/**
 * Zod schema for Event Gear validation.
 */
export const EventGearSchema = z.object({
  outfitIds: z.array(z.string()).optional(),
  outfitDescription: z.string().optional(),
  accessoryIds: z.array(z.string()).optional(),
  accessoryDescription: z.string().optional(),
  shoeIds: z.array(z.string()).optional(),
  shoeDescription: z.string().optional(),
  essentialIds: z.array(z.string()).optional(),
  essentialDescription: z.string().optional(),
  travelIds: z.array(z.string()).optional(),
  travelDescription: z.string().optional(),
});

/**
 * Zod schema for Event Guide frontmatter validation.
 */
export const EventFrontmatterSchema = z.object({
  type: z.literal('event'),
  draft: z.boolean().optional(),
  title: z.string(),
  date: z.string(),
  startDate: z.string().optional(),
  author: z.string(),
  category: z.string(),
  excerpt: z.string(),
  location: z.string(),
  city: z.string(),
  region: z.enum(['NorCal', 'SoCal', 'Southwest', 'Pacific Northwest', 'South', 'International', 'Other']).optional(),
  schedule: z.string(),
  url: z.string().optional(),
  heroImage: z.string().optional(),
  description: z.string(),
  whyAttending: z.string().optional(),
  theme: EventThemeSchema.optional(),
  gear: EventGearSchema.optional(),
  earlyBirdDate: z.string().optional(),
  registrationDeadline: z.string().optional(),
  hotelCutoffDate: z.string().optional(),
  packingReminderDate: z.string().optional(),
  relatedEvents: z.array(z.string()).optional(),
});
