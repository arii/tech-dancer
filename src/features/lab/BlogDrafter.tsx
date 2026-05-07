import { useState, ChangeEvent } from 'react';
import { Github, FileText, Send, Terminal, ExternalLink, Info, Check, RotateCcw, Save, History, Trash2, Eye, Calendar, Package, PenTool } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PrimaryActionButton } from '@/components/ui/PrimaryActionButton';
import { useBlogDrafter, ContentType } from './useBlogDrafter';
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
    const typeSpecificPrompt =
      data.type === 'event' ? `Ensure the JSON strictly matches the keys: title, category, date, excerpt, location, city, schedule, description.` :
      data.type === 'resource' ? `Ensure the JSON strictly matches the keys: title, category, date, excerpt, affiliateIds (array), tags (array), rating (number), verdict, priceCategory, updatedDate, heading, content.` :
      `Ensure the JSON strictly matches the keys: title, excerpt, affiliateLink, commentary.`;

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
        data={data}
        onClose={() => setPreviewMode('compact')}
      />
    );
  }

  const types: { id: ContentType; label: string; icon: React.ElementType }[] = [
    { id: 'post', label: 'BLOG POST', icon: PenTool },
    { id: 'event', label: 'EVENT', icon: Calendar },
    { id: 'resource', label: 'RESOURCE', icon: Package },
  ];

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

        {/* Type Selector */}
        <Grid cols={3} gap={2} surface="alt" padding={1} radius="sm" border className="border-line">
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
              <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>TITLE</Text>
              <Box
                as="input"
                type="text"
                value={data.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('title', e.target.value)}
                placeholder={data.type === 'event' ? "Boogie by the Bay" : "The Future of WCS..."}
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
                  {data.type === 'event' ? (
                     <>
                       <option value="WSDC Registry Event">WSDC Registry Event</option>
                       <option value="Local Event">Local Event</option>
                       <option value="Workshop">Workshop</option>
                     </>
                  ) : CONTENT_CATEGORIES.map(cat => (
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
                placeholder="A brief overview of the content..."
                height={20}
                className={cn(inputs.base, "resize-none")}
              />
            </Stack>

            {/* Type Specific Fields */}
            {data.type === 'post' && (
              <>
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

              </>
            )}

            {data.type === 'event' && (
              <>
                <Grid cols={2} gap={4}>
                  <Stack gap={2}>
                    <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>LOCATION</Text>
                    <Box
                      as="input"
                      type="text"
                      value={data.location}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('location', e.target.value)}
                      placeholder="Hyatt Regency..."
                      className={inputs.base}
                    />
                  </Stack>
                  <Stack gap={2}>
                    <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>CITY</Text>
                    <Box
                      as="input"
                      type="text"
                      value={data.city}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('city', e.target.value)}
                      placeholder="San Francisco, CA"
                      className={inputs.base}
                    />
                  </Stack>
                </Grid>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>SCHEDULE</Text>
                  <Box
                    as="input"
                    type="text"
                    value={data.schedule}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('schedule', e.target.value)}
                    placeholder="October 8 - 11, 2026"
                    className={inputs.base}
                  />
                </Stack>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>DESCRIPTION</Text>
                  <Box
                    as="textarea"
                    value={data.description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('description', e.target.value)}
                    placeholder="Detailed event description..."
                    height={40}
                    className={cn(inputs.base, "resize-none")}
                  />
                </Stack>

              </>
            )}

            {data.type === 'resource' && (
              <>
                 <Grid cols={2} gap={4}>
                  <Stack gap={2}>
                    <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>RATING (1-5)</Text>
                    <Box
                      as="input"
                      type="number"
                      min="1"
                      max="5"
                      value={data.rating}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('rating', parseInt(e.target.value))}
                      className={inputs.base}
                    />
                  </Stack>
                  <Stack gap={2}>
                    <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>PRICE_CATEGORY</Text>
                    <Box
                      as="input"
                      type="text"
                      value={data.priceCategory}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('priceCategory', e.target.value)}
                      placeholder="$$"
                      className={inputs.base}
                    />
                  </Stack>
                </Grid>
                <Grid cols={2} gap={4}>
                  <Stack gap={2}>
                    <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>VERDICT</Text>
                    <Box
                      as="input"
                      type="text"
                      value={data.verdict}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('verdict', e.target.value)}
                      placeholder="Highly Recommended"
                      className={inputs.base}
                    />
                  </Stack>
                  <Stack gap={2}>
                    <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>UPDATED_DATE</Text>
                    <Box
                      as="input"
                      type="text"
                      value={data.updatedDate}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('updatedDate', e.target.value)}
                      placeholder="Oct 2023"
                      className={inputs.base}
                    />
                  </Stack>
                </Grid>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>HEADING</Text>
                  <Box
                    as="input"
                    type="text"
                    value={data.heading}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('heading', e.target.value)}
                    placeholder="Why Dancers Need..."
                    className={inputs.base}
                  />
                </Stack>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>CONTENT</Text>
                  <Box
                    as="textarea"
                    value={data.content}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('content', e.target.value)}
                    placeholder="Detailed resource content..."
                    height={40}
                    className={cn(inputs.base, "resize-none")}
                  />
                </Stack>

                <Grid cols={2} gap={4}>
                  <Stack gap={2}>
                    <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>TAGS (COMMA_SEPARATED)</Text>
                    <Box
                      as="input"
                      type="text"
                      value={data.tags.join(', ')}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                      placeholder="safety, ballroom"
                      className={inputs.base}
                    />
                  </Stack>
                  <Stack gap={2}>
                    <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>AFFILIATE_IDS (COMMA_SEPARATED)</Text>
                    <Box
                      as="input"
                      type="text"
                      value={data.affiliateIds.join(', ')}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('affiliateIds', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                      placeholder="loop-experience"
                      className={inputs.base}
                    />
                  </Stack>
                </Grid>
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
              <Text variant="display" size="base" weight="font-bold">SUBMIT DRAFT</Text>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Box>
          </Grid>
        </Stack>
      </Grid>
    </Stack>
  );
}
