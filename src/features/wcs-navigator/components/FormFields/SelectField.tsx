import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { FormQuestion, QuestionAnswerValue } from '../../types/navigator';

export interface SelectFieldProps {
  question: FormQuestion;
  value: QuestionAnswerValue | undefined;
  onChange: (value: QuestionAnswerValue) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({ question, value, onChange }) => {
  const options = question.options || [];
  const explanationText = question.context || 'Gemini Flash AI uses this response to filter out conflicting tracks, gate level-restricted workshops, and compute staging buffer times.';

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
              surface={isSelected ? 'highlight' : 'subtle'}
              radius="lg"
              padding={4}
              cursor="pointer"
              display="flex"
              direction="column"
              justify="between"
              gap={2}
              className={`min-h-14 text-left transition-all border tap-target ${
                isSelected
                  ? 'border-brand-cyan ring-1 ring-brand-cyan/60 bg-brand-cyan/10 shadow-sm'
                  : 'border-line hover:border-brand-cyan/50 hover:bg-surface'
              }`}
            >
              <Box display="flex" align="center" justify="between" width="full" gap={2}>
                <Text
                  variant="body-sm"
                  weight="font-bold"
                  className={isSelected ? 'text-brand-cyan' : 'text-text-main'}
                >
                  {option.label}
                </Text>
                {option.badge && (
                  <Box
                    paddingX={2}
                    paddingY={0.5}
                    radius="md"
                    className={`text-xs font-mono font-semibold uppercase tracking-wider border ${
                      isSelected
                        ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40'
                        : 'bg-muted text-text-dim border-line'
                    }`}
                  >
                    {option.badge}
                  </Box>
                )}
              </Box>

              {option.subtitle && (
                <Text variant="caption-subtle" color="dim" className="text-xs leading-relaxed">
                  {option.subtitle}
                </Text>
              )}
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
};

