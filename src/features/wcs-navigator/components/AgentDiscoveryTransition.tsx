import { useEffect, useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Cpu, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

import { useEffect, useState, useRef } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Cpu, CheckCircle2, Loader2, Sparkles, UploadCloud } from 'lucide-react';

export interface AgentDiscoveryTransitionProps {
  eventName: string;
  onComplete: () => void;
  isCustomUpload?: boolean;
  uploadType?: 'pdf' | 'url';
  targetName?: string;
  isAsyncLoading?: boolean;
}

export const AgentDiscoveryTransition: React.FC<AgentDiscoveryTransitionProps> = ({
  eventName,
  onComplete,
  isCustomUpload = false,
  uploadType = 'pdf',
  targetName,
  isAsyncLoading = false,
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const isLoadingRef = useRef(isAsyncLoading);
  isLoadingRef.current = isAsyncLoading;

  const presetStages = [
    { label: 'Reading workshop schedules & room tracks...', doneLabel: 'Schedules & room tracks loaded' },
    { label: 'Checking competition call times & skill level gates...', doneLabel: 'Competition calls & gates checked' },
    { label: 'Preparing personalized preference options...', doneLabel: 'Preference questionnaire ready' },
  ];

  const customStages = [
    {
      label: uploadType === 'url' ? 'Fetching schedule from URL...' : 'Uploading schedule document...',
      doneLabel: uploadType === 'url' ? 'Schedule URL fetched successfully' : 'Document upload complete',
    },
    {
      label: 'Parsing schedule & extracting event details with AI...',
      doneLabel: 'Schedule parsed & event details extracted',
    },
    {
      label: 'Analyzing workshop tracks & finding relevant details...',
      doneLabel: 'Relevant details, workshops & tracks identified',
    },
    {
      label: 'Preparing personalized questionnaire...',
      doneLabel: 'Personalized questionnaire ready',
    },
  ];

  const stages = isCustomUpload ? customStages : presetStages;

  useEffect(() => {
    let cancelled = false;

    if (!isCustomUpload) {
      const timer1 = setTimeout(() => !cancelled && setCurrentStage(1), 350);
      const timer2 = setTimeout(() => !cancelled && setCurrentStage(2), 750);
      const timer3 = setTimeout(() => {
        if (!cancelled) {
          setCurrentStage(3);
          setTimeout(onComplete, 400);
        }
      }, 1150);

      return () => {
        cancelled = true;
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }

    let stepTimer: ReturnType<typeof setTimeout>;

    // Step 0 -> 1 after initial upload/fetch animation (~450ms)
    const timer0 = setTimeout(() => {
      if (cancelled) return;
      setCurrentStage(1);

      // Step 1 is "Parsing schedule with AI..."
      // Poll/wait until AI parsing (isAsyncLoading) completes
      const checkLoading = () => {
        if (cancelled) return;
        if (isLoadingRef.current) {
          stepTimer = setTimeout(checkLoading, 200);
        } else {
          // AI parsing complete! Advance to step 2 ("Finding relevant details...")
          setCurrentStage(2);
          stepTimer = setTimeout(() => {
            if (cancelled) return;
            // Advance to step 3 ("Preparing questionnaire...")
            setCurrentStage(3);
            stepTimer = setTimeout(() => {
              if (cancelled) return;
              setCurrentStage(4);
              stepTimer = setTimeout(onComplete, 350);
            }, 500);
          }, 600);
        }
      };

      stepTimer = setTimeout(checkLoading, 400);
    }, 450);

    return () => {
      cancelled = true;
      clearTimeout(timer0);
      if (stepTimer) clearTimeout(stepTimer);
    };
  }, [isCustomUpload, onComplete]);

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
        className="border-line shadow-2xl bg-gradient-to-b from-surface to-muted/50"
      >
        <Stack gap={6} align="center" textAlign="center">
          {/* Pulsing AI Scanner Icon */}
          <Box position="relative">
            <Box
              padding={4}
              radius="2xl"
              className="bg-brand-cyan/10 border border-brand-cyan/40 text-brand-cyan animate-pulse shadow-lg shadow-brand-cyan/10"
            >
              <Icon icon={isCustomUpload ? UploadCloud : Cpu} size="lg" />
            </Box>
            <Box position="absolute" className="-top-1 -right-1 text-brand-amber animate-spin">
              <Icon icon={Sparkles} size="sm" />
            </Box>
          </Box>

          <Stack gap={1.5} align="center">
            <Text variant="headline" size="xl" weight="font-black" color="main">
              {isCustomUpload ? 'Uploading & Parsing Schedule' : 'Agent Pre-Scanning Schedule'}
            </Text>
            <Text size="sm" color="dim">
              {isCustomUpload ? (
                <>
                  Processing <span className="text-white font-bold">{targetName || eventName}</span>
                </>
              ) : (
                <>
                  Analyzing <span className="text-white font-bold">{eventName}</span> with Gemini Flash
                </>
              )}
            </Text>
          </Stack>

          {/* Real-time Agent Log Steps */}
          <Stack gap={3} width="full" surface="muted" padding={4} radius="xl" border className="border-line/40 text-left">
            {stages.map((stage, idx) => {
              const isDone = currentStage > idx;
              const isCurrent = currentStage === idx;

              return (
                <Box
                  key={stage.label}
                  display="flex"
                  align="center"
                  gap={3}
                  className={`transition-opacity duration-300 ${
                    isCurrent || isDone ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  {isDone ? (
                    <Icon icon={CheckCircle2} size="sm" color="accent" className="text-brand-emerald shrink-0" />
                  ) : isCurrent ? (
                    <Icon icon={Loader2} size="sm" color="accent" className="animate-spin text-brand-cyan shrink-0" />
                  ) : (
                    <Box className="w-4 h-4 rounded-full border border-line shrink-0" />
                  )}
                  <Text size="xs" variant="mono" color={isDone ? 'main' : isCurrent ? 'accent' : 'dim'}>
                    {isDone ? stage.doneLabel : stage.label}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
