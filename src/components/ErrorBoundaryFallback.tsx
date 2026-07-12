import React, { memo } from 'react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';

export const ErrorBoundaryFallback = memo(() => {
  return (
    <Box
      width="full"
      minHeight="screen"
      display="flex"
      align="center"
      justify="center"
      surface="bg"
      padding={4}
    >
      <Stack
        gap={6}
        padding={8}
        radius="lg"
        surface="card"
        maxWidth="md"
        width="full"
        align="center"
        className="text-center shadow-lg"
      >
        <Text
          as="h2"
          variant="h2"
          className="text-error font-bold"
        >
          Something went wrong
        </Text>
        <Text
          variant="body"
          className="text-gray-600"
        >
          The application encountered an unexpected error. We have been notified and are looking into it.
        </Text>
        <Button
          onClick={() => window.location.reload()}
          intent="accent"
          size="lg"
        >
          Reload Page
        </Button>
      </Stack>
    </Box>
  );
});

ErrorBoundaryFallback.displayName = 'ErrorBoundaryFallback';
