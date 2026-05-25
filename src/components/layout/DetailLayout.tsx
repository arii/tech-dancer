
import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { readingTime } from '@/lib/content';

interface DetailLayoutProps {
  title: string;
  category: string;
  date: string;
  content: string;
  image?: string;
  imageBack?: string;
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
  imageBack,
  onBack,
  backLabel,
  sidebar,
  children,
  headerExtras,
  relatedContent
}: DetailLayoutProps) {
  const rt = readingTime(content);
  const [showBack, setShowBack] = useState(false);
  const displayImage = showBack && imageBack ? imageBack : image;

  return (
    <Box as="article" padding="panel">
      <Stack gap={12} maxWidth="4xl" marginX="auto" width="full">
        {/* Navigation */}
        <Stack
          as="button"
          direction="row"
          onClick={onBack}
          align="center"
          gap={2}
          className="text-text-main hover:text-accent transition-colors group"
          cursor="pointer"
        >
          <Icon
            icon={ArrowLeft}
            size="sm"
            color="accent"
            className="transition-transform group-hover:-translate-x-1"
          />
          <Text variant="mono" size="xs" weight="font-bold" uppercase={false}>
            {backLabel.toUpperCase()}
          </Text>
        </Stack>

        <Stack gap={10}>
          {/* Header */}
          <Stack gap={4}>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase data-testid="detail-metadata">
              {category} • {date} • {rt} min read
            </Text>
            <Text variant="headline" size="fluid-5" weight="font-black" color="brand" leading="tight" tracking="tight">
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
              overflow="hidden"
              border
              radius="lg"
              className="bg-surface-alt"
            >
              {imageBack && (
                <Box
                  display="flex"
                  gap={2}
                  padding={3}
                  className="border-b border-line"
                >
                  <Box
                    as="button"
                    onClick={() => setShowBack(false)}
                    className={[
                      'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                      !showBack
                        ? 'bg-accent text-bg'
                        : 'text-text-dim hover:text-text-main border border-line',
                    ].join(' ')}
                  >
                    Front
                  </Box>
                  <Box
                    as="button"
                    onClick={() => setShowBack(true)}
                    className={[
                      'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                      showBack
                        ? 'bg-accent text-bg'
                        : 'text-text-dim hover:text-text-main border border-line',
                    ].join(' ')}
                  >
                    Back
                  </Box>
                </Box>
              )}
              <Box aspect="video" overflow="hidden">
                <img
                  key={displayImage}
                  src={displayImage}
                  alt={`${title}${showBack ? ' – back view' : ''}`}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </Box>
            </Box>
          )}

          <Grid cols={{ base: 1, lg: sidebar ? 3 : 1 }} gap={10}>
            {/* Content - first on mobile via order classes */}
            <Box
              span={{ base: 1, lg: sidebar ? 2 : 1 }}
              width="full"
              className="order-1 lg:order-2"
            >
              {children}
              <Box
                width="full"
                marginX="auto"
                maxWidth="prose"
                className="prose prose-slate prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main"
              >
                <MarkdownRenderer content={content} />
              </Box>
            </Box>

            {/* Sidebar - second on mobile via order classes */}
            {sidebar && (
              <Box className="order-2 lg:order-1">
                <Stack gap={4} position="sticky" top={32}>
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
