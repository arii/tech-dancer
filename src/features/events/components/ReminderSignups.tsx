import { useMemo, useState } from 'react';
import { Download, Bell, Check, Calendar } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { calculateTimeline } from '@/features/lab/wsdc-reminders/lib/timeline-engine';
import { generateICS, downloadICS } from '@/features/lab/wsdc-reminders/lib/ics-generator';
import { TimelineRow } from '@/features/lab/wsdc-reminders/TimelineRow';
import { TimelineItem } from '@/features/lab/wsdc-reminders/types';
import { Event } from '@/lib/content';

interface ReminderSignupsProps {
  event: Event;
  id?: string;
}

const NOTIFICATION_CHANNELS = [
  { id: "email", label: "Email" },
  { id: "browser", label: "Browser Push" },
  { id: "sms", label: "Text (SMS)" },
  { id: "ical", label: "Calendar (iCal)" },
];

export function ReminderSignups({ event, id }: ReminderSignupsProps) {
  const [channels, setChannels] = useState<Set<string>>(new Set(["email", "ical"]));
  const [isSignedUp, setIsSignedUp] = useState(false);

  const timeline = useMemo(() => {
    if (!event.startDate || !event.earlyBirdDate || !event.hotelCutoffDate) return [];

    const anchors = {
      title: event.title,
      startDate: event.startDate,
      earlyBirdDate: event.earlyBirdDate,
      hotelCutoffDate: event.hotelCutoffDate,
      url: event.url
    };

    return calculateTimeline(anchors).map(item => ({
      ...item,
      formattedDate: item.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }));
  }, [event]);

  const handleBulkSync = () => {
    if (!timeline.length) return;
    const icsContent = generateICS(event.title, timeline, event.url);
    downloadICS(`${event.title.replace(/\s+/g, '_')}_Full_Plan.ics`, icsContent);
  };

  const handleSingleSync = (item: TimelineItem) => {
    const icsContent = generateICS(event.title, [item], event.url);
    downloadICS(`${item.label.replace(/\s+/g, '_')}.ics`, icsContent);
  };

  const toggleChannel = (channelId: string) => {
    setChannels((prev) => {
      const next = new Set(prev);
      if (next.has(channelId)) next.delete(channelId);
      else next.add(channelId);
      return next;
    });
  };

  if (timeline.length === 0) return null;

  return (
    <Box id={id} as="section" data-testid="reminders">
      <Stack gap={10}>
        <Box display="flex" justify="between" align="end" wrap gap={4}>
          <SectionHeader
            eyebrow="STRATEGIC PLANNING"
            title="Stay on Top of What Matters"
          />
          <Button onClick={handleBulkSync} variant="primary">
            <Box display="flex" align="center" gap={2}>
              <Download className="w-4 h-4" />
              <Text as="span">Sync Entire Plan</Text>
            </Box>
          </Button>
        </Box>

        <Grid cols={{ base: 1, lg: 5 }} gap={12}>
          {/* Action Timeline */}
          <Box className="lg:col-span-3" position="relative">
            <Box
              position="absolute"
              left={5}
              top={0}
              bottom={0}
              width={0.5}
              surface="muted"
              display={{ base: "none", sm: "block" }}
              className="opacity-40"
            />

            <Stack gap={6}>
              {timeline.map((item) => (
                <TimelineRow
                  key={item.id}
                  item={item}
                  formattedDate={item.formattedDate!}
                  onSync={handleSingleSync}
                />
              ))}
            </Stack>
          </Box>

          {/* Signup Sidebar */}
          <Box className="lg:col-span-2">
            <Stack gap={6} position="sticky" top={24}>
              <Box border radius="xl" padding={6} surface="surface-alt">
                <Stack gap={6}>
                  <Stack gap={2}>
                    <Box display="flex" align="center" gap={2} color="accent">
                      <Bell className="w-4 h-4" />
                      <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">
                        Smart Notifications
                      </Text>
                    </Box>
                    <Text variant="body" size="sm" color="dim">
                      Get friendly alerts before deadlines so you never miss a discount window.
                    </Text>
                  </Stack>

                  <Stack gap={3}>
                    <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase tracking="widest">
                      Notify me via:
                    </Text>
                    <Grid cols={2} gap={2}>
                      {NOTIFICATION_CHANNELS.map((ch) => (
                        <Box
                          key={ch.id}
                          as="button"
                          onClick={() => toggleChannel(ch.id)}
                          border
                          radius="md"
                          paddingX={3}
                          paddingY={2}
                          display="flex"
                          align="center"
                          gap={2}
                          cursor="pointer"
                          surface={channels.has(ch.id) ? "accent" : "surface"}
                          className="transition-all hover:border-accent/40"
                        >
                          <Box
                            width={3.5}
                            height={3.5}
                            border
                            radius="sm"
                            display="flex"
                            align="center"
                            justify="center"
                            surface={channels.has(ch.id) ? "accent" : "muted"}
                          >
                            {channels.has(ch.id) && <Check className="w-2.5 h-2.5 text-bg" />}
                          </Box>
                          <Text size="micro" weight="font-bold">
                            {ch.label}
                          </Text>
                        </Box>
                      ))}
                    </Grid>
                  </Stack>

                  {isSignedUp ? (
                    <Box border radius="lg" padding={4} surface="success" textAlign="center">
                      <Box display="flex" align="center" justify="center" gap={2}>
                        <Check className="w-4 h-4" />
                        <Text weight="font-bold" size="sm">You're all set!</Text>
                      </Box>
                    </Box>
                  ) : (
                    <Button onClick={() => setIsSignedUp(true)} variant="primary" fullWidth>
                      Sign Me Up
                    </Button>
                  )}

                  <Box display="flex" align="center" gap={2} justify="center">
                    <Calendar className="w-3 h-3 text-dim" />
                    <Text size="tiny" color="dim">Syncs to your local calendar</Text>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
