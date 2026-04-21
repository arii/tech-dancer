import { Terminal, ArrowLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useBlogDrafter } from './useBlogDrafter';
import { DraftForm } from './components/DraftForm';
import { AiAssistant } from './components/AiAssistant';
import { MarkdownPreview } from './components/MarkdownPreview';

export function BlogDrafter() {
  const { data, updateField, applyAIResponse, markdownBody, githubIssueUrl } = useBlogDrafter();

  return (
    <Stack gap={6} height="full">
      {/* Header Section */}
      <Stack gap={4}>
        <Stack direction="row" align="center" justify="between">
          <Box display="flex" align="center" gap={3}>
            <Terminal className="w-5 h-5 text-accent" />
            <Text variant="display" size="2xl">CONTENT PIPELINE</Text>
          </Box>
          <Box 
            as="button" 
            display="flex" 
            align="center" 
            gap={2}
            className="hover:text-accent transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <Text variant="mono" size="xs">BACK TO LAB</Text>
          </Box>
        </Stack>
      </Stack>

      <Box surface="card" padding={8} radius="xl">
        <Stack gap={10}>
          <Box border="b" paddingBottom={4} borderColor="line">
             <Text variant="display" size="3xl" color="main" tracking="normal">Drafting Tool</Text>
          </Box>

          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            {/* Left Column: Metadata & Commentary */}
            <Box span={{ base: 1, lg: 4 }}>
              <DraftForm data={data} updateField={updateField} />
            </Box>

            {/* Right Column: Interaction and Preview */}
            <Box span={{ base: 1, lg: 8 }}>
              <Stack gap={10}>
                <AiAssistant data={data} applyAIResponse={applyAIResponse} />
                <MarkdownPreview data={data} markdownBody={markdownBody} githubIssueUrl={githubIssueUrl} />
              </Stack>
            </Box>
          </Grid>
        </Stack>
      </Box>
    </Stack>
  );
}
