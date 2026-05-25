import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Code2, Terminal, ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import type { Post } from '@/lib/content';

interface DevLabTerminalProps {
  devPosts: Post[];
}

export function DevLabTerminal({ devPosts }: DevLabTerminalProps) {
  return (
    <Stack gap={8} paddingX={{ base: 4, md: 6, lg: 12 }} as={motion.div} variants={motionTokens.staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
      <Stack gap={2}>
        <Text as="h2" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
          Engineering
        </Text>
        <Text as="h3" size="fluid-5" weight="font-black" leading="tight">
          Data & Development Lab
        </Text>
      </Stack>

      {/* Terminal-style container */}
      <Box
        className="rounded-lg border border-line/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden shadow-2xl"
        as={motion.div}
        variants={motionTokens.staggerItem}
      >
        {/* Terminal Header */}
        <Box
          display="flex"
          align="center"
          gap={2}
          paddingX={4}
          paddingY={3}
          className="bg-slate-800/50 border-b border-line/40 backdrop-blur-sm"
        >
          <Box display="flex" gap={1.5}>
            <Box width={3} height={3} radius="full" className="bg-red-500/70" />
            <Box width={3} height={3} radius="full" className="bg-yellow-500/70" />
            <Box width={3} height={3} radius="full" className="bg-green-500/70" />
          </Box>
          <Text variant="mono" size="xs" color="dim" className="ml-auto">
            ~ boomtick@lab
          </Text>
        </Box>

        {/* Terminal Content */}
        <Stack gap={4} paddingX={6} paddingY={6}>
          <Box display="flex" align="start" gap={3}>
            <Terminal size={20} className="text-accent/70 flex-shrink-0 mt-0.5" />
            <Stack gap={3} flex={1}>
              <Text variant="mono" size="xs" color="dim" className="opacity-60">
                Latest articles from the lab...
              </Text>
            </Stack>
          </Box>

          {/* Dev Posts Grid */}
          <Stack gap={3} className="divide-y divide-line/20">
            {devPosts.map((post, idx) => (
              <Box
                key={post.slug}
                as={NavLink}
                to={`/blog/${post.slug}`}
                paddingY={3}
                className="group transition-all hover:bg-slate-800/30 rounded-md px-3 -mx-3"
              >
                <Stack gap={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Code2 size={14} className="text-accent/60 flex-shrink-0" />
                    <Text
                      size="sm"
                      weight="font-bold"
                      color="main"
                      className="group-hover:text-accent transition-colors font-mono line-clamp-2"
                    >
                      {post.title}
                    </Text>
                  </Box>
                  <Box display="flex" align="center" gap={2} paddingLeft={5}>
                    <Text variant="mono" size="xs" color="dim" className="opacity-60">
                      {post.category}
                    </Text>
                    <Text variant="mono" size="xs" color="dim" className="opacity-60">
                      •
                    </Text>
                    <Text variant="mono" size="xs" color="dim" className="opacity-60">
                      {post.date}
                    </Text>
                    {post.readingTime && (
                      <>
                        <Text variant="mono" size="xs" color="dim" className="opacity-60">
                          •
                        </Text>
                        <Text variant="mono" size="xs" color="dim" className="opacity-60">
                          {post.readingTime}
                        </Text>
                      </>
                    )}
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>

          {/* CTA */}
          <Box
            as={NavLink}
            to="/research"
            display="flex"
            align="center"
            gap={2}
            paddingTop={2}
            className="text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors group w-fit"
          >
            Explore Lab
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
