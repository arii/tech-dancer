import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { journalVariants } from '@/lib/variants';

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
  return (
    <Box
      width="full"
      maxWidth="6xl"
      marginX="auto"
      paddingX={{ base: 5, md: 10, lg: 12 }}
      paddingY={{ base: 8, md: 16 }}
    >
      <Stack gap={10}>
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
          <Box span={{ base: 1, lg: 8 }} width="full" maxWidth={{ lg: "3xl" }}>
            <Stack gap={12}>
              <Box className="article-content-wrapper" width="full">
                {children}
              </Box>

              {footer && (
                <Box marginTop={4}>
                  {footer}
                </Box>
              )}
            </Stack>
          </Box>

          {/* Sidebar */}
          {sidebar && (
            <Box span={{ base: 1, lg: 4 }} width="full">
              <Stack gap={8} position={{ lg: "sticky" }} top={32}>
                {sidebar}
              </Stack>
            </Box>
          )}
        </Grid>
      </Stack>
    </Box>
  );
}
