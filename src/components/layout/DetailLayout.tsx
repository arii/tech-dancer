
import { ReactNode } from 'react';
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

  return (
    <Box as="article" padding="panel">
      <Stack gap={12} maxWidth="7xl" marginX="auto" width="full">
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
              className="bg-transparent"
            >
              {imageBack ? (
                <Grid cols={{ base: 1, md: 2 }} gap={6}>
                  <Stack gap={2}>
                    <Text variant="mono" size="xs" weight="font-bold" color="dim" tracking="widest" uppercase>
                      Front
                    </Text>
                    <Box aspect="video" overflow="hidden" border radius="lg" className="bg-surface-alt">
                      <img
                        src={image}
                        alt={`${title} – front view`}
                        width={1280}
                        height={720}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </Box>
                  </Stack>
                  <Stack gap={2}>
                    <Text variant="mono" size="xs" weight="font-bold" color="dim" tracking="widest" uppercase>
                      Back
                    </Text>
                    <Box aspect="video" overflow="hidden" border radius="lg" className="bg-surface-alt">
                      <img
                        src={imageBack}
                        alt={`${title} – back view`}
                        width={1280}
                        height={720}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </Box>
                  </Stack>
                </Grid>
              ) : (
                <Box overflow="hidden" border radius="lg" className="bg-surface-alt">
                  <Box aspect="video" overflow="hidden">
                    <img
                      src={image}
                      alt={title}
                      width={1280}
                      height={720}
                      loading="lazy"
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  </Box>
                </Box>
              )}
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
