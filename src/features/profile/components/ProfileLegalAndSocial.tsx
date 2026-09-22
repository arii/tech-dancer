import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SOCIAL_LINKS } from '@/config/constants';

const ProfileLegalAndSocial = () => {
  return (
    <Box
      as="section"
      maxWidth="6xl"
      marginX="auto"
      paddingX={4}
      marginTop={{ base: 20, lg: 28 }}
      paddingTop={{ base: 12, lg: 16 }}
      paddingBottom={{ base: 8, lg: 12 }}
      border="t"
      className="border-line/80"
    >
      <Grid cols={{ default: 1, md: 2 }} gap={10}>
        {/* Social Links */}
        <Stack gap={4}>
          <Text
            as="h3"
            variant="mono"
            size="xs"
            weight="font-bold"
            uppercase
            tracking="widest"
            className="text-brand-cyan"
          >
            Connect &amp; Social
          </Text>
          <Box display="flex" wrap gap={2.5}>
            <Box
              as="a"
              href={SOCIAL_LINKS.INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              paddingX={4}
              paddingY={2}
              radius="lg"
              border
              className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono"
            >
              INSTAGRAM
            </Box>
            <Box
              as="a"
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noreferrer"
              paddingX={4}
              paddingY={2}
              radius="lg"
              border
              className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono"
            >
              LINKEDIN
            </Box>
            <Box
              as="a"
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noreferrer"
              paddingX={4}
              paddingY={2}
              radius="lg"
              border
              className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono"
            >
              GITHUB
            </Box>
          </Box>
        </Stack>

        {/* Privacy, Terms & Contact Anchor Targets */}
        <Grid
          cols={{ default: 1, sm: 3 }}
          gap={6}
          paddingLeft={{ md: 8 }}
          paddingTop={{ default: 6, md: 0 }}
          className="text-xs text-text-dim border-t md:border-t-0 md:border-l md:border-line/40"
        >
          <Box id="contact" scrollMarginTop={24}>
            <Stack gap={1.5}>
              <Text
                as="h5"
                variant="mono"
                size="xs"
                weight="font-semibold"
                uppercase
                tracking="wider"
                className="text-text-main"
              >
                Contact
              </Text>
              <Text variant="body" size="xs" className="leading-relaxed text-text-dim">
                For feedback, scoring tools, or site inquiries, reach out at <Box as="a" href="mailto:ari@boomtick.blog" className="text-brand-cyan hover:underline font-semibold">ari@boomtick.blog</Box>.
              </Text>
            </Stack>
          </Box>
          <Box id="privacy" scrollMarginTop={24}>
            <Stack gap={1.5}>
              <Text
                as="h5"
                variant="mono"
                size="xs"
                weight="font-semibold"
                uppercase
                tracking="wider"
                className="text-text-main"
              >
                Privacy
              </Text>
              <Text variant="body" size="xs" className="leading-relaxed text-text-dim">
                Personal project. No data sales. Basic privacy-preserving analytics only.
              </Text>
            </Stack>
          </Box>
          <Box id="terms" scrollMarginTop={24}>
            <Stack gap={1.5}>
              <Text
                as="h5"
                variant="mono"
                size="xs"
                weight="font-semibold"
                uppercase
                tracking="wider"
                className="text-text-main"
              >
                Terms
              </Text>
              <Text variant="body" size="xs" className="leading-relaxed text-text-dim">
                Informational content provided as-is without warranty.
              </Text>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileLegalAndSocial;
