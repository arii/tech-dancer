import { Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

export function Tag({ children, variant = 'default', className }: TagProps) {
  const paddingY = variant === 'compact' ? 0.5 : 1;
  return (
    <Text
      variant="mono"
      size="micro"
      paddingX={2}
      paddingY={paddingY}
      radius="sm"
      color="dim"
      className={cn("flagship-tag", className)}
    >
      {children}
    </Text>
  );
}
