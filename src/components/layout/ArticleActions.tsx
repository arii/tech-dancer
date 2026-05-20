import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { Stack, Text } from '@/layouts/Primitives';

interface ArticleActionsProps {
  title: string;
  description: string;
}

interface ActionChipProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  className: string;
}

function ActionChip({ label, icon, onClick, className }: ActionChipProps) {
  return (
    <Stack
      as="button"
      direction="row"
      onClick={onClick}
      align="center"
      gap={2}
      paddingX={3}
      paddingY={1.5}
      radius="sm"
      className={className}
    >
      {icon}
      <Text variant="mono" size="xs" weight="font-bold">{label}</Text>
    </Stack>
  );
}

export function ArticleActions({ title, description }: ArticleActionsProps) {
  const [copied, setCopied] = useState(false);
  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Failed to copy article URL', error);
    }
  };

  const handleShare = async () => {
    if (hasNativeShare) {
      try {
        await navigator.share({ title, text: description, url: window.location.href });
      } catch (error) {
        console.error('Share failed; falling back to copy link', error);
        await handleCopyLink();
      }
      return;
    }
    await handleCopyLink();
  };

  return (
    <Stack direction="row" gap={2} wrap>
      <ActionChip
        label="SHARE"
        icon={<Share2 className="w-4 h-4" />}
        onClick={() => void handleShare()}
        className="text-accent hover:bg-accent/10 transition-all active:scale-95 cursor-pointer"
      />

      {!hasNativeShare && (
        <ActionChip
          label={copied ? 'COPIED' : 'COPY LINK'}
          icon={copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          onClick={() => void handleCopyLink()}
          className="text-text-dim hover:text-accent hover:bg-accent/10 transition-all active:scale-95 cursor-pointer"
        />
      )}
    </Stack>
  );
}
