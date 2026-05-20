import { useMemo, useState } from 'react';
import { Download, Calendar, Mail, Smartphone, Bell, CheckCircle2, Trophy, Hotel, Plane, ShieldCheck, Briefcase } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';
import { calculateTimeline } from '@/features/lab/wsdc-reminders/lib/timeline-engine';
import { generateICS, downloadICS } from '@/features/lab/wsdc-reminders/lib/ics-generator';
import { TimelineItem } from '@/features/lab/wsdc-reminders/types';
import { Event } from '@/lib/content';
import { ActionButton } from '@/components/ui/ActionButton';
import { cn } from '@/lib/utils';

interface EventRemindersProps {
  event: Event;
  id?: string;
}

const ICON_MAP: Record<string, any> = {
  'flight-track': Plane,
  'early-bird': Trophy,
  'registration-deadline': CheckCircle2,
  'hotel-block': Hotel,
  'comp-window': CheckCircle2,
  'cancel-safety': ShieldCheck,
  'packing-reminder': Briefcase,
};

const BADGE_MAP: Record<string, string> = {
  'flight-track': 'Logistics',
  'early-bird': 'Money',
  'registration-deadline': 'Required',
  'hotel-block': 'Logistics',
  'comp-window': 'Action',
  'cancel-safety': 'Safety',
  'packing-reminder': 'Prep',
};

export function EventReminders({ event, id }: EventRemindersProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['calendar']);

  const timeline = useMemo(() => {
    const anchors = {
      title: event.title,
      startDate: event.startDate || event.date,
      earlyBirdDate: event.earlyBirdDate,
      registrationDeadline: event.registrationDeadline,
      hotelCutoffDate: event.hotelCutoffDate,
      packingReminderDate: event.packingReminderDate,
      url: event.url
    };

    if (!anchors.startDate) return [];

    return calculateTimeline(anchors).map(item => ({
      ...item,
      formattedDate: item.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    }));
  }, [event]);

  const hasReminders = useMemo(() => {
    return event.earlyBirdDate || event.registrationDeadline || event.hotelCutoffDate || event.packingReminderDate;
  }, [event]);

  if (!hasReminders || timeline.length === 0) return null;

  const handleSync = () => {
    const icsContent = generateICS(event.title, timeline, event.url);
    downloadICS(`${event.title.replace(/\s+/g, '_')}_Reminders.ics`, icsContent);
    setIsSubscribed(true);
  };

  const toggleChannel = (channel: string) => {
    if (channel === 'calendar') return; // Always keep calendar for demo
    setSelectedChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const channels = [
    { id: 'calendar', label: 'Calendar/iCal', icon: Calendar, status: 'active' },
    { id: 'email', label: 'Email', icon: Mail, status: 'soon' },
    { id: 'push', label: 'Browser Push', icon: Bell, status: 'soon' },
    { id: 'sms', label: 'Text/SMS', icon: Smartphone, status: 'soon' },
  ];

  if (isSubscribed) {
    return (
      <Box id={id} padding={10} radius="2xl" border className="bg-accent-purple/5 border-accent-purple/20">
        <Stack gap={6} align="center" textAlign="center">
          <Box width={16} height={16} radius="full" display="flex" align="center" justify="center" className="bg-accent-purple/20 text-accent-purple">
            <CheckCircle2 className="w-8 h-8" />
          </Box>
          <Stack gap={2}>
            <Text variant="headline" size="2xl" weight="font-black">You're All Set!</Text>
            <Text color="dim">Your reminders have been generated. Check your downloads for the .ics file to sync with your calendar.</Text>
          </Stack>
          <Button variant="outline" onClick={() => setIsSubscribed(false)}>
            Update Preferences
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box id={id} as="section" data-testid="reminders">
      <Box padding={8} radius="2xl" border surface="surface" className="overflow-hidden relative">
        {/* Decorative background element */}
        <Box
          position="absolute"
          top={-20}
          right={-20}
          width={64}
          height={64}
          radius="full"
          className="bg-accent-purple/5 blur-3xl -z-10"
        />

        <Stack gap={10}>
          <Stack gap={2}>
            <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
              Journey Utility
            </Text>
            <Text variant="headline" size="3xl" weight="font-black">
              Stay on Top of What Matters
            </Text>
          </Stack>

          <Stack gap={4}>
            {timeline.filter(item => ['early-bird', 'registration-deadline', 'hotel-block', 'packing-reminder'].includes(item.id)).map((item) => {
              const Icon = ICON_MAP[item.id] || Calendar;
              return (
                <Box key={item.id} display="flex" align="center" gap={4} paddingY={3} border="b" className="last:border-b-0 border-line/40">
                  <Box
                    display="flex"
                    align="center"
                    justify="center"
                    width={10}
                    height={10}
                    radius="lg"
                    className="bg-surface-alt text-accent shrink-0"
                  >
                    <Icon className="w-5 h-5" />
                  </Box>
                  <Box flex={1}>
                    <Stack gap={0.5}>
                      <Text weight="font-bold" size="sm">{item.label}</Text>
                      <Text size="xs" color="dim">{item.formattedDate}</Text>
                    </Stack>
                  </Box>
                  <Box
                    paddingX={2}
                    paddingY={0.5}
                    radius="md"
                    className="bg-line/20"
                  >
                    <Text variant="mono" size="xxs" weight="font-bold" uppercase>
                      {BADGE_MAP[item.id]}
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Stack>

          <Stack gap={6}>
            <Text variant="mono" size="xs" weight="font-bold" uppercase color="dim">
              Notification Channels
            </Text>
            <Grid cols={{ base: 1, sm: 2 }} gap={4}>
              {channels.map((channel) => {
                const Icon = channel.icon;
                const isSoon = channel.status === 'soon';
                return (
                  <Box
                    key={channel.id}
                    as="button"
                    onClick={() => !isSoon && toggleChannel(channel.id)}
                    display="flex"
                    align="center"
                    gap={3}
                    padding={3}
                    radius="lg"
                    border
                    className={cn(
                      "transition-all text-left relative",
                      selectedChannels.includes(channel.id) ? "border-accent-purple bg-accent-purple/5" : "border-line hover:border-line-hover",
                      isSoon && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", selectedChannels.includes(channel.id) ? "text-accent-purple" : "text-dim")} />
                    <Box flex={1}>
                      <Text size="sm" weight="font-bold">{channel.label}</Text>
                    </Box>
                    {isSoon && (
                      <Box paddingX={1.5} paddingY={0.5} radius="sm" className="bg-line/40">
                        <Text size="xxs" weight="font-bold" uppercase>Soon</Text>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Grid>

            <ActionButton
              onClick={handleSync}
              className="w-full h-14 !bg-[#8b5cf6] hover:!bg-[#7c3aed] text-white shadow-lg shadow-purple-500/20"
            >
              <Box display="flex" align="center" gap={2}>
                <Bell className="w-5 h-5" />
                <Text size="md">Set Event Reminders</Text>
              </Box>
            </ActionButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
