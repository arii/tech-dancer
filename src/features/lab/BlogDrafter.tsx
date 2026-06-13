// impeccable-ignore-file
import { useState, ChangeEvent } from 'react';
import { Github, FileText, Send, Terminal, ExternalLink, Info, Check, RotateCcw, Save, History, Trash2, Eye } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionButton } from '@/components/ui/ActionButton';
import { useBlogDrafter } from './useBlogDrafter';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { CONTENT_CATEGORIES } from '@/config/content';
import { FullPreview } from './components/FullPreview';
import { inputs } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';
import { types, EVENT_TYPES } from './config';

const Field = ({ label, value, onChange, placeholder, type = "text", ...props }: { label: string, value: string | number | undefined, onChange: (v: string) => void, placeholder?: string, type?: string, step?: string }) => {
  return (
    <Stack gap={2}>
      <Text variant="mono" size="micro" color="dim" className="tracking-wider uppercase font-bold" marginBottom={0}>{label}</Text>
      {type === 'textarea' ? (
        <Box as="textarea" value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)} placeholder={placeholder} height={40} className="w-full bg-surface-alt border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none" {...props} />
      ) : (
        <Box as="input" type={type} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-surface-alt border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed" {...props} />
      )}
    </Stack>
  );
};

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

          <Stack gap={6}>

            <Grid cols={2} gap={4}>
              <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Content Type</Text>
                <Box
                  as="select"
                  value={data.type}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateField('type', e.target.value as 'post' | 'resource' | 'event')}
                  className={cn(inputs.base, "appearance-none")}
                >
                  <option value="post">Blog Post</option>
                  <option value="resource">Resource Card</option>
                  <option value="event">Event Card</option>
                </Box>
              </Stack>
              <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Category</Text>
                <Box
                  as="select"
                  value={data.category}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateField('category', e.target.value)}
                  className={cn(inputs.base, "appearance-none")}
                >
                  {data.type === 'event' ? (
                    EVENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))
                  ) : CONTENT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </Box>
              </Stack>
            </Grid>

            <Field label="Title" value={data.title} onChange={(v: string) => updateField('title', v)} placeholder="The Future of WCS..." />

            <Grid cols={2} gap={4}>
              <Field label="Publish Date" value={data.date} onChange={(v: string) => updateField('date', v)} type="date" />
              <Field label="Author" value={data.author} onChange={(v: string) => updateField('author', v)} />
            </Grid>

            {data.type === 'resource' && (
              <Box border padding={4} surface="muted" radius="md">
                <Stack gap={4}>
                   <Text variant="mono" size="micro" color="brand" weight="font-bold">Resource Metadata</Text>
                   <Grid cols={2} gap={4}>
                      <Field label="DURABILITY" type="number" step="0.1" value={data.durability} onChange={(v: string) => updateField('durability', parseFloat(v))} />
                      <Field label="VALUE" type="number" step="0.1" value={data.value} onChange={(v: string) => updateField('value', parseFloat(v))} />
                   </Grid>
                   <Grid cols={2} gap={4}>
                     <Field label="Price Category" value={data.priceCategory} onChange={(v: string) => updateField('priceCategory', v)} placeholder="e.g. $$$" />
                     <Field label="Updated Date" value={data.updatedDate} onChange={(v: string) => updateField('updatedDate', v)} placeholder="Oct 2026" />
                   </Grid>
                   <Field label="VERDICT" value={data.verdict} onChange={(v: string) => updateField('verdict', v)} placeholder="Final summary..." />
                   <Field label="AFFILIATE_IDS (COMMA SEPARATED)" value={(data.affiliateIds ?? []).join(', ')} onChange={(v: string) => updateField('affiliateIds', v)} placeholder="amazon, etc" />
                   <Field label="TAGS (COMMA SEPARATED)" value={(data.tags ?? []).join(', ')} onChange={(v: string) => updateField('tags', v)} placeholder="practice, travel" />
                </Stack>
              </Box>
            )}

            {data.type === 'event' && (
              <Box border padding={4} surface="muted" radius="md">
                <Stack gap={4}>
                   <Text variant="mono" size="micro" color="brand" weight="font-bold">Event Logistics</Text>
                   <Field label="EVENT_START_DATE" value={data.startDate} onChange={(v: string) => updateField('startDate', v)} type="date" />
                   <Grid cols={2} gap={4}>
                      <Field label="EARLY_BIRD_DEADLINE" value={data.earlyBirdDate} onChange={(v: string) => updateField('earlyBirdDate', v)} type="date" />
                      <Field label="HOTEL_CUTOFF" value={data.hotelCutoffDate} onChange={(v: string) => updateField('hotelCutoffDate', v)} type="date" />
                   </Grid>
                   <Field label="OFFICIAL_URL" value={data.url} onChange={(v: string) => updateField('url', v)} type="url" placeholder="https://..." />
                </Stack>
              </Box>
            )}

            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Excerpt</Text>
              <Box
                as="textarea"
                value={data.excerpt}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('excerpt', e.target.value)}
                placeholder="A brief overview of the content..."
                height={20}
                className={cn(inputs.base, "resize-none")}
              />
            </Stack>

            {/* Type Specific Fields */}
            {data.type === 'post' && (
              <>
                <Field label="Amazon Link (Optional)" value={data.affiliateLink} onChange={(v: string) => updateField('affiliateLink', v)} type="url" placeholder="https://amazon.com/..." />

                <Field label="Content" value={data.commentary} onChange={(v: string) => updateField('commentary', v)} type="textarea" placeholder="Write your main content here..." />

              </>
            )}

            {data.type === 'resource' && (
              <>
                <Field label="RESOURCE_HEADING" value={data.heading} onChange={(v: string) => updateField('heading', v)} placeholder="Practice Anywhere" />

                <Field label="RESOURCE_CONTENT" value={data.content} onChange={(v: string) => updateField('content', v)} type="textarea" placeholder="Write the resource review content here..." />
              </>
            )}

            {data.type === 'event' && (
              <>
                <Grid cols={2} gap={4}>
                  <Field label="LOCATION" value={data.location} onChange={(v: string) => updateField('location', v)} placeholder="Hyatt Regency..." />
                  <Field label="CITY" value={data.city} onChange={(v: string) => updateField('city', v)} placeholder="San Francisco, CA" />
                </Grid>
                <Field label="SCHEDULE" value={data.schedule} onChange={(v: string) => updateField('schedule', v)} placeholder="October 8 - 11, 2026" />
                <Field label="DESCRIPTION" value={data.description} onChange={(v: string) => updateField('description', v)} type="textarea" placeholder="Detailed event description..." />

              </>
            )}

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
                      <Box display="flex" align="center" gap={2}>
                         <Text variant="mono" size="xs" weight="font-bold">
                          {entry.data.title || 'Untitled Snapshot'}
                        </Text>
                        <Box paddingX={1} className="bg-accent/20 rounded">
                           <Text variant="mono" size="micro" color="accent">{entry.data.type.toUpperCase()}</Text>
                        </Box>
                      </Box>
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
                        <Text variant="mono" size="micro" weight="font-bold" className="text-inherit">ROLLBACK</Text>
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
