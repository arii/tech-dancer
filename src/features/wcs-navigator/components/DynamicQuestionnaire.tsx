import React, { useState, useMemo } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { DiscoveryResponse, QuestionAnswerValue } from '../types/navigator';
import { ArrowLeft } from 'lucide-react';
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

  const handleBack = () => {
    if (currentStep > 0) {
      setSelectedOptionId(null);
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Box maxWidth="xl" marginX="auto" paddingX={4} paddingY={{ default: 8, md: 12 }} width="full">
      {/* Sleek Progress Topline */}
      <Box display="flex" align="center" justify="between" width="full" marginBottom={2.5}>
        <Box display="flex" align="center" gap={2}>
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="text-xs font-mono text-text-dim hover:text-white flex items-center gap-1 cursor-pointer transition-colors mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
          <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
            Step {currentStep + 1} of {totalSteps}
          </Text>
        </Box>
        <Text variant="mono" size="xs" color="dim">
          {progressPercent}% Complete
        </Text>
      </Box>

      {/* Clean Progress Line */}
      <Box width="full" height={1} radius="full" className="bg-slate-900 overflow-hidden mb-8">
        <Box
          height="full"
          radius="full"
          className="bg-brand-cyan transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
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
      </Stack>

      {/* Balanced, Highly Interactive Large Card Stack */}
      <div className="grid grid-cols-1 gap-3.5 animate-in fade-in slide-in-from-right-3 duration-150">
        {activeQuestion.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id || answers[activeQuestion.id] === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              className={`group w-full flex items-center p-4 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                isSelected
                  ? 'bg-brand-cyan/15 border-brand-cyan ring-2 ring-brand-cyan/20'
                  : 'bg-slate-950/80 border-line/60 hover:border-brand-cyan/60 hover:bg-slate-900/60'
              }`}
            >
              <span className="text-2xl mr-4 bg-slate-900/90 border border-line/40 p-2.5 rounded-xl group-hover:border-brand-cyan/40 transition-colors shrink-0">
                {opt.icon}
              </span>
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="font-bold text-sm sm:text-base text-text-main group-hover:text-white transition-colors">
                  {opt.title}
                </h4>
                <p className="text-xs text-text-dim group-hover:text-text-main/80 transition-colors mt-0.5">
                  {opt.desc}
                </p>
              </div>
              <span className="text-text-dim/60 group-hover:text-brand-cyan text-base transition-all transform translate-x-0 group-hover:translate-x-1 duration-150 shrink-0">
                →
              </span>
            </button>
          );
        })}
      </div>
    </Box>
  );
};

export default DynamicQuestionnaire;


