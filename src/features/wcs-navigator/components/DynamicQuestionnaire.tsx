// impeccable-ignore-file
import React, { useState, useMemo } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { DiscoveryResponse, QuestionAnswerValue } from '../types/navigator';
import { ArrowLeft, FastForward, SkipForward } from 'lucide-react';
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
    <Box maxWidth="xl" marginX="auto" paddingX={4} paddingY={{ default: 6, md: 10 }} paddingBottom={{ default: 24, md: 10 }} width="full" className="min-w-0">
      {/* Sleek Progress Topline */}
      <Box display="flex" align="center" justify="between" wrap gap={2} width="full" marginBottom={2.5}>
        <Box display="flex" align="center" gap={2} className="shrink-0">
          {currentStep > 0 && (
            <Stack
              as="button"
              direction="row"
              align="center"
              gap={1}
              type="button"
              onClick={handleBack}
              marginRight={2}
              className="text-xs font-mono text-text-dim hover:text-white cursor-pointer transition-colors min-h-11 items-center px-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Stack>
          )}
          <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
            Step {currentStep + 1} of {totalSteps}
          </Text>
        </Box>

        <Stack direction="row" align="center" gap={2} className="shrink-0">
          <button
            type="button"
            onClick={handleSkipQuestion}
            className="text-xs font-mono text-text-dim hover:text-brand-cyan transition-colors cursor-pointer min-h-11 flex items-center px-1"
          >
            Skip this question →
          </button>
          <span className="text-text-dim/40">•</span>
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
      <Stack gap={1.5} marginBottom={6} className="min-w-0">
        <Text
          as="h3"
          weight="font-bold"
          size="2xl"
          color="main"
          tracking="tight"
          className="leading-snug break-words min-w-0"
        >
          {activeQuestion.question}
        </Text>
        {activeQuestion.subtitle && (
          <Text variant="mono" size="xs" color="dim" marginTop={1} className="break-words min-w-0">
            {activeQuestion.subtitle}
          </Text>
        )}
      </Stack>

      {/* Interactive Card Options */}
      {activeQuestion.options.length > 0 ? (
        <Grid cols={1} gap={3} className="animate-in fade-in slide-in-from-right-3 duration-150 min-w-0">
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
                className={`group text-left transition-all duration-150 cursor-pointer min-h-11 min-w-0 ${
                  isSelected
                    ? 'bg-brand-cyan/15 border-brand-cyan ring-2 ring-brand-cyan/20'
                    : 'bg-surface-alt border-line/60 hover:border-brand-cyan/60 hover:bg-surface'
                }`}
              >
                <Box as="span" padding={2.5} radius="xl" border marginRight={4} className="text-2xl bg-surface border-line/40 group-hover:border-brand-cyan/40 transition-colors shrink-0">
                  {opt.icon}
                </Box>
                <Box flex={1} minWidth={0} paddingRight={2}>
                  <h4 className="font-bold text-sm sm:text-base text-text-main group-hover:text-white transition-colors break-words">
                    {opt.title}
                  </h4>
                  <Box as="p" marginTop={1} className="text-xs text-text-dim group-hover:text-text-main/80 transition-colors break-words">
                    {opt.desc}
                  </Box>
                </Box>
                <span className="text-text-dim/60 group-hover:text-brand-cyan text-base transition-all transform translate-x-0 group-hover:translate-x-1 duration-150 shrink-0">
                  →
                </span>
              </Stack>
            );
          })}
        </Grid>
      ) : (
        /* Fallback for boolean/empty questions */
        <Stack direction={{ default: "col", sm: "row" }} gap={3} marginTop={2} className="animate-in fade-in duration-150 min-w-0">
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
            className="border-brand-cyan/60 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-text-main font-semibold transition-all duration-150 cursor-pointer min-h-11"
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
            className="border-line/60 bg-surface-alt hover:border-brand-cyan/40 hover:bg-surface text-text-dim hover:text-text-main font-medium transition-all duration-150 cursor-pointer min-h-11"
          >
            <span className="text-xl">⏭️</span>
            <span>No, skip it</span>
          </Stack>
        </Stack>
      )}

      {/* Sticky Bottom Action Bar for Thumb-Friendly Mobile Advancement */}
      <Box
        className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-surface-alt/95 backdrop-blur-md border-t border-line/60 md:static md:bg-transparent md:border-0 md:p-0 md:mt-6 md:pt-6 md:border-t md:border-line/40"
      >
        <Box
          display="flex"
          align="center"
          justify="between"
          gap={2}
          maxWidth="xl"
          marginX="auto"
          className="text-xs font-mono"
        >
          <button
            type="button"
            onClick={handleSkipQuestion}
            className="flex items-center justify-center gap-1.5 text-text-dim hover:text-white transition-colors cursor-pointer min-h-11 px-3 rounded-lg hover:bg-surface border border-line/40 shrink-0"
          >
            <SkipForward className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
            <span className="hidden sm:inline">Skip this question (Next Step →)</span>
            <span className="sm:hidden">Skip</span>
          </button>

          <button
            type="button"
            onClick={handleSkipToItinerary}
            className="flex items-center justify-center gap-1.5 text-brand-cyan hover:text-white transition-colors cursor-pointer min-h-11 px-3.5 rounded-lg bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/40 font-semibold"
          >
            <FastForward className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">⚡ Skip All &amp; Generate Itinerary</span>
            <span className="sm:hidden">⚡ Generate Itinerary</span>
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default DynamicQuestionnaire;



