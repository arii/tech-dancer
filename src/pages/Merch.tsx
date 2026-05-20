import { Gift } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Button, Grid, Stack, Text, Box } from '@/layouts/Primitives';
import { merchProducts, PRINTFUL_REFERRAL_URL } from '@/data/merch';

export default function Merch() {
  return (
    <Stack gap={8} padding={6}>
      <SEO
        title="West Coast Swing Dance Merch & NorCal Apparel | BoomTick"
        description="Shop official BoomTick apparel for West Coast Swing dancers, social dancers, and NorCal locals."
      />

      <Stack gap={3}>
        <Text as="h1" variant="display" size="4xl">West Coast Swing Dance Merch</Text>
        <Text color="body">Editorial picks from our Printful store for dancers and NorCal locals.</Text>
      </Stack>

      <Box border="all" radius="lg" padding={4} className="bg-surface-alt border-line">
        <Stack direction="row" justify="between" align="center" gap={3}>
          <Stack gap={1}>
            <Stack direction="row" align="center" gap={2}><Gift className="h-5 w-5" /><Text as="h2" variant="sans" size="xl">Get $5 Off Your First Order</Text></Stack>
            <Text color="body">New to Printful? Use our referral link to save $5 on your first purchase.</Text>
          </Stack>
          <Button as="a" href={PRINTFUL_REFERRAL_URL} target="_blank" rel="sponsored noopener noreferrer">Claim $5 Discount</Button>
        </Stack>
      </Box>

      <Grid cols={{ base: 1, md: 2 }} gap={4}>
        {merchProducts.map((product) => (
          <Stack key={product.slug} border="all" radius="lg" padding={4} gap={3} className="border-line bg-surface">
            <Box as="img" src={product.image} alt={product.alt} width="full" radius="md" className="aspect-square object-cover" />
            <Text as="h3" variant="sans" size="xl">{product.title}</Text>
            <Text color="body">{product.description}</Text>
            <Text size="sm" color="dim">From ${product.priceFrom}</Text>
            <Button as="a" href={product.storeUrl} target="_blank" rel="sponsored noopener noreferrer">See Colors & Sizes</Button>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
}
