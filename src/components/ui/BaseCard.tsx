import { ReactNode } from 'react';
import { Box, Stack, BaseProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface BaseCardProps extends BaseProps {
  children: ReactNode;
  href?: string;
  isExternal?: boolean;
  hoverable?: boolean;
  "aria-label"?: string;
  dataTestId?: string;
}

export function BaseCard({
  children,
  href,
  isExternal,
  hoverable,
  "aria-label": ariaLabel,
  dataTestId,
  className,
  ...props
}: BaseCardProps) {
  const isLink = !!href;
  const shouldShowHover = hoverable ?? isLink;

  return (
    <Stack
      as="article"
      padding={6}
      radius="lg"
      border
      height="full"
      width="full"
      position="relative"
      data-testid={dataTestId}
      className={cn(
        "bg-surface transition-all duration-300",
        shouldShowHover && "group hover:border-accent/40 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {isLink && (
        <Box
          as={isExternal ? "a" : "div"}
          {...(isExternal ? { href, target: "_blank", rel: "sponsored noopener noreferrer", "aria-label": ariaLabel } : {})}
          className="absolute inset-0 z-10 cursor-pointer"
        />
      )}
      {children}
    </Stack>
  );
}
