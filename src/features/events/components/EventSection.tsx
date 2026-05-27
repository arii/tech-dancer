import { Children, type ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SECTION_GAP } from '../constants';

export type EventSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function EventSection({ id, eyebrow, title, description, children }: EventSectionProps) {
  if (Children.toArray(children).length === 0) {
    return null;
  }

  return (
    <Box id={id} as="section" className={SECTION_GAP}>
      <Stack gap={3}>
        <Stack gap={1}>
          {eyebrow && (
            <Text
              variant="mono"
              size="micro"
              weight="font-semibold"
              color="accent"
              uppercase
              className="tracking-[0.18em] text-[11px] opacity-70"
            >
              {eyebrow}
            </Text>
          )}
          <Text as="h2" variant="headline" size="2xl" weight="font-bold" color="white" className="tracking-tight">
            {title}
          </Text>
        </Stack>
        {description && (
          <Text size="sm" color="dim" className="max-w-3xl leading-6 opacity-90">
            {description}
          </Text>
        )}
      </Stack>
      <Box marginTop={6}>
        {children}
      </Box>
    </Box>
  );
}
