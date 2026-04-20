import { motion } from 'motion/react';
import { User, Award, Globe } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useProfile } from './useProfile';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section" maxWidth="3xl" marginX="auto">
      <Stack gap={12}>
        {/* Header Section */}
        <Box as="header" marginBottom={16}>
          <Text
            variant="mono"
            size="tiny"
            weight="font-bold"
            color="dim"
            display="block"
            className="tracking-[0.2em] uppercase mb-2"
          >
            About Tech-Dancer
          </Text>
          <Text
            as="h1"
            variant="headline"
            size="4xl"
            weight="font-black"
            className="text-slate-900 mb-1"
          >
            {bio.name}
          </Text>
          <Text
            as="p"
            variant="sans"
            size="lg"
            color="dim"
            weight="font-medium"
            className="italic"
          >
            {bio.role}
          </Text>
        </Box>

        {/* Profile Icon Placeholder */}
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

        {/* Info Grid */}
        <Box as="section" className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {bio.details.map((detail) => (
            <div key={detail.label} className="space-y-2">
              <Text
                as="h2"
                variant="mono"
                size="tiny"
                weight="font-bold"
                color="dim"
                display="block"
                className="tracking-[0.2em] uppercase"
              >
                {detail.label}
              </Text>
              <Text
                as="p"
                variant="sans"
                size="lg"
                weight="font-semibold"
                className="text-slate-800 border-l-2 border-accent pl-4"
              >
                {detail.value}
              </Text>
            </div>
          ))}
        </Box>

        {/* Bio Sections */}
        <Stack gap={12}>
          {bio.sections.map((section) => (
            <Stack key={section.id} gap={2}>
              <Text
                as="h2"
                variant="display"
                size="2xl"
                weight="font-black"
                className="text-slate-900"
              >
                {section.title}
              </Text>
              <Text
                as="p"
                variant="body"
                size="lg"
                color="body"
                className="leading-relaxed text-slate-600"
              >
                {section.content}
              </Text>
            </Stack>
          ))}
        </Stack>

        {/* Action Buttons */}
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
              <Text variant="mono" size="xs" weight="font-semibold" className="tracking-[0.15em]">{item.label}</Text>
            </Box>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
