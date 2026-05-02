import { useNavigate, NavLink } from 'react-router-dom';
import { Home, ChevronRight, Search, Database, ShoppingBag } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

export default function NotFound() {
  const navigate = useNavigate();
  const { open } = useGlobalSearch();

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
              <Stack direction={{ base: 'col', sm: 'row' }} gap={4}>
                  <Button
                    onClick={() => navigate('/')}
                    variant="default"
                    padding={0}
                    height="auto"
                    className="group outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                      className="group-hover:bg-accent group-hover:text-white transition-all shadow-lg group-hover:shadow-accent/20 h-full"
                    >
                      <Home size={18} />
                      <Text variant="mono" size="sm" weight="font-bold">
                        RETURN TO HOME
                      </Text>
                    </Stack>
                  </Button>
                  <Button
                    onClick={open}
                    variant="default"
                    padding={0}
                    height="auto"
                    className="group outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="Search site"
                  >
                     <Stack
                      direction="row"
                      align="center"
                      gap={2}
                      border
                      surface="default"
                      paddingX={8}
                      paddingY={4}
                      className="group-hover:bg-bg group-hover:text-accent transition-all h-full"
                    >
                      <Search size={18} />
                      <Text variant="mono" size="sm" weight="font-bold">
                        SEARCH
                      </Text>
                    </Stack>
                  </Button>
              </Stack>
            }
          />
        </Box>

        <Box paddingX={{ base: 4, md: 16, lg: 20 }}>
            <Stack gap={6}>
              <Text as="h3" variant="display" size="2xl" className="text-accent-navy">Helpful Links</Text>
              <Stack direction={{ base: 'col', sm: 'row' }} gap={4}>
                  <Box as={NavLink} to="/research" display="flex" align="center" gap={3} padding={4} border surface="default" radius="md" className="group hover:border-accent hover:shadow-sm transition-all w-full sm:w-auto cursor-pointer">
                     <Database className="w-5 h-5 text-accent opacity-80 group-hover:opacity-100" />
                     <Text variant="sans" size="base" weight="font-semibold" className="text-text-main group-hover:text-accent transition-colors">Data & Development Lab</Text>
                     <ChevronRight className="w-4 h-4 ml-auto text-text-dim group-hover:translate-x-1 group-hover:text-accent transition-all" />
                  </Box>
                  <Box as={NavLink} to="/gear" display="flex" align="center" gap={3} padding={4} border surface="default" radius="md" className="group hover:border-accent hover:shadow-sm transition-all w-full sm:w-auto cursor-pointer">
                     <ShoppingBag className="w-5 h-5 text-accent opacity-80 group-hover:opacity-100" />
                     <Text variant="sans" size="base" weight="font-semibold" className="text-text-main group-hover:text-accent transition-colors">Gear Reviews</Text>
                     <ChevronRight className="w-4 h-4 ml-auto text-text-dim group-hover:translate-x-1 group-hover:text-accent transition-all" />
                  </Box>
              </Stack>
            </Stack>
        </Box>

        <Box opacity={0.3} marginTop={8} paddingX={{ base: 4, md: 16, lg: 20 }}>
          <Box border="t" className="border-dashed h-40 w-full" />
        </Box>
      </Stack>
    </Box>
  );
}
