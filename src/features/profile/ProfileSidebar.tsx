import { User, Instagram, Linkedin, Github, Twitter, Youtube, LucideIcon } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { imageSizes, stroke } from '@/styles/design-tokens';
import { ProfileData, SocialPlatform } from './types';

const platformIcons: Record<SocialPlatform, LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  youtube: Youtube,
};

interface ProfileSidebarProps {
  data: ProfileData;
}

export default function ProfileSidebar({ data }: ProfileSidebarProps) {
  return (
    <Box display="flex" direction={{ base: 'col', md: 'row' }} gap={{ base: 8, lg: 12 }} align="start">
      <Box
        aspect="square"
        surface="muted"
        border
        overflow="hidden"
        display="flex"
        align="center"
        justify="center"
        width={{ base: 'full', md: imageSizes.profile }}
        maxWidth={{ base: 'full', md: imageSizes.profile }}
        shrink={0}
      >
        <User className={`w-24 h-24 text-line ${stroke.thin}`} />
      </Box>

      <Box flex={1} className="space-y-8" minWidth={0}>
        <Grid cols={1} gap={6}>
          {data.details.map((detail) => (
            <Box key={detail.label} paddingBottom={4} border="b">
              <Text
                variant="mono"
                size="xs"
                color="dim"
                weight="font-semibold"
                display="block"
                tracking="emphasized"
                uppercase
              >
                {detail.label}
              </Text>
              <Text
                variant="display"
                size="lg"
                marginTop={1}
                weight="font-bold"
                className="text-accent-navy"
              >
                {detail.value}
              </Text>
            </Box>
          ))}
        </Grid>

        <Stack gap={6}>
          <Stack gap={3}>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="emphasized" uppercase>Connect</Text>
            <Box display="flex" gap={5}>
              {data.socialLinks.map((link) => {
                const Icon = platformIcons[link.platform];
                return (
                  <Box
                    as="a"
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-navy hover:text-accent transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </Box>
                );
              })}
            </Box>
          </Stack>

        </Stack>
      </Box>
    </Box>
  );
}
