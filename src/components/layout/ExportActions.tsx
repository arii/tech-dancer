import { Box, Stack, Text } from '@/layouts/Primitives';
import { FileJson, FileText } from 'lucide-react';
import { ActionButton } from '@/components/ui/ActionButton';

export interface ExportAction {
  label: string;
  description: string;
  icon: 'csv' | 'pdf';
  onClick: () => void;
}

export interface ExportActionsProps {
  actions: ExportAction[];
  title?: string;
}

export function ExportActions({ actions }: ExportActionsProps) {
  return (
    <Stack gap={6}>
      <Stack gap={3}>
        {actions.map((action, idx) => (
          <ActionButton key={idx} variant="secondary" width="full" padding={3} onClick={action.onClick}>
            <Box display="flex" align="center" gap={3} width="full" textAlign="left">
              {action.icon === 'csv' ? <FileJson className="w-4 h-4 shrink-0" /> : <FileText className="w-4 h-4 shrink-0" />}
              <Stack gap={0}>
                <Text variant="mono" size="micro" weight="font-bold">{action.label}</Text>
                <Text variant="body" size="micro" color="dim">{action.description}</Text>
              </Stack>
            </Box>
          </ActionButton>
        ))}
      </Stack>
    </Stack>
  );
}
