// impeccable-ignore-file
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CtaBanner = () => {
  return (
    <Box
      surface="base"
      padding={8}
      radius="xl"
      border="all"
      borderColor="line"
      className="relative overflow-hidden"
    >
      <Stack
        direction={{ base: 'col', md: 'row' }}
        justify="between"
        align={{ base: 'start', md: 'center' }}
        gap={6}
        className="relative z-10"
      >
        <Stack gap={2} maxWidth="2xl">
          <Text as="h3" size="2xl" weight="bold" color="primary" className="text-balance">
            Ready to upgrade your digital presence?
          </Text>
          <Text color="dim" size="lg">
            Let's discuss how we can build a system that works as hard as you do.
          </Text>
        </Stack>

        <Stack
          as={Link}
          to="/about#contact"
          direction="row"
          display="inline-flex"
          align="center"
          gap={2}
          surface="alt"
          paddingX={6}
          paddingY={3}
          radius="md"
          className="hover:bg-accent/10 transition-colors whitespace-nowrap"
        >
          <Text weight="semibold">Get in Touch</Text>
          <ArrowRight className="w-4 h-4" />
        </Stack>
      </Stack>
    </Box>
  );
};
