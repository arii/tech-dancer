import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';

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
      surface="main"
    >
      <Stack gap={8} align="center" maxWidth="2xl" className="text-center">
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
          surface="sunken"
          width="full"
          className="text-left border border-line/50 overflow-auto max-h-[300px]"
        >
          <Text weight="bold" color="error" marginBottom={2} display="block">
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
          <Button 
            variant="ghost" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
          <Button 
            variant="accent" 
            onClick={() => navigate('/')}
          >
            Go to Home
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
