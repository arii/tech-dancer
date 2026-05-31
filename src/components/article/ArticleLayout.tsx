

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
    <Box minHeight="screen" surface="default" className="text-text-body">
      <Box maxWidth="6xl" marginX="auto" paddingX={{ base: 5, sm: 6, lg: 8 }}>
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
            <Text
              as="span"
              variant="mono"
              size="micro"
              weight="font-bold"
              tracking="widest"
              uppercase
            >
              {backLabel}
            </Text>
          </Stack>
        </Box>

        {/* Hero Section */}
        <Box paddingBottom={{ base: 12, lg: 20 }}>
          {hero}
        </Box>

        {/* Article Content Grid */}
        <Box
          display="grid"
          lgGridCols={sidebar ? "minmax(0, 45rem) 20rem" : "minmax(0, 45rem)"}
          gap={16}
          lgGap={24}
          align="start"
        >
          {/* Main Article Column */}
          <Box minWidth={0}>
            <Box className="article-prose">
              {children}
            </Box>

            {/* Footer / Related Posts */}
            {footer && (
              <Box marginTop={20} border="t" paddingTop={12} className="border-line/80">
                {footer}
              </Box>
            )}
          </Box>

          {/* Sidebar */}
          {sidebar && (
            <Box className="order-last lg:order-none">
              <Stack gap={10} className="sticky top-8">
                {sidebar}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
