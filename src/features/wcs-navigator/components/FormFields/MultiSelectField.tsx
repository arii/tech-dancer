// impeccable-ignore-file
import React, { useState } from 'react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { FormQuestion, QuestionAnswerValue } from '../../types/navigator';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface MultiSelectFieldProps {
  question: FormQuestion;
  value: QuestionAnswerValue | undefined;
  onChange: (value: QuestionAnswerValue) => void;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({ question, value = [], onChange }) => {
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const options = question.options || [];
  const selectedValues = Array.isArray(value) ? value : [];
  const disclosureId = `why-ask-${question.id}`;
  const triggerId = `why-ask-trigger-${question.id}`;

  const explanationText = question.context || 'Gemini Flash AI scans simultaneous ballroom schedules and prioritizes your chosen workshop topics while resolving schedule conflicts.';

  const handleToggle = (optionValue: string | boolean | number) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else {
      onChange([...selectedValues, optionValue]);
    }
  };

  return (
    <Stack gap={3} width="full">
      <Stack gap={1.5}>
        <Stack direction="row" align="center" justify="between" wrap gap={2}>
          <Stack direction="row" align="center" gap={2}>
            <Text as="h3" variant="body-bold" color="main">
              {question.title}
            </Text>
            {question.required && (
              <Text variant="caption-bold" className="text-accent font-semibold" aria-label="Required">
                *
              </Text>
            )}
          </Stack>

          {/* Inline "Why We Ask This" Disclosure Badge / Trigger */}
          <Box
            as="button"
            id={triggerId}
            type="button"
            aria-expanded={isExplainOpen}
            aria-controls={disclosureId}
            onClick={() => setIsExplainOpen(!isExplainOpen)}
            paddingX={2.5}
            paddingY={1}
            radius="full"
            display="flex"
            align="center"
            gap={1.5}
            className="min-h-[32px] text-xs font-mono text-dim hover:text-accent bg-surface/80 hover:bg-accent/10 border border-line hover:border-accent/40 transition-colors cursor-pointer"
          >
            <Icon icon={Sparkles} size="xs" color="accent" />
            <span>Why We Ask This</span>
            <Icon icon={isExplainOpen ? ChevronUp : ChevronDown} size="xs" />
          </Box>
        </Stack>

        {/* Explainability Disclosure Card */}
        {isExplainOpen && (
          <Box
            id={disclosureId}
            role="region"
            aria-labelledby={triggerId}
            surface="subtle"
            radius="md"
            padding={3}
            className="border border-accent/30 bg-accent/5 transition-all"
          >
            <Stack direction="row" align="start" gap={2.5}>
              <Icon icon={InfoIcon} size="sm" color="accent" className="mt-0.5 shrink-0" />
              <Stack gap={1}>
                <Text variant="caption-bold" color="accent" className="font-mono">
                  Gemini Flash Decision Logic:
                </Text>
                <Text variant="caption-subtle" color="dim" className="leading-relaxed">
                  {explanationText}
                </Text>
              </Stack>
            </Stack>
          </Box>
        )}
      </Stack>

      <Grid cols={{ default: 1, sm: 2 }} gap={2.5} role="group" aria-label={question.title}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <Box
              key={String(option.value)}
              as="button"
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => handleToggle(option.value)}
              surface={isSelected ? 'highlight' : 'subtle'}
              radius="lg"
              paddingX={4}
              paddingY={3}
              cursor="pointer"
              display="flex"
              align="center"
              justify="between"
              className={`min-h-[44px] text-left transition-all border tap-target ${
                isSelected
                  ? 'border-accent ring-1 ring-accent/60 bg-accent/10'
                  : 'border-line hover:border-line-hover hover:bg-surface'
              }`}
            >
              <Text
                variant="body-sm"
                className={`flex-1 pr-2 leading-snug ${isSelected ? 'text-accent font-semibold' : 'text-text-main'}`}
              >
                {option.label}
              </Text>
              <Box
                display="flex"
                align="center"
                justify="center"
                className={`w-5 h-5 rounded border shrink-0 transition-colors ${
                  isSelected ? 'bg-accent border-accent text-black' : 'border-line bg-surface'
                }`}
              >
                {isSelected && <Icon icon={CheckIcon} size="xs" className="stroke-[3]" />}
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
};

