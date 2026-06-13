import { Calendar, Compass, RefreshCw, ClipboardCheck, Zap, CalendarDays } from 'lucide-react';

export const JOURNEY_STEPS = [
  {
    title: '1. BEFORE THE EVENT',
    icon: Calendar,
    items: [
      { label: 'WCS Travel Pack', slug: '2026-04-19-gear-essentials', type: 'blog' },
      { label: 'Packing Checklist', slug: '2024-06-01-compression-cubes', type: 'gear' },
      { label: 'Flight Planning', slug: '2024-06-01-travel-bottles', type: 'gear' },
      { label: 'Hotel Strategy', slug: '2026-04-18-financial-literacy-dancers', type: 'blog' },
    ]
  },
  {
    title: '2. DURING THE EVENT',
    icon: Compass,
    items: [
      { label: 'Social Dance Etiquette', slug: '2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing', type: 'blog' },
      { label: 'Competition Strategy', slug: '2026-04-18-competition-metrics', type: 'blog' },
      { label: 'Recovery Between Nights', slug: '2024-06-01-foam-roller', type: 'gear' },
      { label: 'Food & Hydration', slug: '2024-06-01-sunscreen', type: 'gear' },
    ]
  },
  {
    title: '3. AFTER THE EVENT',
    icon: RefreshCw,
    items: [
      { label: 'Video Review Process', slug: '2026-04-18-why-finals-are-hard', type: 'blog' },
      { label: 'Networking Follow-Up', slug: '2026-04-18-github-actions', type: 'blog' },
      { label: 'Practice Planning', slug: '2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing', type: 'blog' },
    ]
  }
];

export const TOOLS = [
  {
    title: 'Packing Checklist',
    description: 'Everything needed for a WCS weekend.',
    icon: ClipboardCheck,
    cta: 'Open Checklist',
    href: '/gear/2024-06-01-compression-cubes',
    label: 'Travel Resource'
  },
  {
    title: 'Shoe Preparation',
    description: 'Make Any Shoe a Dance Shoe',
    icon: Zap,
    cta: 'Read Guide',
    href: '/blog/2026-04-18-make-shoe-dance',
    label: 'Gear Resource'
  },
  {
    title: 'Event Calendar',
    description: 'Upcoming Events',
    icon: CalendarDays,
    cta: 'View Events',
    href: '/events',
    label: 'Planning Tool'
  }
];
