import { Event } from '@/lib/types/content';

export const createMockEvent = (overrides: Partial<Event> = {}): Event => ({
  type: 'event',
  slug: 'test-event',
  title: 'Test Convention',
  date: '2024-06-01',
  startDate: '2024-06-01',
  author: 'Test Author',
  category: 'WSDC Registry Event',
  excerpt: 'Test excerpt',
  location: 'Test Hotel',
  city: 'Test City',
  schedule: 'June 1-4, 2024',
  description: 'Test description',
  content: 'Test content',
  url: 'https://example.com/event',
  ...overrides,
});
