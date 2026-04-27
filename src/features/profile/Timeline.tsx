import { Box, Stack, Text } from '@/layouts/Primitives';
import { TimelineItem, TimelineBadgeType } from './types';
import { cn } from '@/lib/utils';

interface TimelineProps {
  items: TimelineItem[];
}

const BADGE_STYLES: Record<TimelineBadgeType, string> = {
  pivotal: "bg-brand-green-bg text-brand-green-text",
  site: "bg-brand-blue-bg text-brand-blue-text",
  events: "bg-brand-amber-bg text-brand-amber-text",
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <Stack gap={4} marginBottom={8}>
      <Text variant="mono" size="micro" color="dim" tracking="emphasized">Dance journey</Text>
      <Stack gap={0}>
        {items.map((item, idx) => (
          <Box key={idx} display="flex" gap={4} position="relative" paddingBottom={idx === items.length - 1 ? 0 : 4}>
            <Stack align="center" width={10} shrink={0}>
              <Box marginBottom={1.5}>
                <Text variant="mono" size="micro" color="dim" weight="font-medium" className="whitespace-nowrap">
                  {item.year}
                </Text>
              </Box>
              <Box
                width={2.5}
                height={2.5}
                radius="full"
                shrink={0}
                className={cn(
                  "z-10",
                  !item.future && idx === items.length - 2 ? "bg-accent-navy border-2 border-accent-navy" : "",
                  !item.future && idx !== items.length - 2 ? "bg-bg border-line border-1.5" : "",
                  item.future ? "bg-surface border-dashed border-line border-1.5" : ""
                )}
              />
              {idx < items.length - 1 && (
                <Box
                  width="1px"
                  flex={true}
                  marginTop={1}
                  className="bg-line"
                />
              )}
            </Stack>

            <Box flex={true} paddingBottom={1}>
              <Box marginBottom={1}>
                <Text variant="display" size="sm" weight="font-medium" className="text-accent-navy leading-tight">
                  {item.event}
                </Text>
              </Box>
              <Text variant="body" size="sm" color="body" className="leading-normal">
                {item.detail}
              </Text>
              {item.badge && (
                <Box marginTop={1}>
                  <Text
                    variant="mono"
                    size="micro"
                    paddingX={2}
                    paddingY={0.5}
                    radius="sm"
                    className={cn(
                      "inline-block",
                      BADGE_STYLES[item.badge.type]
                    )}
                  >
                    {item.badge.text}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
