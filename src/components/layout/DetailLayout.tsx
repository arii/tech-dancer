
import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icon } from '@/components/ui/Icon';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { ProductImageFrame } from '@/components/ui/ProductImageFrame';
import { readingTime } from '@/lib/content';

interface DetailLayoutProps {
  title: string;
  category: string;
  date: string;
  updated?: string;
  content: string;
  image?: string;
  imageAlt?: string;
  imageBack?: string;
  onBack: () => void;
  backLabel: string;
  sidebar?: ReactNode;
  children?: ReactNode;
  headerExtras?: ReactNode;
  relatedContent?: ReactNode;
  showImagePair?: boolean;
  imageFit?: 'cover' | 'contain';
}

export function DetailLayout({
  title,
  category,
  date,
  updated,
  content,
  image,
  imageAlt,
  imageBack,
  onBack,
  backLabel,
  sidebar,
  children,
  headerExtras,
  relatedContent,
  showImagePair = false,
  imageFit = 'cover'
}: DetailLayoutProps) {
  const rt = readingTime(content);
  const [showBack, setShowBack] = useState(false);
  const displayImage = showBack && imageBack ? imageBack : image;

  return (
    <Stack as="article" gap={12} maxWidth="4xl" marginX="auto" width="full" padding="panel">
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
            label={`${category} • Published ${date}${updated ? ` · Updated ${updated}` : ''} • ${rt} min read`}
            title={title}
            border="none"
            paddingBottom={0}
            cta={headerExtras}
          />

          {/* Hero Image */}
          {image && (
            <Stack gap={2}>
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
                    <ProductImageFrame
                      src={image}
                      alt={`${title} – front view`}
                      objectFit={imageFit}
                      border
                    />
                  </Stack>
                  <Stack gap={2}>
                    <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">
                      Back
                    </Text>
                    <ProductImageFrame
                      src={imageBack}
                      alt={`${title} – back view`}
                      objectFit={imageFit}
                      border
                    />
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
                  <ProductImageFrame
                    key={displayImage}
                    src={displayImage || ""}
                    alt={showBack ? `${title} – back view` : imageAlt || title}
                    objectFit={imageFit}
                    border={false}
                    radius="none"
                  />
                </>
              )}
            </Box>
            {/* Illustration comment for sketches */}
            {displayImage?.includes('/sketches/') && (
              <Text variant="mono" size="xs" color="dim" className="italic">
                Illustration
              </Text>
            )}
          </Stack>
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
  );
}
