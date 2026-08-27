import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { FormQuestion, QuestionAnswerValue } from '../../types/navigator';

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

interface BooleanFieldProps {
  question: FormQuestion;
  value: QuestionAnswerValue | undefined;
  onChange: (value: QuestionAnswerValue) => void;
}

export function BooleanField({ question, value = false, onChange }: BooleanFieldProps) {
  const isChecked = Boolean(value);

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
        className={`w-full flex items-center justify-between border tap-target transition-all ${
          isChecked ? 'border-accent ring-1 ring-accent' : 'border-line hover:border-line-hover'
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
}
