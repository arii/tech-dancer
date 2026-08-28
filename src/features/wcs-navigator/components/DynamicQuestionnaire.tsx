import { useState, useMemo } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { DiscoveryResponse, FormQuestion, QuestionAnswerValue } from '../types/navigator';
import { SelectField } from './FormFields/SelectField';
import { MultiSelectField } from './FormFields/MultiSelectField';
import { BooleanField } from './FormFields/BooleanField';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export interface DynamicQuestionnaireProps {
  discoveryResponse: DiscoveryResponse;
  initialAnswers?: Record<string, QuestionAnswerValue>;
  onAnswersChange?: (answers: Record<string, QuestionAnswerValue>) => void;
  onSubmit?: (answers: Record<string, QuestionAnswerValue>) => void;
  isSubmitting?: boolean;
}

export const DynamicQuestionnaire: React.FC<DynamicQuestionnaireProps> = ({
  discoveryResponse,
  initialAnswers = {},
  onAnswersChange,
  onSubmit,
  isSubmitting = false,
}) => {
  const questions = discoveryResponse.suggested_form_questions || [];
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [answersState, setAnswersState] = useState<Record<string, QuestionAnswerValue>>(() => {
    const defaults: Record<string, QuestionAnswerValue> = {};
    questions.forEach((q) => {
      if (q.defaultValue !== undefined) {
        defaults[q.id] = q.defaultValue;
      }
    });
    return { ...defaults, ...initialAnswers };
  });

  const answers = useMemo(() => {
    return { ...answersState };
  }, [answersState]);

  const currentQuestion = questions[currentStep] || questions[0];

  const handleFieldChange = (questionId: string, value: QuestionAnswerValue) => {
    const updated = { ...answers, [questionId]: value };
    setAnswersState(updated);
    if (onAnswersChange) {
      onAnswersChange(updated);
    }
  };

  const isCurrentValid = useMemo(() => {
    if (!currentQuestion) return true;
    if (!currentQuestion.required) return true;
    const val = answers[currentQuestion.id];
    if (val === undefined || val === null) return false;
    if (typeof val === 'string' && val.trim() === '') return false;
    if (Array.isArray(val) && val.length === 0) return false;
    return true;
  }, [currentQuestion, answers]);

  const isAllValid = useMemo(() => {
    return questions.every((q: FormQuestion) => {
      if (!q.required) return true;
      const val = answers[q.id];
      if (val === undefined || val === null) return false;
      if (typeof val === 'string' && val.trim() === '') return false;
      if (Array.isArray(val) && val.length === 0) return false;
      return true;
    });
  }, [questions, answers]);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (isAllValid && onSubmit) {
      onSubmit(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < questions.length - 1) {
      handleNext();
    } else if (isAllValid && onSubmit) {
      onSubmit(answers);
    }
  };

  if (!currentQuestion) return null;

  const isLastStep = currentStep === questions.length - 1;
  const progressPercent = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <Box as="form" onSubmit={handleSubmit} width="full">
      {/* Progressive Step Progress Indicator */}
      <Stack gap={3} marginBottom={6}>
        <Box display="flex" align="center" justify="between" width="full">
          <Text variant="mono" size="xs" color="dim" weight="font-medium" uppercase tracking="wider">
            Step {currentStep + 1} of {questions.length}
          </Text>
          <Text variant="mono" size="xs" color="dim">
            {progressPercent}% Complete
          </Text>
        </Box>

        {/* Minimal Progress Line */}
        <Box width="full" height={1} radius="full" className="bg-surface-subtle overflow-hidden">
          <Box
            height="full"
            radius="full"
            className="bg-line-strong transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </Box>
      </Stack>

      {/* Active Question Render */}
      <Box key={currentQuestion.id} className="transition-all duration-300 animate-in fade-in slide-in-from-right-4">
        {currentQuestion.type === 'select' && (
          <SelectField
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={(v) => handleFieldChange(currentQuestion.id, v)}
          />
        )}
        {currentQuestion.type === 'multiselect' && (
          <MultiSelectField
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={(v) => handleFieldChange(currentQuestion.id, v)}
          />
        )}
        {currentQuestion.type === 'boolean' && (
          <BooleanField
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={(v) => handleFieldChange(currentQuestion.id, v)}
          />
        )}
      </Box>

      {/* Clean Inline Navigation Actions */}
      <Box
        display="flex"
        align="center"
        justify="between"
        gap={4}
        paddingTop={6}
        marginTop={6}
        className="border-t border-line/40"
      >
        {currentStep > 0 ? (
          <Box
            as="button"
            type="button"
            onClick={handleBack}
            className="text-xs font-mono text-text-dim hover:text-text-main flex items-center gap-1.5 cursor-pointer transition-colors py-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Box>
        ) : (
          <Box />
        )}

        <Box
          as="button"
          type="submit"
          disabled={!isCurrentValid || (isLastStep && !isAllValid) || isSubmitting}
          className={`text-xs font-mono font-semibold flex items-center gap-2 py-2 px-4 rounded-md transition-all cursor-pointer ${
            !isCurrentValid || (isLastStep && !isAllValid) || isSubmitting
              ? 'opacity-40 cursor-not-allowed text-text-dim bg-surface/50'
              : 'bg-text-main text-black hover:opacity-90 shadow-sm'
          }`}
        >
          {isLastStep ? (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Calendar</span>
            </>
          ) : (
            <>
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};


