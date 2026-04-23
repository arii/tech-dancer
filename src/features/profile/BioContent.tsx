import { Box, Stack, Text } from '@/layouts/Primitives';
import { ProfileData } from './types';

interface BioContentProps {
  data: ProfileData;
}

export default function BioContent({ data }: BioContentProps) {
  return (
    <Stack gap={16}>
      {data.sections.map((section) => (
        <Stack key={section.id} gap={4}>
          <Box paddingBottom={4} border="b">
            <Text
              variant="displayLower"
              size="2xl"
              weight="font-black"
              className="text-accent-navy"
            >
              {section.title}
            </Text>
          </Box>
          <Box maxWidth="70ch">
            <Text
              variant="body"
              size="lg"
              color="body"
              className="leading-relaxed"
            >
              {section.content}
            </Text>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}
