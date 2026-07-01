import { CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { ASSET_PREFIX } from '@/config/constants';

export function EcommerceVisualQA() {
  return (
    <Stack gap={6}>
      <Text variant="headline" size="xl" weight="font-black" as="h2">Visual Image QA Examples</Text>
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
        <Box border radius="md" overflow="hidden" surface="default">
          <Box padding={4} aspect="square" display="flex" align="center" justify="center">
            <img
              src={`${ASSET_PREFIX}/assets/gear/norcal-bestcal-front.webp`}
              alt="NorCal BestCal Front Mockup"
              className="max-w-full max-h-full object-contain"
            />
          </Box>
          <Box padding={4} border="t">
            <Text size="xs" weight="bold">FRONT QA CHECK</Text>
            <Text size="micro" color="dim">Center alignment and color profile validation.</Text>
          </Box>
        </Box>
        <Box border radius="md" overflow="hidden" surface="default">
          <Box padding={4} aspect="square" display="flex" align="center" justify="center">
            <img
              src={`${ASSET_PREFIX}/assets/gear/norcal-bestcal-back.webp`}
              alt="NorCal BestCal Back Mockup"
              className="max-w-full max-h-full object-contain"
            />
          </Box>
          <Box padding={4} border="t">
            <Text size="xs" weight="bold">BACK QA CHECK</Text>
            <Text size="micro" color="dim">Print area boundaries and text legibility.</Text>
          </Box>
        </Box>
        <Box border radius="md" overflow="hidden" surface="default" display="flex" align="center" justify="center" padding={8}>
          <Stack gap={4} align="center" textAlign="center">
            <Icon icon={CheckCircle2} size="xl" color="accent" />
            <Stack gap={2}>
              <Text size="sm" weight="bold">PASSING QUALITY</Text>
              <Text size="micro" color="dim">Automated crop analysis confirms centering within precise tolerance.</Text>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Stack>
  );
}
