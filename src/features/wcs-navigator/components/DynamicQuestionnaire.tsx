import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, FastForward } from 'lucide-react';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { DiscoveryResponse, QuestionAnswerValue } from '../types/navigator';
import { analyzeEventFootprint } from '../utils/questionGenerator';

export interface DynamicQuestionnaireProps {
  activeEventName?: string;
  discoveryResponse?: DiscoveryResponse;
  onSubmit?: (answers: Record<string, QuestionAnswerValue>) => void;
}

export const DynamicQuestionnaire: React.FC<DynamicQuestionnaireProps> = ({
  activeEventName = 'South Bay Dance Fling 2026',
  discoveryResponse,
  onSubmit,
}) => {
  const steps = useMemo(() => {
    return analyzeEventFootprint(activeEventName, discoveryResponse);
  }, [activeEventName, discoveryResponse]);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswerValue>>({});

  const activeQuestion = steps[currentStep] || steps[0];
  const totalSteps = steps.length;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    const updatedAnswers = { ...answers, [activeQuestion.id]: optionId };
    setAnswers(updatedAnswers);

    // Smooth tactile delay before auto-advancing
    setTimeout(() => {
      setSelectedOptionId(null);
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else if (onSubmit) {
        onSubmit(updatedAnswers);
      }
    }, 180);
  };

  const handleSkipQuestion = () => {
    const defaultVal = activeQuestion.options[0]?.id || 'no_preference';
    const updatedAnswers = { ...answers, [activeQuestion.id]: answers[activeQuestion.id] || defaultVal };
    setAnswers(updatedAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (onSubmit) {
      onSubmit(updatedAnswers);
    }
  };

  const handleSkipToItinerary = () => {
    const filledAnswers: Record<string, QuestionAnswerValue> = { ...answers };
    steps.forEach((st) => {
      if (!filledAnswers[st.id]) {
        filledAnswers[st.id] = st.options[0]?.id || 'all_workshops';
      }
    });

    if (onSubmit) {
      onSubmit(filledAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setSelectedOptionId(null);
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Box maxWidth="xl" marginX="auto" paddingX={4} paddingY={{ default: 6, md: 10 }} width="full">
      {/* Sleek Progress Topline */}
      <Box display="flex" align="center" justify="between" width="full" marginBottom={2.5} className="min-w-0">
        <Box display="flex" align="center" gap={2} className="min-w-0 shrink-0">
          {currentStep > 0 && (
            <Stack
              as="button"
              direction="row"
              align="center"
              gap={1}
              paddingX={2}
              type="button"
              onClick={handleBack}
              className="min-h-11 h-11 text-xs font-mono text-text-dim hover:text-text-main cursor-pointer transition-colors shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Stack>
          )}
          <Text variant="mono" size="xs" color="dim" uppercase tracking="wider" className="shrink-0">
            Step {currentStep + 1} of {totalSteps}
          </Text>
        </Box>

        <Stack direction="row" align="center" gap={3} className="shrink-0">
          <Stack
            as="button"
            direction="row"
            align="center"
            paddingX={2}
            type="button"
            onClick={handleSkipQuestion}
            className="min-h-11 h-11 text-xs font-mono text-text-dim hover:text-brand-cyan transition-colors cursor-pointer"
          >
            Skip question →
          </Stack>
          <Text size="xs" color="dim">•</Text>
          <Text variant="mono" size="xs" color="dim">
            {progressPercent}%
          </Text>
        </Stack>
      </Box>

      {/* Clean Progress Line */}
      <Box width="full" height={1} radius="full" marginBottom={6} className="bg-surface-alt overflow-hidden">
        <Box
          height="full"
          radius="full"
          className="bg-brand-cyan transition-all duration-300 ease-out"
          width={`${progressPercent}%`}
        />
      </Box>

      {/* Direct, Uncluttered Question Header */}
      <Stack gap={1.5} marginBottom={6} className="min-w-0 break-words">
        <Text
          as="h3"
          weight="font-bold"
          size="2xl"
          color="main"
          tracking="tight"
          className="leading-snug text-xl sm:text-2xl break-words"
        >
          {activeQuestion.question}
        </Text>
        {activeQuestion.subtitle && (
          <Text variant="mono" size="xs" color="dim" marginTop={1} className="break-words">
            {activeQuestion.subtitle}
          </Text>
        )}
      </Stack>

      {/* Interactive Card Options */}
      {activeQuestion.options.length > 0 ? (
        <Grid cols={1} gap={3} className="animate-in fade-in slide-in-from-right-3 duration-150">
          {activeQuestion.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id || answers[activeQuestion.id] === opt.id;

            return (
              <Stack
                as="button"
                direction="row"
                align="center"
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                padding={4}
                radius="xl"
                border
                width="full"
                className={`group text-left transition-all duration-150 cursor-pointer min-h-11 tap-target ${
                  isSelected
                    ? 'bg-brand-cyan/15 border-brand-cyan ring-2 ring-brand-cyan/20'
                    : 'bg-surface-alt border-line/60 hover:border-brand-cyan/60 hover:bg-surface'
                }`}
              >
                <Box as="span" padding={2.5} radius="xl" border marginRight={3} className="text-xl sm:text-2xl bg-surface border-line/40 group-hover:border-brand-cyan/40 transition-colors shrink-0">
                  {opt.icon}
                </Box>
                <Box flex={1} minWidth={0} paddingRight={2} className="break-words">
                  <Text as="h4" weight="font-bold" className="text-sm sm:text-base text-text-main group-hover:text-white transition-colors break-words">
                    {opt.title}
                  </Text>
                  <Box as="p" marginTop={1} className="text-xs text-text-dim group-hover:text-text-main/80 transition-colors break-words">
                    {opt.desc}
                  </Box>
                </Box>
                <ChevronRight className="w-4 h-4 text-text-dim/60 group-hover:text-brand-cyan transition-all transform group-hover:translate-x-0.5 duration-150 shrink-0" />
              </Stack>
            );
          })}
        </Grid>
      ) : (
        /* Fallback for boolean/empty questions */
        <Stack direction={{ default: "col", sm: "row" }} gap={3} marginTop={2} className="animate-in fade-in duration-150">
          <Stack
            as="button"
            direction="row"
            align="center"
            justify="center"
            gap={3}
            padding={4}
            radius="xl"
            border
            flex={1}
            type="button"
            onClick={() => handleSelectOption('yes')}
            className="min-h-11 border-brand-cyan/60 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-text-main font-semibold transition-all duration-150 cursor-pointer"
          >
            <span className="text-xl">✅</span>
            <span>Yes, include it</span>
          </Stack>
          <Stack
            as="button"
            direction="row"
            align="center"
            justify="center"
            gap={3}
            padding={4}
            radius="xl"
            border
            flex={1}
            type="button"
            onClick={() => handleSelectOption('no')}
            className="min-h-11 border-line/60 bg-surface-alt hover:border-brand-cyan/40 hover:bg-surface text-text-dim hover:text-text-main font-medium transition-all duration-150 cursor-pointer"
          >
            <span className="text-xl">⏭️</span>
            <span>No, skip it</span>
          </Stack>
        </Stack>
      )}

      {/* Bottom Questionnaire Action Bar for Ergonomic Navigation */}
      <Box
        display="flex"
        align="center"
        justify="between"
        gap={2}
        paddingX={{ default: 3, sm: 0 }}
        paddingY={{ default: 3, sm: 0 }}
        marginTop={{ default: 4, sm: 6 }}
        paddingTop={{ default: 0, sm: 6 }}
        border="t"
        borderColor="line"
        className="sticky bottom-0 z-20 bg-surface-alt/95 backdrop-blur-md shadow-lg sm:static sm:bg-transparent sm:backdrop-blur-none sm:shadow-none text-xs font-mono min-w-0"
      >
        <Stack
          as="button"
          direction="row"
          align="center"
          justify="center"
          gap={1.5}
          paddingX={3}
          paddingY={2}
          radius="lg"
          border
          type="button"
          onClick={handleSkipQuestion}
          className="min-h-11 h-11 text-text-dim hover:text-text-main transition-colors cursor-pointer hover:bg-surface border-line/50 shrink-0 text-center"
        >
          <FastForward className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
          <span className="truncate">Skip Step →</span>
        </Stack>

        <Stack
          as="button"
          direction="row"
          align="center"
          justify="center"
          gap={1.5}
          paddingX={3}
          paddingY={2}
          radius="lg"
          border
          flex={{ default: 1, sm: "none" }}
          type="button"
          onClick={handleSkipToItinerary}
          className="min-h-11 h-11 text-brand-cyan hover:text-white font-semibold transition-colors cursor-pointer bg-brand-cyan/15 hover:bg-brand-cyan/25 border-brand-cyan/40 min-w-0 text-center"
        >
          <FastForward className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
          <span className="truncate">Skip All &amp; Generate</span>
        </Stack>
      </Box>
    </Box>
  );
};

export default DynamicQuestionnaire;



