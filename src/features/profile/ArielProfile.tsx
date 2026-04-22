import { motion } from 'motion/react';
import { User, Award, Globe, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { useProfile } from './useProfile';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section">
      <Stack gap={12}>
        <PageHeader 
          label="ABOUT TECH-DANCER"
          title={bio.name}
          description={bio.role}
        />

        <Grid cols={{ base: 1, lg: 12 }} gap={16}>
          <Box span={{ base: 12, lg: 4 }}>
            <Stack gap={12}>
              <Box aspect="square" surface="muted" border overflow="hidden" position="relative" display="flex" align="center" justify="center">
                <User className="w-24 h-24 text-line stroke-[0.5]" />
              </Box>

              <Grid cols={1} gap={6}>
                {bio.details.map((detail) => (
                  <Box key={detail.label} paddingBottom={4} border="b">
                    <Text variant="mono" size="xs" color="dim" weight="font-semibold" display="block" tracking="widest" uppercase>{detail.label}</Text>
                    <Text variant="display" size="lg" marginTop={1} weight="font-bold">{detail.value}</Text>
                  </Box>
                ))}
              </Grid>

              <Box 
                as="a" 
                href="#" 
                display="flex"
                align="center"
                gap={2}
                className="hover:text-accent transition-colors"
              >
                <Text variant="mono" size="xs" weight="font-semibold" tracking="widest">VIEW FULL BACKGROUND</Text>
                <ArrowRight className="w-4 h-4" />
              </Box>
            </Stack>
          </Box>

          <Box span={{ base: 12, lg: 8 }}>
            <Stack gap={16}>
              {bio.sections.map((section) => (
                <Stack key={section.id} gap={4}>
                  <Box paddingBottom={4} border="b">
                    <Text variant="display" size="2xl" weight="font-black">{section.title}</Text>
                  </Box>
                  <Text variant="body" size="lg" color="body" className="leading-relaxed">
                    {section.content}
                  </Text>
                </Stack>
              ))}

              <Grid cols={{ base: 1, md: 2 }} gap={4} marginTop={8}>
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
                    <item.icon className="w-5 h-5 group-hover:text-accent transition-colors" />
                    <Text variant="mono" size="xs" weight="font-semibold" tracking="widest">{item.label}</Text>
                  </Box>
                ))}
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
