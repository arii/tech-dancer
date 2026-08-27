import React, { useState, useMemo, useEffect } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && onSubmit) {
      onSubmit(answers);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" className="space-y-6 pb-20 md:pb-0">
      {/* Dynamic Question Inputs with Progressive Disclosure & Stagger Animation */}
      <Stack gap={6}>
        {questions.map((question, index) => {
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
                  surface="subtle"
                  paddingX={3.5}
                  paddingY={2.5}
                  radius="lg"
                  border
                  display="flex"
                  align="center"
                  gap={2.5}
                  className="border-accent/40 bg-accent/5 animate-pulse mt-2"
                >
                  <Icon icon={Bot} size="xs" color="accent" />
                  <Icon icon={Loader2} size="xs" color="accent" className="animate-spin" />
                  <Text variant="caption-subtle" color="accent" className="font-mono text-xs">
                    Gemini AI Agent scanning ballroom timetable for next prompt...
                  </Text>
                </Box>
              )}
            </Stack>
          );
        })}
      </Stack>

      {/* Action Submit Button */}
      <div className="pt-4 border-t border-line/60 transition-all duration-400 ease-out animate-in fade-in slide-in-from-bottom-2">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          className="min-h-[48px]"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="font-bold text-sm">Generate Calendar</span>
          </div>
        </Button>
      </div>

      {/* Mobile Sticky Action CTA Bar (<md) */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-t border-line/80 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
            {isValid ? 'Ready to Optimize' : 'Complete Preferences'}
          </span>
          <span className="text-xs text-text-dim">
            {isValid ? 'All required answered' : 'Personalize your weekend'}
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          size="md"
          className="min-h-[44px] shrink-0 font-bold"
        >
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate</span>
          </div>
        </Button>
      </div>
    </Box>
  );
};


