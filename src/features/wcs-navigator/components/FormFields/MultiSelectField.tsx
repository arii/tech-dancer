import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { FormQuestion, QuestionAnswerValue } from '../../types/navigator';

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
  const options = question.options || [];
  const selectedValues = Array.isArray(value) ? value : [];

  const handleToggle = (optionValue: string | boolean | number) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else {
      onChange([...selectedValues, optionValue]);
    }
  };

  return (
    <Stack gap={4} width="full">
      <Stack direction="row" align="center" gap={2}>
        <Text as="h3" variant="body-bold" size="lg" color="main" className="text-base sm:text-lg">
          {question.title}
        </Text>
        {question.required && (
          <Text variant="caption-bold" className="text-text-dim font-semibold" aria-label="Required">
            *
          </Text>
        )}
      </Stack>

      <Grid cols={{ default: 1, sm: 2 }} gap={3} role="group" aria-label={question.title}>
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
              radius="lg"
              paddingX={4}
              paddingY={3.5}
              cursor="pointer"
              display="flex"
              align="center"
              justify="between"
              className={`min-h-11 text-left transition-all border ${
                isSelected
                  ? 'bg-surface-subtle border-line-strong text-text-main ring-1 ring-line-strong'
                  : 'bg-surface/40 border-line/50 hover:border-line hover:bg-surface text-text-dim hover:text-text-main'
              }`}
            >
              <Text
                variant="body-sm"
                className={`flex-1 pr-2 leading-snug ${isSelected ? 'text-text-main font-semibold' : 'text-text-dim'}`}
              >
                {option.label}
              </Text>
              <Box
                display="flex"
                align="center"
                justify="center"
                className={`w-4 h-4 rounded border shrink-0 transition-colors ${
                  isSelected ? 'bg-text-main border-text-main text-black' : 'border-line/70 bg-surface/60'
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

