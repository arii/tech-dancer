import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionButton } from '@/components/ui/ActionButton';
import { cn } from '@/lib/utils';
import { STACK_CATEGORIES } from '../research-utils';

const ResearchHero = () => {
  return (
    <Grid cols={{ base: 1, lg: 12 }} gap={8} align="center" width="full">
      <Stack gap={2} span={{ base: 1, lg: 7 }}>
        <PageHeader
          label="HIRE_ME"
          title="DevAI Portfolio"
          as="h1"
          paddingBottom={0}
          border="none"
        />
        <Text variant="body" size={{ base: "lg", lg: "xl" }} color="dim" maxWidth="prose" leading="relaxed">
          building AI-assisted engineering infrastructure in my free time. This portfolio showcased my work in agentic CI/CD, LLM workflows, and developer tooling.
        </Text>

        {/* Scrollable Focus Tags for Mobile */}
        <Stack direction="col" align="start" gap={2} width="full" marginTop={2} marginBottom={2} paddingY={1} display={{ base: "flex", lg: "none" }}>
          <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold">Focus</Text>
          <Box display="flex" overflowX="auto" noScrollbar gap={2} width="full" className="scroll-mask-fade">
            {STACK_CATEGORIES.flatMap(cat => cat.tags.map(tag => ({ tag, col: cat.colorClass }))).map(item => (
              <Text key={item.tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className={cn(item.col, "shrink-0")}>{item.tag}</Text>
            ))}
          </Box>
        </Stack>

        {/* Categorized Stack Grid for Desktop */}
        <Stack gap={2} marginTop={4} marginBottom={4} width="full" display={{ base: "none", lg: "flex" }}>
          {STACK_CATEGORIES.map(cat => (
            <Box key={cat.label} display="flex" align="center" gap={2} width="full">
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>{cat.label}</Text>
              <Box display="flex" wrap="wrap" gap={2} width="full">
                {cat.tags.map(tag => (
                  <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className={cat.colorClass}>{tag}</Text>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>

        <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop={2} width={{ base: "full", sm: "auto" }}>
          <ActionButton as="a" href="#flagship" variant="primary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
            View Flagship Projects
          </ActionButton>
          <ActionButton as="a" href="#articles" variant="secondary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
            Read Implementation Articles
          </ActionButton>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ResearchHero;
