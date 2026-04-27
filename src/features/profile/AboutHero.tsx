import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { ProfileData } from './types';
import { COLORS } from './constants';

interface AboutHeroProps {
  data: ProfileData;
}

export default function AboutHero({ data }: AboutHeroProps) {
  return (
    <Box
      display="grid"
      cols={{ base: 1, md: "auto 1fr" }}
      gap={{ base: 6, md: 10 }}
      align="start"
      paddingBottom={8}
      border="b"
      marginBottom={8}
    >
      <Stack align="center" gap={3} shrink={0}>
        <Box
          width={20}
          height={20}
          radius="full"
          display="flex"
          align="center"
          justify="center"
          border
          style={{ backgroundColor: COLORS.blue.bg, borderColor: COLORS.blue.border }}
        >
          <Text
            variant="display"
            size="2xl"
            weight="font-medium"
            style={{ color: COLORS.blue.text }}
          >
            AA
          </Text>
        </Box>
        <Box display="flex" align="center" gap={2}>
          <Box width={1.5} height={1.5} radius="full" style={{ backgroundColor: COLORS.green.status }} />
          <Text variant="mono" size="micro" color="dim">San Francisco</Text>
        </Box>
      </Stack>

      <Stack gap={4}>
        <Stack gap={2}>
          <Text variant="display" size="2xl" weight="font-medium" className="text-accent-navy">
            {data.name}
          </Text>
          <Box display="flex" gap={2} wrap>
            <Text
              variant="mono"
              size="micro"
              paddingX={2}
              paddingY={1}
              radius="sm"
              className="border"
              style={{ backgroundColor: COLORS.blue.bg, color: COLORS.blue.text, borderColor: COLORS.blue.borderLight }}
            >
              MIT Roboticist
            </Text>
            <Text
              variant="mono"
              size="micro"
              paddingX={2}
              paddingY={1}
              radius="sm"
              className="border"
              style={{ backgroundColor: COLORS.green.bg, color: COLORS.green.text, borderColor: COLORS.green.border }}
            >
              WCS Competitor
            </Text>
            <Text
              variant="mono"
              size="micro"
              paddingX={2}
              paddingY={1}
              radius="sm"
              className="border"
              style={{ backgroundColor: COLORS.neutral.bg, color: COLORS.neutral.text, borderColor: COLORS.neutral.border }}
            >
              Intermediate follow
            </Text>
          </Box>
        </Stack>

        <Text variant="body" size="base" color="body" style={{ maxWidth: '420px' }}>
          {data.bio}
        </Text>

        <Box display="flex" gap={2} wrap>
          <Button variant="primary" size="sm">Hire me for a project</Button>
          <Button variant="outline" size="sm">View CV</Button>
          <Button variant="outline" size="sm">Get in touch</Button>
        </Box>
      </Stack>
    </Box>
  );
}
