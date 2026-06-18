import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';

export function HeroBanner() {
  return (
    <Stack as="section" align="center" gap={6} paddingY={{ base: 8, lg: 12 }} width="full">
      <Text
        as="h1"
        variant="hero"
        size={{ base: "4xl", md: "6xl", lg: "7xl" }}
        align="center"
        className="hero-headline-anim"
      >
        Code by day.<br />
        <span className="text-accent">Dance by night.</span>
      </Text>

      <Stack direction={{ base: 'col', sm: 'row' }} gap={4} align="center">
        <Button as={NavLink} to="/research" variant="primary" size="lg">
          Explore Research
        </Button>
        <Button as={NavLink} to="/blog" variant="outline" size="lg">
          Read Articles
        </Button>
        <Button as={NavLink} to="/merch" variant="ghost" size="lg">
          Browse Systems
        </Button>
      </Stack>
    </Stack>
  );
}
