import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';

export default function PathSelector() {
  return (
    <Grid cols={12} gap={0} className="border-y border-line min-h-[60vh] w-full">
      {/* Dancer Path: Lifestyle & Gear */}
      <Box span={{ base: 12, lg: 7 }} position="relative" className="group overflow-hidden border-r border-line bg-gradient-to-br from-slate-900 to-blue-900 bg-[length:200%_200%] animate-gradient w-full">
        {/* Scanning Scanline Effect */}
        <motion.div
           variants={{ hover: { top: '100%', opacity: 1 } }}
           initial={{ top: '-10%', opacity: 0 }}
           animate={{ top: '100%', opacity: [0, 1, 0] }}
           transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
           className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none"
        />

        <Box padding={12} height="full" display="flex" direction="col" justify="end" position="relative" zIndex={20} className="bg-gradient-to-t from-bg via-bg/40 to-transparent">
          <Text variant="display" size="6xl" weight="font-black" marginBottom={4} className="leading-[0.9]">ARE YOU A DANCER?</Text>
          <Stack gap={4} marginBottom={6}>
            <Box as={NavLink} to="/blog?category=Lifestyle" display="flex" align="center" gap={2} className="font-mono text-sm tracking-widest uppercase text-accent font-bold hover:text-white transition-colors">
              &rarr; Lifestyle blog posts
            </Box>
            <Box as={NavLink} to="/gear" display="flex" align="center" gap={2} className="font-mono text-sm tracking-widest uppercase text-accent font-bold hover:text-white transition-colors">
              &rarr; Gear reviews
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Tech Path: Robotics & AI */}
      <Box span={{ base: 12, lg: 5 }} position="relative" className="group overflow-hidden bg-gradient-to-br from-slate-800 to-blue-950 bg-[length:200%_200%] animate-gradient w-full">
        {/* Scanning Scanline Effect */}
        <motion.div
           variants={{ hover: { top: '100%', opacity: 1 } }}
           initial={{ top: '-10%', opacity: 0 }}
           animate={{ top: '100%', opacity: [0, 1, 0] }}
           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
           className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none"
        />

        <Box padding={12} height="full" display="flex" direction="col" justify="end" position="relative" zIndex={20} className="bg-gradient-to-t from-bg via-bg/40 to-transparent">
          <Text variant="display" size="5xl" weight="font-black" marginBottom={4} className="text-accent-navy leading-[0.9]">HIRING A ROBOTICIST?</Text>
          <Stack gap={4} marginBottom={6}>
            <Box as={NavLink} to="/blog?category=Tech" display="flex" align="center" gap={2} className="font-mono text-sm tracking-widest uppercase text-accent font-bold hover:text-accent-navy transition-colors">
              &rarr; Tech blog posts
            </Box>
            <Box as={NavLink} to="/research" display="flex" align="center" gap={2} className="font-mono text-sm tracking-widest uppercase text-accent font-bold hover:text-accent-navy transition-colors">
              &rarr; Data & Development Lab
            </Box>
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}
