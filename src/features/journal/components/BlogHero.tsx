import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { useSearchParam } from '@/hooks/useSearchParam';
import { BLOG_CONTENT, CATEGORY_SECTION_ID } from '@/config/blog-content';

export function BlogHero() {
  const [, setCategory] = useSearchParam('category', 'All');
  const [, setSearch] = useSearchParam('search');

  const handleStartHere = () => {
    setCategory('All');
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box as="section" width="full" paddingY={{ base: 12, md: 20 }}>
      <Stack gap={6} align="center" textAlign="center" maxWidth="3xl" marginX="auto">
        <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
          {BLOG_CONTENT.hero.label}
        </Text>
        <Text as="h1" variant="display" size={{ base: "4xl", md: "6xl" }} weight="font-black" leading="tight" tracking="tighter">
          {BLOG_CONTENT.hero.title}
        </Text>
        <Text variant="body" size="lg" color="dim" leading="relaxed">
          {BLOG_CONTENT.hero.description}
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} gap={4} marginTop={4}>
          <Button variant="primary" size="lg" onClick={handleStartHere}>
            {BLOG_CONTENT.hero.startButton}
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById(CATEGORY_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })}>
            {BLOG_CONTENT.hero.browseButton}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
