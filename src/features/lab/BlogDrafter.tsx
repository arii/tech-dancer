import { motion } from 'motion/react';
import { Github, FileText, Send, Terminal, ExternalLink, Info, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useBlogDrafter } from './useBlogDrafter';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CONTENT_CATEGORIES } from '@/config/content';

export function BlogDrafter() {
  const { data, updateField, applyAIResponse, markdownPreview, githubIssueUrl } = useBlogDrafter();
  const [aiInput, setAiInput] = useState('');
  const [showAppliedSuccess, setShowAppliedSuccess] = useState(false);

  const handleApply = () => {
    if (!aiInput.trim()) {
      alert("Please paste the AI's JSON response first.");
      return;
    }
    const success = applyAIResponse(aiInput);
    if (success) {
      setShowAppliedSuccess(true);
      setAiInput("");
      setTimeout(() => setShowAppliedSuccess(false), 3000);
    } else {
      alert("Invalid JSON format. Please make sure you pasted a valid JSON object.");
    }
  };

  return (
    <Stack gap={10} height="full">
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
        
        <Box surface="accent" padding="compact" radius="standard" border>
          <Stack gap={2} direction="row" align="start">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <Text variant="body" size="xs" color="brand">
              This tool preparing your blog post for the Tech-Dancer automated pipeline. 
              Complete the metadata and commentary below to generate a pre-formatted GitHub Issue draft.
            </Text>
          </Stack>
        </Box>
      </Stack>

      {/* Main Grid Layout */}
      <Grid cols={{ base: 1, lg: 12 }} gap={8}>
        {/* Left Column: Metadata (Narrower) */}
        <Box span={{ base: 1, lg: 4 }}>
          <Stack gap={6}>
            <Box border="b" paddingBottom={2}>
              <Text variant="mono" size="tiny" color="accent" tracking="widest">METADATA_INPUT</Text>
            </Box>

            <Stack gap={5}>
              <Stack gap={1.5}>
                <Text variant="label" size="micro" color="dim">POST_TITLE</Text>
                <Box 
                  as="input"
                  variant="mono"
                  padding={3}
                  surface="default"
                  radius="standard"
                  border
                  width="full"
                  value={data.title}
                  onChange={(e: any) => updateField('title', e.target.value)}
                  placeholder="The Future of WCS..."
                  className="focus:border-accent ring-accent/10 focus:ring-4 transition-all outline-none"
                />
              </Stack>

              <Grid cols={2} gap={4}>
                <Stack gap={1.5}>
                  <Text variant="label" size="micro" color="dim">CATEGORY</Text>
                  <Box 
                    as="select"
                    variant="mono"
                    padding={3}
                    surface="default"
                    radius="standard"
                    border
                    width="full"
                    value={data.category}
                    onChange={(e: any) => updateField('category', e.target.value)}
                    className="focus:border-accent ring-accent/10 focus:ring-4 transition-all outline-none appearance-none"
                  >
                    {CONTENT_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </Box>
                </Stack>
                <Stack gap={1.5}>
                  <Text variant="label" size="micro" color="dim">DATE</Text>
                  <Box 
                    as="input"
                    type="date"
                    variant="mono"
                    padding={3}
                    surface="default"
                    radius="standard"
                    border
                    width="full"
                    value={data.date}
                    onChange={(e: any) => updateField('date', e.target.value)}
                    className="focus:border-accent ring-accent/10 focus:ring-4 transition-all outline-none"
                  />
                </Stack>
              </Grid>

              <Stack gap={1.5}>
                <Text variant="label" size="micro" color="dim">EXCERPT_SUMMARY</Text>
                <Box 
                  as="textarea"
                  variant="mono"
                  padding={3}
                  surface="default"
                  radius="standard"
                  border
                  width="full"
                  height={24}
                  value={data.excerpt}
                  onChange={(e: any) => updateField('excerpt', e.target.value)}
                  placeholder="A brief overview..."
                  className="focus:border-accent ring-accent/10 focus:ring-4 transition-all outline-none resize-none"
                />
              </Stack>

              <Stack gap={1.5}>
                <Text variant="label" size="micro" color="dim">AMAZON_AFFILIATE_LINK</Text>
                <Box 
                  as="input"
                  variant="mono"
                  padding={3}
                  surface="default"
                  radius="standard"
                  border
                  width="full"
                  value={data.affiliateLink}
                  onChange={(e: any) => updateField('affiliateLink', e.target.value)}
                  placeholder="https://amazon.com/..."
                  className="focus:border-accent ring-accent/10 focus:ring-4 transition-all outline-none"
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Right Column: Interaction and Preview (Wider) */}
        <Box span={{ base: 1, lg: 8 }}>
          <Stack gap={8}>
            {/* Main Content Area */}
            <Stack gap={6}>
              <Box border="b" paddingBottom={2}>
                <Text variant="mono" size="tiny" color="accent" tracking="widest">BODY_COMMENTARY</Text>
              </Box>
              <Box 
                as="textarea"
                variant="mono"
                padding={4}
                surface="default"
                radius="standard"
                border
                width="full"
                height={64}
                value={data.commentary}
                onChange={(e: any) => updateField('commentary', e.target.value)}
                placeholder="Write your main content here..."
                className="focus:border-accent ring-accent/10 focus:ring-4 transition-all outline-none resize-none"
              />
            </Stack>

            {/* AI Interaction Section */}
            <Stack gap={4}>
              <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
                <Text variant="mono" size="tiny" color="accent" tracking="widest">AI_INTEGRATION</Text>
                {showAppliedSuccess && (
                  <Box display="flex" align="center" gap={2}>
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    <Text variant="mono" size="micro" color="brand" weight="bold">APPLIED_SUCCESSFULLY</Text>
                  </Box>
                )}
              </Box>
              
              <Grid cols={{ base: 1, md: 2 }} gap={4}>
                <Stack gap={4}>
                  <Box 
                    as="textarea"
                    variant="mono"
                    padding={3}
                    surface="muted"
                    radius="standard"
                    border
                    width="full"
                    height={32}
                    value={aiInput}
                    onChange={(e: any) => setAiInput(e.target.value)}
                    placeholder="Paste AI JSON response here..."
                    className="focus:border-accent transition-all outline-none resize-none opacity-80 focus:opacity-100"
                  />
                  <Box 
                    as="button"
                    onClick={handleApply}
                    display="flex"
                    align="center"
                    justify="center"
                    gap={2}
                    surface="contrast"
                    radius="standard"
                    paddingY={3}
                    className="hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Text variant="mono" size="xs" weight="bold">APPLY_RESPONSE</Text>
                  </Box>
                </Stack>

                <Box surface="muted" padding={6} radius="standard" border display="flex" align="center" justify="center">
                   <Stack gap={4} align="center">
                      <Terminal className="w-8 h-8 text-accent/40" />
                      <Text variant="body" size="xs" color="dim" align="center">
                        Need help expanding your draft? Copy the prompt below and paste into Gemini or Claude.
                      </Text>
                      <Box 
                        as="button"
                        onClick={() => {
                          const prompt = `Task: Review and expand this blog post draft for Tech-Dancer.\nJSON Data: ${JSON.stringify(data, null, 2)}\nRespond ONLY with a valid JSON object matching the keys.`;
                          navigator.clipboard.writeText(prompt);
                          alert("AI Prompt Copied!");
                        }}
                        paddingX={6}
                        paddingY={2}
                        border
                        radius="standard"
                        variant="ghost"
                        className="hover:border-accent hover:text-accent transition-all cursor-pointer"
                      >
                         <Text variant="mono" size="micro" weight="bold">COPY_PROMPT</Text>
                      </Box>
                   </Stack>
                </Box>
              </Grid>
            </Stack>

            {/* Preview and Final Action */}
            <Stack gap={4}>
               <Box border="b" paddingBottom={2}>
                 <Text variant="mono" size="tiny" color="accent" tracking="widest">MARKDOWN_PREVIEW</Text>
               </Box>
               <Box 
                 surface="muted" 
                 padding={6} 
                 radius="standard"
                 border 
                 maxHeight="400px"
                 overflow="y-auto"
                 className="prose prose-sm prose-invert max-w-none bg-black/5"
               >
                 <ReactMarkdown>{markdownPreview}</ReactMarkdown>
               </Box>

               <Box 
                 as="a"
                 href={githubIssueUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 surface="contrast"
                 radius="standard"
                 padding={4}
                 display="flex"
                 align="center"
                 justify="center"
                 gap={3}
                 className="hover:bg-accent-brand hover:text-bg transition-all group cursor-pointer shadow-lg active:scale-[0.99]"
               >
                 <Github className="w-5 h-5" />
                 <Text variant="display" size="base" weight="bold">SUBMIT_DRAFT_TO_GITHUB</Text>
                 <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
               </Box>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Stack>
  );
}
