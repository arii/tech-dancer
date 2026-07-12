import React, { Component, ErrorInfo, ReactNode } from 'react';
import { reportError } from '@/utils/telemetry';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    reportError({
      message: error.message,
      type: 'react-error',
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
    });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
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
    }

    return this.props.children;
  }
}
