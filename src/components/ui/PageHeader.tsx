import { Box, Stack, Text } from '@/layouts/Primitives';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  paddingBottom?: number | string;
  border?: boolean | "t" | "b" | "l" | "r";
  descriptionMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "prose" | string;
  titleAs?: "h1" | "h2" | "h3";
}

export function PageHeader({
  label,
  title,
  description,
  paddingBottom = 12,
  border = "b",
  descriptionMaxWidth = "65ch",
  titleAs = "h1"
}: PageHeaderProps) {
  return (
    <Box
      paddingBottom={paddingBottom}
      border={border}
    >
      <Stack gap={4}>
        <Text
          variant="mono"
          size="xs"
          color="dim"
          weight="font-semibold"
          uppercase
          className="!tracking-[0.2em]"
        >
          {label}
        </Text>
        <Text
          as={titleAs}
          variant="headline"
          size={{ base: "4xl", lg: "6xl" }}
          weight="font-black"
          className="text-text-main leading-tight !tracking-tighter uppercase"
        >
          {title}
        </Text>
        {description && (
          <Text
            variant="body"
            size={{ base: "lg", lg: "xl" }}
            color="dim"
            maxWidth={descriptionMaxWidth}
            marginTop={4}
            className="leading-relaxed"
          >
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  );
}

export function SectionHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4} className="border-slate-200">
      <Stack gap={1}>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em]">{label}</Text>
        <Text variant="display" size="3xl" weight="font-black" className="text-accent-navy">{title}</Text>
      </Stack>
      {children}
    </Box>
  );
}
