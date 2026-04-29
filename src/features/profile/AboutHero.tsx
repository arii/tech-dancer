import { Box, Stack, Text, Button } from '@/layouts/Primitives';

interface AboutHeroProps {
  name: string;
  bio: string;
}

export default function AboutHero({ name, bio }: AboutHeroProps) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

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
          className="bg-brand-blue-bg border-brand-blue-border"
        >
          <Text
            variant="display"
            size="2xl"
            weight="font-medium"
            className="text-brand-blue-text"
          >
            {initials}
          </Text>
        </Box>
        <Box display="flex" align="center" gap={2}>
          <Box width={1.5} height={1.5} radius="full" className="bg-brand-green-status" />
          <Text variant="mono" size="micro" color="dim">San Francisco</Text>
        </Box>
      </Stack>

      <Stack gap={4}>
        <Stack gap={2}>
          <Text variant="display" size="2xl" weight="font-medium" className="text-accent-navy">
            {name}
          </Text>
          <Box display="flex" gap={2} wrap>
            <Text
              variant="mono"
              size="micro"
              paddingX={2}
              paddingY={1}
              radius="sm"
              className="border bg-brand-blue-bg text-brand-blue-text border-brand-blue-light"
            >
              MIT Roboticist
            </Text>
            <Text
              variant="mono"
              size="micro"
              paddingX={2}
              paddingY={1}
              radius="sm"
              className="border bg-brand-green-bg text-brand-green-text border-brand-green-border"
            >
              WCS Competitor
            </Text>
            <Text
              variant="mono"
              size="micro"
              paddingX={2}
              paddingY={1}
              radius="sm"
              className="border bg-brand-neutral-bg text-brand-neutral-text border-brand-neutral-border"
            >
              Intermediate follow
            </Text>
          </Box>
        </Stack>

        <Text variant="body" size="base" color="body" className="max-w-prose-narrow">
          {bio}
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
