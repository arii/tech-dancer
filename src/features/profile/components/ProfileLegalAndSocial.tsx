import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SOCIAL_LINKS } from '@/config/constants';

const ProfileLegalAndSocial = () => {
  return (
    <Box
      as="section"
      maxWidth="6xl"
      marginX="auto"
      paddingX={4}
      marginTop={{ base: 24, lg: 32 }}
      paddingTop={{ base: 16, lg: 20 }}
      paddingBottom={{ base: 12, lg: 16 }}
      border="t"
      className="border-line/80"
    >
      <Grid cols={{ default: 1, md: 2 }} gap={12}>
        {/* Social Links */}
        <Stack gap={4}>
          <Text
            as="h4"
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

        {/* Privacy & Terms */}
        <Grid
          cols={{ default: 1, sm: 2 }}
          gap={6}
          paddingLeft={{ md: 8 }}
          paddingTop={{ default: 8, md: 0 }}
          className="text-xs text-text-dim border-t md:border-t-0 md:border-l md:border-line/40"
        >
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
                Privacy Policy
              </Text>
              <Text variant="body" size="xs" className="leading-relaxed text-text-dim">
                This site is a personal project. We do not sell your data. We use basic analytics to understand site traffic. Form info is used solely for its intended purpose.
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
                Terms of Use
              </Text>
              <Text variant="body" size="xs" className="leading-relaxed text-text-dim">
                Content is provided for informational and entertainment purposes. We are not responsible for issues arising from tools, products, or travel advice mentioned.
              </Text>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileLegalAndSocial;
