import React, { useEffect, useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Bot, CheckCircle2, Loader2, Sparkles, Plane, Clock, Calendar, ShieldCheck, Music } from 'lucide-react';

export interface AgentGenerationTransitionProps {
  eventName: string;
  division?: string;
  role?: string;
  onComplete: () => void;
}

interface ReasoningStage {
  icon: typeof Bot;
  title: string;
  detail: string;
}

export const AgentGenerationTransition: React.FC<AgentGenerationTransitionProps> = ({
  eventName,
  division = 'novice',
  role,
  onComplete,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stages: ReasoningStage[] = [
    {
      icon: Plane,
      title: 'Calculating Backward Flight Buffer Math',
      detail: 'Evaluating airport transit (-30m), hotel unpack (-90m), and physical warmup window (-60m)...',
    },
    {
      icon: Clock,
      title: `Sequencing ${division.toUpperCase()} Division Staging Calls`,
      detail: 'Locking in prelim marshalling deadlines and guaranteeing zero travel conflict...',
    },
    {
      icon: Music,
      title: 'Filtering Daytime Workshops & Masterclasses',
      detail: 'Resolving multi-room clashes, leveling bands, and phrasing focus...',
    },
    {
      icon: Calendar,
      title: 'Injecting All-Night Socials & Meal Breaks',
      detail: 'Structuring Friday/Sat/Sun social dancing kickoff and dinner/lunch rest buffers...',
    },
    {
      icon: ShieldCheck,
      title: 'Synthesizing RFC 5545 Calendar Stream',
      detail: 'Embedding 15-minute smart alarms and readying 1-click Apple/Google calendar export...',
    },
  ];

  useEffect(() => {
    const stageDuration = 450;
    const timers: NodeJS.Timeout[] = [];

    stages.forEach((_, idx) => {
      if (idx > 0) {
        timers.push(
          setTimeout(() => {
            setCurrentStageIndex(idx);
          }, idx * stageDuration)
        );
      }
    });

    const completionTimer = setTimeout(() => {
      onComplete();
    }, stages.length * stageDuration + 250);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <Box
      display="flex"
      flex="col"
      align="center"
      justify="center"
      width="full"
      maxWidth="2xl"
      marginX="auto"
      paddingY={12}
    >
      <Box
        surface="surface"
        padding={8}
        radius="2xl"
        border
        width="full"
        className="border-line shadow-2xl bg-gradient-to-b from-surface via-surface-alt/80 to-muted/50 backdrop-blur-xl"
      >
        <Stack gap={6} align="center" textAlign="center">
          {/* Animated AI Agent Hub */}
          <Box position="relative">
            <Box
              padding={4}
              radius="2xl"
              className="bg-brand-cyan/15 border border-brand-cyan/40 text-brand-cyan animate-pulse shadow-xl shadow-brand-cyan/20"
            >
              <Icon icon={Bot} size="lg" />
            </Box>
            <Box position="absolute" className="-top-1.5 -right-1.5 text-brand-amber animate-spin">
              <Icon icon={Sparkles} size="sm" />
            </Box>
          </Box>

          <Stack gap={1.5} align="center">
            <Text variant="headline" size="xl" weight="font-black" color="main">
              Agent Synthesizing Custom Plan
            </Text>
            <Text size="xs" color="dim" variant="mono">
              Optimizing for <strong className="text-white">{role ? `${division.toUpperCase()} • ${role.toUpperCase()}` : division.toUpperCase()}</strong> at <span className="text-brand-cyan font-bold">{eventName}</span>
            </Text>
          </Stack>

          {/* Real-time Agent Thinking Terminal */}
          <Stack
            gap={3}
            width="full"
            surface="muted"
            padding={5}
            radius="xl"
            border
            className="border-line/50 bg-slate-950/70 text-left font-mono"
          >
            {stages.map((stage, idx) => {
              const isDone = currentStageIndex > idx;
              const isCurrent = currentStageIndex === idx;
              const isPending = currentStageIndex < idx;

              return (
                <Box
                  key={stage.title}
                  display="flex"
                  align="start"
                  gap={3}
                  className={`transition-all duration-300 ${
                    isDone
                      ? 'text-emerald-400 opacity-90'
                      : isCurrent
                      ? 'text-brand-cyan opacity-100'
                      : 'text-text-dim/40 opacity-30'
                  }`}
                >
                  <Box className="shrink-0 pt-0.5">
                    {isDone ? (
                      <Icon icon={CheckCircle2} size="xs" className="text-emerald-400" />
                    ) : isCurrent ? (
                      <Icon icon={Loader2} size="xs" className="animate-spin text-brand-cyan" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-white/20" />
                    )}
                  </Box>

                  <Stack gap={0.5} className="text-xs">
                    <Text weight="font-bold" size="xs" className={isCurrent ? 'text-white' : isDone ? 'text-emerald-300' : 'text-text-dim'}>
                      {stage.title}
                    </Text>
                    <Text size="micro" className={isCurrent ? 'text-text-dim' : isDone ? 'text-emerald-400/70' : 'text-text-dim/40'}>
                      {stage.detail}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          {/* Progress Indicator */}
          <Box width="full" className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-cyan h-full transition-all duration-500 rounded-full shadow-glow"
              style={{ width: `${Math.min(100, ((currentStageIndex + 1) / stages.length) * 100)}%` }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AgentGenerationTransition;
