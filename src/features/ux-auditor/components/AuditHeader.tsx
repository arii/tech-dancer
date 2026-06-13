import { ChangeEvent, FormEvent } from 'react';
import { Camera, RefreshCw, Trash2 } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icon } from '@/components/ui/Icon';
import { cardVariants } from '@/lib/variants';

interface AuditHeaderProps {
  url: string;
  setUrl: (url: string) => void;
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
  snapshotService: string;
  setSnapshotService: (url: string) => void;
  isAnalyzing: boolean;
  runUXAudit: (url: string) => void;
}

export function AuditHeader({
  url, setUrl, customApiKey, setCustomApiKey,
  snapshotService, setSnapshotService, isAnalyzing, runUXAudit
}: AuditHeaderProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runUXAudit(url);
  };

  return (
    <Stack
      direction={{ base: 'col', xl: 'row' }}
      align={{ base: 'stretch', xl: 'center' }}
      justify="between"
      gap={6}
      border="b" paddingBottom={6}
    >
      <Box>
        <PageHeader
          label="Visual UX Auditor"
          title="Multimodal AI Analysis"
          description="Automated visual regression and UX improvement suggestions across viewports."
        />
      </Box>

      <Stack gap={4} as="form" autoComplete="off" onSubmit={handleSubmit}>
        <Stack
          direction="row"
          align="center"
          gap={3}
          padding={2}
          className={cardVariants()}
        >
          <Box
            as="input"
            id="audit-url"
            name="audit-url"
            type="url"
            autoComplete="off"
            value={url}
            title={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            onFocus={(e) => e.currentTarget.select()}
            className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main text-sm"
            flex={1}
            minWidth={0} // Allows input to shrink below default minimum within flex container
            paddingX={4}
            paddingY={2}
            radius="lg"
            placeholder="https://..."
            aria-label="URL to audit"
          />
          <Box
            as="button"
            type="submit"
            disabled={isAnalyzing}
            display="flex"
            align="center"
            gap={2}
            className="bg-accent hover:opacity-solid text-bg font-bold transition-all disabled:opacity-muted"
            paddingX={6}
            paddingY={2}
            radius="md"
          >
            {isAnalyzing ? <Icon icon={RefreshCw} size="sm" className="animate-spin" /> : <Icon icon={Camera} size="sm" />}
            {isAnalyzing ? 'Auditing...' : 'Start Audit'}
          </Box>
        </Stack>
        <Stack gap={2}>
          <Stack
            direction="row"
            align="center"
            gap={3}
            padding={2}
            className={cardVariants()}
          >
            <Text variant="mono" size="xs" color="dim" paddingLeft={2} uppercase weight="font-bold">API KEY</Text>
            <Box
              as="input"
              id="audit-api-key"
              name="audit-api-key"
              type="password"
              autoComplete="new-password"
              value={customApiKey}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomApiKey(e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
              className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
              flex={1}
              paddingX={4}
              paddingY={2}
              radius="lg"
              placeholder="OpenAI or Gemini API Key (optional override)"
              aria-label="API Key"
            />
            {customApiKey && (
              <Box
                as="button"
                type="button"
                onClick={() => setCustomApiKey("")}
                display="flex"
                align="center"
                justify="center"
                padding={2}
                radius="md"
                className="hover:bg-surface-alt text-dim hover:text-error transition-colors"
                title="Clear API Key"
              >
                <Icon icon={Trash2} size="sm" />
              </Box>
            )}
          </Stack>
          <Text variant="sans" size="xs" color="warning" paddingX={2} weight="font-medium">
            ⚠️ API keys are stored in your browser's session storage. They are cleared when you close the tab. Plain-text storage is not fully secure; use only on trusted devices.
          </Text>
        </Stack>
        <Stack gap={1}>
          <Stack
            direction="row"
            align="center"
            gap={3}
            padding={2}
            className={cardVariants()}
          >
            <Text variant="mono" size="xs" color="dim" paddingLeft={2} uppercase weight="font-bold">SNAPSHOT SERVICE</Text>
            <Box
              as="input"
              id="audit-snapshot-url"
              name="audit-snapshot-url"
              type="url"
              autoComplete="off"
              value={snapshotService}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSnapshotService(e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
              className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
              flex={1}
              paddingX={4}
              paddingY={2}
              radius="lg"
              placeholder="Custom service URL with {url}, {width}, {height} (optional)"
              aria-label="Snapshot Service URL"
            />
          </Stack>
          <Text variant="sans" size="xs" color="dim" paddingX={2} marginTop={1}>
            Use {"{url}"}, {"{width}"}, and {"{height}"} as placeholders. Example: https://api.service.com?url={"{url}"}&size={"{width}"}x{"{height}"}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
