import { Box, Text } from '@/layouts/Primitives';

const LINK_CLASS = 'text-brand-cyan hover:underline font-bold';

export const PolicyContactText = ({ intro }: { intro: string }) => (
  <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
    {intro}{' '}
    <Box as="a" href="mailto:anders.ariel@gmail.com" className={LINK_CLASS}>
      anders.ariel@gmail.com
    </Box>{' '}
    or official site support at{' '}
    <Box as="a" href="mailto:ari@boomtick.blog" className={LINK_CLASS}>
      ari@boomtick.blog
    </Box>
    .
  </Text>
);
