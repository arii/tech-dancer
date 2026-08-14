import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
import { MEMES_DATA } from '@/data/memes';

const Memes = () => {
  return (
    <Box paddingX={{ base: 4, md: 8 }} display="flex" justify="center" data-testid="memes-page">
      <SEO
        title="West Coast Swing Memes"
        description="Enjoy the best, highly relatable West Coast Swing (WCS) memes about the slot, connection, social dancing, and hotel rooms. Perfect to share with your partner dance community."
      />

      <Stack gap={12} width="full" maxWidth="screen-xl">
        <PageHeader
          label="COMMUNITY & HUMOR"
          title="West Coast Swing Memes"
          description="A centralized collection of relatable West Coast Swing memes. From slotted dance debates to the drama of trying a new pattern on the social floor, we have you covered."
        />

        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8} width="full" minWidth="0" align="stretch">
          {MEMES_DATA.map((meme) => (
            <BaseCard
              key={meme.id}
              gap={4}
              padding={{ base: 4, md: 5 }}
              radius="md"
              border
              maxWidth="full"
              className="hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow"
              data-testid={`meme-card-${meme.id}`}
            >
              {/* Meme Image Container */}
              <Box
                width="full"
                display="flex"
                align="center"
                justify="center"
                radius="md"
                overflow="hidden"
                className="bg-bg/50 border border-line/20"
                maxHeight={{ base: 96, md: 108 }}
              >
                <img
                  src={meme.imageSrc}
                  alt={meme.altText}
                  className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </Box>

              {/* Meme Info (Stretches uniformly to make cards the same height) */}
              <Box paddingY={2} flex={true}>
                <Text
                  variant="body"
                  size="lg"
                  weight="font-bold"
                  color="main"
                  leading="tight"
                >
                  {meme.title}
                </Text>
              </Box>
            </BaseCard>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default Memes;
