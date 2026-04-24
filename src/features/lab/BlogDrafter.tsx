import { motion } from 'motion/react';
import { useState } from 'react';
import { Github, FileText, Send, Terminal, ExternalLink, Info, Check } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useBlogDrafter } from './useBlogDrafter';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { CONTENT_CATEGORIES } from '@/config/content';

export function BlogDrafter() {
  const { data, updateField, markdownPreview, githubIssueUrl } = useBlogDrafter();
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    const prompt = `Task: Review and expand this blog post draft for Tech-Dancer.
      Current Data: ${JSON.stringify(data, null, 2)}
      Respond ONLY with a valid JSON object matching the keys above. Ensure the 'commentary' field is a full, high-quality Markdown post.`;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Stack gap={10} height="full">
      <Stack gap={4}>
        <Box display="flex" align="center" gap={3}>
           <Terminal className="w-5 h-5 text-accent" />
           <Text variant="display" size="2xl" color="brand">CONTENT PIPELINE</Text>
        </Box>
        <Box border={true} surface="accent" padding="compact" opacity={5}>
           <Stack gap={2} display="flex" align="start" direction="row">
              <Info className="w-4 h-4 text-accent shrink-0" />
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
             <Text variant="mono-uppercase" size="micro" color="brand">METADATA_INPUT</Text>
          </Box>

          <Stack gap={6}>
            <Stack gap={2}>
              <Text variant="mono-uppercase" size="micro" color="dim">POST_TITLE</Text>
              <Box
                as="input"
                type="text"
                value={data.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('title', e.target.value)}
                placeholder="The Future of WCS..."
                width="full"
                surface="default"
                border
                padding={3}
                variant="mono-uppercase"
                size="sm"
                className="focus:border-accent outline-none"
              />
            </Stack>

            <Grid cols={2} gap={4}>
              <Stack gap={2}>
                <Text variant="mono-uppercase" size="micro" color="dim">CATEGORY</Text>
                <Box
                  as="select"
                  value={data.category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField('category', e.target.value)}
                  width="full"
                  surface="default"
                  border={true}
                  padding={3}
                  variant="mono-uppercase"
                  size="sm"
                  className="focus:border-accent outline-none appearance-none"
                >
                  {CONTENT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </Box>
              </Stack>
              <Stack gap={2}>
                <Text variant="mono-uppercase" size="micro" color="dim">DATE</Text>
                <Box
                  as="input"
                  type="date"
                  value={data.date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('date', e.target.value)}
                  width="full"
                  surface="default"
                  border={true}
                  padding={3}
                  variant="mono-uppercase"
                  size="sm"
                  className="focus:border-accent outline-none"
                />
              </Stack>
            </Grid>

            <Stack gap={2}>
              <Text variant="mono-uppercase" size="micro" color="dim">EXCERPT_SUMMARY</Text>
              <Box
                as="textarea"
                value={data.excerpt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField('excerpt', e.target.value)}
                placeholder="A brief overview of the post content..."
                width="full"
                height={20}
                surface="default"
                border={true}
                padding={3}
                variant="mono-uppercase"
                size="sm"
                className="focus:border-accent outline-none resize-none"
              />
            </Stack>

            <Stack gap={2}>
              <Text variant="mono-uppercase" size="micro" color="dim">AMAZON_AFFILIATE_LINK (OPTIONAL)</Text>
              <Box
                as="input"
                type="url"
                value={data.affiliateLink}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('affiliateLink', e.target.value)}
                placeholder="https://amazon.com/..."
                width="full"
                surface="default"
                border={true}
                padding={3}
                variant="mono-uppercase"
                size="sm"
                className="focus:border-accent outline-none"
              />
            </Stack>

            <Stack gap={2}>
              <Text variant="mono-uppercase" size="micro" color="dim">BODY_COMMENTARY</Text>
              <Box
                as="textarea"
                value={data.commentary}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField('commentary', e.target.value)}
                placeholder="Write your main content here..."
                width="full"
                height={40}
                surface="default"
                border={true}
                padding={3}
                variant="mono-uppercase"
                size="sm"
                className="focus:border-accent outline-none resize-none"
              />
            </Stack>
          </Stack>
        </Stack>

        {/* Preview Column */}
        <Stack gap={8}>
          <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
             <Text variant="mono-uppercase" size="micro" color="brand">MARKDOWN_PREVIEW</Text>
             <Box display="flex" align="center" gap={2} color="dim">
                <FileText className="w-3 h-3" />
                <Text variant="mono-uppercase" size="micro">v1.2.0</Text>
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
            <MarkdownRenderer content={markdownPreview} />
          </Box>

          <Grid cols={2} gap={4}>
            <Box
              as="button"
              onClick={handleCopyPrompt}
              display="flex"
              align="center"
              justify="center"
              gap={3}
              surface={copied ? "accent" : "muted"}
              border
              padding={4}
              className={`hover:bg-line transition-all cursor-pointer group ${copied ? 'bg-accent/10 border-accent text-accent' : ''}`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
              <Text variant="mono-uppercase" size="xs" weight="font-bold">
                {copied ? 'PROMPT COPIED ✓' : 'COPY AI PROMPT'}
              </Text>
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
              padding={4}
              intent="primary"
              cursor="pointer"
              className="transition-all group"
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
