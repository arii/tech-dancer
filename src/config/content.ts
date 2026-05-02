export const CONTENT_CATEGORIES = [
  { id: 'Lifestyle', label: 'Lifestyle', description: 'Personal stories, travel, and routines.' },
  { id: 'Tech', label: 'Tech', description: 'Robotics, software engineering, and AI.' },
  { id: 'Gear', label: 'Gear', description: 'Hardware reviews and DIY modifications.' },
  { id: 'Travel', label: 'Travel', description: 'WCS event logistics and travel optimization hacks.' }
] as const;

export const SITE_METADATA = {
  title: 'BoomTick.blog',
  author: 'Ariel Anders, PhD',
  description: 'The West Coast Swing Lifestyle Blog',
  repo: {
    owner: 'arii',
    name: 'tech-dancer'
  }
};
