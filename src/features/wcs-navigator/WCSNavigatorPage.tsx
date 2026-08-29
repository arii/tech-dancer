import React, { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { Icon } from '@/components/ui/Icon';
import { HelpCircle, ArrowLeft, Layers, RefreshCw } from 'lucide-react';
import { CALIFORNIA_2026_EVENTS, WCSCaliforniaEvent } from './data/californiaEvents';
import { MOCK_EVENT_RESULTS, createGenericMockResult, EventMockData } from './data/mockResults';
import { EventSearchHero, UserPreferences } from './components/EventSearchHero';
import { AgentDiscoveryTransition } from './components/AgentDiscoveryTransition';
import { AgentGenerationTransition } from './components/AgentGenerationTransition';
import { DynamicQuestionnaire } from './components/DynamicQuestionnaire';
import { AgentMindTrace } from './components/AgentMindTrace';
import { GatewayFallbackBanner } from './components/GatewayFallbackBanner';
import { WorkflowExplainer } from './components/WorkflowExplainer';
import { DiscoveryResponse, QuestionAnswerValue } from './types/navigator';
import { AgentDecisionTrace } from './types';
import { discoverSchedule, generateSchedule, ServiceTelemetry } from './services/wcsApiClient';
import { useNavigatorStorage } from './hooks/useNavigatorStorage';
import { adaptTraceToUserPreferences, extractUserDivision, extractUserRole } from './utils/scheduleRuleEngine';

type WizardStep = 'search' | 'discovering' | 'questionnaire' | 'generating' | 'results';

export const WCSNavigatorPage: React.FC = () => {
  const [step, setStep] = useState<WizardStep>('search');
  const [isMockMode, setIsMockMode] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Selected State
  const [activeEventName, setActiveEventName] = useState<string>(CALIFORNIA_2026_EVENTS[0].name);
  const [activeEventId, setActiveEventId] = useState<string>(CALIFORNIA_2026_EVENTS[0].id);
  const [activeDivision, setActiveDivision] = useState<string>('novice');
  const [activeRole, setActiveRole] = useState<string>('');
  const [activeAnswers, setActiveAnswers] = useState<Record<string, QuestionAnswerValue>>({});
  const [activeTelemetry, setActiveTelemetry] = useState<ServiceTelemetry | undefined>();

  // Custom Upload & Live Gateway State
  const [uploadedPayload, setUploadedPayload] = useState<File | string | null>(null);
  const [customTrace, setCustomTrace] = useState<AgentDecisionTrace | null>(null);
  const [discoverySource, setDiscoverySource] = useState<'live_api' | 'client_heuristic'>('live_api');
  const [discoveryErrorReason, setDiscoveryErrorReason] = useState<string | undefined>();

  const { saveDraftDebounced } = useNavigatorStorage(activeEventId || activeEventName);

  // Data State
  const [discoveryData, setDiscoveryData] = useState<DiscoveryResponse>(
    MOCK_EVENT_RESULTS['south-bay-dance-fling-2026'].discovery
  );
  const [decisionTrace, setDecisionTrace] = useState<AgentDecisionTrace>(
    MOCK_EVENT_RESULTS['south-bay-dance-fling-2026'].decisionTrace
  );

  // Progressive Discovery & Questionnaire on Event Select
  const handleSelectEventPreset = (event: WCSCaliforniaEvent, prefs?: Partial<UserPreferences>) => {
    setActiveEventName(event.name);
    setActiveEventId(event.id);
    setUploadedPayload(null);
    setCustomTrace(null);
    setDiscoverySource('live_api');
    setDiscoveryErrorReason(undefined);
    if (prefs?.division) setActiveDivision(prefs.division);
    if (prefs?.role) setActiveRole(prefs.role);
    else setActiveRole('');

    const mockData: EventMockData =
      MOCK_EVENT_RESULTS[event.id] || createGenericMockResult(event.name);

    setDiscoveryData(mockData.discovery);
    setDecisionTrace(mockData.decisionTrace);
    setActiveTelemetry({
      endpoint: `preset://${event.id}`,
      method: 'PRESET_LOAD',
      timestamp: new Date().toISOString(),
      durationMs: 14,
      engine: 'Pre-Indexed California Convention Preset',
      httpStatus: 200,
      requestPayload: { eventId: event.id, preferences: prefs },
      responsePayload: mockData.discovery,
    });

    setStep('discovering');
  };

  // Discovery handlers for custom uploads
  const handleStartCustomDiscovery = async (target: File | string, eventName?: string) => {
    const name = eventName || (target instanceof File ? target.name.replace(/\.pdf$/i, '') : target);
    setActiveEventName(name);
    setActiveEventId('');
    setUploadedPayload(target);

    const result = await discoverSchedule(target, isMockMode);
    setDiscoveryData(result.discovery);
    setDecisionTrace(result.decisionTrace);
    setCustomTrace(result.decisionTrace);
    setDiscoverySource(result.source);
    setDiscoveryErrorReason(result.errorReason);
    if (result.telemetry) {
      setActiveTelemetry(result.telemetry);
    }

    setStep('discovering');
  };

  const handleDiscoveryComplete = () => {
    if (activeEventId && MOCK_EVENT_RESULTS[activeEventId]) {
      const mockData: EventMockData = MOCK_EVENT_RESULTS[activeEventId];
      setDiscoveryData(mockData.discovery);
      setDecisionTrace(mockData.decisionTrace);
    } else if (customTrace) {
      setDecisionTrace(customTrace);
    }
    setStep('questionnaire');
  };

  // Questionnaire submission handler with live streaming thinking transition
  const handleGenerateItinerary = async (answers: Record<string, QuestionAnswerValue>) => {
    const detectedDivision = extractUserDivision(answers);
    const detectedRole = extractUserRole(answers);

    if (detectedDivision) {
      setActiveDivision(detectedDivision);
    }
    if (detectedRole) {
      setActiveRole(detectedRole);
    }
    setActiveAnswers(answers);

    saveDraftDebounced({
      eventId: activeEventId || activeEventName,
      eventName: activeEventName,
      division: detectedDivision || activeDivision,
      role: detectedRole || activeRole,
      answers,
    });

    // Enter streaming generation step immediately
    setStep('generating');

    let activeTrace: AgentDecisionTrace;

    if (!activeEventId && uploadedPayload) {
      const genResult = await generateSchedule(
        uploadedPayload,
        answers,
        activeEventName,
        customTrace || undefined,
        isMockMode
      );
      activeTrace = genResult.decisionTrace;
      if (genResult.telemetry) {
        setActiveTelemetry(genResult.telemetry);
      }
    } else {
      const mockData = MOCK_EVENT_RESULTS[activeEventId] || createGenericMockResult(activeEventName);
      activeTrace = customTrace || mockData.decisionTrace;
      setActiveTelemetry({
        endpoint: `local://${activeEventId || 'custom'}`,
        method: 'LOCAL_RULE_ENGINE',
        timestamp: new Date().toISOString(),
        durationMs: 18,
        engine: 'Client Schedule Rule Engine',
        httpStatus: 200,
        requestPayload: { eventName: activeEventName, answers },
        responsePayload: activeTrace,
      });
    }

    // Dynamically adapt sessions, division titles and flight buffer staging call to user's questionnaire choices
    activeTrace = adaptTraceToUserPreferences(activeTrace, answers, activeEventName);

    // If "All Workshops" option was chosen, ensure all eligible daytime classes are included
    const trackVal = String(answers.track || answers.workshop_focus || '');
    if (trackVal.includes('all_workshops') || trackVal === 'all_workshops') {
      activeTrace = {
        ...activeTrace,
        sessions: activeTrace.sessions.map((s) => {
          if (s.title.toLowerCase().includes('audition') && answers.division !== 'advanced_allstar') {
            return s;
          }
          return { ...s, status: 'included' as const };
        }),
      };
    }

    setDecisionTrace(activeTrace);

    const eventTitle = discoveryData?.preset_name || activeEventName;
    const buffer = activeTrace.bufferTimeline;
    const sessions = activeTrace.sessions || [];
    const themes = activeTrace.themeDressCodes || [];

    const markdownDoc = [
      `# 🕺 ${eventTitle} — Personalized Weekend Itinerary`,
      `*Generated by WCS Navigator on ${new Date().toLocaleDateString()}*`,
      '',
      '## ✈️ Travel & Arrival Buffer Target',
      `- **Earliest Event Staging Call:** ${buffer?.earliestStagingTime || '5:15 PM Friday'}`,
      `- **Recommended Flight Touchdown:** ${buffer?.latestFlightArrivalDeadline || '2:15 PM Friday'}`,
      `- **Buffer Breakdown:** ${buffer?.transitMinutes || 30}m Transit + ${buffer?.hotelSettleMinutes || 90}m Hotel Settle + ${buffer?.warmupMinutes || 60}m Warmup`,
      '',
      '## 📅 Matched Workshops & Competition Schedule',
      ...sessions
        .filter((s) => s.status === 'included')
        .map(
          (s) =>
            `### ✅ ${s.title}\n- **Time:** ${s.time}\n- **Location:** ${s.location}\n- **Profile Match:** ${s.justification}\n`
        ),
      '',
      '## 🎭 Party Themes & Dress Codes',
      ...themes.map(
        (t) =>
          `### 🌟 ${t.day}: ${t.themeTitle}\n- **Atmosphere:** ${t.vibe}\n- **Outfits:** ${t.recommendedAttire.join(', ')}\n`
      ),
    ].join('\n');

    setDiscoveryData((prev) => ({ ...prev, visualScheduleMarkdown: markdownDoc }));
  };

  return (
    <Box as="section" maxWidth="7xl" marginX="auto" width="full" paddingX={{ base: 4, sm: 6 }}>
      <SEO
        title="WCS Navigator — AI Dance Convention Itinerary & Calendar Optimizer"
        description="Google Search-style AI agent for West Coast Swing conventions. Pre-scans multi-room schedules, computes backward flight buffer math, and streams calendar files."
        keywords="West Coast Swing, WCS Navigator, AI dance optimizer, California 2026 WCS events, flight buffer engine, schedule parser"
      />

      <Stack gap={6} width="full">
        {/* Top Header & Minimal Utility Bar */}
        <Box display="flex" justify="between" align="center" wrap="wrap" gap={3} paddingBottom={2} className="border-b border-line/40 min-w-0">
          <Box display="flex" align="center" gap={3} className="min-w-0">
            <PageHeader
              title="WCS Navigator"
              as="h1"
              paddingBottom={0}
              border="none"
            />
            <Stack
              as="button"
              direction="row"
              align="center"
              gap={1}
              paddingX={2}
              type="button"
              aria-label="How WCS Navigator Works guide"
              onClick={() => setIsGuideOpen(!isGuideOpen)}
              className="min-h-11 text-xs font-mono text-text-dim hover:text-text-main cursor-pointer transition-colors shrink-0"
            >
              <Icon icon={HelpCircle} size="xs" />
              <span className="underline underline-offset-2">How It Works</span>
            </Stack>
          </Box>

          <Stack align="center" direction="row" gap={3} className="shrink-0">
            {/* Mode Switch: Text-only utility link */}
            <Stack
              as="button"
              direction="row"
              align="center"
              gap={2}
              paddingX={2}
              type="button"
              onClick={() => setIsMockMode(!isMockMode)}
              className="min-h-11 text-xs font-mono text-text-dim hover:text-text-main transition-colors cursor-pointer"
            >
              <span className={`w-2 h-2 rounded-full ${isMockMode ? 'bg-text-dim' : 'bg-brand-emerald'}`} />
              <span>{isMockMode ? 'Demo Presets' : 'Live Gateway'}</span>
            </Stack>
          </Stack>
        </Box>

        {/* Collapsible Inline Guide */}
        {isGuideOpen && (
          <WorkflowExplainer onClose={() => setIsGuideOpen(false)} />
        )}

        {/* Step Progression Breadcrumb (Clean Flow) */}
        {step !== 'search' && (
          <Box
            display="flex"
            align="center"
            justify="between"
            wrap="wrap"
            gap={2}
            className="text-xs font-mono text-text-dim min-w-0"
          >
            <Box display="flex" align="center" gap={2} className="min-w-0">
              <Stack
                as="button"
                direction="row"
                align="center"
                gap={1}
                paddingX={1}
                type="button"
                onClick={() => setStep('search')}
                className="min-h-11 text-text-dim hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Event</span>
              </Stack>
              <span className="text-line shrink-0">/</span>
              <span className="text-brand-cyan font-bold truncate min-w-0">{activeEventName}</span>
            </Box>

            <Box display="flex" align="center" gap={2} className="shrink-0">
              {step === 'results' && (
                <Stack
                  as="button"
                  direction="row"
                  align="center"
                  gap={1}
                  paddingX={1}
                  type="button"
                  onClick={() => setStep('questionnaire')}
                  className="min-h-11 text-text-dim hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Questionnaire</span>
                </Stack>
              )}
              <Stack
                as="button"
                direction="row"
                align="center"
                gap={1}
                paddingX={1}
                type="button"
                onClick={() => setStep('search')}
                className="min-h-11 text-text-dim hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Search Again</span>
              </Stack>
            </Box>
          </Box>
        )}

        {/* STEP 1: Google-Style Search & Ingestion Hero */}
        {step === 'search' && (
          <EventSearchHero
            onDiscoverPreset={handleSelectEventPreset}
            onDiscoverPdf={(file) => handleStartCustomDiscovery(file, file.name.replace(/\.pdf$/i, ''))}
            onDiscoverUrl={(url) => handleStartCustomDiscovery(url, url)}
          />
        )}

        {/* STEP 1.5: Animated Agent Discovery Scanning Transition */}
        {step === 'discovering' && (
          <AgentDiscoveryTransition
            eventName={activeEventName}
            onComplete={handleDiscoveryComplete}
          />
        )}

        {/* STEP 2: Optional Detailed Dynamic Questionnaire */}
        {step === 'questionnaire' && (
          <Stack gap={6} width="full" maxWidth="3xl" marginX="auto">
            <GatewayFallbackBanner
              eventName={activeEventName}
              source={discoverySource}
              errorReason={discoveryErrorReason}
              onSelectPreset={handleSelectEventPreset}
              onRetryUpload={() => setStep('search')}
            />
            <DynamicQuestionnaire
              activeEventName={activeEventName}
              discoveryResponse={discoveryData}
              onSubmit={handleGenerateItinerary}
            />
          </Stack>
        )}

        {/* STEP 2.5: Animated Live Agent Generation & Thinking Stream */}
        {step === 'generating' && (
          <AgentGenerationTransition
            eventName={activeEventName}
            division={activeDivision}
            role={activeRole}
            onComplete={() => setStep('results')}
          />
        )}

        {/* STEP 3: Unified Chronological Itinerary & Calendar Export */}
        {step === 'results' && (
          <Stack gap={6} width="full">
            <GatewayFallbackBanner
              eventName={activeEventName}
              source={discoverySource}
              errorReason={discoveryErrorReason}
              onSelectPreset={handleSelectEventPreset}
              onRetryUpload={() => setStep('search')}
            />
            <AgentMindTrace
              trace={decisionTrace}
              activeEventName={activeEventName}
              selectedDivision={activeDivision}
              selectedRole={activeRole}
              telemetry={activeTelemetry}
              answers={activeAnswers}
              discoveryData={discoveryData}
              visualScheduleMarkdown={(discoveryData?.visualScheduleMarkdown) || (discoveryData?.preset_name ? `# Your WCS Visual Schedule for ${discoveryData.preset_name}\n\nGenerated by WCS Navigator.` : undefined)}
            />
          </Stack>
        )}

        {/* Clean Footer Tag */}
        <Box display="flex" align="center" justify="center" gap={2} paddingY={4} color="dim">
          <Icon icon={Layers} size="xs" />
          <Text size="micro" variant="mono" color="dim">
            WCS Navigator • Personalized Itinerary &amp; Travel Planner
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default WCSNavigatorPage;

