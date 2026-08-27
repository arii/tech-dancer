import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { FormQuestion } from '../../types/navigator';

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

interface MultiSelectFieldProps {
  question: FormQuestion;
  value: any[];
  onChange: (value: any[]) => void;
}

export function MultiSelectField({ question, value = [], onChange }: MultiSelectFieldProps) {
  const options = question.options || [];
  const selectedValues = Array.isArray(value) ? value : [];

  const handleToggle = (optionValue: any) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else {
      onChange([...selectedValues, optionValue]);
    }
  };

  return (
    <Stack gap={3} className="w-full">
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
                <Text as="span" variant="caption-bold" color="dim" className="mr-1">
                  Why We Ask This:
                </Text>
                {question.context}
              </Text>
            </Stack>
          </Box>
        )}
      </Stack>

      <Box display="grid" className="grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label={question.title}>
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
              surface={isSelected ? "highlight" : "subtle"}
              radius="md"
              paddingX={4}
              paddingY={3}
              cursor="pointer"
              className={`text-left transition-all border tap-target flex items-center justify-between ${
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
              {isSelected && <Icon icon={CheckIcon} size="sm" color="accent" />}
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
}
