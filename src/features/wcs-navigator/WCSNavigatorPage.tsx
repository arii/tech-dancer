import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { Compass, ToggleLeft, ToggleRight, Sparkles, CheckCircle, ArrowRight, Layers } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { ActionButton } from '@/components/ui/ActionButton';
import { CALIFORNIA_2026_EVENTS, WCSCaliforniaEvent } from './data/californiaEvents';
import { WCSPersona } from './data/personas';
import { EventSelector } from './components/EventSelector';
import { PersonaChips } from './components/PersonaChips';
import { DropzoneUpload } from './components/DropzoneUpload';

export const WCSNavigatorPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<WCSCaliforniaEvent>(CALIFORNIA_2026_EVENTS[0]);
  const [selectedPersona, setSelectedPersona] = useState<WCSPersona | null>(null);
  const [isMockMode, setIsMockMode] = useState<boolean>(true);
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customUrl, setCustomUrl] = useState<string | null>(null);
  const [questionnaire, setQuestionnaire] = useState({
    competitionLevel: 'Novice / New Competitor',
    workshopInterest: 'All-Levels Technique',
    socialDanceStyle: 'Active Social Dancing (Until 2 AM)',
    sleepSchedule: 'Standard Night',
    goals: 'Optimize workshop schedule and competition prelim timing'
  });

  const handleSelectPersona = (persona: WCSPersona) => {
    setSelectedPersona(persona);
    setQuestionnaire({
      ...persona.sampleQuestionnaire
    });
  };

  return (
    <Box as="section" maxWidth="7xl" marginX="auto" width="full">
      <SEO
        title="WCS Navigator — California 2026 Event Planner & Persona Selector"
        description="Interactive WCS Navigator entry view pre-loaded with 5 California 2026 West Coast Swing events, 4 social dance personas, PDF/URL schedule ingestion, and mock vs backend mode toggle."
        keywords="West Coast Swing, WCS Navigator, California 2026 WCS events, dance persona, schedule ingestion, South Bay Dance Fling, Boogie by the Bay, US Open Swing"
      />

      <Stack gap={8} width="full">
        {/* Header & Mode Toggle Bar */}
        <Box display="flex" justify="between" align="center" wrap="wrap" gap={4} border="b" paddingBottom={4}>
          <PageHeader
            label="DEVAI_NAVIGATOR"
            title="WCS Navigator (California 2026)"
            subtitle="Preset selector, persona questionnaire, and PDF/URL schedule parser for West Coast Swing event weekend optimization."
            as="h1"
            paddingBottom={0}
            border="none"
          />

          {/* Mode Switch Toggle */}
          <Box
            as="button"
            type="button"
            onClick={() => setIsMockMode(!isMockMode)}
            paddingX={4}
            paddingY={2.5}
            surface="muted"
            radius="lg"
            border
            display="flex"
            align="center"
            gap={3}
            cursor="pointer"
            className="border-line hover:border-accent transition-colors shrink-0"
          >
            <Box display="flex" align="center" gap={2}>
              <Icon icon={isMockMode ? ToggleLeft : ToggleRight} size="md" color="accent" />
              <Text variant="mono" size="xs" weight="font-bold" color="main">
                Mode: {isMockMode ? 'Mock Preset Mode' : 'Live Backend API'}
              </Text>
            </Box>
            <Text size="micro" radius="sm" paddingX={2} paddingY={0.5} className={isMockMode ? "bg-brand-cyan/20 text-brand-cyan font-bold" : "bg-brand-amber/20 text-brand-amber font-bold"}>
              {isMockMode ? 'INSTANT LOCAL DEMO' : 'REMOTE API'}
            </Text>
          </Box>
        </Box>

        {/* 1. Event Selector */}
        <Box surface="surface" padding={6} radius="xl" border className="border-line">
          <EventSelector
            selectedEventId={selectedEvent.id}
            onSelectEvent={setSelectedEvent}
          />
        </Box>

        {/* 2. Persona Quick-Select */}
        <Box surface="surface" padding={6} radius="xl" border className="border-line">
          <PersonaChips
            selectedPersonaId={selectedPersona?.id || null}
            onSelectPersona={handleSelectPersona}
          />
        </Box>

        {/* 3. Dropzone Upload & URL Ingestion */}
        <Box surface="surface" padding={6} radius="xl" border className="border-line">
          <DropzoneUpload
            onIngestPdf={(file) => {
              setCustomFile(file);
              setCustomUrl(null);
            }}
            onIngestUrl={(url) => {
              setCustomUrl(url);
              setCustomFile(null);
            }}
          />
        </Box>

        {/* 4. Active Parameters & Questionnaire Overview */}
        <Grid cols={{ base: 1, lg: 12 }} gap={6} width="full">
          {/* Configured Parameters Panel */}
          <Box span={{ base: 1, lg: 7 }} surface="surface" padding={6} radius="xl" border className="border-line">
            <Stack gap={4}>
              <Box display="flex" align="center" gap={2} border="b" paddingBottom={3}>
                <Icon icon={Compass} size="md" color="accent" />
                <Text variant="headline" size="lg" weight="font-black">
                  Active Navigator Configuration
                </Text>
              </Box>

              <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                <Box padding={3} surface="muted" radius="md">
                  <Text size="micro" color="accent" uppercase tracking="widest" weight="font-bold">Target Event</Text>
                  <Text weight="font-black" size="sm" color="main" marginTop={1}>{selectedEvent.name}</Text>
                  <Text size="micro" color="dim">{selectedEvent.location} • {selectedEvent.dates}</Text>
                </Box>

                <Box padding={3} surface="muted" radius="md">
                  <Text size="micro" color="accent" uppercase tracking="widest" weight="font-bold">Active Persona</Text>
                  <Text weight="font-black" size="sm" color="main" marginTop={1}>
                    {selectedPersona ? selectedPersona.name : 'Custom / None'}
                  </Text>
                  <Text size="micro" color="dim">
                    {selectedPersona ? selectedPersona.tagline : 'Manual Questionnaire Mode'}
                  </Text>
                </Box>

                <Box padding={3} surface="muted" radius="md">
                  <Text size="micro" color="accent" uppercase tracking="widest" weight="font-bold">Schedule Source</Text>
                  <Text weight="font-black" size="sm" color="main" marginTop={1}>
                    {customFile ? `PDF: ${customFile.name}` : customUrl ? `URL: ${customUrl}` : 'Official Preset Schedule'}
                  </Text>
                  <Text size="micro" color="dim">
                    {isMockMode ? 'Mock Local Engine' : 'Live Parser API'}
                  </Text>
                </Box>

                <Box padding={3} surface="muted" radius="md">
                  <Text size="micro" color="accent" uppercase tracking="widest" weight="font-bold">Execution Engine</Text>
                  <Text weight="font-black" size="sm" color="main" marginTop={1}>
                    {isMockMode ? 'Mock Preset Mode' : 'Backend API Service'}
                  </Text>
                  <Text size="micro" color="dim">
                    {isMockMode ? 'Deterministic local response' : 'Delegated API client'}
                  </Text>
                </Box>
              </Grid>

              {/* Questionnaire Auto-fill Inputs */}
              <Stack gap={3} marginTop={2}>
                <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
                  Tailored Preferences & Objectives
                </Text>

                <Grid cols={{ base: 1, sm: 2 }} gap={3}>
                  <Stack gap={1}>
                    <Text size="micro" color="dim" weight="font-bold">Competition Level</Text>
                    <input
                      type="text"
                      value={questionnaire.competitionLevel}
                      onChange={(e) => setQuestionnaire({ ...questionnaire, competitionLevel: e.target.value })}
                      className="bg-surface border border-line rounded text-xs text-white focus:outline-none focus:border-brand-cyan"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text size="micro" color="dim" weight="font-bold">Workshop Track Focus</Text>
                    <input
                      type="text"
                      value={questionnaire.workshopInterest}
                      onChange={(e) => setQuestionnaire({ ...questionnaire, workshopInterest: e.target.value })}
                      className="bg-surface border border-line rounded text-xs text-white focus:outline-none focus:border-brand-cyan"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text size="micro" color="dim" weight="font-bold">Social Dance Style</Text>
                    <input
                      type="text"
                      value={questionnaire.socialDanceStyle}
                      onChange={(e) => setQuestionnaire({ ...questionnaire, socialDanceStyle: e.target.value })}
                      className="bg-surface border border-line rounded text-xs text-white focus:outline-none focus:border-brand-cyan"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text size="micro" color="dim" weight="font-bold">Sleep & Energy Profile</Text>
                    <input
                      type="text"
                      value={questionnaire.sleepSchedule}
                      onChange={(e) => setQuestionnaire({ ...questionnaire, sleepSchedule: e.target.value })}
                      className="bg-surface border border-line rounded text-xs text-white focus:outline-none focus:border-brand-cyan"
                    />
                  </Stack>
                </Grid>
              </Stack>
            </Stack>
          </Box>

          {/* Action CTA & Summary Card */}
          <Box span={{ base: 1, lg: 5 }} surface="muted" padding={6} radius="xl" border display="flex" flex="col" justify="between" className="border-brand-cyan/30">
            <Stack gap={4}>
              <Box display="flex" align="center" gap={2}>
                <Icon icon={Sparkles} size="md" color="accent" />
                <Text variant="headline" size="lg" weight="font-black">
                  Generate Itinerary
                </Text>
              </Box>

              <Text size="sm" color="dim" leading="relaxed">
                Ready to generate your custom West Coast Swing event weekend itinerary for <Text weight="font-bold" color="main">{selectedEvent.name}</Text>?
              </Text>

              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={CheckCircle} size="xs" color="accent" />
                  <Text size="xs" color="dim">Pre-loaded with {CALIFORNIA_2026_EVENTS.length} California 2026 fixtures</Text>
                </Box>
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={CheckCircle} size="xs" color="accent" />
                  <Text size="xs" color="dim">4 Social dance personas with auto-filled questionnaire</Text>
                </Box>
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={CheckCircle} size="xs" color="accent" />
                  <Text size="xs" color="dim">PDF and URL custom schedule ingestion ready</Text>
                </Box>
              </Stack>
            </Stack>

            <Stack gap={3} marginTop={6}>
              <ActionButton
                variant="primary"
                paddingX={6}
                paddingY={3}
                width="full"
                onClick={() => {
                  alert(`[WCS Navigator] Generated itinerary for ${selectedEvent.name} (${selectedPersona ? selectedPersona.name : 'Custom Persona'}) in ${isMockMode ? 'Mock' : 'Live Backend'} mode!`);
                }}
              >
                Generate Weekend Navigator
                <Icon icon={ArrowRight} size="sm" />
              </ActionButton>

              <Box display="flex" align="center" justify="center" gap={1}>
                <Icon icon={Layers} size="xs" color="dim" />
                <Text size="micro" color="dim">
                  WCS Navigator Infrastructure
                </Text>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
};
