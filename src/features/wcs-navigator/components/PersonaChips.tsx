// impeccable-ignore-file
import React from 'react';
import { UserCheck, Sparkles, Check } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { WCSPersona, DANCE_PERSONAS } from '../data/personas';

export interface PersonaChipsProps {
  selectedPersonaId: string | null;
  onSelectPersona: (persona: WCSPersona) => void;
}

export const PersonaChips = ({
  selectedPersonaId,
  onSelectPersona
}: PersonaChipsProps) => {
  return (
    <Stack gap={4} width="full">
      <Stack gap={1}>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
          2. Select Social Dance Persona
        </Text>
        <Text size="sm" color="dim">
          Selecting a persona automatically tailors your itinerary and questionnaire priorities.
        </Text>
      </Stack>

      <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={3} width="full">
        {DANCE_PERSONAS.map((persona) => {
          const isSelected = persona.id === selectedPersonaId;
          return (
            <Box
              key={persona.id}
              as="button"
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectPersona(persona)}
              padding={4}
              surface={isSelected ? 'muted' : 'surface'}
              radius="lg"
              display="flex"
              align="start"
              cursor="pointer"
              minHeight={11}
              className={cn(
                "border text-left transition-all duration-200 hover:border-brand-purple/50 relative overflow-hidden tap-target",
                isSelected ? "border-brand-purple ring-1 ring-brand-purple/40 bg-brand-purple/5" : "border-line hover:bg-surface"
              )}
            >
              <Stack gap={2} flex={1}>
                <Box display="flex" align="center" justify="between" width="full">
                  <Box width={8} height={8} radius="md" display="flex" align="center" justify="center" className={isSelected ? "bg-brand-purple text-black" : "bg-white/5 text-dim"}>
                    <Icon icon={isSelected ? UserCheck : Sparkles} size="xs" />
                  </Box>
                  {isSelected && (
                    <Box display="flex" align="center" justify="center" width={4} height={4} radius="full" className="bg-brand-purple text-black">
                      <Icon icon={Check} size="xs" />
                    </Box>
                  )}
                </Box>

                <Stack gap={0.5}>
                  <Text weight="font-bold" size="sm" color={isSelected ? "main" : "dim"}>
                    {persona.name}
                  </Text>
                  <Text size="micro" color="dim" leading="normal">
                    {persona.tagline}
                  </Text>
                </Stack>

                <Box display="flex" wrap="wrap" gap={1} marginTop={1}>
                  {persona.focusTracks.slice(0, 2).map(track => (
                    <Text key={track} size="micro" radius="sm" paddingX={1.5} paddingY={0.5} className="bg-white/5 text-dim">
                      {track}
                    </Text>
                  ))}
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
};
