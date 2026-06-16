import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { getFeaturedMerch } from '@/lib/productCatalog';
import { ASSET_PREFIX } from '@/config/constants';

export function BoomTickPanel() {
  const allMerch = getFeaturedMerch(10);
  // Using NorCal Best Cal as it provides a clean, single-image front view that balances well in the grid
  const featuredProduct = allMerch.find(p => p.id === 'norcal-bestcal-golden-gate-pride') || allMerch[0];

  return (
    <Box
      border
      radius="lg"
      padding={8}
      surface="surface-alt"
      position="relative"
      display="flex"
      direction="col"
      justify="between"
      height="full"
      overflow="hidden"
      className="group transition-all hover:border-accent/40 shadow-sm"
    >
      {/* Rainbow Accent Bar */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height={1}
        className="brand-rainbow"
      />

      <Stack gap={6}>
        {/* Header */}
        <Stack gap={1}>
          <Text variant="headline" size="xl" weight="font-black" color="main">
            Dance · Pride · Community
          </Text>
          <Text variant="body" size="sm" color="dim" leading="relaxed">
            Bay Area apparel for WCS, Lindy, and partner dance culture.
          </Text>
        </Stack>

        {/* Featured Product Preview */}
        {featuredProduct && (
          <Stack direction="row" align="center" gap={4} padding={4} radius="lg" className="bg-bg/20 border border-white/5">
            <Box width={24} height={24} radius="md" overflow="hidden" shrink={0} className="bg-surface/50 border border-white/5">
              <img
                src={`${ASSET_PREFIX}${featuredProduct.imageUrl}`}
                alt={featuredProduct.title}
                className="h-full w-full object-cover"
              />
            </Box>
            <Stack gap={1} className="min-w-0">
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">Featured Design</Text>
              <Text variant="body" size="sm" weight="font-bold" color="main" className="truncate">
                {featuredProduct.title}
              </Text>
              <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-tight">
                {featuredProduct.description}
              </Text>
            </Stack>
          </Stack>
        )}
      </Stack>

      {/* CTA Button */}
      <Box marginTop={8}>
        <Button
          as={NavLink}
          to="/merch"
          variant="primary"
          size="lg"
          width="full"
        >
          Shop the collection
        </Button>
      </Box>
    </Box>
  );
}
