import { useState, useMemo } from 'react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { DiscoveryResponse, FormQuestion, PersonaChip, QuestionAnswerValue } from '../types/navigator';
import { SelectField } from './FormFields/SelectField';
import { MultiSelectField } from './FormFields/MultiSelectField';
import { BooleanField } from './FormFields/BooleanField';

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);

export interface DynamicQuestionnaireProps {
  discoveryResponse: DiscoveryResponse;
  initialAnswers?: Record<string, QuestionAnswerValue>;
  personaChips?: PersonaChip[];
  onAnswersChange?: (answers: Record<string, QuestionAnswerValue>) => void;
  onSubmit?: (answers: Record<string, QuestionAnswerValue>) => void;
  isSubmitting?: boolean;
}

export function DynamicQuestionnaire({
  discoveryResponse,
  initialAnswers = {},
  personaChips,
  onAnswersChange,
  onSubmit,
  isSubmitting = false,
}: DynamicQuestionnaireProps) {
  const [answersState, setAnswersState] = useState<Record<string, QuestionAnswerValue>>(initialAnswers);
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);

  // Sync initialAnswers without useEffect setState anti-pattern
  const answers = useMemo(() => {
    return { ...initialAnswers, ...answersState };
  }, [initialAnswers, answersState]);

  const questions = discoveryResponse.suggested_form_questions || [];

  const handleFieldChange = (questionId: string, value: QuestionAnswerValue) => {
    const updated = { ...answers, [questionId]: value };
    setAnswersState(updated);
    setActivePersonaId(null);
    if (onAnswersChange) {
      onAnswersChange(updated);
    }
  };

  const handleSelectPersona = (persona: PersonaChip) => {
    const updated = { ...answers, ...persona.answers };
    setAnswersState(updated);
    setActivePersonaId(persona.id);
    if (onAnswersChange) {
      onAnswersChange(updated);
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

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" className="space-y-6">
      {/* Optional Preset / Persona Selector Chips */}
      {personaChips && personaChips.length > 0 && (
        <Stack gap={2} width="full" paddingBottom={4} border="b">
          <Stack direction="row" align="center" gap={1.5}>
            <Icon icon={UserIcon} size="sm" color="accent" />
            <Text variant="caption-bold" color="dim">
              Quick Persona Presets
            </Text>
          </Stack>
          <Box display="flex" wrap={true} gap={2}>
            {personaChips.map((persona) => {
              const isActive = activePersonaId === persona.id;
              return (
                <Box
                  key={persona.id}
                  as="button"
                  type="button"
                  onClick={() => handleSelectPersona(persona)}
                  surface={isActive ? "highlight" : "subtle"}
                  radius="full"
                  paddingX={3}
                  paddingY={1.5}
                  cursor="pointer"
                  className={`transition-all border tap-target text-xs ${
                    isActive
                      ? 'border-accent text-accent font-semibold ring-1 ring-accent'
                      : 'border-line text-text-dim hover:text-text-main hover:border-line-hover'
                  }`}
                >
                  {persona.label}
                </Box>
              );
            })}
          </Box>
        </Stack>
      )}

      {/* Dynamic Question Inputs */}
      <Stack gap={6} width="full">
        {questions.map((question) => {
          const val = answers[question.id];

          switch (question.type) {
            case 'select':
              return (
                <SelectField
                  key={question.id}
                  question={question}
                  value={val}
                  onChange={(v) => handleFieldChange(question.id, v)}
                />
              );
            case 'multiselect':
              return (
                <MultiSelectField
                  key={question.id}
                  question={question}
                  value={val}
                  onChange={(v) => handleFieldChange(question.id, v)}
                />
              );
            case 'boolean':
              return (
                <BooleanField
                  key={question.id}
                  question={question}
                  value={val}
                  onChange={(v) => handleFieldChange(question.id, v)}
                />
              );
            default:
              return null;
          }
        })}
      </Stack>

      {/* Action Submit Button */}
      <Box paddingTop={4} border="t">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          <Stack direction="row" align="center" justify="center" gap={2}>
            <Icon icon={SparklesIcon} size="sm" />
            <Text as="span">Generate Calendar</Text>
          </Stack>
        </Button>
      </Box>
    </Box>
  );
}
