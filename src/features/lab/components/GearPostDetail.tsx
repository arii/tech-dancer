import { Resource, readingTime } from '@/lib/content';
import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { Stack, Text, Box } from '@/layouts/Primitives';

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
                  <Stack direction={{ base: 'col', md: 'row' }} gap={{ base: 4, md: 3 }} width="full">
                    <Stack gap={2} flex={1} width="full">
                      <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Front View</Text>
                      <EditorialHero src={post.image} alt={`${post.title} - front`} />
                    </Stack>
                    <Stack gap={2} flex={1} width="full">
                      <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Back View</Text>
                      <EditorialHero src={post.imageBack} alt={`${post.title} - back`} />
                    </Stack>
                  </Stack>
                ) : (
                  <EditorialHero src={post.image} alt={post.title} />
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
        <ResourceSidebar
          slug={post.slug}
          affiliateIds={post.affiliateIds}
          shopUrl={post.shopUrl}
          provider={post.provider}
          specs={post.specs}
        />
      }
    >
      <Box className="prose-editorial">
        {post.verdict && <VerdictCallout verdict={post.verdict} />}
        <MarkdownRenderer content={post.content} />
      </Box>
    </EditorialLayout>
  );
}
