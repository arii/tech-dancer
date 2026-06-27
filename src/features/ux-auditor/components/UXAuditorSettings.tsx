import { ChangeEvent } from 'react';
import { Trash2 } from 'lucide-react';

import { Icon } from '@/components/ui/Icon';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { cardVariants } from '@/lib/variants';

export interface UXAuditorSettingsProps {
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
  snapshotService: string;
  setSnapshotService: (url: string) => void;
}

export const UXAuditorSettings = ({
  customApiKey,
  setCustomApiKey,
  snapshotService,
  setSnapshotService,
}: UXAuditorSettingsProps) => {
  const handleApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => setCustomApiKey(e.target.value);
  const handleApiKeyClear = () => setCustomApiKey("");
  const handleSnapshotUrlChange = (e: ChangeEvent<HTMLInputElement>) => setSnapshotService(e.target.value);
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();

  return (
    <>
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
            onChange={handleApiKeyChange}
            onFocus={handleInputFocus}
            className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
            flex={1}
            paddingX={4}
            paddingY={2}
            radius="md"
            placeholder="OpenAI or Gemini API Key (optional override)"
            aria-label="API Key"
          />
          {customApiKey && (
            <Box
              as="button"
              onClick={handleApiKeyClear}
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
            onChange={handleSnapshotUrlChange}
            onFocus={handleInputFocus}
            className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
            flex={1}
            paddingX={4}
            paddingY={2}
            radius="md"
            placeholder="Custom service URL with {url}, {width}, {height} (optional)"
            aria-label="Snapshot Service URL"
          />
        </Stack>
        <Text variant="sans" size="xs" color="dim" paddingX={2} marginTop={1}>
          Use {"{url}"}, {"{width}"}, and {"{height}"} as placeholders. Example: https://api.service.com?url={"{url}"}&size={"{width}"}x{"{height}"}
        </Text>
      </Stack>
    </>
  );
};

export default UXAuditorSettings;
