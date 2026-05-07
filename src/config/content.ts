export const CONTENT_CATEGORIES = [
  { id: 'Lifestyle', label: 'Lifestyle', description: 'Personal stories, travel, and routines.' },
  { id: 'Tech', label: 'Tech', description: 'Robotics, software engineering, and AI.' },
  { id: 'Gear', label: 'Gear', description: 'Hardware reviews and DIY modifications.' },
  { id: 'Travel', label: 'Travel', description: 'WCS event logistics and travel optimization hacks.' }
] as const;

export const GEAR_FILTERS = [
  { label: "Best for travel", value: "Best for travel", color: "text-accent border-accent/30 bg-accent/10" },
  { label: "Highly recommended", value: "Highly recommended", color: "text-accent-navy border-accent-navy/30 bg-accent-navy/10" },
  { label: "Competition ready", value: "Competition ready", color: "text-error border-error/30 bg-error/10" }
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
