import { Resource, readingTime } from '@/lib/content';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { Stack, Grid, Text } from '@/layouts/Primitives';
import { EditorialContentRenderer } from '@/components/editorial/EditorialContentRenderer';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  const rt = `${readingTime(post.content)} min read`;

  return (
    <EditorialContentRenderer
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
                  <EditorialHero src={post.image} alt={`${post.title} - front`} />
                </Stack>
                <Stack gap={2}>
                  <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Back</Text>
                  <EditorialHero src={post.imageBack} alt={`${post.title} - back`} />
                </Stack>
              </Grid>
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
      onBack={onBack}
      backLabel={backLabel}
      content={post.content}
      sidebar={
        <ResourceSidebar affiliateIds={post.affiliateIds} specs={post.specs} />
      }
      contentTop={post.verdict && <VerdictCallout verdict={post.verdict} />}
    />
  );
}
