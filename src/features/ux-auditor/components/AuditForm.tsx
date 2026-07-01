import { ChangeEvent } from 'react';
import { Stack, Box } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { RefreshCw, Camera } from 'lucide-react';
import { cardVariants } from '@/lib/variants';
import ApiKeyInput from './ApiKeyInput';
import SnapshotServiceInput from './SnapshotServiceInput';

interface AuditFormProps {
  url: string;
  setUrl: (url: string) => void;
  isAnalyzing: boolean;
  runUXAudit: (url: string) => void;
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
  snapshotService: string;
  setSnapshotService: (url: string) => void;
}

const AuditForm = ({
  url,
  setUrl,
  isAnalyzing,
  runUXAudit,
  customApiKey,
  setCustomApiKey,
  snapshotService,
  setSnapshotService,
}: AuditFormProps) => {
  return (
    <Stack gap={4} as="form" autoComplete="off" onSubmit={(e) => { e.preventDefault(); runUXAudit(url); }}>
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
          onFocus={(e) => e.target.select()}
          className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main text-sm"
          flex={1}
          minWidth={0}
          paddingX={4}
          paddingY={2}
          radius="md"
          placeholder="https://..."
          aria-label="URL to audit"
        />
        <Box
          as="button"
          onClick={() => runUXAudit(url)}
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

      <ApiKeyInput
        customApiKey={customApiKey}
        setCustomApiKey={setCustomApiKey}
      />

      <SnapshotServiceInput
        snapshotService={snapshotService}
        setSnapshotService={setSnapshotService}
      />
    </Stack>
  );
};

export default AuditForm;
