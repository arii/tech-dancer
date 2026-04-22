export const CONTENT_CATEGORIES = [
  { id: 'Lifestyle', label: 'Lifestyle', description: 'Personal stories, travel, and routines.' },
  { id: 'Tech', label: 'Tech', description: 'Robotics, software engineering, and AI.' },
  { id: 'Gear', label: 'Gear', description: 'Hardware reviews and DIY modifications.' },
  { id: 'Travel', label: 'Travel', description: 'WCS event logistics and travel optimization hacks.' }
] as const;

type CategoryId = typeof CONTENT_CATEGORIES[number]['id'];
export type { CategoryId };

export const SITE_METADATA = {
  title: 'Tech-Dancer',
  author: 'Ariel Anders, PhD',
  description: 'The Roboticist\'s Guide to the West Coast Swing',
  repo: {
    owner: 'arii',
    name: 'tech-dancer'
  }
};
