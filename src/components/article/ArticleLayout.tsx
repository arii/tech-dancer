

import { ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { ArrowLeft } from 'lucide-react';

interface ArticleLayoutProps {
  onBack: () => void;
  backLabel: string;
  hero: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function ArticleLayout({
  onBack,
  backLabel,
  hero,
  sidebar,
  footer,
  children
}: ArticleLayoutProps) {
  return (
    <Box className="min-h-screen bg-bg text-text-body">
      <Box maxWidth="6xl" marginX="auto" paddingX={5} smPaddingX={6} lgPaddingX={8}>
        {/* Navigation */}
        <Box paddingY={{ base: 6, lg: 8 }}>
          <Stack
            as="button"
            direction="row"
            onClick={onBack}
            align="center"
            gap={2}
            className="text-text-dim hover:text-accent transition-colors group"
          >
            <Icon
              icon={ArrowLeft}
              size="sm"
              className="transition-transform group-hover:-translate-x-1"
            />
            <Text as="span" size="xs" weight="font-bold" uppercase className="tracking-widest">
              {backLabel}
            </Text>
          </Stack>
        </Box>

        {/* Hero Section */}
        <Box paddingBottom={{ base: 8, lg: 16 }}>
          {hero}
        </Box>

        {/* Article Content Grid */}
        <Box display="grid" lgGridCols="minmax(0,var(--spacing-prose-width)) var(--spacing-sidebar-width)" gap={12} lgGap={16}>
          {/* Main Article Column */}
          <Box className={sidebar ? "min-w-0" : "min-w-0 lg:col-span-2"}>
            <Box className="article-prose">
              {children}
            </Box>

            {/* Footer / Related Posts */}
            {footer && (
              <Box marginTop={20} border="t" className="border-line/80" paddingTop={12}>
                {footer}
              </Box>
            )}
          </Box>

          {/* Sidebar */}
          {sidebar && (
            <Box className="order-last lg:order-none">
              <Stack gap={8} className="sticky top-8">
                {sidebar}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
