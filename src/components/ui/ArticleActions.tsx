import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface ArticleActionsProps {
  title: string;
  text?: string;
  url?: string;
}

export function ArticleActions({ title, text, url }: ArticleActionsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <Stack direction="row" gap={4}>
      <Stack
        as="button"
        direction="row"
        onClick={handleShare}
        align="center"
        gap={2}
        paddingX={3}
        paddingY={1.5}
        radius="sm"
        className="text-accent hover:bg-accent/10 hover:shadow-glow transition-all active:scale-95 cursor-pointer"
        aria-label={copied ? "Link copied" : "Share article"}
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
        <Text variant="mono" size="xs" weight="font-bold">
          {copied ? 'COPIED' : 'SHARE'}
        </Text>
      </Stack>
    </Stack>
  );
}
