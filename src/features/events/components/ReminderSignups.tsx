import { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Event } from '@/lib/content';

interface Deadline {
  id: string;
  label: string;
  date: string;
  type: "Discount" | "Deadline" | "Reminder";
  color: string;
}

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
  const [channels, setChannels] = useState<Set<string>>(
    new Set(["email", "ical"]),
  );
  const [signed, setSigned] = useState(false);

  const deadlines: Deadline[] = [
    event.earlyBirdDate && {
      id: "early-bird",
      label: "Early-bird discount ends",
      date: event.earlyBirdDate,
      type: "Discount" as const,
      color: "text-accent border-accent/30 bg-accent/10",
    },
    event.hotelCutoffDate && {
      id: "hotel",
      label: "Hotel deadline",
      date: event.hotelCutoffDate,
      type: "Deadline" as const,
      color: "text-accent border-accent/30 bg-accent/10",
    },
  ].filter((d): d is Deadline => !!d);

  const toggleChannel = (id: string) => {
    setChannels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (deadlines.length === 0) return null;

  return (
    <Box id={id} as="section" data-testid="reminder-signups">
      <Stack gap={8}>
        <Stack gap={2}>
          <Box display="flex" align="center" gap={3}>
            <Bell className="w-8 h-8 text-accent" />
            <Text variant="headline" size="3xl" weight="font-black">
              Stay on Top of What Matters
            </Text>
          </Box>
          <Text size="sm" color="dim">
            We'll send friendly reminders so you never miss a deadline.
          </Text>
        </Stack>

        <Grid cols={{ base: 1, md: 2 }} gap={8}>
          {/* Deadlines list */}
          <Stack gap={3}>
            {deadlines.map((d) => (
              <Box
                key={d.id}
                border
                radius="lg"
                paddingX={5}
                paddingY={4}
                display="flex"
                align="center"
                justify="between"
                surface="surface"
              >
                <Stack gap={0.5}>
                  <Text size="sm" weight="font-bold">
                    {d.label}
                  </Text>
                  <Text variant="mono" size="xs" color="dim">
                    {new Date(d.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                </Stack>
                <Box
                  border
                  paddingX={2}
                  paddingY={0.5}
                  radius="full"
                  className={d.color}
                >
                  <Text variant="mono" size="micro" weight="font-bold">
                    {d.type.toUpperCase()}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>

          {/* Channel picker + CTA */}
          <Stack gap={6}>
            <Stack gap={3}>
              <Text
                variant="mono"
                size="xs"
                weight="font-bold"
                color="dim"
                uppercase
                tracking="widest"
              >
                How you'll be notified
              </Text>
              <Grid cols={2} gap={3}>
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
                    className={`transition-all ${
                      channels.has(ch.id)
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-line text-text-dim hover:border-accent/40"
                    }`}
                  >
                    <Box
                      width={4}
                      height={4}
                      border
                      radius="sm"
                      display="flex"
                      align="center"
                      justify="center"
                      className={
                        channels.has(ch.id)
                          ? "border-accent bg-accent"
                          : "border-line"
                      }
                    >
                      {channels.has(ch.id) && (
                        <Check className="w-3 h-3 text-bg" />
                      )}
                    </Box>
                    <Text size="xs" weight="font-bold">
                      {ch.label}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Stack>

            {signed ? (
              <Box
                border
                radius="lg"
                padding={4}
                surface="accent"
                className="border-accent/30 bg-accent/10 text-center"
              >
                <Box display="flex" align="center" justify="center" gap={2}>
                  <Check className="w-5 h-5 text-accent" />
                  <Text weight="font-bold" color="accent">
                    You're signed up!
                  </Text>
                </Box>
                <Box marginTop={1}>
                  <Text size="xs" color="dim">
                    You can update preferences anytime.
                  </Text>
                </Box>
              </Box>
            ) : (
              <Box
                as="button"
                onClick={() => setSigned(true)}
                radius="lg"
                padding={4}
                cursor="pointer"
                className="bg-accent text-bg hover:bg-accent/90 transition-colors font-bold text-sm tracking-widest uppercase"
              >
                Sign me up!
              </Box>
            )}

            <Text size="xs" color="dim" className="text-center">
              You can update preferences anytime.
            </Text>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
}
