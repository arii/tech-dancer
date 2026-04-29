import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section" height="full">
      <SEO
        title="About"
        description="Ariel Anders, PhD: Roboticist, Dancer, and Engineer. Exploring the intersection of technical systems and creative movement."
      />
      
      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
      />

      <Stack gap={16} marginTop={12} maxWidth="prose">
        <Reveal direction="up">
          <Stack gap={16}>
            {bio.sections.map((section) => (
              <Stack key={section.id} gap={4} maxWidth="prose">
                <Text variant="display" size="3xl" weight="font-black" className="text-accent-navy uppercase tracking-tight">
                  {section.title}
                </Text>
                <Text variant="body" size="lg" color="body" className="leading-loose">
                  {section.content}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <Box padding={8} border className="bg-surface/50 border-line/20">
            <Stack gap={8}>
              <Grid cols={{ base: 1, sm: 3 }} gap={8}>
                {bio.details.map((detail) => (
                  <Stack key={detail.label} gap={1}>
                    <Text variant="mono" size="xs" color="dim" weight="font-bold">{detail.label}</Text>
                    <Text variant="body" size="sm" color="main" weight="font-semibold">{detail.value}</Text>
                  </Stack>
                ))}
              </Grid>

              <Stack gap={6} border="t" paddingTop={8} className="border-line/20">
                <Text variant="mono" size="xs" color="brand" weight="font-bold">CONNECT & NETWORKING</Text>
                <Box display="flex" gap={4} flexWrap="wrap">
                  {[
                    { label: 'INSTAGRAM', url: 'https://instagram.com' },
                    { label: 'LINKEDIN', url: 'https://linkedin.com/in/arianders' },
                    { label: 'GITHUB', url: 'https://github.com/arii' },
                    { label: 'PORTFOLIO', url: 'https://arii.github.io' }
                  ].map((link) => (
                    <Box
                      key={link.label}
                      as="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      paddingX={4}
                      paddingY={2}
                      border
                      className="hover:border-accent hover:bg-accent/5 transition-all group"
                    >
                      <Text variant="mono" size="xs" weight="font-bold" className="group-hover:text-accent">
                        {link.label}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Reveal>
      </Stack>
    </Box>
  );
}
