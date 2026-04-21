import { motion } from 'motion/react';
import { User, Award, Globe, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { useProfile } from './useProfile';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section">
      <Stack gap={24}>
        <PageHeader 
          label="ARCHIVE // BIO-001"
          title={bio.name}
          description={bio.role}
          paddingY={0}
          className="border-none"
        />

        {/* Asymmetric 12-Column Grid Layout */}
        <Grid cols={{ base: 1, lg: 12 }} gap={0} className="border-t border-line">

          {/* Left Sidebar: Detailed Metadata */}
          <Box span={{ base: 12, lg: 4 }} className="border-r border-line lg:pr-12 pt-12 pb-24">
            <Stack gap={16}>
              <div className="relative group">
                <Box aspect="square" surface="muted" overflow="hidden" position="relative" display="flex" align="center" justify="center" className="grayscale group-hover:grayscale-0 transition-all duration-700 ease-out-expo">
                  <User className="w-32 h-32 text-line stroke-[0.5]" />
                  <div className="absolute inset-0 border border-accent-navy/10 group-hover:border-accent/30 transition-colors duration-500" />
                </Box>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/5 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              </div>

              <Grid cols={1} gap={8}>
                {bio.details.map((detail) => (
                  <Box key={detail.label} paddingBottom={4} className="border-b border-line/50">
                    <Text variant="mono" size="xs" color="dim" weight="font-bold" display="block" className="tracking-[0.2em] uppercase opacity-50 mb-2">{detail.label}</Text>
                    <Text variant="display" size="xl" weight="font-black" className="text-accent-navy leading-none">{detail.value}</Text>
                  </Box>
                ))}
              </Grid>

              <Box 
                as="a" 
                href="#" 
                className="group flex items-center justify-between p-6 border border-line hover:border-accent transition-all duration-300"
              >
                <Text variant="mono" size="xs" weight="font-bold" className="tracking-[0.2em] uppercase">Download Dossier</Text>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Box>
            </Stack>
          </Box>

          {/* Right Column: Narrative Content */}
          <Box span={{ base: 12, lg: 8 }} className="lg:pl-20 pt-12">
            <Stack gap={24}>
              {bio.sections.map((section, index) => (
                <div key={section.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Subtle index for editorial feel */}
                  <div className="md:col-span-1 pt-2">
                    <Text variant="mono" size="xs" weight="font-black" className="text-accent/40">0{index + 1}</Text>
                  </div>

                  <div className="md:col-span-11">
                    <Stack gap={6}>
                      <Text
                        variant="display"
                        size="5xl"
                        weight="font-black"
                        className="text-accent-navy leading-[0.85] uppercase tracking-tighter max-w-[10ch]"
                      >
                        {section.title}
                      </Text>
                      <Text variant="body" size="lg" color="body" className="leading-relaxed max-w-[55ch] text-lg lg:text-xl font-medium">
                        {section.content}
                      </Text>
                    </Stack>
                  </div>
                </div>
              ))}

              {/* Functional Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-line mt-12">
                {[
                  { icon: User, label: 'Curriculum Vitae' },
                  { icon: Award, label: 'Publications' },
                  { icon: Globe, label: 'Digital Presence' },
                ].map((item) => (
                  <Box 
                    key={item.label}
                    as="button"
                    paddingY={12}
                    paddingX={6}
                    display="flex" 
                    direction="col" 
                    align="center" 
                    gap={4}
                    cursor="pointer"
                    className="group border-r border-line last:border-r-0 hover:bg-accent-navy transition-all duration-500"
                  >
                    <item.icon className="w-6 h-6 text-accent-navy group-hover:text-bg transition-colors duration-300 stroke-[1.5]" />
                    <Text variant="mono" size="xs" weight="font-bold" className="tracking-[0.2em] uppercase group-hover:text-bg transition-colors duration-300">{item.label}</Text>
                  </Box>
                ))}
              </div>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
