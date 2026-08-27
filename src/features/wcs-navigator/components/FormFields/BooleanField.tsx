import { useState } from 'react';
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
  const isChecked = Boolean(value);

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
              <Text variant="caption-bold" className="text-brand-cyan font-semibold" aria-label="Required">
                *
              </Text>
            )}
          </Stack>
        </Stack>

        <Text variant="caption-subtle" color="dim" className="leading-relaxed mt-1">
          {explanationText}
        </Text>
      </Stack>

      <Box
        as="button"
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={question.title}
        onClick={() => onChange(!isChecked)}
        surface="subtle"
        radius="lg"
        paddingX={4}
        paddingY={3}
        cursor="pointer"
        display="flex"
        align="center"
        justify="between"
        width="full"
        className={`min-h-11 border tap-target transition-all ${
          isChecked
            ? 'border-brand-cyan ring-1 ring-brand-cyan bg-brand-cyan/10'
            : 'border-line hover:border-brand-cyan/50 hover:bg-surface'
        }`}
      >
        <Text variant="body-sm" className={isChecked ? 'text-brand-cyan font-semibold' : 'text-text-main'}>
          {isChecked ? 'Enabled' : 'Disabled'}
        </Text>
        <Box
          display="flex"
          align="center"
          className={`w-11 h-6 rounded-full p-1 transition-colors ${
            isChecked ? 'bg-brand-cyan' : 'bg-surface-subtle border border-line'
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

