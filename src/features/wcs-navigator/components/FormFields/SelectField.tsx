import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { FormQuestion, QuestionAnswerValue } from '../../types/navigator';

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

interface SelectFieldProps {
  question: FormQuestion;
  value: QuestionAnswerValue | undefined;
  onChange: (value: QuestionAnswerValue) => void;
}

export function SelectField({ question, value, onChange }: SelectFieldProps) {
  const options = question.options || [];

  return (
    <Stack gap={3} width="full">
      <Stack gap={1.5}>
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

        {question.context && (
          <Box surface="subtle" radius="sm" padding={2} className="border border-line/60">
            <Stack direction="row" align="center" gap={2}>
              <Icon icon={InfoIcon} size="sm" color="accent" />
              <Text variant="caption-subtle" color="dim">
                <Text as="span" variant="caption-bold" color="dim">
                  Why We Ask This:&nbsp;
                </Text>
                {question.context}
              </Text>
            </Stack>
          </Box>
        )}
      </Stack>

      <Grid cols={{ base: 1, sm: 2 }} gap={2} role="radiogroup" aria-label={question.title}>
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
              surface={isSelected ? "highlight" : "subtle"}
              radius="md"
              paddingX={4}
              paddingY={3}
              cursor="pointer"
              className={`text-left transition-all border tap-target ${
                isSelected
                  ? 'border-accent ring-1 ring-accent'
                  : 'border-line hover:border-line-hover'
              }`}
            >
              <Text
                variant="body-sm"
                className={isSelected ? 'text-accent font-semibold' : 'text-text-main'}
              >
                {option.label}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
}
