import React, { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
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

export interface BooleanFieldProps {
  question: FormQuestion;
  value: QuestionAnswerValue | undefined;
  onChange: (value: QuestionAnswerValue) => void;
}

export const BooleanField: React.FC<BooleanFieldProps> = ({ question, value = false, onChange }) => {
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const isChecked = Boolean(value);
  const disclosureId = `why-ask-${question.id}`;
  const triggerId = `why-ask-trigger-${question.id}`;

  const explanationText = question.context || 'Gemini Flash AI factors this preference into sleep/recovery buffer calculations and personalizes packing checklist items.';

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

      <Box
        as="button"
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={question.title}
        onClick={() => onChange(!isChecked)}
        surface="subtle"
        radius="md"
        paddingX={4}
        paddingY={3}
        cursor="pointer"
        className={`min-h-[44px] w-full flex items-center justify-between border tap-target transition-all ${
          isChecked
            ? 'border-accent ring-1 ring-accent bg-accent/10'
            : 'border-line hover:border-line-hover hover:bg-surface'
        }`}
      >
        <Text variant="body-sm" className={isChecked ? 'text-accent font-semibold' : 'text-text-main'}>
          {isChecked ? 'Enabled' : 'Disabled'}
        </Text>
        <Box
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
            isChecked ? 'bg-accent' : 'bg-surface-subtle border border-line'
          }`}
        >
          <Box
            className={`bg-text-main w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isChecked ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </Box>
      </Box>
    </Stack>
  );
};

