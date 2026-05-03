import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

// Hardcoded heights for the audio wave visualizer
const VISUALIZER_HEIGHTS = [
  40, 25, 60, 30, 45, 80, 50, 35, 70, 90, 60, 40, 55, 30, 45, 70, 40, 80, 50, 35, 65, 45, 75, 50, 30, 40, 60, 35, 55, 70
];

function Visualizer() {
  return (
    <Box position="absolute" bottom={0} left={0} width="full" height="32" className="flex items-end gap-[2px] sm:gap-1 px-4 sm:px-8 opacity-40 overflow-hidden pointer-events-none">
      {VISUALIZER_HEIGHTS.map((h, i) => (
        <Box
          key={i}
          className="flex-1 rounded-t-md bg-gradient-brand transition-all duration-500"
          style={{ height: `${h}%` }}
        />
      ))}
      {/* Gradient fade to hide the bottom or top of bars if needed, or overlay */}
      <Box position="absolute" inset={true} className="bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent" />
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
        <Box position="relative" padding={{ base: 8, md: 10, lg: 12 }} minHeight="[320px]" className="group">
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
        <Box position="relative" padding={{ base: 8, md: 10, lg: 12 }} minHeight="[320px]" className="group">
          <Visualizer />
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
