// impeccable-ignore-file
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Sparkles } from 'lucide-react';

export const ServicesHero = () => {
  return (
    <Grid cols={{ base: 1, lg: 12 }} gap={12} align="start">
      <Stack gap={6} span={{ lg: 8 }}>
        <Text as="h4" color="accent" weight="semibold" tracking="widest" size="sm" className="uppercase">
          Services
        </Text>
        <Text as="h1" size={{ base: '4xl', md: '5xl' }} weight="bold" tracking="tight" className="leading-tight text-main">
          Digital business systems for independent creatives
        </Text>
        <Text as="p" size="xl" color="dim" maxWidth="2xl">
          We build and manage the digital side of your business—from your website and online booking to marketing, ecommerce, and automation.
        </Text>
        <Stack direction="row" wrap gap={4} paddingTop={4} className="uppercase" size="xs" weight="semibold" color="dim" tracking="widest">
          <Text>Artists</Text> <Text>•</Text>
          <Text>Stylists</Text> <Text>•</Text>
          <Text>Makers</Text> <Text>•</Text>
          <Text>Instructors</Text> <Text>•</Text>
          <Text>Performers</Text>
        </Stack>
      </Stack>

      <Box span={{ lg: 4 }} surface="alt" padding={8} radius="2xl" border="y" borderColor="line">
        <Stack direction="row" align="center" gap={2} marginBottom={4}>
          <Sparkles className="w-5 h-5 text-accent" />
          <Text as="h3" size="lg" weight="semibold" color="accent">
            More than a website.
          </Text>
        </Stack>
        <Text color="dim" size="sm" className="leading-relaxed">
          We're your digital business partner—helping you get found, book clients, sell your work, and grow your audience.
        </Text>
      </Box>
    </Grid>
  );
};
