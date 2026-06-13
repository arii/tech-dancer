import { Resource, readingTime } from '@/lib/content';
import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
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
        />
      }
    >
      <Box className="prose-editorial">
        {post.verdict && (
          <Box marginBottom={12} padding={8} radius="xl" border className="bg-accent-teal/5 border-accent-teal/20 relative overflow-hidden">
            <Box position="absolute" top={0} left={0} width={1.5} height="full" className="bg-accent-teal" />
            <Text variant="display" size="xl" color="white" className="italic font-medium leading-relaxed">
              &ldquo;{post.verdict}&rdquo;
            </Text>
          </Box>
        )}
        <MarkdownRenderer content={post.content} />
      </Box>
      <Box marginTop={16} paddingTop={12} border="t" className="border-line/30">
        <ResourceSidebar affiliateIds={post.affiliateIds} specs={post.specs} />
      </Box>
    </EditorialLayout>
  );
}
