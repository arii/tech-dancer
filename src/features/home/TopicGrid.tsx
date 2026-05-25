// impeccable-ignore-file
import { Calendar, ShoppingBag, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';

const TOPICS = [
  { icon: Calendar, label: 'Event Guides', description: 'What to expect, what to pack, and how to get the most out of a WCS weekend.', cta: 'Explore guides →', href: '/events' },
  { icon: ShoppingBag, label: 'Gear Reviews', description: 'Practical gear for dancers: earplugs, steamers, shoes, bags, fans, and more.', cta: 'See reviews →', href: '/gear' },
  { icon: BookOpen, label: 'Training Notes', description: 'Dance concepts, practice systems, and competition prep without the jargon.', cta: 'Read notes →', href: '/blog' },
];

export function TopicGrid() {
  return <Box as="section"><Text as="h2" variant="headline" size="2xl" weight="font-black" marginBottom={6}>Explore by topic</Text><Grid cols={{ base: 1, md: 3 }} gap={4}>{TOPICS.map(({ icon: Icon, label, description, cta, href }) => <Stack key={label} as={NavLink} to={href} gap={4} padding={6} border radius="lg" className="group bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40"><Box padding={2} radius="md" className="w-fit bg-accent/10"><Icon className="h-5 w-5 text-accent" /></Box><Stack gap={1}><Text variant="body" size="lg" weight="font-bold" className="transition-colors group-hover:text-accent">{label}</Text><Text variant="body" size="sm" color="dim" leading="relaxed">{description}</Text></Stack>{/* impeccable-ignore */}
            <Text variant="mono" size="xs" color="accent" weight="font-bold" className="mt-auto">{cta}</Text></Stack>)}</Grid></Box>;
}
