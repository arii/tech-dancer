import { ReactNode, useState, useEffect } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { journalVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';

interface EditorialLayoutProps {
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
}: EditorialLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      width="full"
      maxWidth="6xl"
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
            className={journalVariants.navLink()}
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
        <Box width="full">
          {header}
        </Box>

        {/* Content & Sidebar Grid */}
        <Grid cols={{ base: 1, lg: 12 }} gap={{ base: 12, lg: 16 }} align="start">
          {/* Main Article Column */}
          <Box span={{ base: 1, lg: 8 }} width="full" maxWidth={{ lg: "3xl" }} className="order-2 lg:order-1">
            <Box className="article-content-wrapper" width="full">
              {children}
            </Box>
          </Box>

          {/* Sidebar */}
          {sidebar && (
            <Box span={{ base: 1, lg: 4 }} width="full" className="order-1 lg:order-2">
              <Stack gap={8} position={{ lg: "sticky" }} top={32}>
                {sidebar}
              </Stack>
            </Box>
          )}

          {/* Footer */}
          {footer && (
            <Box span={{ base: 1, lg: 8 }} width="full" maxWidth={{ lg: "3xl" }} className="order-3">
              <Box marginTop={{ base: 12, lg: 0 }}>
                {footer}
              </Box>
            </Box>
          )}
        </Grid>
      </Stack>

      {/* Back to Top Button */}
      <Box
        position="fixed"
        bottom={8}
        right={8}
        zIndex={50}
        className={cn(
          "transition-all duration-300 transform",
          showBackToTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        )}
      >
        <Button
          onClick={scrollToTop}
          variant="fab"
          size="icon"
          className="rounded-full shadow-xl border-accent/20 bg-surface/80 backdrop-blur-sm"
          title="Back to Top"
        >
          <Icon icon={ArrowUp} size="md" color="accent" />
        </Button>
      </Box>
    </Box>
  );
}
