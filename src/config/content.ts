export const CONTENT_CATEGORIES = [
  { id: 'Tech', label: 'Tech', description: 'Robotics, software engineering, and AI.' },
  { id: 'Travel', label: 'Travel', description: 'WCS event logistics and travel optimization hacks.' },
  { id: 'Dance Research', label: 'Dance Research', description: 'Objective analysis of WCS competition data and trends.' },
  { id: 'Gear Reviews', label: 'Gear Reviews', description: 'Hardware reviews and DIY modifications for dancers.' },
  { id: 'Travel/Lifestyle', label: 'Travel/Lifestyle', description: 'Personal stories, travel, and financial strategies for dancers.' },
  { id: 'Data & Dev Lab', label: 'Data & Dev Lab', description: 'Technical deep-dives and data science for West Coast Swing.' }
] as const;

export const SITE_METADATA = {
  title: 'boomtick.blog',
  author: 'Ariel Anders',
  description: 'The West Coast Swing Lifestyle Blog',
  repo: {
    owner: 'arii',
    name: 'tech-dancer'
  }
};
