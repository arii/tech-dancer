import React, { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ServiceTelemetry } from '../services/wcsApiClient';
import { AgentDecisionTrace, AuditSession, FlightBuffer } from '../types';
import { DiscoveryResponse, QuestionAnswerValue } from '../types/navigator';
import {
  Cpu,
  Filter,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Terminal,
  Activity,
} from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

export interface DecisionDebugInspectorProps {
  eventName: string;
  confirmedDivision?: string;
  confirmedRole?: string;
  answers: Record<string, QuestionAnswerValue>;
  telemetry?: ServiceTelemetry;
  discoveryData?: DiscoveryResponse;
  decisionTrace?: AgentDecisionTrace;
  bufferTimeline?: FlightBuffer;
  className?: string;
}

type DebugTab = 'inputs' | 'telemetry' | 'filtering' | 'json';

export const DecisionDebugInspector: React.FC<DecisionDebugInspectorProps> = ({
  eventName,
  confirmedDivision,
  confirmedRole,
  answers,
  telemetry,
  discoveryData,
  decisionTrace,
  bufferTimeline,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<DebugTab>('inputs');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRequestPayload, setShowRequestPayload] = useState<boolean>(false);
  const [showResponsePayload, setShowResponsePayload] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sessions: AuditSession[] = decisionTrace?.sessions || [];
  const includedSessions = sessions.filter((s) => s.status === 'included');
  const filteredSessions = sessions.filter((s) => s.status === 'filtered');

  const filteredSessionList = sessions.filter((s) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.justification.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q) ||
      s.time.toLowerCase().includes(q)
    );
  });

  const fullDebugState = {
    eventName,
    confirmedDivision: confirmedDivision || 'novice',
    confirmedRole: confirmedRole || 'not_specified',
    answers,
    telemetry: telemetry || {
      status: 'Ready',
      engine: 'In-Memory State',
    },
    bufferTimeline,
    totalSessions: sessions.length,
    includedSessions: includedSessions.length,
    filteredSessions: filteredSessions.length,
  };

  return (
    <Box
      padding={5}
      radius="2xl"
      border
      className={`bg-surface-alt/95 border-brand-cyan/40 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 ${className || ''}`}
      width="full"
    >
      <Stack gap={4} width="full">
        {/* Inspector Header */}
        <Box display="flex" flexWrap="wrap" align="center" justify="between" gap={3}>
          <Box display="flex" align="center" gap={2.5}>
            <Box padding={1.5} radius="lg" className="bg-brand-cyan/20 text-brand-cyan">
              <Icon icon={Cpu} size="sm" />
            </Box>
            <Stack gap={0.5}>
              <Text variant="headline" size="sm" weight="font-bold" color="main">
                Agent Decision Logic & Taskmaker Telemetry
              </Text>
              <Text size="xs" color="dim" variant="mono">
                {eventName} • {telemetry?.engine || 'Local Engine'} • {telemetry?.durationMs || 0}ms latency
              </Text>
            </Stack>
          </Box>

          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingX={3}
            paddingY={1.5}
            radius="lg"
            border
            type="button"
            onClick={() => handleCopy(JSON.stringify(fullDebugState, null, 2), 'all_debug')}
            className="border-line/60 bg-surface hover:bg-surface-alt text-text-dim hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <Icon icon={copiedKey === 'all_debug' ? Check : Copy} size="xs" />
            <span>{copiedKey === 'all_debug' ? 'Copied Full Trace' : 'Copy Full Trace'}</span>
          </Stack>
        </Box>

        {/* Tab Navigation */}
        <Box display="flex" flexWrap="wrap" gap={2} border="b" borderColor="line" paddingBottom={2}>
          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingX={3}
            paddingY={1.5}
            radius="lg"
            type="button"
            onClick={() => setActiveTab('inputs')}
            className={`text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'inputs'
                ? 'bg-brand-cyan text-black shadow-sm'
                : 'text-text-dim hover:text-text-main hover:bg-white/5'
            }`}
          >
            <Icon icon={Sparkles} size="xs" />
            <span>1. Confirmed Inputs ({Object.keys(answers).length})</span>
          </Stack>

          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingX={3}
            paddingY={1.5}
            radius="lg"
            type="button"
            onClick={() => setActiveTab('telemetry')}
            className={`text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-brand-cyan text-black shadow-sm'
                : 'text-text-dim hover:text-text-main hover:bg-white/5'
            }`}
          >
            <Icon icon={Activity} size="xs" />
            <span>2. Gateway & Engine ({telemetry?.httpStatus ? `HTTP ${telemetry.httpStatus}` : 'Local'})</span>
          </Stack>

          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingX={3}
            paddingY={1.5}
            radius="lg"
            type="button"
            onClick={() => setActiveTab('filtering')}
            className={`text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'filtering'
                ? 'bg-brand-cyan text-black shadow-sm'
                : 'text-text-dim hover:text-text-main hover:bg-white/5'
            }`}
          >
            <Icon icon={Filter} size="xs" />
            <span>3. Rule Engine Audit ({includedSessions.length} / {sessions.length})</span>
          </Stack>

          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingX={3}
            paddingY={1.5}
            radius="lg"
            type="button"
            onClick={() => setActiveTab('json')}
            className={`text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'json'
                ? 'bg-brand-cyan text-black shadow-sm'
                : 'text-text-dim hover:text-text-main hover:bg-white/5'
            }`}
          >
            <Icon icon={Terminal} size="xs" />
            <span>4. Raw JSON Schemas</span>
          </Stack>
        </Box>

        {/* TAB 1: CONFIRMED INPUTS */}
        {activeTab === 'inputs' && (
          <Stack gap={4} width="full" className="animate-in fade-in duration-150">
            <Grid cols={{ base: 1, md: 3 }} gap={3} width="full">
              <Box padding={3.5} radius="xl" border className="bg-surface/70 border-line/60">
                <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                  Confirmed Division Persona
                </Text>
                <Text weight="font-bold" size="sm" color="main" marginTop={1}>
                  {confirmedDivision?.toUpperCase() || 'NOVICE'}
                </Text>
              </Box>

              <Box padding={3.5} radius="xl" border className="bg-surface/70 border-line/60">
                <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                  Confirmed Dance Role
                </Text>
                <Text weight="font-bold" size="sm" color="main" marginTop={1}>
                  {confirmedRole ? confirmedRole.toUpperCase() : 'None Specified (Universal)'}
                </Text>
              </Box>

              <Box padding={3.5} radius="xl" border className="bg-surface/70 border-line/60">
                <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                  Target Landing Target
                </Text>
                <Text weight="font-bold" size="sm" color="main" marginTop={1}>
                  {bufferTimeline?.latestFlightArrivalDeadline || '2:15 PM Friday'}
                </Text>
              </Box>
            </Grid>

            {/* Answer Map Breakdown */}
            <Stack gap={2} width="full">
              <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                Questionnaire Answers Mapping
              </Text>
              <Box radius="xl" border className="bg-surface/40 border-line/50 overflow-hidden">
                {Object.keys(answers).length === 0 ? (
                  <Box padding={4} textAlign="center">
                    <Text size="xs" color="dim" variant="mono">
                      No explicit questionnaire answers provided (using smart event defaults).
                    </Text>
                  </Box>
                ) : (
                  <Stack gap={0}>
                    {Object.entries(answers).map(([key, val], idx) => (
                      <Box
                        key={key}
                        padding={3}
                        display="flex"
                        align="center"
                        justify="between"
                        className={`text-xs font-mono ${idx > 0 ? 'border-t border-line/30' : ''}`}
                      >
                        <span className="text-brand-cyan font-bold">{key}</span>
                        <Box as="span" paddingX={2} paddingY={1} radius="md" className="text-text-main bg-white/5">
                          {Array.isArray(val) ? val.join(', ') : String(val)}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </Stack>
          </Stack>
        )}

        {/* TAB 2: GATEWAY & TASKMAKER TELEMETRY */}
        {activeTab === 'telemetry' && (
          <Stack gap={4} width="full" className="animate-in fade-in duration-150">
            <Grid cols={{ base: 1, sm: 2, md: 4 }} gap={3} width="full">
              <Box padding={3.5} radius="xl" border className="bg-surface/70 border-line/60">
                <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                  Service Endpoint
                </Text>
                <Text weight="font-bold" size="xs" color="main" marginTop={1} className="truncate font-mono">
                  {telemetry?.endpoint || '/api/v1/discover'}
                </Text>
              </Box>

              <Box padding={3.5} radius="xl" border className="bg-surface/70 border-line/60">
                <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                  Execution Latency
                </Text>
                <Text weight="font-bold" size="sm" color="accent" marginTop={1} className="font-mono">
                  {telemetry?.durationMs || 0} ms
                </Text>
              </Box>

              <Box padding={3.5} radius="xl" border className="bg-surface/70 border-line/60">
                <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                  Processing Engine
                </Text>
                <Text weight="font-bold" size="xs" color="main" marginTop={1} className="truncate font-mono">
                  {telemetry?.engine || 'Local Heuristic Engine'}
                </Text>
              </Box>

              <Box padding={3.5} radius="xl" border className="bg-surface/70 border-line/60">
                <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                  HTTP Response Status
                </Text>
                <Text weight="font-bold" size="sm" color={telemetry?.httpStatus === 200 ? 'main' : 'dim'} marginTop={1} className="font-mono">
                  {telemetry?.httpStatus ? `HTTP ${telemetry.httpStatus}` : '200 OK (Client Local)'}
                </Text>
              </Box>
            </Grid>

            {/* Collapsible Request Payload */}
            <Box radius="xl" border className="bg-surface/40 border-line/50 overflow-hidden">
              <Box
                as="button"
                type="button"
                onClick={() => setShowRequestPayload(!showRequestPayload)}
                width="full"
                padding={3.5}
                display="flex"
                align="center"
                justify="between"
                className="text-xs font-mono text-left hover:bg-white/5 cursor-pointer"
              >
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={showRequestPayload ? ChevronDown : ChevronRight} size="xs" />
                  <span className="font-bold text-text-main">Sent Request Payload</span>
                </Box>
                <Text size="xs" color="dim">Click to toggle</Text>
              </Box>
              {showRequestPayload && (
                <Box padding={3} border="t" borderColor="line" className="bg-surface-alt/80">
                  <Box as="pre" padding={2} className="text-xs font-mono text-text-dim overflow-x-auto">
                    {JSON.stringify(telemetry?.requestPayload || { eventName, answers }, null, 2)}
                  </Box>
                </Box>
              )}
            </Box>

            {/* Collapsible Response Payload */}
            <Box radius="xl" border className="bg-surface/40 border-line/50 overflow-hidden">
              <Box
                as="button"
                type="button"
                onClick={() => setShowResponsePayload(!showResponsePayload)}
                width="full"
                padding={3.5}
                display="flex"
                align="center"
                justify="between"
                className="text-xs font-mono text-left hover:bg-white/5 cursor-pointer"
              >
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={showResponsePayload ? ChevronDown : ChevronRight} size="xs" />
                  <span className="font-bold text-text-main">Received Response Payload</span>
                </Box>
                <Text size="xs" color="dim">Click to toggle</Text>
              </Box>
              {showResponsePayload && (
                <Box padding={3} border="t" borderColor="line" className="bg-surface-alt/80">
                  <Box as="pre" padding={2} className="text-xs font-mono text-text-dim overflow-x-auto max-h-60">
                    {JSON.stringify(telemetry?.responsePayload || discoveryData || decisionTrace, null, 2)}
                  </Box>
                </Box>
              )}
            </Box>
          </Stack>
        )}

        {/* TAB 3: RULE ENGINE FILTERING AUDIT */}
        {activeTab === 'filtering' && (
          <Stack gap={3} width="full" className="animate-in fade-in duration-150">
            <Box display="flex" align="center" justify="between" gap={3} flexWrap="wrap">
              <Box
                as="input"
                type="text"
                placeholder="Search audit sessions or rule justifications..."
                value={filterQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterQuery(e.target.value)}
                paddingX={3}
                paddingY={1.5}
                radius="lg"
                maxWidth="sm"
                width="full"
                border
                className="bg-surface border-line/60 text-xs font-mono text-white placeholder-text-dim/60 focus:outline-none focus:border-brand-cyan"
              />
              <Text size="xs" color="dim" variant="mono">
                Showing {filteredSessionList.length} of {sessions.length} evaluated sessions
              </Text>
            </Box>

            <Box radius="xl" border className="bg-surface/40 border-line/50 overflow-hidden max-h-80 overflow-y-auto">
              {filteredSessionList.length === 0 ? (
                <Box padding={6} textAlign="center">
                  <Text size="xs" color="dim" variant="mono">
                    No sessions match filter query &quot;{filterQuery}&quot;
                  </Text>
                </Box>
              ) : (
                <Stack gap={0}>
                  {filteredSessionList.map((session, idx) => (
                    <Box
                      key={session.id}
                      padding={3}
                      className={`text-xs font-mono ${idx > 0 ? 'border-t border-line/30' : ''} ${
                        session.status === 'included' ? 'bg-brand-cyan/[0.03]' : 'bg-red-500/[0.02]'
                      }`}
                    >
                      <Box display="flex" align="start" justify="between" gap={2}>
                        <Stack gap={0.5} minWidth={0}>
                          <span className="font-bold text-text-main">{session.title}</span>
                          <Text size="xs" color="dim">
                            🕒 {session.time} • 📍 {session.location}
                          </Text>
                        </Stack>
                        <Box
                          as="span"
                          paddingX={2}
                          paddingY={0.5}
                          radius="md"
                          shrink={0}
                          border
                          className={`text-xs font-bold ${
                            session.status === 'included'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}
                        >
                          {session.status === 'included' ? '✅ Included' : '⛔ Filtered Out'}
                        </Box>
                      </Box>
                      <Box marginTop={1} padding={1.5} radius="md" className="text-xs text-text-dim/90 bg-white/5">
                        <strong className="text-white/80">Rule Reason:</strong> {session.justification}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
          </Stack>
        )}

        {/* TAB 4: RAW JSON SCHEMAS */}
        {activeTab === 'json' && (
          <Stack gap={3} width="full" className="animate-in fade-in duration-150">
            <Box display="flex" align="center" justify="between">
              <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                Raw Decision Trace Schema
              </Text>
              <Stack
                as="button"
                direction="row"
                align="center"
                gap={1}
                type="button"
                onClick={() => handleCopy(JSON.stringify(decisionTrace, null, 2), 'trace_json')}
                className="text-xs font-mono text-brand-cyan hover:underline cursor-pointer"
              >
                <Icon icon={copiedKey === 'trace_json' ? Check : Copy} size="xs" />
                <span>{copiedKey === 'trace_json' ? 'Copied' : 'Copy JSON'}</span>
              </Stack>
            </Box>
            <Box padding={3} radius="xl" border className="bg-surface-alt border-line/60">
              <Box as="pre" padding={2} className="text-xs font-mono text-text-dim overflow-x-auto max-h-72">
                {JSON.stringify(decisionTrace, null, 2)}
              </Box>
            </Box>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
