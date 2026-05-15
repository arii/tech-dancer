import { Event } from '@/lib/content';

/**
 * Generates Schema.org structured data for an event.
 */
export function getEventSchema(event: Event) {
  const [city, state] = (event.city || '').split(',').map(s => s.trim());

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description || event.excerpt,
    startDate: event.startDate || event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressRegion: state,
      },
    },
    url: event.url || event.link,
    organizer: {
      '@type': 'Organization',
      name: 'BoomTick.blog',
    },
    image: event.heroImage,
  };
}
