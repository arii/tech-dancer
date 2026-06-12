import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';

export type HeroVariant = 'landing' | 'event' | 'editorial' | 'page';

interface HeroProps {
  variant?: HeroVariant;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  cta?: ReactNode;
  background?: ReactNode;
  visuals?: ReactNode;
  afterContent?: ReactNode;
  id?: string;
}

/**
 * Unified Hero component for consistent page introductions.
 */
export function Hero({
  variant = 'page',
  eyebrow,
  title,
  description,
  metadata,
  cta,
  background,
  visuals,
  afterContent,
  id
}: HeroProps) {
  const isLanding = variant === 'landing';
  const isEvent = variant === 'event';
  const isEditorial = variant === 'editorial';

  return (
    <Stack
      id={id}
      data-testid="hero"
      position="relative"
      width="full"
      minHeight={isLanding ? "auto" : isEvent ? { base: "20vh", md: "25vh" } : "auto"}
      direction="col"
      gap={0}
      overflow="hidden"
      surface={isLanding ? undefined : "bg"}
      as={isLanding ? "section" : "div"}
      className={isLanding ? "hero-section" : undefined}
      aria-label={isLanding ? "Site hero" : undefined}
    >
      {/* Background Layer */}
      {background && (
        <Box position="absolute" inset zIndex={0}>
          {background}
        </Box>
      )}

      {/* Main Content Layer */}
      <Stack
        position="relative"
        zIndex={10}
        align={isLanding ? "start" : "stretch"}
        gap={isLanding ? 0 : isEvent ? 4 : 6}
        paddingX={
          isLanding
            ? { base: 4, md: 8, lg: 12 }
            : isEvent
            ? { base: 6, md: 12, lg: 24 }
            : isEditorial
            ? 0
            : { base: 4, md: 8 }
        }
        paddingTop={
          isLanding
            ? { base: 4, lg: 8 }
            : isEvent
            ? { base: 6, md: 10 }
            : isEditorial
            ? 0
            : { base: 8, md: 12 }
        }
        paddingBottom={
          isLanding
            ? 0
            : isEvent
            ? { base: 4, md: 6 }
            : isEditorial
            ? 0
            : { base: 8, md: 12 }
        }
        maxWidth={isEditorial ? "full" : "screen-xl"}
        marginX={isEditorial ? undefined : "auto"}
        width="full"
        flex={isEvent ? "1 1 auto" : undefined}
        as={motion.div}
        initial={isLanding ? undefined : motionTokens.page.initial}
        animate={isLanding ? undefined : motionTokens.page.animate}
        transition={isLanding ? undefined : motionTokens.page.transition}
      >
        <Stack gap={isLanding ? 0 : 4}>
          {/* Eyebrow / Brand Slot */}
          {eyebrow && (
            <Box
              opacity={isLanding ? 0 : 1}
              pointerEvents={isLanding ? "none" : "auto"}
              className={isLanding ? "hero-logo-anim" : undefined}
            >
              {typeof eyebrow === 'string' ? (
                <Text
                  variant="mono"
                  size="xs"
                  weight={isEvent ? "font-bold" : "font-black"}
                  color={isEvent ? "accent" : "brand"}
                  uppercase
                  tracking={isEvent ? "widest" : "wide-editorial"}
                >
                  {eyebrow}
                </Text>
              ) : (
                eyebrow
              )}
            </Box>
          )}

          {/* Title Slot */}
          <Box
            as={isLanding ? "h1" : "div"}
            marginTop={isLanding ? { base: 5, lg: 6 } : 0}
            opacity={isLanding ? 0 : 1}
            pointerEvents={isLanding ? "auto" : "auto"}
            className={isLanding ? "hero-headline-anim" : undefined}
          >
            {typeof title === 'string' ? (
              <Text
                as={isLanding ? "span" : isEvent ? "h1" : "h1"}
                variant={isLanding ? "hero" : isEvent ? "headline" : "headline"}
                size={
                  isLanding
                    ? { base: "3xl", md: "5xl", lg: "6xl" }
                    : isEvent
                    ? { base: "fluid-4", md: "fluid-6" }
                    : "fluid-5"
                }
                weight={isEvent ? "font-black" : "font-black"}
                leading={isLanding ? undefined : "tight"}
                tracking={isLanding ? undefined : "tight"}
                color={isLanding ? "white" : undefined}
              >
                {title}
              </Text>
            ) : (
              title
            )}
          </Box>

          {/* Description / Tagline Slot */}
          {description && (
            <Box
              marginTop={isLanding ? { base: 2, lg: 4 } : 0}
              maxWidth={isLanding ? "2xl" : "prose"}
              opacity={isLanding ? 0 : 1}
              className={isLanding ? "hero-tagline-anim" : undefined}
            >
              {typeof description === 'string' ? (
                <Text
                  as="p"
                  variant="body"
                  weight={isLanding ? "font-normal" : undefined}
                  size={
                    isLanding
                      ? { base: "base", md: "lg", lg: "xl" }
                      : { base: "lg", lg: "xl" }
                  }
                  color={isLanding ? undefined : "dim"}
                  className={isLanding ? "hero-tagline-text" : "leading-relaxed text-pretty"}
                >
                  {description}
                </Text>
              ) : (
                description
              )}
            </Box>
          )}

          {/* Metadata Slot (Event info, etc) */}
          {metadata && (
            <Box opacity={isLanding ? 0 : 1}>
              {metadata}
            </Box>
          )}

          {/* CTA Slot */}
          {cta && (
            <Box marginTop={isLanding ? 0 : 6} opacity={isLanding ? 0 : 1}>
              {cta}
            </Box>
          )}
        </Stack>

        {/* Visuals Slot (Foreground elements) */}
        {visuals && (
          <Box width="full">
            {visuals}
          </Box>
        )}

        {/* After Content Slot (Waveform, Author, etc) */}
        {afterContent && (
          <Box width="full">
            {afterContent}
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
