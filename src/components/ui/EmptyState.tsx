import { ReactNode } from 'react';
import { Box, Stack, Text, BoxProps } from '../../layouts/Primitives';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends BoxProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <Box
      padding={compact ? 6 : 12}
      surface={compact ? false : "muted"}
      radius={compact ? "none" : "3xl"}
      className={cn(
        "text-center",
        !compact && "border-2 border-dashed",
        className
      )}
      {...props}
    >
      <Stack align="center" justify="center" gap={compact ? 2 : 4}>
        {icon && (
          <Box 
            color="dim" 
            opacityVariant="muted"
            display="flex" 
            align="center" 
            justify="center"
            width={compact ? 5 : 10}
            height={compact ? 5 : 10}
            marginX="auto"
          >
            {icon}
          </Box>
        )}
        <Stack gap={compact ? 0 : 2}>
          <Text
            variant={compact ? "sans" : "display"}
            size={compact ? "sm" : "xl"}
            weight={compact ? "font-bold" : "font-black"}
          >
            {title}
          </Text>
          {description && (
            <Text
              variant="sans"
              size="xs"
              color="dim"
              maxWidth="prose"
              marginX="auto"
            >
              {description}
            </Text>
          )}
        </Stack>
        {action && (
          <Box marginTop={compact ? 2 : 4}>
            {action}
          </Box>
        )}
      </Stack>
    </Box>
  );
}
