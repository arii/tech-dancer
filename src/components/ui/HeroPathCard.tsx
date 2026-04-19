import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '../layout/Primitives';
import { Zap, Shield } from 'lucide-react';

interface HeroPathCardProps {
  label: string;
  title: string;
  paths: { label: string; path: string }[];
  tag: string;
  image: string;
  span?: number;
  icon: any;
}

export function HeroPathCard({ label, title, paths, tag, image, span = 1, icon: Icon }: HeroPathCardProps) {
  return (
    <Box 
      as={motion.div}
      span={{ base: 1, md: span }}
      position="relative"
      overflow="hidden"
      padding={8}
      className="group bg-surface border border-line hover:border-accent transition-all duration-500 rounded-xl shadow-sm hover:shadow-md"
    >
      <Stack gap={10} height="full" justify="between" position="relative" zIndex={10}>
        <Stack gap={8}>
          <Box display="flex" align="center" gap={3}>
            <Icon className="w-5 h-5 text-accent" />
            <Text variant="mono" size="micro" color="dim" weight="font-bold" tracking="widest" uppercase>
              {tag.split(' // ')[0]}
            </Text>
          </Box>
          
          <Stack gap={6}>
            <Text 
              variant="display" 
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
                  className="flex items-center gap-4 bg-bg/50 hover:bg-bg border border-line hover:border-accent transition-all group/link"
                >
                  <Box className="w-2 h-2 bg-accent/20 group-hover/link:bg-accent rounded-full transition-colors" />
                  <Text variant="sans" size="base" weight="font-bold" className="text-text-main group-hover/link:text-accent">
                    {item.label}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Stack>

        <Box display="flex" justify="between" align="center" paddingTop={8} border="t" borderColor="line">
          <Text variant="mono" size="micro" color="dim" weight="font-bold" tracking="widest" uppercase>
            {tag}
          </Text>
          <Box className="w-8 h-[2px] bg-accent/20 group-hover:w-16 group-hover:bg-accent transition-all duration-500 rounded-full" />
        </Box>
      </Stack>
    </Box>
  );
}
