import { useState, ChangeEvent } from 'react';
import { Github, FileText, Send, Terminal, ExternalLink, Info, Check, RotateCcw, Save, History, Trash2, Eye } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PrimaryActionButton } from '@/components/ui/PrimaryActionButton';
import { useBlogDrafter } from './useBlogDrafter';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { CONTENT_CATEGORIES } from '@/config/content';
import { FullPreview } from './components/FullPreview';
import { inputs } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';

export function BlogDrafter() {
  const {
    data,
    history,
    updateField,
    applyAIResponse,
    clearForm,
    saveToHistory,
    rollback,
    deleteHistoryEntry,
    markdownPreview,
    githubIssueUrl
  } = useBlogDrafter();

  const [copied, setCopied] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [showAppliedSuccess, setShowAppliedSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState<'compact' | 'full'>('compact');

  const handleApply = () => {
    if (!aiInput.trim()) return;
    const success = applyAIResponse(aiInput);
    if (success) {
      setShowAppliedSuccess(true);
      setAiInput('');
      setTimeout(() => setShowAppliedSuccess(false), 3000);
    } else {
      alert("Invalid JSON format. Please paste a valid JSON object.");
    }
  };

  const handleCopyPrompt = () => {
    const prompt = `Objective: Expand the following blog post draft JSON for BoomTick.blog.
Requirements:
1. Respond ONLY with a valid JSON object.
2. DO NOT include any explanatory text, commentary, or markdown markers outside or inside the JSON values.
3. Ensure the JSON strictly matches the keys: title, excerpt, affiliateLink, commentary.
4. The 'commentary' should be rich markdown content.

Draft Data: ${JSON.stringify(data, null, 2)}`;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (previewMode === 'full') {
    return (
      <FullPreview
        title={data.title}
        category={data.category}
        date={data.date}
        author={data.author}
        excerpt={data.excerpt}
        commentary={data.commentary}
        affiliateLink={data.affiliateLink}
        onClose={() => setPreviewMode('compact')}
      />
    );
  }

  return (
    <Stack gap={10} height="full">
      <Stack gap={4}>
        <Box display="flex" align="center" justify="between" width="full">
          <Box display="flex" align="center" gap={3}>
             <Terminal className="w-5 h-5 text-accent" />
             <Text variant="display" size="2xl">CONTENT PIPELINE</Text>
          </Box>
          <Box
            as="button"
            onClick={() => { if(window.confirm('Clear all draft data?')) clearForm(); }}
            display="flex"
            align="center"
            gap={2}
            className="text-text-dim hover:text-accent transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <Text variant="mono" size="micro" weight="font-bold">CLEAR FORM</Text>
          </Box>
        </Box>
        <Box border surface="accent" padding="compact" opacity={5} className="bg-accent/5">
           <Stack gap={2} display="flex" align="baseline" direction="row">
              <Box as="span" className="shrink-0">
                <Info className="w-4 h-4 text-accent" />
              </Box>
              <Text variant="body" size="xs">
                This tool prepares your blog post for the BoomTick.blog automated pipeline.
                Complete the form below to generate a pre-formatted GitHub Issue link.
              </Text>
           </Stack>
        </Box>
      </Stack>

      <Grid cols={{ base: 1, md: 2 }} gap={12}>
        {/* Form Column */}
        <Stack gap={8}>
          <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
             <Text variant="mono" size="micro" color="brand">METADATA_INPUT</Text>
             <Box
               as="button"
               onClick={saveToHistory}
               display="flex"
               align="center"
               gap={2}
               className="text-accent hover:opacity-70 transition-all cursor-pointer"
             >
                <Save className="w-3 h-3" />
                <Text variant="mono" size="micro" weight="font-bold">SNAPSHOT_NOW</Text>
             </Box>
          </Box>

          <Stack gap={6}>
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>POST_TITLE</Text>
              <Box
                as="input"
                type="text"
                value={data.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('title', e.target.value)}
                placeholder="The Future of WCS..."
                className={inputs.base}
              />
            </Stack>

            <Grid cols={2} gap={4}>
              <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>CATEGORY</Text>
                <Box
                  as="select"
                  value={data.category}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateField('category', e.target.value)}
                  className={cn(inputs.base, "appearance-none")}
                >
                  {CONTENT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </Box>
              </Stack>
              <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>DATE</Text>
                <Box
                  as="input"
                  type="date"
                  value={data.date}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('date', e.target.value)}
                  className={inputs.base}
                />
              </Stack>
            </Grid>

            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>EXCERPT_SUMMARY</Text>
              <Box
                as="textarea"
                value={data.excerpt}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('excerpt', e.target.value)}
                placeholder="A brief overview of the post content..."
                height={20}
                className={cn(inputs.base, "resize-none")}
              />
            </Stack>

            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>AMAZON_AFFILIATE_LINK (OPTIONAL)</Text>
              <Box
                as="input"
                type="url"
                value={data.affiliateLink}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('affiliateLink', e.target.value)}
                placeholder="https://amazon.com/..."
                className={inputs.base}
              />
            </Stack>

            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>BODY_COMMENTARY</Text>
              <Box
                as="textarea"
                value={data.commentary}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('commentary', e.target.value)}
                placeholder="Write your main content here..."
                height={40}
                className={cn(inputs.base, "resize-none")}
              />
            </Stack>
          </Stack>

          {/* History Section */}
          {history.length > 0 && (
            <Stack gap={4} marginTop={4}>
              <Box border="b" paddingBottom={2} display="flex" align="center" gap={2}>
                <History className="w-3 h-3 text-accent" />
                <Text variant="mono" size="micro" color="brand">VERSION_HISTORY</Text>
              </Box>
              <Stack gap={2}>
                {history.map((entry) => (
                  <Box
                    key={entry.id}
                    border
                    padding={3}
                    surface="muted"
                    display="flex"
                    align="center"
                    justify="between"
                    className="hover:border-accent/50 transition-colors"
                  >
                    <Stack gap={1}>
                      <Text variant="mono" size="xs" weight="font-bold">
                        {entry.data.title || 'Untitled Snapshot'}
                      </Text>
                      <Text variant="mono" size="micro" color="dim">
                        {new Date(entry.timestamp).toLocaleString()}
                      </Text>
                    </Stack>
                    <Box display="flex" gap={2}>
                      <Box
                        as="button"
                        onClick={() => rollback(entry)}
                        surface="accent"
                        paddingX={2}
                        paddingY={1}
                        className="bg-accent/10 text-accent hover:bg-accent hover:text-bg transition-all cursor-pointer"
                      >
                        <Text variant="mono" size="micro" weight="font-bold">ROLLBACK</Text>
                      </Box>
                      <Box
                        as="button"
                        onClick={() => deleteHistoryEntry(entry.id)}
                        className="text-dim hover:text-warning transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>

        {/* Preview Column */}
        <Stack gap={8}>
          <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
             <Text variant="mono" size="micro" color="brand">AI_INTEGRATION</Text>
             {showAppliedSuccess && (
                <Box display="flex" align="center" gap={2}>
                  <Check className="w-3 h-3 text-accent" />
                  <Text variant="mono" size="micro" color="brand" weight="font-bold">APPLIED_SUCCESSFULLY</Text>
                </Box>
             )}
          </Box>

          <Stack gap={4}>
            <Box
              as="textarea"
              value={aiInput}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAiInput(e.target.value)}
              placeholder="Paste AI JSON response here..."
              height={32}
              className={cn(inputs.base, "resize-none")}
            />
            <PrimaryActionButton
              onClick={handleApply}
              gap={3}
              padding={4}
            >
              <Send className="w-4 h-4" />
              APPLY_RESPONSE
            </PrimaryActionButton>
          </Stack>

          <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
             <Box display="flex" align="center" gap={2}>
               <Text variant="mono" size="micro" color="brand">MARKDOWN_PREVIEW</Text>
               <Box
                 as="button"
                 onClick={() => setPreviewMode('full')}
                 display="flex"
                 align="center"
                 gap={1}
                 paddingLeft={4}
                 className="text-accent hover:opacity-70 transition-all cursor-pointer"
               >
                 <Eye className="w-3 h-3" />
                 <Text variant="mono" size="micro" weight="font-bold">FULL_PREVIEW</Text>
               </Box>
             </Box>
             <Box display="flex" align="center" gap={2} color="dim">
                <FileText className="w-3 h-3" />
                <Text variant="mono" size="micro">v1.3.1</Text>
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
              <Text variant="mono" size="xs" weight="font-bold">
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
              surface="accent"
              padding={4}
              className="bg-accent text-bg hover:bg-accent transition-all cursor-pointer group"
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
