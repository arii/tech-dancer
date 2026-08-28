import { Box, Stack, Text } from '@/layouts/Primitives';
import { FormQuestion, QuestionAnswerValue } from '../../types/navigator';

export interface BooleanFieldProps {
  question: FormQuestion;
  value: QuestionAnswerValue | undefined;
  onChange: (value: QuestionAnswerValue) => void;
}

export const BooleanField: React.FC<BooleanFieldProps> = ({ question, value = false, onChange }) => {
  const isChecked = Boolean(value);

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

      <Box
        as="button"
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={question.title}
        onClick={() => onChange(!isChecked)}
        radius="lg"
        paddingX={5}
        paddingY={4}
        cursor="pointer"
        display="flex"
        align="center"
        justify="between"
        width="full"
        className={`min-h-14 transition-all border ${
          isChecked
            ? 'bg-surface-subtle border-line-strong ring-1 ring-line-strong'
            : 'bg-surface/40 border-line/50 hover:border-line hover:bg-surface'
        }`}
      >
        <Text variant="body-sm" weight={isChecked ? 'font-bold' : 'font-medium'} className={isChecked ? 'text-text-main' : 'text-text-dim'}>
          {isChecked ? 'Yes, include in schedule' : 'No, skip late night'}
        </Text>
        <Box
          display="flex"
          align="center"
          className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
            isChecked ? 'bg-text-main' : 'bg-surface-muted border border-line'
          }`}
        >
          <Box
            className={`w-5 h-5 rounded-full shadow-sm transform transition-transform ${
              isChecked ? 'bg-black translate-x-5' : 'bg-text-dim translate-x-0'
            }`}
          />
        </Box>
      </Box>
    </Stack>
  );
};

