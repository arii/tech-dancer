import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface VisualizerProps {
  reverse?: boolean;
}

function Visualizer({ reverse }: VisualizerProps) {
  // Use 28 bars as in the mockup
  const bars = Array.from({ length: 28 });

  return (
    <Box
      position="absolute"
      bottom={0} left={0} width="full" height="170px"
      className={cn(
        "flex items-end gap-1 px-4 pb-[18px] opacity-25 pointer-events-none",
        reverse && "panel-reverse"
      )}
    >
      {bars.map((_, i) => (
        <Box
          key={i}
          className="bar-wave flex-1 rounded-t-md bg-gradient-brand shadow-[0_0_14px_rgba(0,207,255,0.2)]"
        />
      ))}
    </Box>
  );
}

export default function PathSelector() {
  const trainLinks = [
    { text: 'WCS Training →', to: '/blog?category=Lifestyle' },
    { text: 'Competition tips →', to: '/blog?category=Training' },
    { text: 'Gear reviews →', to: '/gear' },
  ];

  const travelLinks = [
    { text: 'Travel guides →', to: '/blog?category=Travel' },
    { text: 'Event calendar →', to: '/events' },
    { text: 'Packing lists →', to: '/blog?category=Gear' },
  ];

  return (
    <Box
      className="bg-[#0B1120] border border-line rounded-2xl overflow-hidden shadow-lg"
    >
      <Grid cols={{ base: 1, md: 2 }} className="divide-y md:divide-y-0 md:divide-x divide-line/20">

        {/* Train Smarter Section */}
        <Box position="relative" padding={{ base: 8, md: 10, lg: 12 }} minHeight="[320px]" className="group overflow-hidden">
          <Box className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_50%_100%,rgba(0,207,255,0.18),transparent_40%),linear-gradient(135deg,rgba(0,207,255,0.08),rgba(139,47,255,0.05)_40%,rgba(255,0,200,0.06))]" />
          <Visualizer />
          <Stack position="relative" zIndex={10} direction="col" justify="between" height="full">
            <Box>
              <Text as="h2" variant="headline" className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
                TRAIN SMARTER.
              </Text>
              <Text className="text-white/70 text-sm md:text-base max-w-[90%] md:max-w-[85%] leading-relaxed">
                Drills, breakdowns, and mindset for competitive West Coast Swing dancers at every level.
              </Text>
            </Box>

            <Stack gap={4} marginTop={10}>
              {trainLinks.map(link => (
                <NavLink
                  key={link.text}
                  to={link.to}
                  className="text-[#8B2FFF] font-bold text-sm tracking-wide transition-all hover:opacity-80 flex items-center"
                >
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Travel Better Section */}
        <Box position="relative" padding={{ base: 8, md: 10, lg: 12 }} minHeight="[320px]" className="group overflow-hidden">
          <Box className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_50%_100%,rgba(0,207,255,0.18),transparent_40%),linear-gradient(135deg,rgba(0,207,255,0.08),rgba(139,47,255,0.05)_40%,rgba(255,0,200,0.06))]" />
          <Visualizer reverse={true} />
          <Stack position="relative" zIndex={10} direction="col" justify="between" height="full">
            <Box>
              <Text as="h2" variant="headline" className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
                TRAVEL BETTER.
              </Text>
              <Text className="text-white/70 text-sm md:text-base max-w-[90%] md:max-w-[85%] leading-relaxed">
                Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.
              </Text>
            </Box>

            <Stack gap={4} marginTop={10}>
              {travelLinks.map(link => (
                <NavLink
                  key={link.text}
                  to={link.to}
                  className="text-gradient-cyan-blue font-bold text-sm tracking-wide transition-all hover:opacity-80 flex items-center"
                >
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Stack>
        </Box>

      </Grid>
    </Box>
  );
}
