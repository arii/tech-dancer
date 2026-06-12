import { ReactNode, ElementType } from 'react';
import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/**
 * InfoCard - A small card with an icon, title, and description.
 * Used for profile metadata and general info.
 */
export function InfoCard({
  icon,
  title,
  description,
  className
}: {
  icon?: ElementType;
  title?: string;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <Box padding={6} border radius="lg" className={cn("bg-surface/20 border-line/5", className)}>
      <Stack gap={3}>
        {icon && <Icon icon={icon} size="sm" color="accent" />}
        {title && (
          <Text as="h3" variant="mono" size="micro" color="brand" weight="font-bold" className="uppercase tracking-widest">
            {title}
          </Text>
        )}
        <Text variant="body" size="xs" color="dim" className="leading-normal">
          {description}
        </Text>
      </Stack>
    </Box>
  );
}

/**
 * InfoFeature - A larger card with an icon, title, and description.
 * Supports a clickable href and is used for Experience/Portfolio items.
 */
export function InfoFeature({
  icon,
  title,
  description,
  href,
  className
}: {
  icon?: ElementType;
  title: string;
  description: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <Box
      as={href ? "a" : "div"}
      href={href}
      padding={8}
      border
      radius="lg"
      className={cn(
        "bg-surface/20 border-line/5 group transition-all",
        href && "hover:border-accent/20 active:scale-95 cursor-pointer",
        className
      )}
    >
      <Stack direction={{ base: "col", sm: "row" }} gap={{ base: 4, sm: 8 }} align="start">
        {icon && (
          <Box
            width={12}
            height={12}
            radius="lg"
            border
            display="flex"
            align="center"
            justify="center"
            className="bg-accent/5 border-accent/20 shrink-0 shadow-sm group-hover:shadow-accent/5"
          >
            <Icon icon={icon} size="lg" color="accent" />
          </Box>
        )}
        <Stack gap={2} flex={1} align="start">
          <Text as="h3" variant="headline" size="lg" weight="font-bold" color="main" className="leading-tight group-hover:text-accent transition-colors">
            {title}
          </Text>
          <Text variant="body" size="base" color="dim" opacityVariant="solid" className="leading-relaxed text-left">
            {description}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

/**
 * InfoPill - A rounded link or tag.
 * Used for profile social links and tags.
 */
export function InfoPill({
  label,
  href,
  className
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  return (
    <Box
      as={href ? "a" : "div"}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      display="inline-flex"
      align="center"
      paddingX={4}
      paddingY={3}
      minHeight={11}
      border
      radius="full"
      className={cn(
        "transition-all group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none",
        href ? "hover:border-accent hover:bg-accent/5 active:scale-95" : "border-line/10",
        className
      )}
    >
      <Text variant="mono" size="xs" weight="font-bold" className={cn(href && "group-hover:text-accent")}>
        {label}
      </Text>
    </Box>
  );
}

/**
 * InfoRow - A flex-between link row.
 * Used in sidebars for affiliate links and similar lists.
 */
export function InfoRow({
  label,
  href,
  className
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  return (
    <Box
      as={href ? "a" : "div"}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      display="flex"
      align="center"
      justify="between"
      padding={4}
      surface="default"
      border
      className={cn(
        "transition-all group",
        href && "hover:border-accent",
        className
      )}
    >
      <Text variant="mono" size="xs" weight="font-bold">{label}</Text>
      {href && <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full" />}
    </Box>
  );
}
