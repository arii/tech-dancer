import { Box, Stack, Text } from '@/layouts/Primitives';
import { CompetitionProfile } from './types';
import { cn } from '@/lib/utils';

interface CompetitionCardProps {
  profile: CompetitionProfile;
}

export default function CompetitionCard({ profile }: CompetitionCardProps) {
  return (
    <Stack gap={4} marginBottom={8}>
      <Text variant="mono" size="micro" color="dim" tracking="emphasized">Competition profile</Text>
      <Box border radius="lg" padding={4} display="grid" cols={{ base: 1, md: 2 }} gap={4}>
        <Stack gap={4}>
          <Stack gap={1}>
            <Text variant="mono" size="micro" color="dim" weight="font-medium" tracking="emphasized">WSDC level</Text>
            <Text variant="display" size="base" weight="font-medium" className="text-accent-navy">{profile.level}</Text>
            <Text variant="body" size="sm" color="dim">Working toward Advanced</Text>
            <Box display="flex" gap={1} marginTop={1.5}>
              {[1, 2, 3, 4, 5].map((seg) => (
                <Box
                  key={seg}
                  height={1.5}
                  flex={true}
                  radius="subtle"
                  className={cn(
                    seg <= profile.levelProgress ? "bg-accent-navy" : "bg-line"
                  )}
                />
              ))}
            </Box>
          </Stack>

          <Stack gap={1}>
            <Text variant="mono" size="micro" color="dim" weight="font-medium" tracking="emphasized">Home venue</Text>
            <Text variant="display" size="base" weight="font-medium" className="text-accent-navy">{profile.homeVenue}</Text>
            <Text variant="body" size="sm" color="dim">{profile.homeVenueDetail}</Text>
          </Stack>
        </Stack>

        <Stack gap={4}>
          <Stack gap={2}>
            <Text variant="mono" size="micro" color="dim" weight="font-medium" tracking="emphasized">Focus areas</Text>
            <Box display="flex" wrap gap={1}>
              {profile.focusAreas.map((area) => (
                <Text
                  key={area}
                  variant="mono"
                  size="micro"
                  paddingX={2}
                  paddingY={0.5}
                  radius="subtle"
                  border
                  className="bg-surface text-text-dim border-line/50"
                >
                  {area}
                </Text>
              ))}
            </Box>
          </Stack>

          <Stack gap={2}>
            <Text variant="mono" size="micro" color="dim" weight="font-medium" tracking="emphasized">Events circuit</Text>
            <Box display="flex" wrap gap={1}>
              {profile.eventsCircuit.map((event) => (
                <Text
                  key={event}
                  variant="mono"
                  size="micro"
                  paddingX={2}
                  paddingY={0.5}
                  radius="subtle"
                  border
                  className="bg-surface text-text-dim border-line/50"
                >
                  {event}
                </Text>
              ))}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
