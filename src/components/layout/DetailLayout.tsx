import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { readingTime } from '@/lib/content';

interface DetailLayoutProps {
  title: string;
  category: string;
  date: string;
  content: string;
  image?: string;
  onBack: () => void;
  backLabel: string;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  headerExtras?: React.ReactNode;
  relatedContent?: React.ReactNode;
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
    <Box as="article" padding="panel">
      <Stack gap={12} maxWidth="4xl" marginX="auto" className="w-full">
        {/* Navigation */}
        <Box
          as="button"
          onClick={onBack}
          display="flex"
          align="center"
          gap={2}
          color="dim"
          className="hover:text-accent transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono" size="xs" weight="font-bold" className="normal-case">{backLabel}</Text>
        </Box>

        <Stack gap={10}>
          {/* Header */}
          <Stack gap={6}>
            <Box display="flex" align="center" gap={4}>
              <Box className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-none">
                <Text variant="mono" size="micro" weight="font-bold" color="brand" uppercase>
                  {category}
                </Text>
              </Box>
              <Text variant="mono" size="micro" color="dim">{date} • {rt} min read</Text>
            </Box>

            <Text variant="headline" size="fluid-8" className="tracking-tighter leading-none">
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
              aspect="video"
              overflow="hidden"
              border
              className="bg-muted"
            >
              <img
                src={image}
                alt={`Hero image: ${title}`}
                className="w-full h-full object-cover"
              />
            </Box>
          )}

          <Grid cols={{ base: 1, lg: sidebar ? 3 : 1 }} gap={10} className={!sidebar ? "lg:grid-cols-1" : ""}>
            {/* Sidebar */}
            {sidebar && (
              <Box className="hidden lg:block">
                <Stack gap={4} className="sticky top-32">
                   {sidebar}
                </Stack>
              </Box>
            )}

            {/* Content */}
            <Box className={sidebar ? "lg:col-span-2" : "w-full"}>
              {children}
              <Box
                className="prose prose-slate prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main mx-auto w-full"
                style={{ maxWidth: '720px' }}
              >
                <MarkdownRenderer content={content} />
              </Box>
            </Box>
          </Grid>

          {relatedContent}
        </Stack>
      </Stack>
    </Box>
  );
}
