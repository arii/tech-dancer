export const CONTENT_CATEGORIES = [
  { id: 'Lifestyle', label: 'Lifestyle', description: 'Personal stories, travel, and routines.' },
  { id: 'Tech', label: 'Tech', description: 'Robotics, software engineering, and AI.' },
  { id: 'Gear', label: 'Gear', description: 'Hardware reviews and DIY modifications.' }
] as const;

export const SITE_METADATA = {
  title: 'Tech-Dancer',
  author: 'Ariel Anders, PhD',
  description: 'The Roboticist\'s Guide to the West Coast Swing',
  repo: {
    owner: 'arii',
    name: 'tech-dancer'
  }
};
