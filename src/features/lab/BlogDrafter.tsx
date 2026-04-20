import { motion } from 'motion/react';
import { Github, FileText, Send, Terminal, ExternalLink, Info, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { useBlogDrafter } from './useBlogDrafter';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CONTENT_CATEGORIES } from '@/config/content';

export function BlogDrafter() {
  const { data, updateField, applyAIResponse, markdownPreview, markdownBody, githubIssueUrl } = useBlogDrafter();
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
          <Box border="b" paddingBottom={4} borderColor="slate-100">
             <Text variant="display" size="3xl" color="main" tracking="normal">Drafting Tool</Text>
          </Box>

          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            {/* Left Column: Metadata */}
            <Box span={{ base: 1, lg: 4 }}>
              <Stack gap={8}>
                <Box border="b" paddingBottom={2}>
                  <Text variant="mono" size="tiny" color="accent" tracking="widest">METADATA_INPUT</Text>
                </Box>

                <Stack gap={6}>
                  <Stack gap={2}>
                    <Text variant="label" size="micro" color="dim">POST_TITLE</Text>
                    <Box 
                      as="input"
                      variant="mono"
                      paddingX={4}
                      paddingY={3}
                      surface="default"
                      radius="lg"
                      border
                      width="full"
                      value={data.title}
                      onChange={(e: any) => updateField('title', e.target.value)}
                      placeholder="The Future of WCS..."
                      className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none"
                    />
                  </Stack>

                  <Grid cols={2} gap={4}>
                    <Stack gap={2}>
                      <Text variant="label" size="micro" color="dim">CATEGORY</Text>
                      <Box 
                        as="select"
                        variant="mono"
                        paddingX={4}
                        paddingY={3}
                        surface="default"
                        radius="lg"
                        border
                        width="full"
                        value={data.category}
                        onChange={(e: any) => updateField('category', e.target.value)}
                        className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none appearance-none"
                      >
                        {CONTENT_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </Box>
                    </Stack>
                    <Stack gap={2}>
                      <Text variant="label" size="micro" color="dim">DATE</Text>
                      <Box 
                        as="input"
                        type="date"
                        variant="mono"
                        paddingX={4}
                        paddingY={3}
                        surface="default"
                        radius="lg"
                        border
                        width="full"
                        value={data.date}
                        onChange={(e: any) => updateField('date', e.target.value)}
                        className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none"
                      />
                    </Stack>
                  </Grid>

                  <Stack gap={2}>
                    <Text variant="label" size="micro" color="dim">EXCERPT_SUMMARY</Text>
                    <Box 
                      as="textarea"
                      variant="mono"
                      paddingX={4}
                      paddingY={3}
                      surface="default"
                      radius="lg"
                      border
                      width="full"
                      height={24}
                      value={data.excerpt}
                      onChange={(e: any) => updateField('excerpt', e.target.value)}
                      placeholder="A brief overview..."
                      className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none resize-none"
                    />
                  </Stack>

                  <Stack gap={2}>
                    <Text variant="label" size="micro" color="dim">AMAZON_AFFILIATE_LINK</Text>
                    <Box 
                      as="input"
                      variant="mono"
                      paddingX={4}
                      paddingY={3}
                      surface="default"
                      radius="lg"
                      border
                      width="full"
                      value={data.affiliateLink}
                      onChange={(e: any) => updateField('affiliateLink', e.target.value)}
                      placeholder="https://amazon.com/..."
                      className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none"
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Box>

            {/* Right Column: Interaction and Preview */}
            <Box span={{ base: 1, lg: 8 }}>
              <Stack gap={10}>
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
                    radius="lg"
                    border
                    width="full"
                    height={72}
                    value={data.commentary}
                    onChange={(e: any) => updateField('commentary', e.target.value)}
                    placeholder="Write your main content here..."
                    className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none resize-none shadow-inner"
                  />
                </Stack>

                {/* AI Interaction Section */}
                <Stack gap={6}>
                  <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
                    <Text variant="mono" size="tiny" color="accent" tracking="widest">AI_INTEGRATION</Text>
                    {showAppliedSuccess && (
                      <Box display="flex" align="center" gap={2}>
                        <CheckCircle2 className="w-3 h-3 text-accent" />
                        <Text variant="mono" size="micro" color="brand" weight="bold">APPLIED_SUCCESSFULLY</Text>
                      </Box>
                    )}
                  </Box>
                  
                  <Grid cols={{ base: 1, md: 2 }} gap={6}>
                    <Stack gap={4}>
                      <Box 
                        as="textarea"
                        variant="mono"
                        padding={4}
                        surface="muted"
                        radius="lg"
                        border
                        width="full"
                        height={40}
                        value={aiInput}
                        onChange={(e: any) => setAiInput(e.target.value)}
                        placeholder="Paste AI JSON response here..."
                        className="focus:border-accent transition-all duration-200 outline-none resize-none opacity-90 focus:opacity-100"
                      />
                      <Box 
                        as="button"
                        onClick={handleApply}
                        display="flex"
                        align="center"
                        justify="center"
                        gap={3}
                        surface="contrast"
                        radius="lg"
                        paddingY={4}
                        className="hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm font-bold uppercase tracking-widest text-xs"
                      >
                        <Send className="w-4 h-4" />
                        APPLY_RESPONSE
                      </Box>
                    </Stack>

                    <Box border surface="muted" padding={6} radius="lg" display="flex" align="center" justify="center">
                       <Stack gap={4} align="center">
                          <Terminal className="w-8 h-8 text-accent/30" />
                          <Text variant="body" size="xs" color="dim" align="center">
                            Need help expanding your draft? Copy the prompt below and paste into Gemini or Claude.
                          </Text>
                          <Box 
                            as="button"
                            onClick={() => {
                              const prompt = `Objective: Expand the following blog post draft JSON for Tech-Dancer.
Requirements:
1. Respond ONLY with a valid JSON object.
2. DO NOT include any explanatory text, commentary, or markdown markers (like [cite:x] or [cite_start]) outside or inside the JSON values.
3. Ensure the JSON strictly matches the keys: title, excerpt, affiliateLink, commentary.
4. The 'commentary' should be rich markdown content.

Draft Data: ${JSON.stringify(data, null, 2)}`;
                              navigator.clipboard.writeText(prompt);
                              alert("AI Prompt Copied!");
                            }}
                            paddingX={8}
                            paddingY={3}
                            border
                            radius="lg"
                            surface="default"
                            className="hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer shadow-sm"
                          >
                             <Text variant="mono" size="micro" weight="bold">COPY_PROMPT</Text>
                          </Box>
                       </Stack>
                    </Box>
                  </Grid>
                </Stack>

                {/* Preview and Final Action */}
                <Stack gap={6}>
                   <Box border="b" paddingBottom={2}>
                     <Text variant="mono" size="tiny" color="accent" tracking="widest">MARKDOWN_PREVIEW</Text>
                   </Box>
                   <Box 
                     surface="muted" 
                     padding={8} 
                     radius="lg"
                     border 
                     maxHeight="600px"
                     overflow="y-auto"
                     className="bg-black/5"
                   >
                     {/* Visual Metadata Header */}
                     <Stack gap={4} marginBottom={8} border="b" paddingBottom={6} borderColor="slate-200/5">
                        <Stack gap={1}>
                          <Text variant="mono" size="micro" color="accent" uppercase>Title</Text>
                          <Text weight="bold" size="2xl">{data.title || 'Untitled Draft'}</Text>
                        </Stack>
                        <Grid cols={3} gap={4}>
                           <Stack gap={0.5}>
                              <Text variant="mono" size="micro" color="dim" uppercase>Date</Text>
                              <Text size="xs">{data.date}</Text>
                           </Stack>
                           <Stack gap={0.5}>
                              <Text variant="mono" size="micro" color="dim" uppercase>Category</Text>
                              <Text size="xs">{data.category}</Text>
                           </Stack>
                           <Stack gap={0.5}>
                              <Text variant="mono" size="micro" color="dim" uppercase>Author</Text>
                              <Text size="xs">{data.author}</Text>
                           </Stack>
                        </Grid>
                        <Stack gap={1}>
                          <Text variant="mono" size="micro" color="dim" uppercase>Excerpt</Text>
                          <Text size="sm" italic color="body" className="leading-relaxed">{data.excerpt || 'No excerpt provided...'}</Text>
                        </Stack>
                     </Stack>

                     {/* Markdown Content */}
                     <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown>{markdownBody}</ReactMarkdown>
                     </div>
                   </Box>

                   <Button 
                     as="a"
                     href={githubIssueUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     variant="solid"
                     radius="lg"
                     size="lg"
                     fullWidth
                     className="hover:bg-accent-brand hover:text-bg transition-all duration-300 group cursor-pointer shadow-lg active:scale-[0.99] !bg-[#24292e]"
                   >
                     <Github className="w-5 h-5 text-bg" />
                     <Text weight="bold" color="bg">Submit Draft to GitHub</Text>
                     <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-bg" />
                   </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Stack>
      </Box>
    </Stack>

  );
}
