import { useId, cloneElement, type ReactElement } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactElement;
}

export function FormField({ label, error, children }: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <Stack gap={2} marginBottom={6}>
      <Box display="flex" justify="between" align="center">
        <Text as="label" htmlFor={id} variant="mono-uppercase" size="xs" weight="font-semibold" color="dim" className=" ">
          {label}
        </Text>
        {error && (
          <Text id={errorId} variant="mono-uppercase" weight="font-semibold" color="brand" size="xs" role="alert">
            {error}
          </Text>
        )}
      </Box>
      {cloneElement(children, {
        id,
        'aria-describedby': error ? errorId : undefined,
        'aria-invalid': !!error
      })}
    </Stack>
  );
}
