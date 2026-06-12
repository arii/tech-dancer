import { Box, Stack, Text } from '@/layouts/Primitives';
import { LucideIcon, Download } from 'lucide-react';
import { ActionButton } from '@/components/ui/ActionButton';

export interface ExportActionItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface ExportActionsProps {
  title?: string;
  actions: ExportActionItem[];
}

export function ExportActions({ title = "Export Data", actions }: ExportActionsProps) {
  return (
    <Box border surface="default" padding="card">
      <Stack gap={6}>
        <Box display="flex" align="center" gap={3}>
          <Download className="w-5 h-5 text-accent" />
          <Text variant="mono" size="xs" weight="font-bold" uppercase>{title}</Text>
        </Box>
        <Stack gap={3}>
          {actions.map((action) => (
            <ActionButton
              key={action.id}
              variant="secondary"
              width="full"
              padding={3}
              onClick={action.onClick}
            >
              <Box display="flex" align="center" gap={3} width="full" textAlign="left">
                <action.icon className="w-4 h-4 shrink-0" />
                <Stack gap={0}>
                  <Text variant="mono" size="micro" weight="font-bold">{action.label}</Text>
                  <Text variant="body" size="micro" color="dim">{action.description}</Text>
                </Stack>
              </Box>
            </ActionButton>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
