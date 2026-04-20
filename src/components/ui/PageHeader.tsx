import { Box, Stack, Text } from '@/layouts/Primitives';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <Box paddingBottom={10} className="border-b border-slate-200">
      <Stack gap={4}>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-[0.15em]">
          {label}
        </Text>
        <Text variant="headline" size="fluid-7" weight="font-black" className="text-accent-navy leading-tight tracking-tight text-balance">
          {title}
        </Text>
        {description && (
          <Text variant="sans" size="lg" color="dim" maxWidth="3xl" marginTop={4} weight="font-medium" className="leading-relaxed">
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
