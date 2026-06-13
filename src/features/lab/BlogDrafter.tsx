// impeccable-ignore-file
import { useState, ChangeEvent } from 'react';
import { Github, FileText, Send, Terminal, ExternalLink, Info, Check, RotateCcw, Save, Eye } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionButton } from '@/components/ui/ActionButton';
import { useBlogDrafter } from './useBlogDrafter';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { FullPreview } from './components/FullPreview';
import { DrafterMetadataForm } from './components/DrafterMetadataForm';
import { DrafterHistory } from './components/DrafterHistory';
import { inputs } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';
import { types } from './config';

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
    const typeSpecificPrompt =
      data.type === 'event' ? `Ensure the JSON strictly matches the keys: title, author, category, date, excerpt, location, city, schedule, description.` :
      data.type === 'resource' ? `Ensure the JSON strictly matches the keys: title, author, category, date, excerpt, affiliateIds (array), tags (array), rating (number), verdict, priceCategory, updatedDate, heading, content.` :
      `Ensure the JSON strictly matches the keys: title, author, excerpt, affiliateLink, commentary.`;

    const prompt = `Objective: Expand the following ${data.type} draft JSON for Tech-Dancer.
Requirements:
1. Respond ONLY with a valid JSON object.
2. DO NOT include any explanatory text, commentary, or markdown markers outside or inside the JSON values.
3. ${typeSpecificPrompt}
4. Content should be rich markdown where appropriate.

Draft Data: ${JSON.stringify(data, null, 2)}`;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (previewMode === 'full') {
    return (
      <FullPreview
        {...data}
        onClose={() => setPreviewMode('compact')}
      />
    );
  }

  return (
    <Stack gap={{ base: 6, md: 10 }} height="full">
      <Stack gap={4}>
        <Box display="flex" align="center" justify="between" width="full">
          <PageHeader
            label="LABORATORY"
            title="CONTENT PIPELINE"
            paddingBottom={0}
            border="none"
          />
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

        {/* Type Selector */}
        <Grid cols={{ base: 1, sm: 3 }} gap={2} surface="alt" padding={1} radius="sm" border className="border-line">
          {types.map((type) => {
            const Icon = type.icon;
            const isActive = data.type === type.id;
            return (
              <Box
                key={type.id}
                as="button"
                onClick={() => updateField('type', type.id)}
                display="flex"
                align="center"
                justify="center"
                gap={2}
                paddingY={2}
                className={cn(
                  "transition-all cursor-pointer",
                  isActive
                    ? "bg-accent text-bg shadow-sm"
                    : "text-text-dim hover:text-text-main hover:bg-white/5"
                )}
              >
                <Icon className="w-3 h-3" />
                <Text variant="mono" size="micro" weight="font-bold">{type.label}</Text>
              </Box>
            );
          })}
        </Grid>

        <Box border padding="compact" className="bg-accent/5 border-accent/20">
           <Stack gap={2} display="flex" align="baseline" direction="row">
              <Box as="span" className="shrink-0">
                <Info className="w-4 h-4 text-accent" />
              </Box>
              <Text variant="body" size="xs">
                Drafting as <strong>{data.type.toUpperCase()}</strong>.
                Complete the form below to generate a pre-formatted GitHub Issue link.
              </Text>
           </Stack>
        </Box>
      </Stack>

      <Grid cols={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
        {/* Form Column */}
        <Stack gap={8}>
          <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
             <Text variant="mono" size="micro" color="brand">Metadata</Text>
             <Box
               as="button"
               onClick={saveToHistory}
               display="flex"
               align="center"
               gap={2}
               className="text-accent hover:opacity-high transition-all cursor-pointer"
             >
                <Save className="w-3 h-3" />
                <Text variant="mono" size="micro" weight="font-bold">Save Snapshot</Text>
             </Box>
          </Box>

          <DrafterMetadataForm data={data} updateField={updateField} />

          <DrafterHistory
            history={history}
            rollback={rollback}
            deleteHistoryEntry={deleteHistoryEntry}
          />
        </Stack>

        {/* Preview Column */}
        <Stack gap={8}>
          <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
             <Text variant="mono" size="micro" color="brand">AI Tools</Text>
             {showAppliedSuccess && (
                <Box display="flex" align="center" gap={2}>
                  <Check className="w-3 h-3 text-accent" />
                  <Text variant="mono" size="micro" color="brand" weight="font-bold">Applied Successfully</Text>
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
            <ActionButton
              onClick={handleApply}
              gap={3}
              padding={4}
            >
              <Send className="w-4 h-4" />
              Apply Draft
            </ActionButton>
          </Stack>

          <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
             <Box display="flex" align="center" gap={2}>
               <Text variant="mono" size="micro" color="brand">Markdown Preview</Text>
               <Box
                 as="button"
                 onClick={() => setPreviewMode('full')}
                 display="flex"
                 align="center"
                 gap={1}
                 paddingLeft={4}
                 className="text-accent hover:opacity-high transition-all cursor-pointer"
               >
                 <Eye className="w-3 h-3" />
                 <Text variant="mono" size="micro" weight="font-bold">FULL_PREVIEW</Text>
               </Box>
             </Box>
             <Box display="flex" align="center" gap={2} color="dim">
                <FileText className="w-3 h-3" />
                <Text variant="mono" size="micro">v1.4.0</Text>
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
              <Text variant="display" size="base" weight="font-bold" color="bg">SUBMIT DRAFT</Text>
              <ExternalLink className="w-4 h-4 opacity-muted group-hover:opacity-full transition-opacity" />
            </Box>
          </Grid>
        </Stack>
      </Grid>
    </Stack>
  );
}
