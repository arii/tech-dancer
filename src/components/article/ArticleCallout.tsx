
import { Box, Text, Stack } from '@/layouts/Primitives';
import { ReactNode } from 'react';

interface ArticleCalloutProps {
  title?: string;
  children: ReactNode;
  variant?: 'info' | 'warning' | 'tip';
}

export function ArticleCallout({ title, children, variant = 'info' }: ArticleCalloutProps) {
  const styles = {
    info: 'border-cyan-500/30 bg-accent/5 text-text-main',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-100',
    tip: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-100',
  };

  return (
    <Box className={`my-8 p-6 rounded-xl border ${styles[variant]} backdrop-blur-sm`}>
      <Stack gap={3}>
        {title && (
          <Text variant="mono" size="xs" weight="font-bold" className="uppercase tracking-widest opacity-80">
            {title}
          </Text>
        )}
        <Box className="prose-p:my-0 prose-p:text-inherit">
          {children}
        </Box>
      </Stack>
    </Box>
  );
}
