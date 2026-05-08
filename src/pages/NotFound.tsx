import { cva } from 'class-variance-authority';
import { Icon } from '@/components/ui/Icon';

const returnButtonVariants = cva(
  "group outline-none focus-visible:ring-2 focus-visible:ring-accent",
  {
    variants: {},
  }
);

const returnButtonInnerVariants = cva(
  "group-hover:bg-accent group-hover:text-white transition-all shadow-lg group-hover:shadow-accent/20",
  {
    variants: {},
  }
);
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box as="section">
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
              <Button
                onClick={() => navigate('/')}
                variant="default"
                padding={0}
                height="auto"
                className={returnButtonVariants()}
                aria-label="Return to Home"
              >
                <Stack
                  direction="row"
                  align="center"
                  gap={2}
                  border
                  surface="accent"
                  paddingX={8}
                  paddingY={4}
                  className={returnButtonInnerVariants()}
                >
                  <Icon icon={Home} />
                  <Text variant="mono" size="sm" weight="font-bold">
                    RETURN TO HOME
                  </Text>
                  <Icon icon={ChevronRight} size="sm" className="group-hover:translate-x-1 transition-transform" />
                </Stack>
              </Button>
            }
          />
        </Box>

        <Box opacity={0.3} marginTop={8} paddingX={{ base: 4, md: 16, lg: 20 }}>
          <Box border="t" className="border-dashed h-40 w-full" />
        </Box>
      </Stack>
    </Box>
  );
}
