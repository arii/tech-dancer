import { Box, Stack, Text } from '@/layouts/Primitives';
import { SkillGroup } from './types';
import { cn } from '@/lib/utils';

interface TechStackProps {
  groups: SkillGroup[];
}

export default function TechStack({ groups }: TechStackProps) {
  return (
    <Stack gap={4} marginBottom={8}>
      <Text variant="mono" size="micro" color="dim" tracking="emphasized">Technical stack</Text>
      <Stack gap={4}>
        {groups.map((group) => (
          <Stack key={group.label} gap={2}>
            <Text variant="mono" size="micro" color="dim" weight="font-medium" tracking="emphasized">
              {group.label}
            </Text>
            <Box display="flex" wrap gap={1.5}>
              {group.skills.map((skill) => (
                <Text
                  key={skill.name}
                  variant="mono"
                  size="micro"
                  paddingX={2.5}
                  paddingY={1}
                  radius="sm"
                  border
                  className={cn(
                    "transition-colors",
                    skill.strong
                      ? "bg-bg text-text-main border-line font-medium"
                      : "bg-surface-alt text-text-dim border-line/50"
                  )}
                >
                  {skill.name}
                </Text>
              ))}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
