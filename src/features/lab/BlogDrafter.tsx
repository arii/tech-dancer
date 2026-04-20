import { motion } from 'motion/react';
import { Github, FileText, Send, Terminal, ExternalLink, Info } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useBlogDrafter } from './useBlogDrafter';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CONTENT_CATEGORIES } from '@/config/content';

export function BlogDrafter() {
  const { data, updateField, applyAIResponse, markdownPreview, githubIssueUrl } = useBlogDrafter();
  const [aiInput, setAiInput] = useState('');

  return (
    <Stack gap={10} height="full">
      <Stack gap={4}>
        <Box display="flex" align="center" gap={3}>
           <Terminal className="w-5 h-5 text-accent-brand" />
           <Text variant="display" size="2xl">CONTENT PIPELINE</Text>
        </Box>
        <Box border surface="accent" padding="compact" opacity={5} className="bg-accent/5">
           <Stack gap={2} display="flex" align="start" direction="row">
              <Info className="w-4 h-4 text-accent-brand shrink-0 mt-1" />
              <Text variant="body" size="xs">
                This tool prepares your blog post for the Tech-Dancer automated pipeline. 
                Complete the form below to generate a pre-formatted GitHub Issue link.
              </Text>
           </Stack>
        </Box>
      </Stack>

      <Grid cols={{ base: 1, md: 2 }} gap={12}>
        {/* Form Column */}
        <Stack gap={8}>
          <Box border="b" paddingBottom={2}>
             <Text variant="mono" size="micro" color="brand">METADATA_INPUT</Text>
          </Box>
          
          <Stack gap={6}>
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim">POST_TITLE</Text>
              <Box 
                as="input"
                type="text"
                value={data.title}
                onChange={(e: any) => updateField('title', e.target.value)}
                placeholder="The Future of WCS..."
                width="full"
                surface="default"
                border
                padding={3}
                variant="mono"
                size="sm"
                className="focus:border-accent-brand outline-none"
              />
            </Stack>

            <Grid cols={2} gap={4}>
              <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim">CATEGORY</Text>
                <Box 
                  as="select"
                  value={data.category}
                  onChange={(e: any) => updateField('category', e.target.value)}
                  width="full"
                  surface="default"
                  border
                  padding={3}
                  variant="mono"
                  size="sm"
                  className="focus:border-accent-brand outline-none appearance-none"
                >
                  {CONTENT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </Box>
              </Stack>
              <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim">DATE</Text>
                <Box 
                  as="input"
                  type="date"
                  value={data.date}
                  onChange={(e: any) => updateField('date', e.target.value)}
                  width="full"
                  surface="default"
                  border
                  padding={3}
                  variant="mono"
                  size="sm"
                  className="focus:border-accent-brand outline-none"
                />
              </Stack>
            </Grid>

            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim">EXCERPT_SUMMARY</Text>
              <Box 
                as="textarea"
                value={data.excerpt}
                onChange={(e: any) => updateField('excerpt', e.target.value)}
                placeholder="A brief overview of the post content..."
                width="full"
                height={20}
                surface="default"
                border
                padding={3}
                variant="mono"
                size="sm"
                className="focus:border-accent-brand outline-none resize-none"
              />
            </Stack>

            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim">AMAZON_AFFILIATE_LINK (OPTIONAL)</Text>
              <Box 
                as="input"
                type="url"
                value={data.affiliateLink}
                onChange={(e: any) => updateField('affiliateLink', e.target.value)}
                placeholder="https://amazon.com/..."
                width="full"
                surface="default"
                border
                padding={3}
                variant="mono"
                size="sm"
                className="focus:border-accent-brand outline-none"
              />
            </Stack>

            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim">BODY_COMMENTARY</Text>
              <Box 
                as="textarea"
                value={data.commentary}
                onChange={(e: any) => updateField('commentary', e.target.value)}
                placeholder="Write your main content here..."
                width="full"
                height={40}
                surface="default"
                border
                padding={3}
                variant="mono"
                size="sm"
                className="focus:border-accent-brand outline-none resize-none"
              />
            </Stack>
          </Stack>
        </Stack>

        {/* Preview Column */}
        <Stack gap={8}>
          <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
             <Text variant="mono" size="micro" color="brand">MARKDOWN_PREVIEW</Text>
             <Box display="flex" align="center" gap={2} color="dim">
                <FileText className="w-3 h-3" />
                <Text variant="mono" size="micro">v1.2.0</Text>
             </Box>
          </Box>

          <Box 
            flex 
            border 
            surface="muted" 
            padding={6} 
            overflow="y-auto" 
            maxHeight="600px"
            className="prose prose-sm prose-invert max-w-none bg-black/5"
          >
            <ReactMarkdown>{markdownPreview}</ReactMarkdown>
          </Box>

          <Stack gap={4}>
            <Box border="b" paddingBottom={2}>
               <Text variant="mono" size="micro" color="brand">AI_JSON_RESPONSE</Text>
            </Box>
            
            <Box 
              as="textarea"
              value={aiInput}
              onChange={(e: any) => setAiInput(e.target.value)}
              placeholder='Paste AI JSON response here...'
              width="full"
              height={32}
              surface="default"
              border
              padding={3}
              variant="mono"
              size="sm"
              className="focus:border-accent-brand outline-none resize-none"
            />
            
            <Box 
              as="button"
              onClick={() => {
                if (!aiInput.trim()) {
                  alert("Please paste the AI's JSON response first.");
                  return;
                }
                const success = applyAIResponse(aiInput);
                if (success) {
                  alert("Applied successfully!");
                  setAiInput("");
                } else {
                  alert("Invalid JSON format. Please make sure you pasted a valid JSON object.");
                }
              }}
              display="flex"
              align="center"
              justify="center"
              gap={3}
              surface="muted"
              border
              padding={3}
              className="hover:bg-line transition-all cursor-pointer group w-full"
            >
              <Text variant="mono" size="xs" weight="font-bold">APPLY RESPONSE</Text>
            </Box>
          </Stack>

          <Grid cols={2} gap={4}>
            <Box 
              as="button"
              onClick={() => {
                const prompt = `Task: Review and expand this blog post draft for Tech-Dancer.
                  Current Data: ${JSON.stringify(data, null, 2)}
                  Respond ONLY with a valid JSON object matching the keys above. Ensure the 'commentary' field is a full, high-quality Markdown post.`;
                navigator.clipboard.writeText(prompt);
                alert("AI Prompt Copied! Use Gemini or Claude to expand.");
              }}
              display="flex"
              align="center"
              justify="center"
              gap={3}
              surface="muted"
              border
              padding={4}
              className="hover:bg-line transition-all cursor-pointer group"
            >
              <Terminal className="w-5 h-5" />
              <Text variant="mono" size="xs" weight="font-bold">COPY AI PROMPT</Text>
            </Box>

            <Box 
              as="a"
              href={githubIssueUrl}
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              align="center"
              justify="center"
              gap={3}
              surface="accent"
              padding={4}
              className="bg-accent text-bg hover:bg-accent-brand transition-all cursor-pointer group"
            >
              <Github className="w-5 h-5" />
              <Text variant="display" size="base" weight="font-bold">SUBMIT DRAFT</Text>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Box>
          </Grid>
        </Stack>
      </Grid>
    </Stack>
  );
}
