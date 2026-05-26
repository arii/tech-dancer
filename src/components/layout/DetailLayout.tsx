
import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
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
  showImagePair?: boolean;
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
  relatedContent,
  showImagePair = false
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
          <PageHeader
            eyebrow={`${category} • ${date} • ${rt} min read`}
            title={title}
            border="none"
            paddingBottom={0}
            cta={headerExtras}
          />

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
              {imageBack && showImagePair ? (
                <Grid cols={{ base: 1, md: 2 }} gap={4} padding={4}>
                  <Stack gap={2}>
                    <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">
                      Front
                    </Text>
                    <Box aspect="video" overflow="hidden" border radius="md">
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
                    <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">
                      Back
                    </Text>
                    <Box aspect="video" overflow="hidden" border radius="md">
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
                <>
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
                            ? 'bg-accent text-white'
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
                            ? 'bg-accent text-white'
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
                </>
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
