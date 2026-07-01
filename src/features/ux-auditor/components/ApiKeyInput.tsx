import { ChangeEvent } from 'react';
import { Stack, Box, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Trash2 } from 'lucide-react';
import { cardVariants } from '@/lib/variants';

interface ApiKeyInputProps {
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
}

const ApiKeyInput = ({ customApiKey, setCustomApiKey }: ApiKeyInputProps) => {
  return (
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
          onFocus={(e) => e.target.select()}
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
  );
};

export default ApiKeyInput;
