import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { readingTime } from '@/lib/content';
import { cn } from '@/lib/utils';

interface DetailLayoutProps {
  title: string;
  category: string;
  date: string;
  content: string;
  image?: string;
  onBack: () => void;
  backLabel: string;
  sidebar?: ReactNode;
  children?: ReactNode;
  headerExtras?: ReactNode;
  relatedContent?: ReactNode;
}

export function DetailLayout({
  title,
  category,
  date,
  content,
  image,
  onBack,
  backLabel,
  sidebar,
  children,
  headerExtras,
  relatedContent
}: DetailLayoutProps) {
  const rt = readingTime(content);

  return (
    <Box as="article" padding={{ base: 4, md: 8, lg: 12 }}>
      <Stack gap={12} maxWidth="4xl" marginX="auto" className="w-full">
        {/* Navigation */}
        <Box
          as="button"
          onClick={onBack}
          display="flex"
          align="center"
          gap={2}
          color="dim"
          className="hover:text-primary transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono" size="xs" weight="font-bold" className="normal-case tracking-wider">{backLabel}</Text>
        </Box>

        <Stack gap={10}>
          {/* Header */}
          <Stack gap={4}>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase>
              {category} • {date} • {rt} min read
            </Text>
            <Text as="h1" size="fluid-5" weight="font-black" className="text-white leading-tight tracking-tight">
              {title}
            </Text>
            {headerExtras}
          </Stack>

          {/* Hero Image */}
          {image && (
            <Box
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              radius="2xl"
              aspect="video"
              overflow="hidden"
              border
              className="bg-surface/50 border-line/50 shadow-2xl"
            >
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </Box>
          )}

          <Grid cols={{ base: 1, lg: sidebar ? 12 : 1 }} gap={10}>
            {/* Content */}
            <Box className={cn(sidebar ? "lg:col-span-8" : "w-full")}>
              {children}
              <Box
                className="prose prose-invert prose-slate prose-headings:font-black prose-p:font-sans prose-p:text-text-body/90 prose-p:leading-relaxed prose-p:text-base prose-strong:text-white mx-auto w-full"
                style={{ maxWidth: '760px' }}
              >
                <MarkdownRenderer content={content} />
              </Box>
            </Box>

            {/* Sidebar */}
            {sidebar && (
              <Box className="lg:col-span-4">
                <Stack gap={4} className="lg:sticky lg:top-32">
                   {sidebar}
                </Stack>
              </Box>
            )}
          </Grid>

          {relatedContent}
        </Stack>
      </Stack>
    </Box>
  );
}
