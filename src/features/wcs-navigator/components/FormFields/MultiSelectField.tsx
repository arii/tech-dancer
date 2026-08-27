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
              <Text variant="caption-bold" className="text-brand-cyan font-semibold" aria-label="Required">
                *
              </Text>
            )}
          </Stack>
        </Stack>

        <Box paddingTop={1}>
          <Text variant="caption-subtle" color="dim" className="leading-relaxed">
            {explanationText}
          </Text>
        </Box>
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
              className={`min-h-11 text-left transition-all border tap-target ${
                isSelected
                  ? 'border-brand-cyan ring-1 ring-brand-cyan/60 bg-brand-cyan/10'
                  : 'border-line hover:border-brand-cyan/50 hover:bg-surface'
              }`}
            >
              <Text
                variant="body-sm"
                className={`flex-1 pr-2 leading-snug ${isSelected ? 'text-brand-cyan font-semibold' : 'text-text-main'}`}
              >
                {option.label}
              </Text>
              <Box
                display="flex"
                align="center"
                justify="center"
                className={`w-5 h-5 rounded border shrink-0 transition-colors ${
                  isSelected ? 'bg-brand-cyan border-brand-cyan text-black' : 'border-line bg-surface'
                }`}
              >
                {isSelected && <Icon icon={CheckIcon} size="xs" className="stroke-2" />}
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
};

