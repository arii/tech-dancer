export const CONTENT_CATEGORIES = [
  { id: 'Lifestyle', label: 'Lifestyle', description: 'Personal stories, travel, and routines.' },
  { id: 'Tech', label: 'Tech', description: 'Robotics, software engineering, and AI.' },
  { id: 'Gear', label: 'Gear', description: 'Hardware reviews and DIY modifications.' },
  { id: 'Travel', label: 'Travel', description: 'WCS event logistics and travel optimization hacks.' }
] as const;

export type CategoryId = typeof CONTENT_CATEGORIES[number]['id'];

export const CATEGORY_GRADIENTS: Record<string, string> = {
  'Data & Dev Lab': 'from-[#1A2B3C] to-[#185FA5]',
  'Tech': 'from-[#1A2B3C] to-[#185FA5]',
  'All about WCS':  'from-[#1A2B3C] to-[#3B6D11]',
  'Travel/Lifestyle': 'from-[#993C1D] to-[#BA7517]',
  'Lifestyle': 'from-[#993C1D] to-[#BA7517]',
  'Gear Reviews':   'from-[#534AB7] to-[#1D9E75]',
  'Gear': 'from-[#534AB7] to-[#1D9E75]',
  'Dance Gear': 'from-[#534AB7] to-[#1D9E75]',
  'General': 'from-[#1A2B3C] to-[#185FA5]',
};

export const SITE_METADATA = {
  title: 'Tech-Dancer',
  author: 'Ariel Anders, PhD',
  description: 'The Roboticist\'s Guide to the West Coast Swing',
  repo: {
    owner: 'arii',
    name: 'tech-dancer'
  }
};
