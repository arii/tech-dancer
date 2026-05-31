import { Stack, Text } from '@/layouts/Primitives';
import { Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const { share } = useShare();

  return (
    <Stack
      as="button"
      direction="row"
      onClick={() => share({ title, text, url })}
      align="center"
      gap={1.5}
      className="text-text-dim/60 hover:text-accent transition-colors group/share"
    >
      <Share2 className="w-3.5 h-3.5" />
      <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider">SHARE</Text>
    </Stack>
  );
}
