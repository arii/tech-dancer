import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ChevronRight, BookOpen } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionButton } from '@/components/ui/ActionButton';
import { SEO } from '@/components/SEO';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const returnButtonVariants = cva(
  "group outline-none focus-visible:ring-2 focus-visible:ring-accent",
  {
    variants: {},
  }
);

const returnButtonInnerVariants = cva(
  "group-hover:bg-accent group-hover:text-bg transition-all shadow-lg group-hover:shadow-accent/20",
  {
    variants: {},
  }
);

export default function RemovedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isGear = location.pathname.startsWith('/gear');
  const isEvents = location.pathname.startsWith('/events');

  let label = "CONTENT REMOVED";
  let title = "Page No Longer Available";
  let description = "This content has been removed. We regularly update our site and decommission older pages to keep information relevant.";

  if (isGear) {
    label = "GEAR REVIEWS DECOMMISSIONED";
    title = "Gear Section Removed";
    description = "The dedicated Gear section has been decommissioned. You can still find gear recommendations embedded directly within our blog posts and training insights.";
  } else if (isEvents) {
    label = "EVENT GUIDES DECOMMISSIONED";
    title = "Event Guides Removed";
    description = "The dedicated Event Guides section has been decommissioned as we shift our focus to broader training insights and practical tools for dancers.";
  }

  return (
    <Box as="main" id="main-content">
      <SEO
        title={title}
        description={description}
        noindex={true}
      />
      <Stack gap={12} paddingBottom={20}>
        <Box paddingX={{ base: 4, md: 16, lg: 20 }}>
          <PageHeader
            label={label}
            title={title}
            description={description}
            border="none"
            paddingBottom={0}
            titleSize="fluid-6"
            descriptionMaxWidth="prose"
            cta={
              <Stack direction="row" gap={4} wrap>
                <ActionButton
                  onClick={() => navigate('/')}
                  paddingX={8}
                  paddingY={4}
                  radius="none"
                  border
                  className={cn(returnButtonVariants(), returnButtonInnerVariants())}
                  aria-label="Return to Home"
                >
                  <Stack direction="row" align="center" gap={2}>
                    <Icon icon={Home} color="bg" />
                    <Text variant="mono" size="sm" weight="font-bold" color="bg">
                      RETURN TO HOME
                    </Text>
                    <Icon icon={ChevronRight} size="sm" color="bg" className="group-hover:translate-x-1 transition-transform" />
                  </Stack>
                </ActionButton>

                <ActionButton
                  onClick={() => navigate('/blog')}
                  paddingX={8}
                  paddingY={4}
                  radius="none"
                  border
                  className={cn(returnButtonVariants(), "hover:bg-surface-alt transition-colors")}
                  aria-label="View Blog"
                >
                  <Stack direction="row" align="center" gap={2}>
                    <Icon icon={BookOpen} color="dim" />
                    <Text variant="mono" size="sm" weight="font-bold">
                      BROWSE INSIGHTS
                    </Text>
                    <Icon icon={ChevronRight} size="sm" color="dim" className="group-hover:translate-x-1 transition-transform" />
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
