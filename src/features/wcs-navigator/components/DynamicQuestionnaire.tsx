import React, { useState, useMemo } from 'react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { DiscoveryResponse, FormQuestion, PersonaChip, QuestionAnswerValue } from '../types/navigator';
import { SelectField } from './FormFields/SelectField';
import { MultiSelectField } from './FormFields/MultiSelectField';
import { BooleanField } from './FormFields/BooleanField';
import { Sparkles, Loader2, Cpu, CheckCircle2 } from 'lucide-react';

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const THINKING_MESSAGES = [
  'Analyzing workshop tracks & room levels...',
  'Checking schedule overlaps & prelim call times...',
  'Calculating late-night energy & arrival buffers...',
  'Optimizing schedule tracks...',
];

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

  const [answersState, setAnswersState] = useState<Record<string, QuestionAnswerValue>>(() => {
    const defaults: Record<string, QuestionAnswerValue> = {};
    questions.forEach((q) => {
      if (q.defaultValue !== undefined) {
        defaults[q.id] = q.defaultValue;
      }
    });
    return { ...defaults, ...initialAnswers };
  });

  const [visibleCount, setVisibleCount] = useState<number>(() => {
    // If initial answers were explicitly provided, show all; otherwise start with 1
    return Object.keys(initialAnswers).length > 0 ? questions.length : 1;
  });
  const [thinkingIndex, setThinkingIndex] = useState<number | null>(null);
  const [thinkingText, setThinkingText] = useState<string>(THINKING_MESSAGES[0]);

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

  const handleFieldChange = (questionId: string, value: QuestionAnswerValue, index: number) => {
    const updated = { ...answers, [questionId]: value };
    setAnswersState(updated);
    if (onAnswersChange) {
      onAnswersChange(updated);
    }

    // If there are more questions to reveal sequentially
    if (index + 1 >= visibleCount && index + 1 < questions.length) {
      setThinkingIndex(index);
      setThinkingText(THINKING_MESSAGES[index % THINKING_MESSAGES.length]);

      setTimeout(() => {
        setThinkingIndex(null);
        setVisibleCount((prev) => Math.max(prev, index + 2));
      }, 500);
    }
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

  const allRevealed = visibleCount >= questions.length && thinkingIndex === null;

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" className="space-y-6 pb-20 md:pb-0">
      {/* Dynamic Question Inputs with Progressive Disclosure */}
      <div className="space-y-6">
        {questions.slice(0, visibleCount).map((question, index) => {
          const val = answers[question.id];
          const isCurrentThinking = thinkingIndex === index;

          return (
            <div
              key={question.id}
              className="space-y-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in slide-in-from-bottom-2"
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

              {/* Micro-thinking transition indicator */}
              {isCurrentThinking && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>{thinkingText}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Submit Button (Revealed when all questions are unlocked or form is valid) */}
      {(allRevealed || isValid) && (
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
      )}

      {/* Mobile Sticky Action CTA Bar (<md) */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-t border-line/80 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
            {isValid ? 'Ready to Optimize' : `Step ${Math.min(visibleCount, questions.length)} of ${questions.length}`}
          </span>
          <span className="text-xs text-text-dim">
            {isValid ? 'All questions answered' : 'Personalize your weekend'}
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


