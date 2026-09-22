// impeccable-ignore-file
import { ArrowRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';

export function RoboticsPortfolioCard() {
  return (
    <Box className="w-full my-4 p-6 sm:p-8 rounded-2xl bg-surface shadow-md">
      <Grid cols={{ base: 1, lg: 2 }} gap={{ base: 6, lg: 8 }} align="center">
        <Stack gap={3}>
          <Text as="h2" variant="display" size="xl" weight="font-bold" color="main" className="text-xl sm:text-2xl tracking-tight">
            Robotics &amp; Autonomous Systems Portfolio
          </Text>
          <Text variant="body" size="sm" color="dim" leading="relaxed">
            Explore production robotics software, onboard motion planning architectures, high-accuracy state estimation systems, and technical consulting.
          </Text>
        </Stack>
        <Box display="flex" justify={{ base: 'start', lg: 'center' }}>
          <Button
            as="a"
            href="https://arii.github.io"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="inline-flex items-center text-accent-sky hover:text-accent-sky-light"
          >
            <Box display="flex" align="center" justify="center" gap={2}>
              <span>View Robotics Portfolio</span>
              <Icon icon={ArrowRight} size="xs" />
            </Box>
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

export default RoboticsPortfolioCard;
