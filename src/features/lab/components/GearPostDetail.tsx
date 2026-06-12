import { Resource, readingTime } from '@/lib/content';
import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { ProductImageFrame } from '@/components/ui/ProductImageFrame';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { Stack, Grid, Text, Box } from '@/layouts/Primitives';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  const rt = `${readingTime(post.content)} min read`;

  return (
    <EditorialLayout
      onBack={onBack}
      backLabel={backLabel}
      header={
        <EditorialHeader
          category={post.category}
          date={post.date}
          readTime={rt}
          title={post.title}
          dek={post.excerpt}
          author={post.author}
          authorAvatarSrc={post.authorImage}
          tags={post.tags}
          hero={
            post.image ? (
              <Stack gap={4}>
                {post.imageBack ? (
                  <Grid cols={{ base: 1, md: 2 }} gap={4}>
                    <Stack gap={2}>
                      <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Front</Text>
                      <ProductImageFrame src={post.image} alt={`${post.title} - front`} aspect="video" radius="lg" />
                    </Stack>
                    <Stack gap={2}>
                      <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Back</Text>
                      <ProductImageFrame src={post.imageBack} alt={`${post.title} - back`} aspect="video" radius="lg" />
                    </Stack>
                  </Grid>
                ) : (
                  <ProductImageFrame src={post.image} alt={post.title} aspect="video" radius="lg" />
                )}
                {post.image?.includes('/sketches/') && (
                  <Text variant="mono" size="xs" color="dim" className="italic">
                    Illustration
                  </Text>
                )}
              </Stack>
            ) : undefined
          }
        />
      }
      sidebar={
        <ResourceSidebar affiliateIds={post.affiliateIds} specs={post.specs} />
      }
    >
      <Box className="prose-editorial">
        {post.verdict && <VerdictCallout verdict={post.verdict} />}
        <MarkdownRenderer content={post.content} />
      </Box>
    </EditorialLayout>
  );
}
