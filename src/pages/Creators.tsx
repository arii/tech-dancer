import { SEO } from '@/components/SEO';
import { Box, Grid, Stack, Text, Button } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';
import { ClientCard } from '@/features/creators/ClientCard';
import { ExpansionSlots } from '@/features/creators/ExpansionSlots';

export default function Creators() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://boomtick.blog/creators/#webpage",
    "url": "https://boomtick.blog/creators",
    "name": "Featured Creators | BoomTick",
    "description": "Directory of independent creators, stylists, instructors, and solopreneurs whose digital operations and web platforms are powered by BoomTick.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://boomtick.blog/#website",
      "name": "BoomTick",
      "url": "https://boomtick.blog"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Creators Powered by BoomTick",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "WebSite",
            "name": "Hair by April",
            "url": "https://hairbyapril.pages.dev",
            "description": "Curly hair cuts, authentic vintage styling, and on-location wedding and event hair services across San Francisco.",
            "creator": {
              "@type": "Organization",
              "@id": "https://boomtick.blog/#organization"
            }
          }
        }
      ]
    }
  };

  return (
    <Box as="main" width="full" maxWidth="container" marginX="auto" minWidth={0} overflow="x-clip" paddingX={{ base: 4, sm: 6, lg: 8 }} paddingY={12}>
      <SEO
        title="Featured Creators"
        description="Directory of independent creators, stylists, instructors, and solopreneurs whose digital operations and web platforms are powered by BoomTick."
        schema={collectionSchema}
      />
      <Stack gap={8} width="full" maxWidth="full" minWidth={0} align="center" className="text-center">
        <Text as="h1" variant="display" size="4xl" weight="font-black" uppercase tracking="tight">
          The Independent Creators & Pros Powered by BoomTick
        </Text>
        <Text as="p" variant="body" size="lg" color="dim" maxWidth="3xl">
          From customized booking workflows to automated client intake, explore the solopreneurs running their digital operations on modern infrastructure.
        </Text>
      </Stack>

      <Box marginTop={16}>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
          <ClientCard
          name="Hair by April"
          location="San Francisco, CA"
          description="Specializing in curly hair cuts, authentic vintage styling, and on-location production styling."
          niche="Hair & Beauty"
          tags={["Edge Web Build", "Appointment Funnel", "Event Intake Automation"]}
          imageSrc="/images/creators/hair-by-april-full.png"
          url="https://hairbyapril.pages.dev"
        />
          <ExpansionSlots />
        </Grid>
      </Box>

      <Box marginTop={24} padding={12} surface="accent" radius="xl" className="text-center">
        <Stack gap={6} align="center">
          <Text as="h2" variant="headline" size="2xl" weight="font-bold">
            Running an independent practice?
          </Text>
          <Text as="p" variant="body" size="lg" maxWidth="2xl">
            Streamline your bookings and operations with our digital studio workflows, automated intake pipelines, and edge-hosted performance.
          </Text>
          <Button as={NavLink} to="/services" variant="primary" size="lg" marginTop={4}>
            View Services & Packages →
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
