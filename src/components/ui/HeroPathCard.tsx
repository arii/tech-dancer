import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Zap, Shield } from 'lucide-react';

interface HeroPathCardProps {
  label: string;
  title: string;
  paths: { label: string; path: string }[];
  tag: string;
  image: string;
  span?: number;
  icon: React.ElementType;
}

export function HeroPathCard({ label, title, paths, tag, image, span = 1, icon: Icon }: HeroPathCardProps) {
  return (
    <Box 
      as={motion.div}
      span={{ base: 1, lg: span }}
      position="relative"
      overflow="hidden"
      padding={8}
      className="group bg-surface border border-slate-200 hover:border-accent transition-all duration-500 rounded-none"
    >
      <Stack gap={10} height="full" justify="between" position="relative" zIndex={10}>
        <Stack gap={8}>
          <Box display="flex" align="center" gap={3}>
            <Icon className="w-5 h-5 text-accent" />
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" className=" uppercase">
              {tag.split(' // ')[0]}
            </Text>
          </Box>
          
          <Stack gap={6}>
            <Text 
              variant="displayLower"
              size="4xl" 
              weight="font-black" 
              className="tracking-tight leading-tight text-accent-navy transition-colors"
            >
              {title}
            </Text>
            
            <Grid cols={{ base: 1, sm: span > 2 ? 3 : 1 }} gap={3} maxWidth="4xl">
              {paths.map(item => (
                <Box 
                  key={item.label}
                  as={NavLink}
                  to={item.path}
                  paddingX={5}
                  paddingY={4}
                  radius="md"
                  className="flex items-center gap-4 bg-bg/50 hover:bg-accent/5 border border-slate-200 hover:border-accent rounded-[2px] transition-all group/link"
                >
                  {/* MECHANICAL_NOTE: Physics of the hover expansion */}
                  <Box className="w-2 h-2 bg-accent/20 group-hover/link:bg-accent rounded-none transition-colors flex-shrink-0" />
                  <Text variant="sans" size="base" weight="font-bold" className="text-text-main group-hover/link:text-accent">
                    {item.label}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Stack>

        <Box display="flex" justify="between" align="center" paddingTop={8} className="border-t border-slate-200">
          <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" className=" uppercase">
            {tag}
          </Text>
          <Box className="w-8 h-[2px] bg-accent/20 group-hover:w-16 group-hover:bg-accent transition-all duration-500 rounded-none" />
        </Box>
      </Stack>
    </Box>
  );
}
