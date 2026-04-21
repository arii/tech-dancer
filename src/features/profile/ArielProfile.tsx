import { motion } from 'motion/react';
import { User, Award, Globe, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { useProfile } from './useProfile';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box maxWidth="3xl" marginX="auto">
      <Stack gap={12}>
        <PageHeader
          label="ABOUT TECH-DANCER"
          title={bio.name}
          description={bio.role}
          descriptionItalic
          border={false}
          paddingBottom={0}
          marginBottom={16}
        />

        <Box
          aspect="square"
          width={24}
          surface="muted"
          border
          overflow="hidden"
          position="relative"
          display="flex"
          align="center"
          justify="center"
          marginBottom={8}
        >
          <User className="w-12 h-12 text-line stroke-[0.5]" />
        </Box>

        <Grid as="section" cols={{ base: 1, md: 2 }} gap={12} marginBottom={16}>
          {bio.details.map((detail) => (
            <Box key={detail.label} border="l-accent" paddingLeft={4}>
              <Stack gap={2}>
                <Text
                  as="h2"
                  variant="label"
                  size="tiny"
                  weight="font-bold"
                  color="dim"
                  display="block"
                >
                  {detail.label}
                </Text>
                <Text
                  as="p"
                  variant="body"
                  size="lg"
                  weight="font-semibold"
                  color="main"
                >
                  {detail.value}
                </Text>
              </Stack>
            </Box>
          ))}

          <Box display="flex" align="end">
            <Box
              as="a"
              href="#"
              className="hover:text-accent transition-colors flex items-center gap-2 text-accent-navy"
            >
              <Text variant="label" size="xs" weight="font-bold">VIEW FULL BACKGROUND</Text>
              <ArrowRight className="w-4 h-4" />
            </Box>
          </Box>
        </Grid>

        <Stack gap={12}>
          {bio.sections.map((section) => (
            <Stack key={section.id} gap={2}>
              <Text
                as="h2"
                variant="display"
                size="2xl"
                weight="font-black"
                color="main"
              >
                {section.title}
              </Text>
              <Text
                as="p"
                variant="body"
                size="lg"
                color="body"
              >
                {section.content}
              </Text>
            </Stack>
          ))}
        </Stack>

        <Grid cols={{ base: 1, md: 3 }} gap={4} marginTop={12}>
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
              <item.icon className="w-5 h-5 text-accent-navy group-hover:text-accent transition-colors" />
              <Text variant="label" size="xs" weight="font-bold">{item.label}</Text>
            </Box>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
