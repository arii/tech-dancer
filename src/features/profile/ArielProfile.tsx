import { motion } from 'motion/react';
import { User, Award, Globe, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { useProfile } from './useProfile';
import Contact from './ContactConsole';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section" padding="panel">
      <Stack gap={16}>
        <Stack gap={1}>
          <Text variant="mono" color="brand" weight="font-bold">ABOUT TECH-DANCER</Text>
          <Text variant="headline" size="9xl">{bio.name}</Text>
          <Text variant="display" size="2xl" color="brand" weight="font-bold">{bio.role}</Text>
        </Stack>

        <Grid cols={{ base: 1, lg: 12 }} gap={16}>
          <Box span={{ base: 12, lg: 4 }}>
            <Stack gap={12}>
              <Box aspect="square" surface="muted" border overflow="hidden" position="relative" display="flex" align="center" justify="center">
                <User className="w-24 h-24 text-line stroke-[0.5]" />
              </Box>

              <Grid cols={1} gap={6}>
                {bio.details.map((detail) => (
                  <Box key={detail.label} border="b" paddingBottom={4}>
                    <Text variant="mono" size="micro" color="dim" display="block">{detail.label}</Text>
                    <Text variant="display" size="lg" marginTop={1}>{detail.value}</Text>
                  </Box>
                ))}
              </Grid>

              <Box 
                as="a" 
                href="#" 
                variant="mono" 
                size="sm" 
                weight="font-bold" 
                color="brand" 
                className="hover:underline flex items-center gap-2"
              >
                View Full Professional Background
                <ArrowRight className="w-4 h-4" />
              </Box>
            </Stack>
          </Box>

          <Box span={{ base: 12, lg: 8 }}>
            <Stack gap={16}>
              {bio.sections.map((section) => (
                <Stack key={section.id} gap={4}>
                  <Text variant="display" size="4xl" weight="font-bold">{section.title}</Text>
                  <Text variant="body" size="lg" color="body" className="leading-relaxed">
                    {section.content}
                  </Text>
                </Stack>
              ))}

              <Grid cols={3} gap={4} marginTop={8}>
                {[
                  { icon: User, label: 'Curriculum Vitae' },
                  { icon: Award, label: 'Publications' },
                  { icon: Globe, label: 'Social' },
                ].map((item) => (
                  <Box 
                    key={item.label}
                    as="button"
                    border 
                    surface="default" 
                    padding="compact" 
                    display="flex" 
                    direction="col" 
                    align="center" 
                    gap={3}
                    cursor="pointer"
                    className="group hover:border-accent-brand transition-all"
                  >
                    <item.icon className="w-5 h-5 text-accent group-hover:text-accent-brand transition-colors" />
                    <Text variant="mono" size="micro" weight="font-bold">{item.label}</Text>
                  </Box>
                ))}
              </Grid>
            </Stack>
          </Box>
        </Grid>

        <Box border="t" paddingTop={16}>
          <Contact />
        </Box>
      </Stack>
    </Box>
  );
}
