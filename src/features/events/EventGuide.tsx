
import { Share2, Sparkles } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

import { EventNavigation } from './components/EventNavigation';
import { ThemeSpotlight } from './components/ThemeSpotlight';
import { CuratedGear } from './components/CuratedGear';
import { EventReminders } from './components/EventReminders';
import { EventTravel } from './components/EventTravel';
import { EventNotes } from './components/EventNotes';
import { useEventDetail } from './useEventDetail';
import { SECTION_SPACING } from './constants';
import { getEventSchema } from './schema';

import { ArticleLayout } from '@/components/article/ArticleLayout';
import { PostHeader } from '@/components/article/PostHeader';
import { ArticleFeatureCard } from '@/components/article/ArticleFeatureCard';
import { ArticleSidebar, SidebarCard } from '@/components/article/ArticleSidebar';
import { ArticleFooter } from '@/components/article/ArticleFooter';
import { readingTime as getReadingTime } from '@/lib/content';

export function EventGuide() {
  const {
    event,
    isLoading,
    isError,
    error,
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    navigate,
  } = useEventDetail();

  if (isLoading) {
    return (
      <Box padding="panel" textAlign="center">
        <Text variant="mono" size="xs" color="dim">Loading Guide...</Text>
      </Box>
    );
  }

  if (isError || !event) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl" color="main">
            {isError ? "Error Loading Event" : "Event Not Found"}
          </Text>
          {isError && error && (
            <Text variant="body" size="sm" color="dim">
              {error instanceof Error ? error.message : "An unexpected error occurred."}
            </Text>
          )}
          <Box as="button" onClick={() => navigate('/events')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Events</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.excerpt,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  const shareAction = (
    <Stack as="button" direction="row" onClick={share} align="center" gap={1.5} className="text-text-dim/60 hover:text-accent transition-colors">
      <Share2 className="w-3.5 h-3.5" />
      <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wider">SHARE</Text>
    </Stack>
  );

  const rt = event.readingTime || `${getReadingTime(event.content)} min read`;

  const heroVisual = event.heroConfig ? (
    <ArticleFeatureCard
      type={event.heroConfig.type}
      title={event.heroConfig.title}
      subtitle={event.heroConfig.subtitle}
      caption={event.heroConfig.caption}
      image={event.heroImage}
    />
  ) : event.heroImage ? (
    <ArticleFeatureCard image={event.heroImage} />
  ) : null;

  const sidebarSnapshot = [
    { label: "Location", value: event.city },
    { label: "Schedule", value: event.schedule },
    { label: "Theme", value: event.theme?.name || "None" },
    { label: "Venue", value: event.location }
  ];

  if (event.registrationDeadline) {
    sidebarSnapshot.push({ label: "Deadline", value: event.registrationDeadline });
  }

  return (
    <ArticleLayout
      onBack={() => navigate('/events')}
      backLabel="Back to Events"
      hero={
        <PostHeader
          category={event.category}
          date={event.schedule}
          readTime={rt}
          title={event.title}
          dek={event.dek || event.excerpt}
          author={event.author}
          authorAvatar={event.authorAvatar}
          shareAction={shareAction}
          visual={heroVisual}
          tags={event.tags}
        />
      }
      sidebar={
        <ArticleSidebar
          snapshot={sidebarSnapshot}
          custom={
            <SidebarCard title="Event Navigation">
              <EventNavigation />
            </SidebarCard>
          }
        />
      }
      footer={<ArticleFooter related={relatedEvents} />}
    >
      <SEO
        title={`${event.title} | Event Resource Guide`}
        description={event.excerpt}
        jsonLd={getEventSchema(event)}
      />

      <Stack gap={SECTION_SPACING}>
        {event.whyAttending && (
          <Box
            data-testid="why-attending"
            padding={{ base: 6, md: 8 }}
            radius="2xl"
            surface="surface-alt"
            border
            className="backdrop-blur-sm relative overflow-hidden group"
          >
            <Box
              position="absolute"
              top={-20}
              right={-20}
              width={40}
              height={40}
              className="bg-accent/5 blur-3xl rounded-full"
            />

            <Stack gap={4}>
              <Box display="flex" align="center" gap={2} color="accent">
                <Sparkles size={16} />
                <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">
                  Why I&apos;m Attending
                </Text>
              </Box>
              <Text variant="body" size="lg" leading="relaxed" color="main" className="relative z-10 italic font-medium">
                &ldquo;{event.whyAttending}&rdquo;
              </Text>
            </Stack>
          </Box>
        )}

        {event.theme && (
          <ThemeSpotlight
            id="theme"
            title={event.theme.name}
            label={event.theme.label}
            description={event.theme.description || ''}
            colors={event.theme.colors}
            outfits={themeOutfits}
            accessories={themeAccessories}
          />
        )}

        {gearSections.length > 0 && (
          <CuratedGear
            id="gear"
            title={`Gear for ${event.title}`}
            sections={gearSections}
          />
        )}

        <EventReminders id="reminders" event={event} />

        <EventTravel id="travel" notes={event.description} />

        <EventNotes id="notes" content={event.content} />
      </Stack>
    </ArticleLayout>
  );
}
