
/* impeccable-ignore-file */
import { ReactNode } from 'react';
import { Box, Stack, Grid } from '@/layouts/Primitives';
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
    <Box className="min-h-screen bg-[#020617] text-slate-200">
      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 5, sm: 6, lg: 8 }}>
        {/* Navigation */}
        <Box paddingY={{ base: 6, lg: 8 }}>
          <Stack
            as="button"
            direction="row"
            onClick={onBack}
            align="center"
            gap={2}
            className="text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <Icon
              icon={ArrowLeft}
              size="sm"
              className="transition-transform group-hover:-translate-x-1"
            />
            <Box as="span" className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {backLabel}
            </Box>
          </Stack>
        </Box>

        {/* Hero Section */}
        <Box paddingBottom={{ base: 8, lg: 16 }}>
          {hero}
        </Box>

        {/* Article Content Grid */}
        <Grid cols={{ base: 1, lg: 12 }} gap={{ base: 12, lg: 16 }}>
          {/* Main Article Column */}
          <Box span={{ base: 1, lg: sidebar ? 8 : 10 }} className={sidebar ? "min-w-0" : "min-w-0 lg:col-start-2"}>
            <Box className="prose prose-invert prose-slate max-w-none lg:max-w-[72ch]
              prose-p:text-[16px] sm:prose-p:text-[17px] prose-p:leading-[1.65] sm:prose-p:leading-8 prose-p:text-slate-300
              prose-headings:font-display prose-headings:text-slate-100 prose-headings:font-bold
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-2 prose-h2:border-cyan-400 prose-h2:pl-4
              prose-h3:text-lg sm:prose-h3:text-xl
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-100 prose-blockquote:border-cyan-400 prose-blockquote:text-slate-200 prose-blockquote:italic
            ">
              {children}
            </Box>

            {/* Footer / Related Posts */}
            {footer && (
              <Box marginTop={20} border="t" className="border-slate-800/80 pt-12">
                {footer}
              </Box>
            )}
          </Box>

          {/* Sidebar */}
          {sidebar && (
            <Box span={{ base: 1, lg: 4 }} className="order-last lg:order-none">
              <Stack gap={8} className="sticky top-8">
                {sidebar}
              </Stack>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
