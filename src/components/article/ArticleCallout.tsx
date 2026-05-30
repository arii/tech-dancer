
import { Box, Text, Stack } from '@/layouts/Primitives';
import { ReactNode } from 'react';

interface ArticleCalloutProps {
  title?: string;
  children: ReactNode;
  variant?: 'info' | 'warning' | 'tip';
}

export function ArticleCallout({ title, children, variant = 'info' }: ArticleCalloutProps) {
  const styles = {
    info: 'border-accent/30 bg-accent/5 text-text-main',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-100',
    tip: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-100',
  };

  return (
    <Box marginY={8} padding={6} radius="xl" border className={`${styles[variant]} backdrop-blur-sm`}>
      <Stack gap={3}>
        {title && (
          <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="utility" className="opacity-80">
            {title}
          </Text>
        )}
        <Box color="inherit">
          {children}
        </Box>
      </Stack>
    </Box>
  );
}
