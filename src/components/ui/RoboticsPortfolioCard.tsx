// impeccable-ignore-file
import { ArrowRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function RoboticsPortfolioCard() {
  return (
    <Box
      id="robotics-portfolio-card"
      className="w-full my-4 rounded-2xl bg-gradient-to-br from-white/[0.05] via-indigo-950/20 to-black/40 border border-brand-cyan/30 shadow-[0_0_25px_rgba(0,255,255,0.06)] backdrop-blur-xl relative overflow-hidden p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8 items-center w-full">
        <Stack gap={3} className="relative z-10">
          <Text as="h2" variant="display" size="xl" weight="font-bold" color="main" className="text-xl sm:text-2xl tracking-tight">
            Robotics &amp; Autonomous Systems Portfolio
          </Text>
          <Text variant="body" size="sm" color="dim" leading="relaxed">
            Explore production robotics software, onboard motion planning architectures, high-accuracy state estimation systems, and technical consulting.
          </Text>
        </Stack>
        <div className="flex justify-start lg:justify-center relative z-10">
          <a
            href="https://arii.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 flex justify-center items-center disabled:opacity-muted disabled:cursor-not-allowed hover:border-accent/50 bg-transparent hover:bg-brand-cyan/10 text-brand-cyan border border-brand-cyan font-mono font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 h-fit rounded shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] cursor-pointer"
          >
            <Box display="flex" align="center" justify="center" gap={2}>
              <span>View Robotics Portfolio</span>
              <Icon icon={ArrowRight} size="xs" />
            </Box>
          </a>
        </div>
      </div>
    </Box>
  );
}

export default RoboticsPortfolioCard;
