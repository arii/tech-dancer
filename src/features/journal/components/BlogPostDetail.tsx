import { Share2, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

import { DetailLayout } from '@/components/layout/DetailLayout';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { Post } from '@/lib/content';
import { affiliateManager } from '@/lib/affiliateManager';

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  const affiliateLinks = (post.affiliateIds || [])
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  const featuredAffiliates = affiliateLinks.slice(0, 3);
  const remainingAffiliates = affiliateLinks.slice(3);

  return (
    <DetailLayout
      title={post.title}
      category={post.category}
      date={post.date}
      content={post.content}
      image={post.image}
      onBack={onBack}
      backLabel={backLabel}
      headerExtras={
        <Stack gap={6}>
          <Stack direction="row" gap={4} marginTop={6}>
            <Stack direction="row" align="center" gap={2} color="dim">
               <Box width={8} height={8} radius="full" surface="muted" />
               <Text variant="mono" size="xs">{post.author}</Text>
            </Stack>
            <Box flex />
            <Stack as="button" direction="row" onClick={share} align="center" gap={2} paddingX={3} paddingY={1.5} radius="sm" className="text-accent hover:text-accent-sky hover:bg-accent-sky/8 transition-all duration-150 ease-in-out active:scale-95 cursor-pointer group/share">
              <Share2 className="w-4 h-4 transition-colors duration-150 group-hover/share:text-accent-sky" />
              <Text variant="mono" size="xs" weight="font-bold" className="transition-colors duration-150 group-hover/share:text-accent-sky">SHARE</Text>
            </Stack>
          </Stack>
          <AffiliateDisclosure />
        </Stack>
      }
    >
      {affiliateLinks.length > 0 && (
        <Box border="t" paddingTop={10} marginTop={10} className="border-line/30">
          <Stack gap={6}>
            <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
              Shop the checklist
            </Text>

            {/* Featured items (Grid of cards) */}
            <Grid cols={{ base: 1, md: 3 }} gap={4}>
              {featuredAffiliates.map(link => (
                <AffiliateCard key={link.id} link={link} />
              ))}
            </Grid>

            {/* Remaining items (Compact list) */}
            {remainingAffiliates.length > 0 && (
              <Stack gap={3} marginTop={2}>
                {remainingAffiliates.map(link => {
                  const href = affiliateManager.resolveResourceHref({ id: link.id });
                  const isExternal = href.startsWith('http');

                  return (
                    <Box
                      key={link.id}
                      as={isExternal ? 'a' : Link}
                      {...(isExternal ? { href, target: '_blank', rel: 'noopener noreferrer sponsored' } : { to: href })}
                      display="flex"
                      align="center"
                      justify="between"
                      paddingX={4}
                      paddingY={3}
                      radius="md"
                      border
                      className="group/item hover:border-accent transition-colors bg-surface-alt/10"
                    >
                      <Stack direction="row" align="center" gap={3}>
                        <Box padding={1.5} radius="sm" surface="muted" className="group-hover/item:text-accent transition-colors">
                          <Text variant="mono" size="xs" weight="font-bold">
                            {link.category?.toUpperCase() || 'GEAR'}
                          </Text>
                        </Box>
                        <Text variant="body" size="sm" weight="font-bold" className="group-hover/item:text-accent transition-colors">
                          {link.name}
                        </Text>
                      </Stack>
                      {isExternal ? (
                        <ExternalLink className="w-3.5 h-3.5 text-dim group-hover/item:text-accent transition-colors" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-dim group-hover/item:text-accent transition-colors" />
                      )}
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Box>
      )}

      {post.tags && post.tags.length > 0 && (
        <Box border="t" paddingTop={12} marginTop={12} className="border-line/30">
          <Stack gap={4}>
            <Text variant="mono" size="tiny" color="dim" uppercase tracking="widest">Tags</Text>
            <Stack direction="row" wrap gap={2}>
              {post.tags.map(tag => (
                <Box key={tag} paddingX={3} paddingY={1} surface="muted" border className="hover:border-accent transition-colors">
                  <Text variant="mono" size="micro">{tag.toUpperCase()}</Text>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      )}
    </DetailLayout>
  );
}
