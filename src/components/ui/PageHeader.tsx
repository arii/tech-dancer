import { Box, Stack, Text } from '../layout/Primitives';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <Box border="b" paddingBottom={8} className="border-slate-200">
      <Stack gap={3}>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-[0.15em]">
          {label}
        </Text>
        <Text variant="display" size="5xl" weight="font-black" className="text-accent-navy leading-tight tracking-tight text-balance">
          {title}
        </Text>
        {description && (
          <Text variant="sans" size="lg" color="dim" maxWidth="3xl" marginTop={2} weight="font-medium" className="leading-relaxed">
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
