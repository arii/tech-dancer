import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { FormQuestion, QuestionAnswerValue } from '../../types/navigator';

export interface SelectFieldProps {
  question: FormQuestion;
  value: QuestionAnswerValue | undefined;
  onChange: (value: QuestionAnswerValue) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({ question, value, onChange }) => {
  const options = question.options || [];

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

      <Grid cols={{ default: 1, sm: 2 }} gap={3} role="radiogroup" aria-label={question.title}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <Box
              key={String(option.value)}
              as="button"
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              radius="lg"
              padding={4}
              cursor="pointer"
              display="flex"
              align="center"
              justify="between"
              gap={3}
              className={`min-h-11 text-left transition-all border ${
                isSelected
                  ? 'bg-surface-subtle border-line-strong text-text-main ring-1 ring-line-strong'
                  : 'bg-surface/40 border-line/50 hover:border-line hover:bg-surface text-text-dim hover:text-text-main'
              }`}
            >
              <Text
                variant="body-sm"
                weight={isSelected ? 'font-bold' : 'font-medium'}
                className={isSelected ? 'text-text-main' : 'text-text-dim'}
              >
                {option.label}
              </Text>
              {option.badge && (
                <Text
                  variant="mono"
                  size="micro"
                  className="text-xs font-mono text-text-dim uppercase tracking-wider shrink-0"
                >
                  {option.badge}
                </Text>
              )}
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
};

