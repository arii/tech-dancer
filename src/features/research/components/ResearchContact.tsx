import { X } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { SOCIAL_LINKS } from '@/config/constants';

export interface ResearchContactProps {
  lightboxImage: string | null;
  setLightboxImage: (img: string | null) => void;
}

export const ResearchContact = ({ lightboxImage, setLightboxImage }: ResearchContactProps) => {
  return (
    <>
      <Grid cols={{ base: 1, md: 12 }} gap={10} padding={8} surface="muted" radius="xl" className="border border-line/20" id="work-with-me" align="center" width="full">
        {/* Description Column (Left) */}
        <Stack gap={4} span={{ base: 1, md: 7 }} justify="center">
          <Box paddingBottom={2} className="border-b border-line/10">
            <Text as="h2" variant="headline" size="3xl" weight="font-black">Work with me</Text>
          </Box>
          <Text variant="body" size="lg" color="dim" leading="relaxed" maxWidth="prose">
            These are my own projects, built to solve real problems I care about.
            If you need a senior roboticist, DevAI engineering infrastructure,
            or someone who can do both, I'm available for project-based contracts
            and full-time roles.
          </Text>
        </Stack>

        {/* Contact Details Column (Right) */}
        <Stack gap={4} span={{ base: 1, md: 5 }} align={{ base: "start", md: "end" }} textAlign={{ base: "left", md: "right" }}>
          <Text variant="mono" size="xs" color="dim" uppercase tracking="widest" weight="font-bold" opacityVariant="subtle">Get in touch</Text>
          <Box display="flex" align="center" gap={4} wrap="wrap" justify={{ base: "start", md: "end" }} marginTop={2}>
            <Box as="a" href="mailto:anders.ariel@gmail.com" className="hover:text-accent transition-colors">
              <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Email</Text>
            </Box>
            <Text color="dim" opacityVariant="muted" size="xs">·</Text>
            <Box as="a" href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">LinkedIn</Text>
            </Box>
            <Text color="dim" opacityVariant="muted" size="xs">·</Text>
            <Box as="a" href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">GitHub</Text>
            </Box>
          </Box>
        </Stack>
      </Grid>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <Box
          position="fixed"
          inset={0}
          zIndex={100}
          display="flex"
          align="center"
          justify="center"
          className="bg-black/90 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <Box position="absolute" top={4} right={4} className="text-white hover:text-accent p-2">
            <Icon icon={X} size="lg" />
          </Box>
          <img
            src={lightboxImage}
            alt="Enlarged screenshot preview"
            className="max-w-[95vw] max-h-[95vh] md:max-w-[85vw] md:max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl"
          />
        </Box>
      )}
    </>
  );
};
