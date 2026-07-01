import { Stack, Box, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { CheckCircle, Copy, Github, RefreshCw } from 'lucide-react';
import { cardVariants, actionButtonVariants } from '@/lib/variants';

interface AuditSessionHeaderProps {
  url: string;
  isCopiedMarkdown: boolean;
  copyMarkdown: () => void;
  isExportingToGithub: boolean;
  exportToGithub: () => void;
  isCompleted: boolean;
}

const AuditSessionHeader = ({
  url,
  isCopiedMarkdown,
  copyMarkdown,
  isExportingToGithub,
  exportToGithub,
  isCompleted,
}: AuditSessionHeaderProps) => {
  return (
    <Stack
      padding={6}
      className={cardVariants()}
      justify="between" align={{ base: "start", md: "center" }}
      gap={6} direction={{ base: "col", md: "row" }}
    >
      <Stack gap={1} minWidth="0" flex={1}>
        <Text variant="sans" size="xs" weight="font-bold" color="accent" uppercase tracking="widest" display="block">
          Current Session
        </Text>
        <Text variant="sans" size="xl" weight="font-black" className="truncate block" title={url}>
          {url}
        </Text>
      </Stack>
      <Stack direction={{ base: 'col', sm: 'row' }} gap={3} shrink={0} width={{ base: 'full', sm: 'auto' }} align={{ base: 'stretch', sm: 'center' }}>
        <Box
          as="button"
          onClick={copyMarkdown}
          display="flex"
          align="center"
          justify="center"
          gap={2}
          className={actionButtonVariants({ variant: "default" })}
          surface="muted"
          color="dim"
          paddingX={4}
          paddingY={2}
          radius="xl"
          width={{ base: 'full', sm: 'auto' }}
        >
          {isCopiedMarkdown ? <Icon icon={CheckCircle} size="sm" /> : <Icon icon={Copy} size="sm" />}
          {isCopiedMarkdown ? 'Copied' : 'Copy MD'}
        </Box>
        <Box
          as="button"
          onClick={exportToGithub}
          disabled={!isCompleted || isExportingToGithub}
          display="flex"
          align="center"
          justify="center"
          gap={2}
          className={actionButtonVariants({ variant: "primary" })}
          paddingX={6}
          paddingY={2}
          radius="xl"
          width={{ base: 'full', sm: 'auto' }}
        >
          {isExportingToGithub ? <Icon icon={RefreshCw} size="sm" className="animate-spin" /> : <Icon icon={Github} size="sm" />}
          <span className="whitespace-nowrap">{isExportingToGithub ? 'Exporting...' : 'Export to GitHub Issue'}</span>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AuditSessionHeader;
