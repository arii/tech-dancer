import { Icon } from '@/components/ui/Icon';
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
                emphasis="professional"
                paddingX={8}
                paddingY={6}
                height="auto"
                aria-label="Return to Home"
                className="group relative overflow-hidden"
              >
                <Stack
                  direction="row"
                  align="center"
                  gap={2}
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
          <Box border="t" height={40} width="full" className="border-dashed" />
        </Box>
      </Stack>
    </Box>
  );
}
