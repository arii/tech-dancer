import React, { useEffect, useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Cpu, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface AgentDiscoveryTransitionProps {
  eventName: string;
  onComplete: () => void;
}

export const AgentDiscoveryTransition: React.FC<AgentDiscoveryTransitionProps> = ({
  eventName,
  onComplete
}) => {
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { label: 'Ingesting timetable & rasterizing visual schedule columns...', delay: 300 },
    { label: 'Scanning workshop leveling system & WSDC competition prelims...', delay: 600 },
    { label: 'Identifying social theme nights & synthesizing dynamic questions...', delay: 900 }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStage(1), 300);
    const timer2 = setTimeout(() => setCurrentStage(2), 700);
    const timer3 = setTimeout(() => {
      setCurrentStage(3);
      setTimeout(onComplete, 400);
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
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
      className="py-16"
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
              <Icon icon={Cpu} size="lg" />
            </Box>
            <Box position="absolute" className="-top-1 -right-1 text-brand-amber animate-spin">
              <Icon icon={Sparkles} size="sm" />
            </Box>
          </Box>

          <Stack gap={1.5} align="center">
            <Text variant="headline" size="xl" weight="font-black" color="main">
              Agent Pre-Scanning Schedule
            </Text>
            <Text size="sm" color="dim">
              Analyzing <span className="text-white font-bold">{eventName}</span> with Gemini Flash
            </Text>
          </Stack>

          {/* Real-time Agent Log Steps */}
          <Stack gap={3} width="full" className="bg-muted/60 p-4 rounded-xl border border-line/40 text-left">
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
                    {stage.label}
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
