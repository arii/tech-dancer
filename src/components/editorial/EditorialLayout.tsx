import { ReactNode, useState, useEffect } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { journalVariants, type JournalNavLinkVariants } from '@/lib/variants';

interface EditorialLayoutProps extends JournalNavLinkVariants {
  onBack: () => void;
  backLabel: string;
  header: ReactNode;
  children: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
}

export function EditorialLayout({
  onBack,
  backLabel,
  header,
  children,
  sidebar,
  footer,
  active,
}: EditorialLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setShowBackToTop(window.scrollY > 1000);
        timeoutId = null;
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      width="full"
      maxWidth="5xl"
      marginX="auto"
      paddingX={{ base: 5, md: 10, lg: 12 }}
      paddingY={{ base: 8, md: 16 }}
    >
      <Stack gap="section-spacing">
        {/* Navigation */}
        <Box>
          <Stack
            as="button"
            direction="row"
            onClick={onBack}
            align="center"
            gap={2}
            className={journalVariants.navLink({ active })}
          >
            <Icon
              icon={ArrowLeft}
              size="sm"
              className="transition-transform group-hover:-translate-x-1"
            />
            <Text variant="mono" size="xs" weight="font-bold" uppercase>
              {backLabel}
            </Text>
          </Stack>
        </Box>

        {/* Header */}
        <Box width="full" marginX={!sidebar ? "auto" : undefined} maxWidth={!sidebar ? "3xl" : "full"}>
          {header}
        </Box>

        {/* Content & Sidebar Layout */}
        {sidebar ? (
          <Grid cols={{ base: 1, lg: 12 }} gap={{ base: 12, lg: 16 }} align="start">
            {/* Main Article Column */}
            <Box
              span={{ base: 1, lg: 8 }}
              width="full"
              className="order-2 lg:order-1"
            >
              <Box className="article-content-wrapper" width="full">
                {children}
              </Box>
            </Box>

            {/* Sidebar */}
            <Box span={{ base: 1, lg: 4 }} width="full" className="order-1 lg:order-2">
              <Stack gap={8} position={{ lg: "sticky" }} top={32}>
                {sidebar}
              </Stack>
            </Box>

            {/* Footer */}
            {footer && (
              <Box
                span={{ base: 1, lg: 8 }}
                width="full"
                className="order-3"
              >
                <Box marginTop={{ base: 12, lg: 0 }}>
                  {footer}
                </Box>
              </Box>
            )}
          </Grid>
        ) : (
          <Stack gap="section-spacing" width="full" marginX="auto" maxWidth="3xl">
            <Box className="article-content-wrapper" width="full">
              {children}
            </Box>
            {footer && (
              <Box width="full" marginTop={12}>
                {footer}
              </Box>
            )}
          </Stack>
        )}
      </Stack>

      {/* Back to Top */}
      <Box
        position="fixed"
        bottom={8}
        right={8}
        zIndex="sticky"
        className={`transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <Stack
          as="button"
          onClick={scrollToTop}
          align="center"
          justify="center"
          padding={3}
          radius="full"
          surface="surface"
          border
          className="shadow-glow hover:text-accent transition-colors"
        >
          <Icon icon={ArrowUp} size="sm" />
        </Stack>
      </Box>
    </Box>
  );
}
