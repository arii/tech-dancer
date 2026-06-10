import { cva } from 'class-variance-authority';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

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
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionButton } from '@/components/ui/ActionButton';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box as="main" id="main-content">
      <Stack gap={12} paddingBottom={20}>
        <Box paddingX={{ base: 4, md: 16, lg: 20 }}>
          <PageHeader
            label="404"
            title="Page Not Found"
            description="The page you requested does not exist. You may have typed the wrong address, or the content moved to a new location."
            border="none"
            paddingBottom={0}
            titleSize="fluid-7"
            descriptionMaxWidth="prose"
            cta={
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
