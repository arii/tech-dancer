import { ArrowRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { ActionButton } from '@/components/ui/ActionButton';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function RoboticsPortfolioCard() {
  return (
    <Box
      padding={{ base: 6, sm: 8 }}
      radius="2xl"
      border
      className="w-full bg-surface border-line/60 shadow-md"
    >
      <Box
        display="flex"
        direction={{ base: 'col', lg: 'row' }}
        align={{ base: 'start', lg: 'center' }}
        justify="between"
        gap={{ base: 6, lg: 8 }}
      >
        <Stack gap={2} className="max-w-2xl">
          <Text
            as="h2"
            variant="headline"
            size="fluid-2"
            weight="font-bold"
            tracking="tight"
            className="text-text-main"
          >
            Robotics &amp; Autonomous Systems Portfolio
          </Text>
          <Text variant="body" size="sm" color="dim" leading="relaxed">
            Explore production robotics software, onboard motion planning architectures, high-accuracy state estimation systems, and technical consulting.
          </Text>
        </Stack>
        <Box shrink={0}>
          <ActionButton
            as="a"
            href="https://arii.github.io"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            paddingX={5}
            paddingY={3}
            radius="lg"
            border
            className="border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan"
          >
            <Box display="flex" align="center" gap={2}>
              <span>View Robotics Portfolio</span>
              <Icon icon={ArrowRight} size="xs" />
            </Box>
          </ActionButton>
        </Box>
      </Box>
    </Box>
  );
}

export default RoboticsPortfolioCard;
