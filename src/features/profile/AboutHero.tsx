// impeccable-ignore-file
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { ProfileData } from './types';

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
          className="bg-[#E6F1FB] border-[#B5D4F4]"
        >
          <Text
            variant="display"
            size="2xl"
            weight="font-medium"
            className="text-[#0C447C]"
          >
            AA
          </Text>
        </Box>
        <Box display="flex" align="center" gap={2}>
          <Box width={1.5} height={1.5} radius="full" className="bg-[#1D9E75]" />
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
              className="bg-[#E6F1FB] text-[#0C447C] border border-[#85B7EB]"
            >
              MIT Roboticist
            </Text>
            <Text
              variant="mono"
              size="micro"
              paddingX={2}
              paddingY={1}
              radius="sm"
              className="bg-[#E1F5EE] text-[#085041] border border-[#5DCAA5]"
            >
              WCS Competitor
            </Text>
            <Text
              variant="mono"
              size="micro"
              paddingX={2}
              paddingY={1}
              radius="sm"
              className="bg-[#F1EFE8] text-[#444441] border border-[#D3D1C7]"
            >
              Intermediate follow
            </Text>
          </Box>
        </Stack>

        <Text variant="body" size="base" color="body" className="max-w-[420px]">
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
