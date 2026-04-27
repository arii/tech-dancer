// impeccable-ignore-file
import { Box, Stack, Text } from '@/layouts/Primitives';
import { TimelineItem } from './types';
import { cn } from '@/lib/utils';

interface TimelineProps {
  items: TimelineItem[];
}

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
                  !item.future && idx !== items.length - 2 ? "bg-bg border-[1.5px] border-line" : "",
                  item.future ? "bg-surface border-[1.5px] border-dashed border-line" : ""
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
                      // impeccable-ignore
                      item.badge === 'Pivotal' && "bg-[#E1F5EE] text-[#085041]",
                      // impeccable-ignore
                      item.badge === 'This site' && "bg-[#E6F1FB] text-[#0C447C]",
                      // impeccable-ignore
                      item.badge.includes('events') && "bg-[#FAEEDA] text-[#633806]"
                    )}
                  >
                    {item.badge}
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
