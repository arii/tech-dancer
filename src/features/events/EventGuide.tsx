import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Calendar, Clock, Info, ExternalLink } from 'lucide-react';
import { getEventBySlug } from '@/lib/content';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { EventHero } from '@/components/ui/EventHero';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { SEO } from '@/components/SEO';

export default function EventGuide() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: event, isLoading } = useQuery({
    queryKey: ['events', slug],
    queryFn: () => slug ? getEventBySlug(slug) : undefined,
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <Box padding="panel" textAlign="center">
        <Text variant="mono" size="xs">Loading Intelligence...</Text>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Event Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Research</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'location', label: 'Location', icon: MapPin },
  ];

  return (
    <Box>
      <SEO
        title={`${event.title} | Event Guide`}
        description={event.excerpt}
      />

      <EventHero
        title={event.title}
        location={event.city}
        date={event.schedule}
        eyebrow={event.category}
      />

      {/* Sticky Tab Navigation */}
      <Box
        position="sticky"
        top={0}
        zIndex={40}
        className="bg-bg/80 backdrop-blur-md border-b border-line/10"
      >
        <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }}>
          <Box display="flex" gap={8}>
            {tabs.map((tab) => (
              <Box
                key={tab.id}
                as="a"
                href={`#${tab.id}`}
                paddingY={4}
                className="group relative cursor-pointer"
              >
                <Box display="flex" align="center" gap={2} color="dim" className="group-hover:text-accent transition-colors">
                  <tab.icon size={14} />
                  <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">
                    {tab.label}
                  </Text>
                </Box>
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  height={0.5}
                  className="bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }} paddingY={16}>
        <Grid cols={{ base: 1, lg: 3 }} gap={16}>
          {/* Main Content */}
          <Box className="lg:col-span-2">
            <Stack gap={16}>
              <Box id="overview" as="section" scrollPaddingTop={24}>
                <Stack gap={8}>
                  <Text variant="headline" size="3xl" weight="font-black">Event Overview</Text>
                  <Box className="prose prose-invert max-w-none">
                    <MarkdownRenderer content={event.content} />
                  </Box>
                  {event.link && (
                    <Box
                      as="a"
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      display="inline-flex"
                      align="center"
                      gap={2}
                      className="text-accent hover:underline"
                    >
                      <Text variant="mono" size="sm" weight="font-bold">Official Event Website</Text>
                      <ExternalLink size={14} />
                    </Box>
                  )}
                </Stack>
              </Box>

              <Box id="schedule" as="section" scrollPaddingTop={24}>
                <Stack gap={8}>
                  <Text variant="headline" size="3xl" weight="font-black">Schedule Details</Text>
                  <Box border radius="lg" padding={8} surface="surface">
                    <Stack gap={6}>
                      <Box display="flex" gap={4}>
                        <Calendar className="w-5 h-5 text-accent shrink-0" />
                        <Stack gap={1}>
                          <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Dates</Text>
                          <Text variant="body" size="lg">{event.schedule}</Text>
                        </Stack>
                      </Box>
                      {event.startDate && (
                        <Box display="flex" gap={4}>
                          <Clock className="w-5 h-5 text-accent shrink-0" />
                          <Stack gap={1}>
                            <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Starts</Text>
                            <Text variant="body" size="lg">{event.startDate}</Text>
                          </Stack>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              <Box id="location" as="section" scrollPaddingTop={24}>
                <Stack gap={8}>
                  <Text variant="headline" size="3xl" weight="font-black">Location & Venue</Text>
                  <Box border radius="lg" padding={8} surface="surface">
                    <Stack gap={6}>
                      <Box display="flex" gap={4}>
                        <MapPin className="w-5 h-5 text-accent shrink-0" />
                        <Stack gap={1}>
                          <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Venue</Text>
                          <Text variant="body" size="lg" weight="font-bold">{event.location}</Text>
                          <Text variant="body" color="dim">{event.city}</Text>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>

          {/* Sidebar/Quick Info */}
          <Box as="aside">
            <Stack gap={8} className="sticky top-24">
              <Box border radius="lg" padding={6} surface="surface-alt">
                <Stack gap={6}>
                  <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                    Quick Intelligence
                  </Text>
                  <Stack gap={4}>
                    <Box>
                      <Text variant="mono" size="micro" color="dim" uppercase>Category</Text>
                      <Text variant="body" size="sm">{event.category}</Text>
                    </Box>
                    <Box>
                      <Text variant="mono" size="micro" color="dim" uppercase>Registry Status</Text>
                      <Text variant="body" size="sm">WSDC Verified</Text>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
