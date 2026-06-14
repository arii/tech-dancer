import { useNavigate } from 'react-router-dom';
import { Home, BookOpen, ChevronRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionButton } from '@/components/ui/ActionButton';
import { SEO } from '@/components/SEO';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "group outline-none focus-visible:ring-2 focus-visible:ring-accent",
  {
    variants: {},
  }
);

const buttonInnerVariants = cva(
  "group-hover:bg-accent group-hover:text-bg transition-all shadow-lg group-hover:shadow-accent/20",
  {
    variants: {},
  }
);

export default function RemovedPage() {
  const navigate = useNavigate();

  return (
    <Box as="main" id="main-content">
      <SEO
        title="Page Removed"
        description="This page has been decommissioned. Please return to the home page or browse our blog insights."
        noindex={true}
      />
      <Stack gap={12} paddingBottom={20}>
        <Box paddingX={{ base: 4, md: 16, lg: 20 }}>
          <PageHeader
            label="DECOMMISSIONED"
            title="Page Retired"
            description="We've updated our site structure and this content is no longer available at this location. We've moved our focus to training notes and technical insights."
            border="none"
            paddingBottom={0}
            titleSize="fluid-7"
            descriptionMaxWidth="prose"
            cta={
              <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
                <ActionButton
                  onClick={() => navigate('/')}
                  paddingX={8}
                  paddingY={4}
                  radius="none"
                  border
                  className={cn(buttonVariants(), buttonInnerVariants())}
                  aria-label="Return to Home"
                >
                  <Stack direction="row" align="center" gap={2}>
                    <Icon icon={Home} color="bg" />
                    <Text variant="mono" size="sm" weight="font-bold" color="bg">
                      RETURN TO HOME
                    </Text>
                  </Stack>
                </ActionButton>

                <ActionButton
                  onClick={() => navigate('/blog')}
                  paddingX={8}
                  paddingY={4}
                  radius="none"
                  border
                  className={cn(buttonVariants(), buttonInnerVariants())}
                  aria-label="Go to Blog"
                >
                  <Stack direction="row" align="center" gap={2}>
                    <Icon icon={BookOpen} color="bg" />
                    <Text variant="mono" size="sm" weight="font-bold" color="bg">
                      READ BLOG INSIGHTS
                    </Text>
                    <Icon icon={ChevronRight} size="sm" color="bg" className="group-hover:translate-x-1 transition-transform" />
                  </Stack>
                </ActionButton>
              </Stack>
            }
          />
        </Box>

        <Box opacityVariant="medium" marginTop={8} paddingX={{ base: 4, md: 16, lg: 20 }}>
          <Box border="t" height={40} width="full" className="border-dashed" />
        </Box>
      </Stack>
    </Box>
  );
}
