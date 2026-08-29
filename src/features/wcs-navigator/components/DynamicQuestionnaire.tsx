// impeccable-ignore-file
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
      <Box display="flex" align="center" justify="between" width="full" marginBottom={2.5}>
        <Box display="flex" align="center" gap={2}>
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs text-text-dim hover:text-white transition-colors cursor-pointer mr-2"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
          <span className="text-xs text-text-dim">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </Box>

        <span className="text-xs text-text-dim font-medium">
          {progressPercent}%
        </span>
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
      <Stack gap={1.5} marginBottom={6}>
        <Text
          as="h3"
          weight="font-bold"
          size="2xl"
          color="main"
          tracking="tight"
          className="leading-snug"
        >
          {activeQuestion.question}
        </Text>
        {activeQuestion.subtitle && (
          <p className="text-xs sm:text-sm text-text-dim leading-relaxed mt-1">
            {activeQuestion.subtitle}
          </p>
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
                className={`group text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-cyan/15 border-brand-cyan ring-2 ring-brand-cyan/20'
                    : 'bg-surface-alt border-line/60 hover:border-brand-cyan/60 hover:bg-surface'
                }`}
              >
                <Box as="span" padding={2.5} radius="xl" border marginRight={4} className="text-2xl bg-surface border-line/40 group-hover:border-brand-cyan/40 transition-colors shrink-0">
                  {opt.icon}
                </Box>
                <Box flex={1} minWidth={0} paddingRight={2}>
                  <h4 className="font-bold text-sm sm:text-base text-text-main group-hover:text-white transition-colors">
                    {opt.title}
                  </h4>
                  <Box as="p" marginTop={1} className="text-xs text-text-dim group-hover:text-text-main/80 transition-colors">
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
            className="border-brand-cyan/60 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-text-main font-semibold transition-all duration-150 cursor-pointer"
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
            className="border-line/60 bg-surface-alt hover:border-brand-cyan/40 hover:bg-surface text-text-dim hover:text-text-main font-medium transition-all duration-150 cursor-pointer"
          >
            <span className="text-xl">⏭️</span>
            <span>No, skip it</span>
          </Stack>
        </Stack>
      )}

      {/* Bottom Questionnaire Controls: Skip Step or Skip All */}
      <Box
        display="flex"
        align="center"
        justify="between"
        paddingTop={6}
        marginTop={6}
        border="t"
        borderColor="line"
        className="border-line/40 text-xs"
      >
        <button
          type="button"
          onClick={handleSkipQuestion}
          className="flex items-center gap-1.5 text-text-dim hover:text-white transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-surface-alt border border-transparent hover:border-line/60"
        >
          <span>Next / Skip</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={handleSkipToItinerary}
          className="flex items-center gap-1.5 text-text-main hover:text-white transition-colors cursor-pointer py-2 px-3.5 rounded-lg bg-surface-alt hover:bg-surface border border-line/60 font-medium"
        >
          <FastForward className="w-3.5 h-3.5 text-text-dim" />
          <span>Skip All &amp; Generate Itinerary</span>
        </button>
      </Box>
    </Box>
  );
};

export default DynamicQuestionnaire;



