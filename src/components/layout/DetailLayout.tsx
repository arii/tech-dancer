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
          <Stack gap={4}>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase>
              {category} • {date} • {rt} min read
            </Text>
            <Text variant="headline" size="fluid-5" weight="font-black" className="text-accent-navy leading-tight tracking-tight">
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
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </Box>
          )}

          <Grid cols={{ base: 1, lg: sidebar ? 3 : 1 }} gap={10} className={!sidebar ? "lg:grid-cols-1" : ""}>
            {/* Content - first on mobile via order classes */}
            <Box className={sidebar ? "lg:col-span-2 order-1 lg:order-2" : "w-full"}>
              {children}
              <Box
                maxWidth="3xl"
                marginX="auto"
                width="full"
                surface="bg"
                className="prose prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main"
              >
                <MarkdownRenderer content={content} />
              </Box>
            </Box>

            {/* Sidebar - second on mobile via order classes */}
            {sidebar && (
              <Box className="order-2 lg:order-1">
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
