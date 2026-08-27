import { useState, useEffect, useMemo } from 'react';
import { Sparkles, User } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { DiscoveryResponse, FormQuestion, PersonaChip } from '../types/navigator';
import { SelectField } from './FormFields/SelectField';
import { MultiSelectField } from './FormFields/MultiSelectField';
import { BooleanField } from './FormFields/BooleanField';

export interface DynamicQuestionnaireProps {
  discoveryResponse: DiscoveryResponse;
  initialAnswers?: Record<string, any>;
  personaChips?: PersonaChip[];
  onAnswersChange?: (answers: Record<string, any>) => void;
  onSubmit?: (answers: Record<string, any>) => void;
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
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);

  // Sync initialAnswers when updated externally
  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);

  const questions = discoveryResponse.suggested_form_questions || [];

  const handleFieldChange = (questionId: string, value: any) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    setActivePersonaId(null);
    if (onAnswersChange) {
      onAnswersChange(updated);
    }
  };

  const handleSelectPersona = (persona: PersonaChip) => {
    const updated = { ...answers, ...persona.answers };
    setAnswers(updated);
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
    <Box as="form" onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Optional Preset / Persona Selector Chips */}
      {personaChips && personaChips.length > 0 && (
        <Stack gap={2} className="w-full pb-4 border-b border-line">
          <Stack direction="row" align="center" gap={1.5}>
            <Icon icon={User} size="sm" color="accent" />
            <Text variant="caption-bold" color="dim">
              Quick Persona Presets
            </Text>
          </Stack>
          <Box display="flex" className="flex-wrap gap-2">
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
      <Stack gap={6} className="w-full">
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
                  value={val || []}
                  onChange={(v) => handleFieldChange(question.id, v)}
                />
              );
            case 'boolean':
              return (
                <BooleanField
                  key={question.id}
                  question={question}
                  value={Boolean(val)}
                  onChange={(v) => handleFieldChange(question.id, v)}
                />
              );
            default:
              return null;
          }
        })}
      </Stack>

      {/* Action Submit Button */}
      <Box paddingTop={4} className="border-t border-line">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          className="flex items-center justify-center gap-2"
        >
          <Icon icon={Sparkles} size="sm" />
          <span>Generate Calendar</span>
        </Button>
      </Box>
    </Box>
  );
}
