import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, Copy } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { Box } from '@/layouts/Primitives';

export interface CopyPromptButtonProps {
  suggestion: string;
}

export const CopyPromptButton = ({ suggestion }: CopyPromptButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      // @ts-expect-error - startViewTransition is a newer browser API
      if (document.startViewTransition) {
        // @ts-expect-error - startViewTransition is a newer browser API
        document.startViewTransition(() => setCopied(false));
      } else {
        setCopied(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(suggestion);

      // Artificial slight delay for visual feedback if copy is instant
      await new Promise(resolve => setTimeout(resolve, 400));

      // @ts-expect-error - startViewTransition is a newer browser API
      if (document.startViewTransition) {
        // @ts-expect-error - startViewTransition is a newer browser API
        document.startViewTransition(() => {
          setCopied(true);
        });
      } else {
        setCopied(true);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Box
      as="button"
      onClick={handleCopy}
      disabled={isCopying}
      marginTop={2}
      display="flex"
      align="center"
      gap={1}
      paddingX={3}
      paddingY={1}
      radius="md"
      surface="default"
      border={true}
      className="hover:border-accent transition-colors hover:text-accent font-bold text-xs"
    >
      {isCopying ? (
        <Icon icon={RefreshCw} size="xs" className="animate-spin" />
      ) : copied ? (
        <Icon icon={CheckCircle} size="xs" color="accent" />
      ) : (
        <Icon icon={Copy} size="xs" />
      )}
      <span>{isCopying ? 'Copying...' : copied ? 'Copied!' : 'Copy Prompt'}</span>
    </Box>
  );
};
