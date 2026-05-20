import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Stack, Text } from '@/layouts/Primitives';

interface ArticleActionsProps {
  title: string;
  description: string;
}

export function ArticleActions({ title, description }: ArticleActionsProps) {
  const [copied, setCopied] = useState(false);

  const hasNativeShare = useMemo(() => typeof navigator !== 'undefined' && !!navigator.share, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Failed to copy article URL', error);
    }
  };

  const handleShare = () => {
    if (hasNativeShare) {
      navigator
        .share({ title, text: description, url: window.location.href })
        .catch((error) => console.error('Share failed', error));
      return;
    }
    void handleCopyLink();
  };

  return (
    <Stack direction="row" gap={2} wrap>
      <Stack
        as="button"
        direction="row"
        onClick={handleShare}
        align="center"
        gap={2}
        paddingX={3}
        paddingY={1.5}
        radius="sm"
        className="text-accent hover:bg-accent/10 transition-all active:scale-95 cursor-pointer"
      >
        <Share2 className="w-4 h-4" />
        <Text variant="mono" size="xs" weight="font-bold">SHARE</Text>
      </Stack>

      {!hasNativeShare && (
        <Stack
          as="button"
          direction="row"
          onClick={() => void handleCopyLink()}
          align="center"
          gap={2}
          paddingX={3}
          paddingY={1.5}
          radius="sm"
          className="text-text-dim hover:text-accent hover:bg-accent/10 transition-all active:scale-95 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          <Text variant="mono" size="xs" weight="font-bold">{copied ? 'COPIED' : 'COPY LINK'}</Text>
        </Stack>
      )}
    </Stack>
  );
}
