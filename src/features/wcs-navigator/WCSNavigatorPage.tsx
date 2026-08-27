import React, { useState, useMemo } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { Icon } from '@/components/ui/Icon';
import { ToggleLeft, ToggleRight, ArrowLeft, RefreshCw, Layers } from 'lucide-react';
import { CALIFORNIA_2026_EVENTS } from './data/californiaEvents';
import { DANCE_PERSONAS } from './data/personas';
import { MOCK_EVENT_RESULTS, createGenericMockResult, EventMockData } from './data/mockResults';
import { EventSearchHero } from './components/EventSearchHero';
import { AgentDiscoveryTransition } from './components/AgentDiscoveryTransition';
import { DynamicQuestionnaire } from './components/DynamicQuestionnaire';
import { AgentMindTrace } from './components/AgentMindTrace';
import { WorkflowExplainer } from './components/WorkflowExplainer';
import { DiscoveryResponse, PersonaChip, QuestionAnswerValue } from './types/navigator';
import { AgentDecisionTrace } from './types';

type WizardStep = 'search' | 'discovering' | 'questionnaire' | 'results';

export const WCSNavigatorPage: React.FC = () => {
  const [step, setStep] = useState<WizardStep>('search');
  const [isMockMode, setIsMockMode] = useState<boolean>(true);

  // Selected State
  const [activeEventName, setActiveEventName] = useState<string>(CALIFORNIA_2026_EVENTS[0].name);
  const [activeEventId, setActiveEventId] = useState<string>(CALIFORNIA_2026_EVENTS[0].id);

  // Data State
  const [discoveryData, setDiscoveryData] = useState<DiscoveryResponse>(
    MOCK_EVENT_RESULTS['south-bay-dance-fling-2026'].discovery
  );
  const [decisionTrace, setDecisionTrace] = useState<AgentDecisionTrace>(
    MOCK_EVENT_RESULTS['south-bay-dance-fling-2026'].decisionTrace
  );

  // Persona Chips Mapping
  const personaChips: PersonaChip[] = useMemo(() => {
    return DANCE_PERSONAS.map(p => ({
      id: p.id,
      label: p.name,
      answers: {
        competition_level: p.id === 'pure-social-dancer' ? 'social_only' : p.id === 'int-adv-competitor' ? 'advanced' : 'novice',
        wsdc_level: p.id === 'int-adv-competitor' ? 'advanced' : 'novice',
        experience_level: p.id === 'pure-social-dancer' ? 'social_only' : 'novice',
        late_night_energy: p.id === 'pure-social-dancer' || p.id === 'int-adv-competitor',
        spectator_interest: true,
        workshop_focus: p.id === 'workshop-enthusiast' ? ['technique', 'musicality', 'flow'] : ['technique']
      }
    }));
  }, []);

  // Discovery handlers
  const handleStartDiscovery = (eventName: string, eventId?: string) => {
    setActiveEventName(eventName);
    if (eventId) setActiveEventId(eventId);
    setStep('discovering');
  };

  const handleDiscoveryComplete = () => {
    const mockData: EventMockData =
      MOCK_EVENT_RESULTS[activeEventId] || createGenericMockResult(activeEventName);

    setDiscoveryData(mockData.discovery);
    setDecisionTrace(mockData.decisionTrace);
    setStep('questionnaire');
  };

  // Questionnaire submission handler
  const handleGenerateItinerary = (_answers: Record<string, QuestionAnswerValue>) => {
    setStep('results');
  };

  return (
    <Box as="section" maxWidth="7xl" marginX="auto" width="full" className="px-4 sm:px-6">
      <SEO
        title="WCS Navigator — AI Dance Convention Itinerary & Calendar Optimizer"
        description="Google Search-style AI agent for West Coast Swing conventions. Pre-scans multi-room schedules, computes backward flight buffer math, and streams calendar files."
        keywords="West Coast Swing, WCS Navigator, AI dance optimizer, California 2026 WCS events, flight buffer engine, schedule parser"
      />

      <Stack gap={8} width="full">
        {/* Top Header & Mode Toggle Bar */}
        <Box display="flex" justify="between" align="center" wrap="wrap" gap={4} border="b" paddingBottom={4}>
          <PageHeader
            label="DEVAI_NAVIGATOR"
            title="WCS Navigator (California 2026)"
            subtitle="Search an event or drop a PDF schedule. Gemini Flash discovers session structures and personalizes your weekend."
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
            <Text
              size="micro"
              radius="sm"
              paddingX={2}
              paddingY={0.5}
              className={
                isMockMode
                  ? 'bg-brand-cyan/20 text-brand-cyan font-bold'
                  : 'bg-brand-amber/20 text-brand-amber font-bold'
              }
            >
              {isMockMode ? 'INSTANT LOCAL DEMO' : 'REMOTE API'}
            </Text>
          </Box>
        </Box>

        {/* Step Progression Breadcrumb (Visible when not in search) */}
        {step !== 'search' && (
          <Box
            surface="surface"
            paddingX={5}
            paddingY={3}
            radius="xl"
            border
            display="flex"
            align="center"
            justify="between"
            wrap="wrap"
            gap={3}
            className="border-line/70"
          >
            <Box display="flex" align="center" gap={3}>
              <button
                type="button"
                onClick={() => setStep('search')}
                className="flex items-center gap-1.5 text-xs text-dim hover:text-white transition-colors"
              >
                <Icon icon={ArrowLeft} size="xs" />
                <span>Change Event</span>
              </button>
              <Text size="micro" color="dim">•</Text>
              <Text size="xs" weight="font-bold" color="main">
                {activeEventName}
              </Text>
            </Box>

            <Box display="flex" align="center" gap={2}>
              <button
                type="button"
                onClick={() => setStep('search')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-muted text-dim hover:text-white transition-colors"
              >
                <Icon icon={RefreshCw} size="xs" />
                <span>Start Over</span>
              </button>
            </Box>
          </Box>
        )}

        {/* STEP 1: Search & Ingestion Hero */}
        {step === 'search' && (
          <EventSearchHero
            onDiscoverPreset={(event) => handleStartDiscovery(event.name, event.id)}
            onDiscoverPdf={(file) => handleStartDiscovery(file.name.replace(/\.pdf$/i, ''))}
            onDiscoverUrl={(url) => handleStartDiscovery(url)}
          />
        )}

        {/* STEP 1.5: Animated Agent Discovery Scanning Transition */}
        {step === 'discovering' && (
          <AgentDiscoveryTransition
            eventName={activeEventName}
            onComplete={handleDiscoveryComplete}
          />
        )}

        {/* STEP 2: Discovered Dynamic Questionnaire & Persona Pre-Fill */}
        {step === 'questionnaire' && (
          <Stack gap={6} width="full">
            <Box surface="surface" padding={6} radius="xl" border className="border-line/70">
              <Stack gap={2} marginBottom={4} border="b" paddingBottom={3}>
                <Text variant="headline" size="lg" weight="font-bold" color="main">
                  Discovered Event Parameters
                </Text>
                <Text size="xs" color="dim">
                  Gemini Flash identified the following structure for <span className="text-white font-semibold">{activeEventName}</span>. Select your preferences to tailor your schedule.
                </Text>
              </Stack>

              <DynamicQuestionnaire
                discoveryResponse={discoveryData}
                personaChips={personaChips}
                onSubmit={handleGenerateItinerary}
              />
            </Box>
          </Stack>
        )}

        {/* STEP 3: Agent Mind Decision Explainer & Calendar Export */}
        {step === 'results' && (
          <Stack gap={6} width="full">
            <Box display="flex" justify="between" align="center" wrap="wrap" gap={3}>
              <button
                type="button"
                onClick={() => setStep('questionnaire')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-line text-xs font-bold text-dim hover:text-white hover:border-accent transition-all"
              >
                <Icon icon={ArrowLeft} size="xs" />
                <span>Adjust Preferences & Re-generate</span>
              </button>
            </Box>

            <AgentMindTrace
              trace={decisionTrace}
            />
          </Stack>
        )}

        {/* DevAI Architecture & Workflow Explainer Banner */}
        <WorkflowExplainer />

        {/* Footer Tag */}
        <Box display="flex" align="center" justify="center" gap={2} paddingY={4} color="dim">
          <Icon icon={Layers} size="xs" />
          <Text size="micro" variant="mono" color="dim">
            WCS Navigator • Two-Pass Multimodal Agent Architecture
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
