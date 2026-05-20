import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';

export function GlobalErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = 'An unexpected error occurred.';
  let errorDetail = '';

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
    errorDetail = error.data?.message || error.data || '';
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetail = error.stack || '';
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  const isProduction = import.meta.env.PROD;

  return (
    <Box
      display="flex"
      align="center"
      justify="center"
      minHeight="screen"
      padding={6}
      surface="default"
    >
      <Stack gap={8} align="center" maxWidth="2xl" textAlign="center">
        <Box
          padding={4}
          radius="full"
          emphasis="low"
          className="bg-error/10 text-error"
        >
          <Text variant="headline" size="5xl">⚠️</Text>
        </Box>
        
        <Stack gap={3}>
          <Text variant="h2" weight="bold">
            Application Error
          </Text>
          <Text color="dim">
            We've encountered an issue while rendering this page.
          </Text>
        </Stack>

        <Box
          padding={4}
          radius="lg"
          surface="alt"
          width="full"
          border
          overflow="auto"
          maxHeight={72}
          textAlign="left"
          className="border-line/50"
        >
          <Text weight="bold" color="error" display="block" marginBottom={2}>
            {errorMessage}
          </Text>
          {!isProduction && errorDetail && (
            <Text
              as="pre"
              size="xs"
              className="opacity-70 font-mono whitespace-pre-wrap"
            >
              {errorDetail}
            </Text>
          )}
        </Box>

        <Stack direction="row" gap={4}>
          <ActionButton
            variant="ghost"
            paddingX={6}
            paddingY={3}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </ActionButton>
          <ActionButton
            variant="accent"
            paddingX={6}
            paddingY={3}
            onClick={() => navigate('/')}
          >
            Go to Home
          </ActionButton>
        </Stack>
      </Stack>
    </Box>
  );
}
