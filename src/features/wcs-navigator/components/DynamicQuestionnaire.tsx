import { useState, useMemo } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Button } from '@/layouts/Button';
import { DiscoveryResponse, FormQuestion, QuestionAnswerValue } from '../types/navigator';
import { SelectField } from './FormFields/SelectField';
import { MultiSelectField } from './FormFields/MultiSelectField';
import { BooleanField } from './FormFields/BooleanField';
import { Sparkles, Bot, Loader2 } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

export interface DynamicQuestionnaireProps {
  discoveryResponse: DiscoveryResponse;
  initialAnswers?: Record<string, QuestionAnswerValue>;
  personaChips?: PersonaChip[];
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

  const [isSimulatingAgent, setIsSimulatingAgent] = useState<boolean>(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  const [answersState, setAnswersState] = useState<Record<string, QuestionAnswerValue>>(() => {
    const defaults: Record<string, QuestionAnswerValue> = {};
    questions.forEach((q) => {
      if (q.defaultValue !== undefined) {
        defaults[q.id] = q.defaultValue;
      }
    });
    return { ...defaults, ...initialAnswers };
  });

  // Sync initialAnswers
  const answers = useMemo(() => {
    const defaults: Record<string, QuestionAnswerValue> = {};
    questions.forEach((q) => {
      if (q.defaultValue !== undefined) {
        defaults[q.id] = q.defaultValue;
      }
    });
    return { ...defaults, ...initialAnswers, ...answersState };
  }, [questions, initialAnswers, answersState]);

  const handleFieldChange = (questionId: string, value: QuestionAnswerValue, _index: number) => {
    const updated = { ...answers, [questionId]: value };
    setAnswersState(updated);
    setActiveQuestionId(questionId);
    if (onAnswersChange) {
      onAnswersChange(updated);
    }

    // Progressive disclosure animation feedback (Item 3): trigger micro-loader simulation on tap
    setIsSimulatingAgent(true);
    setTimeout(() => {
      setIsSimulatingAgent(false);
    }, 550);
  };

  // Validation: check if all required questions have valid non-empty answers
  const isValid = useMemo(() => {
    return questions.every((q: FormQuestion) => {
      if (!q.required) return true;
      const val = answers[q.id];
      if (val === undefined || val === null) return false;
      if (typeof val === 'string' && val.trim() === '') return false;
      if (Array.isArray(val) && val.length === 0) return false;
      return true;
    });
  }, [questions, answers]);

  const visibleQuestions = useMemo(() => {
    const visible: FormQuestion[] = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      visible.push(q);
      const val = answers[q.id];
      const hasAnswer =
        val !== undefined &&
        val !== null &&
        (typeof val === 'string' ? val.trim() !== '' : Array.isArray(val) ? val.length > 0 : true);
      if (!hasAnswer) break;
    }
    return visible;
  }, [questions, answers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && onSubmit) {
      onSubmit(answers);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="full">
      {/* Dynamic Question Inputs with Progressive Disclosure & Stagger Animation */}
      <Stack gap={6}>
        {visibleQuestions.map((question, index) => {
          const val = answers[question.id];
          const isActive = activeQuestionId === question.id;

          return (
            <Stack
              key={question.id}
              gap={3}
              className="transition-all duration-300 animate-in fade-in slide-in-from-top-2"
            >
              {question.type === 'select' && (
                <SelectField
                  question={question}
                  value={val}
                  onChange={(v) => handleFieldChange(question.id, v, index)}
                />
              )}
              {question.type === 'multiselect' && (
                <MultiSelectField
                  question={question}
                  value={val}
                  onChange={(v) => handleFieldChange(question.id, v, index)}
                />
              )}
              {question.type === 'boolean' && (
                <BooleanField
                  question={question}
                  value={val}
                  onChange={(v) => handleFieldChange(question.id, v, index)}
                />
              )}

              {/* Micro Typing Indicator / Simulated Agent Loader beneath active selection */}
              {isSimulatingAgent && isActive && (
                <Box
                  surface="card"
                  paddingX={3.5}
                  paddingY={2.5}
                  radius="lg"
                  border
                  display="flex"
                  align="center"
                  gap={2.5}
                  marginTop={2}
                  className="border-accent/40 bg-accent/5 animate-pulse"
                >
                  <Icon icon={Bot} size="xs" color="accent" />
                  <Icon icon={Loader2} size="xs" color="accent" className="animate-spin" />
                  <Text variant="mono" size="xs" color="accent">
                    Gemini AI Agent scanning ballroom timetable for next prompt...
                  </Text>
                </Box>
              )}
            </Stack>
          );
        })}
      </Stack>

      {/* Action Submit Button */}
      <Box paddingTop={4} marginTop={6} border className="border-t border-line/60 transition-all duration-400 ease-out animate-in fade-in slide-in-from-bottom-2">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          <Box display="flex" align="center" justify="center" gap={2}>
            <Sparkles className="w-4 h-4 text-black" />
            <Text weight="font-bold" size="sm" color="main">Generate Calendar</Text>
          </Box>
        </Button>
      </Box>

      {/* Mobile Sticky Action CTA Bar (<md) */}
      <Box
        display="flex"
        align="center"
        justify="between"
        gap={3}
        paddingX={4}
        paddingY={3}
        surface="surface"
        border
        shadow="2xl"
        className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-t border-line/80"
      >
        <Stack gap={0.5}>
          <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="wider">
            {isValid ? 'Ready to Optimize' : 'Complete Preferences'}
          </Text>
          <Text size="xs" color="dim">
            {isValid ? 'All required answered' : 'Personalize your weekend'}
          </Text>
        </Stack>

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          size="md"
          className="shrink-0 font-bold"
        >
          <Box display="flex" align="center" justify="center" gap={1.5}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate</span>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};


