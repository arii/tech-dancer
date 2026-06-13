import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { JOURNEY_STEPS } from '@/data/eventResources';

export function PreparationJourney() {
  return (
    <Box as="section" marginTop={{ base: 16, lg: 32 }}>
      <Stack gap={12}>
        <Text variant="mono" size="xs" color="brand" weight="font-black" uppercase tracking="widest">
          Event Preparation Journey
        </Text>

        <Grid cols={{ base: 1, lg: 3 }} gap={8}>
          {JOURNEY_STEPS.map((step) => (
            <Stack key={step.title} gap={6} border radius="xl" padding={8} surface="default" className="hover:border-accent/20 transition-all">
              <Box display="flex" align="center" gap={3}>
                <step.icon className="w-5 h-5 text-accent" />
                <Text variant="mono" size="sm" weight="font-black" tracking="wide">
                  {step.title}
                </Text>
              </Box>

              <Stack gap={4}>
                {step.items.map((item) => (
                  <Box
                    key={item.label}
                    as={NavLink}
                    to={`/${item.type === 'blog' ? 'blog' : 'gear'}/${item.slug}`}
                    className="group"
                  >
                    <Text
                      variant="body"
                      size="base"
                      color="dim"
                      paddingBottom={0.5}
                      className="group-hover:text-accent transition-colors border-b border-transparent group-hover:border-accent/20"
                    >
                      {item.label}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
