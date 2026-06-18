// impeccable-ignore-file
import { useState, useEffect } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { affiliateManager } from '@/lib/affiliateManager';
import { Post, readingTime, getPosts } from '@/lib/content';
import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { EditorialRelated } from '@/components/editorial/EditorialRelated';
import { ArticleNavigation } from '@/components/editorial/ArticleNavigation';
import { NewsletterModule } from '@/components/ui/NewsletterModule';
import { useArticleNavigation } from '@/lib/hooks/useArticleNavigation';

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
  const rt = `${readingTime(post.content)} min read`;
  const [isCopied, setIsCopied] = useState(false);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;

      const progressBar = document.getElementById('reading-progress-bar');
      if (progressBar) {
        // impeccable-ignore-next-line
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const headings = Array.from(document.querySelectorAll('.prose-editorial h2, .prose-editorial h3'));
      const tocItems = headings.map((h, index) => {
        const id = h.id || `heading-${index}`;
        h.id = id;
        return {
          id,
          text: h.textContent || '',
          level: h.tagName === 'H2' ? 2 : 3
        };
      });
      setToc(tocItems);
    });
    return () => cancelAnimationFrame(frame);
  }, [post.content]);

  const share = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error('Share failed:', err);
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard fallback failed:', err);
    }
  };

  const relatedItems = getPosts()
    .filter(p => p.slug !== post.slug && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3)
    .map(p => ({
      title: p.title,
      href: `/blog/${p.slug}`,
      category: p.category
    }));

  const affiliateLinks = (post.affiliateIds || [])
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  const allPosts = getPosts();
  const { previous, next } = useArticleNavigation(allPosts, post.slug, '/blog');

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
          onShare={share}
          isShared={isCopied}
          hero={
            post.image ? (
              <Stack gap={4}>
                {post.imageBack ? (
                  <Grid cols={{ base: 1, md: 2 }} gap={4}>
                    <Stack gap={2}>
                      <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Front</Text>
                      <EditorialHero src={post.image} alt={`${post.title} - front`} aspectRatio="square" objectFit={post.imageFit} />
                    </Stack>
                    <Stack gap={2}>
                      <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Back</Text>
                      <EditorialHero src={post.imageBack} alt={`${post.title} - back`} aspectRatio="square" objectFit={post.imageFit} />
                    </Stack>
                  </Grid>
                ) : (
                  <EditorialHero src={post.image} alt={post.title} aspectRatio={{ base: "square", md: "video" }} objectFit={post.imageFit} />
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
        <Stack gap={10}>
          {toc.length > 0 && (
            <Stack gap={4} display={{ base: "none", lg: "flex" }}>
              <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
                Table of Contents
              </Text>
              <Stack gap={2}>
                {toc.map(item => (
                  <Box
                    key={item.id}
                    as="a"
                    href={`#${item.id}`}
                    paddingLeft={item.level === 3 ? 4 : 0}
                    className="hover:text-accent transition-colors"
                  >
                    <Text variant="mono" size="micro" color="dim" className="hover:text-accent">
                      {item.text}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Stack>
          )}

          {affiliateLinks.length > 0 && (
            <Stack gap={6}>
              <AffiliateDisclosure compact={true} />
              <Text as="h2" variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
                Shop selected items
              </Text>
              <Stack gap={4}>
                {affiliateLinks.map(link => (
                  <AffiliateCard key={link.id} link={link} />
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      }
      footer={
        <Stack gap={16}>
          <ArticleNavigation previous={previous} next={next} />

          <Box border="t" borderBottom="none" paddingTop={12} className="border-line/30">
             <Stack gap={6}>
                <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
                  Browse More Topics
                </Text>
                <Grid cols={{ base: 2, md: 4 }} gap={4}>
                  {['Guides', 'Gear', 'Events', 'Travel'].map(topic => (
                    <Box
                      key={topic}
                      as="a"
                      href={`/blog?category=${topic}`}
                      padding={4}
                      border
                      radius="md"
                      className="hover:border-accent hover:bg-accent/5 transition-all text-center"
                    >
                      <Text variant="mono" size="xs" weight="font-bold" color="main">
                        {topic}
                      </Text>
                    </Box>
                  ))}
                </Grid>
             </Stack>
          </Box>

          <EditorialRelated items={relatedItems} />

          <Box marginTop={8}>
            <NewsletterModule />
          </Box>
        </Stack>
      }
    >
      <Box className="prose-editorial">
        <MarkdownRenderer content={post.content} />
      </Box>

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
    </EditorialLayout>
  );
}
