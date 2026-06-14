import { Event } from '@/lib/content';
import { BASE_URL, SITE_NAME } from '@/config/constants';

/**
 * Generates JSON-LD structured data for an Event.
 * Maps Event content to schema.org/Event format.
 */
export function getEventSchema(event: Event) {
  const eventUrl = `${BASE_URL}/events/${event.slug}`;

  // event.heroImage already contains ASSET_PREFIX if it was a relative path
  const imageUrl = event.heroImage
    ? (event.heroImage.startsWith('http') ? event.heroImage : `${BASE_URL}${event.heroImage}`)
    : undefined;

  // Split city and state (e.g., "Burlingame, CA")
  const parts = (event.city || '').split(',').map(s => s.trim());
  const locality = parts[0] || '';
  const region = parts[1];

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.whyAttending || event.description || event.excerpt,
    "image": imageUrl,
    "startDate": event.startDate || event.date,
    "url": eventUrl,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locality,
        "addressRegion": region,
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": BASE_URL
    }
  };
}
