import { ChangeEvent } from 'react';
import { Stack, Box, Text } from '@/layouts/Primitives';
import { cardVariants } from '@/lib/variants';

interface SnapshotServiceInputProps {
  snapshotService: string;
  setSnapshotService: (url: string) => void;
}

const SnapshotServiceInput = ({ snapshotService, setSnapshotService }: SnapshotServiceInputProps) => {
  return (
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
          onFocus={(e) => e.target.select()}
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
  );
};

export default SnapshotServiceInput;
