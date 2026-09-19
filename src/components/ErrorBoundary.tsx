import React, { Component, ErrorInfo, ReactNode } from 'react';
import { reportError } from '@/utils/telemetry';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';
import { isChunkLoadError, handleChunkLoadError } from '@/lib/lazyWithRetry';

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

  public static getDerivedStateFromError(error: Error): State {
    if (isChunkLoadError(error)) {
      handleChunkLoadError(error);
    }
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (isChunkLoadError(error)) {
      handleChunkLoadError(error);
    }
    reportError({
      message: error.message,
      type: 'react-error',
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
    });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorBoundaryFallback />;
    }

    return this.props.children;
  }
}
