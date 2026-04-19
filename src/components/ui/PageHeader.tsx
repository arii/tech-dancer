import { Box, Stack, Text } from '../layout/Primitives';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <Box border="b" paddingBottom={8} borderColor="line">
      <Stack gap={2}>
        <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="widest">
          {label}
        </Text>
        <Text variant="display" size="5xl" weight="font-black" className="text-accent-navy leading-tight tracking-tight">
          {title}
        </Text>
        {description && (
          <Text variant="sans" size="lg" color="dim" maxWidth="3xl" marginTop={2} weight="font-medium">
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  );
}

export function SectionHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4}>
      <Stack gap={1}>
        <Text variant="mono" size="xs" color="brand">{label}</Text>
        <Text variant="display" size="4xl">{title}</Text>
      </Stack>
      {children}
    </Box>
  );
}
