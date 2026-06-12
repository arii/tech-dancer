import { ReactNode } from 'react';
import { Box, Text } from '@/layouts/Primitives';

interface DataPanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function DataPanel({ title, subtitle, children, footer }: DataPanelProps) {
  return (
    <Box border surface="default">
      <Box padding="compact" borderBottom display="flex" justify="between" align="center">
        <Text variant="mono" size="xs" weight="font-bold" uppercase>{title}</Text>
        {subtitle && (
          <Text variant="mono" size="micro" color="dim" data-testid="panel-subtitle">{subtitle}</Text>
        )}
      </Box>
      <Box className="overflow-x-auto">
        {children}
      </Box>
      {footer && (
        <Box padding="compact" textAlign="center" borderTop>
          {footer}
        </Box>
      )}
    </Box>
  );
}
