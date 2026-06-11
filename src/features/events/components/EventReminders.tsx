import { useMemo, useState } from 'react';
import { Calendar, Mail, Smartphone, Bell, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';
import { calculateJourneyTimeline } from '@/features/lab/wsdc-reminders/lib/timeline-utils';
import { generateICS, downloadICS } from '@/features/lab/wsdc-reminders/lib/ics-generator';
import { Event } from '@/lib/content';
import { ActionButton } from '@/components/ui/ActionButton';
import { cn } from '@/lib/utils';

interface EventRemindersProps {
  event: Event;
  id?: string;
}

export function EventReminders({ event, id }: EventRemindersProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['calendar']);

  const displayTimeline = useMemo(() => {
    const startDate = event.startDate || event.date;
    if (!startDate) return [];

    return calculateJourneyTimeline({
      title: event.title,
      startDate,
      earlyBirdDate: event.earlyBirdDate,
      registrationDeadline: event.registrationDeadline,
      hotelCutoffDate: event.hotelCutoffDate,
      packingReminderDate: event.packingReminderDate,
      url: event.url
    })
    .map(item => ({
      ...item,
      formattedDate: item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
  }, [event]);

  if (displayTimeline.length === 0) return null;

  const handleSync = () => {
    const icsContent = generateICS(event.title, displayTimeline, event.url);
    downloadICS(`${event.title.replace(/\s+/g, '_')}_Reminders.ics`, icsContent);
    setIsSubscribed(true);
  };

  const toggleChannel = (channel: string) => {
    if (channel !== 'calendar') {
      setSelectedChannels(prev =>
        prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
      );
    }
  };

  const channels = [
    { id: 'calendar', label: 'Calendar/iCal', icon: Calendar, status: 'active' },
    { id: 'email', label: 'Email', icon: Mail, status: 'soon' },
    { id: 'push', label: 'Browser Push', icon: Bell, status: 'soon' },
    { id: 'sms', label: 'Text/SMS', icon: Smartphone, status: 'soon' },
  ];

  if (isSubscribed) {
    return (
      <Box
        id={id}
        as="section"
        padding={10}
        radius="2xl"
        surface="warning"
        textAlign="center"
        border
      >
        <Stack gap={6} align="center">
          <Box
            width={16}
            height={16}
            radius="full"
            display="flex"
            align="center"
            justify="center"
            surface="warning"
            className="bg-accent-purple/20"
          >
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
    <Box
      id={id}
      as="section"
      data-testid="reminders"
      position="relative"
      padding={8}
      radius="2xl"
      border
      surface="surface"
      className="overflow-hidden"
    >
      <Box
        position="absolute"
        top={-5}
        right={-5}
        width={64}
        height={64}
        radius="full"
        className="bg-accent-purple/5 blur-3xl -z-10 pointer-events-none"
      />

      <Stack gap={10}>
        <Stack gap={2}>
          <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
            Event Reminders
          </Text>
          <Text variant="headline" size="3xl" weight="font-black">
            Stay on Top of What Matters
          </Text>
        </Stack>

        <Stack as="ul" gap={0}>
          {displayTimeline.map((item) => {
            const Icon = item.icon ?? Calendar;
            return (
              <Stack
                key={item.id}
                as="li"
                data-testid="timeline-row"
                direction="row"
                align="center"
                gap={4}
                paddingY={3}
                border="b"
                className="last:border-b-0 border-line/40"
              >
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
                  <Text weight="font-bold" size="sm" as="div">{item.label}</Text>
                  <Text size="xs" color="dim" as="div">{item.formattedDate}</Text>
                </Box>
                {item.badge && (
                  <Box paddingX={2} paddingY={0.5} radius="md" className="bg-line/20">
                    <Text variant="mono" size="xxs" weight="font-bold" uppercase>
                      {item.badge}
                    </Text>
                  </Box>
                )}
              </Stack>
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
                  disabled={isSoon}
                  aria-disabled={isSoon}
                  display="flex"
                  align="center"
                  gap={3}
                  padding={3}
                  radius="lg"
                  border
                  surface={selectedChannels.includes(channel.id) ? "warning" : "surface"}
                  className={cn(
                    "transition-all text-left relative",
                    !selectedChannels.includes(channel.id) && !isSoon && "hover:border-line-hover",
                    isSoon && "opacity-dim cursor-not-allowed"
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
            className="w-full h-14 !bg-accent-purple hover:!bg-accent-purple/90 text-bg shadow-lg" // impeccable-ignore
          >
            <Stack direction="row" align="center" gap={2}>
              <Bell className="w-5 h-5 text-bg" />
              <Text size="md" color="bg">Set Event Reminders</Text>
            </Stack>
          </ActionButton>
        </Stack>
      </Stack>
    </Box>
  );
}
