import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynamicQuestionnaire } from '@/features/wcs-navigator/components/DynamicQuestionnaire';
import { DiscoveryResponse, PersonaChip } from '@/features/wcs-navigator/types/navigator';

const boogieByTheBayPreset: DiscoveryResponse = {
  preset_id: 'boogie_by_the_bay',
  preset_name: 'Boogie by the Bay',
  suggested_form_questions: [
    {
      id: 'skill_level',
      title: 'What is your WCS division / skill level?',
      type: 'select',
      required: true,
      context: 'Scanned 12 workshop tracks across Novice, Intermediate, and Advanced divisions.',
      options: [
        { label: 'Novice / Newcomer', value: 'novice' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced / All-Star', value: 'advanced' },
      ],
    },
    {
      id: 'focus_areas',
      title: 'Which workshop tracks interest you?',
      type: 'multiselect',
      required: false,
      context: 'Detected specialized tracks: Footwork, Musicality, and Connection.',
      options: [
        { label: 'Footwork & Technique', value: 'footwork' },
        { label: 'Musicality & Timing', value: 'musicality' },
        { label: 'Social Dancing Strategy', value: 'social' },
      ],
    },
    {
      id: 'late_night',
      title: 'Include late night social dancing hours?',
      type: 'boolean',
      required: true,
      context: 'Boogie schedule features social dancing until 5:00 AM.',
    },
  ],
};

const halloweenSwingThingPreset: DiscoveryResponse = {
  preset_id: 'halloween_swingthing',
  preset_name: 'Halloween SwingThing',
  suggested_form_questions: [
    {
      id: 'costume_participation',
      title: 'Will you participate in the Costume Contest?',
      type: 'boolean',
      required: true,
      context: 'Halloween SwingThing schedule lists costume parade on Saturday night.',
    },
    {
      id: 'intensive_pass',
      title: 'Select your Friday Intensive Topic',
      type: 'select',
      required: true,
      context: 'Found 2 parallel 3-hour Friday intensives on the official schedule.',
      options: [
        { label: 'Champions Secrets Intensive', value: 'champions' },
        { label: 'Jack & Jill Strategy Intensive', value: 'jnj_strategy' },
      ],
    },
  ],
};

const samplePersonaChips: PersonaChip[] = [
  {
    id: 'social_dancer',
    label: 'Social Party Animal',
    answers: {
      skill_level: 'intermediate',
      focus_areas: ['social'],
      late_night: true,
    },
  },
  {
    id: 'competitor',
    label: 'Strict Competitor',
    answers: {
      skill_level: 'advanced',
      focus_areas: ['footwork', 'musicality'],
      late_night: false,
    },
  },
];

describe('DynamicQuestionnaire Component', () => {
  it('renders dynamic questions and option choices from DiscoveryResponse schema', () => {
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
      />
    );

    // Question Titles
    expect(screen.getByText('What is your WCS division / skill level?')).toBeDefined();
    expect(screen.getByText('Which workshop tracks interest you?')).toBeDefined();
    expect(screen.getByText('Include late night social dancing hours?')).toBeDefined();

    // Select options
    expect(screen.getByRole('button', { name: 'Novice / Newcomer' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Intermediate' })).toBeDefined();

    // Multiselect options
    expect(screen.getByRole('button', { name: 'Footwork & Technique' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Musicality & Timing' })).toBeDefined();

    // Switch toggle button
    expect(screen.getByRole('switch', { name: 'Include late night social dancing hours?' })).toBeDefined();
  });

  it('renders P0 explainability "Why We Ask This" info context for all questions', () => {
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
      />
    );

    expect(
      screen.getByText('Scanned 12 workshop tracks across Novice, Intermediate, and Advanced divisions.')
    ).toBeDefined();
    expect(
      screen.getByText('Detected specialized tracks: Footwork, Musicality, and Connection.')
    ).toBeDefined();
    expect(
      screen.getByText('Boogie schedule features social dancing until 5:00 AM.')
    ).toBeDefined();
  });

  it('dynamically adapts rendered questions and options when switching presets', () => {
    const { rerender } = render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
      />
    );

    expect(screen.getByText('What is your WCS division / skill level?')).toBeDefined();
    expect(screen.queryByText('Will you participate in the Costume Contest?')).toBeNull();

    // Switch preset to Halloween SwingThing
    rerender(
      <DynamicQuestionnaire
        discoveryResponse={halloweenSwingThingPreset}
      />
    );

    expect(screen.queryByText('What is your WCS division / skill level?')).toBeNull();
    expect(screen.getByText('Will you participate in the Costume Contest?')).toBeDefined();
    expect(screen.getByText('Select your Friday Intensive Topic')).toBeDefined();
    expect(
      screen.getByText('Halloween SwingThing schedule lists costume parade on Saturday night.')
    ).toBeDefined();
  });

  it('disables "Generate Calendar" submit button until all required fields are filled', () => {
    const handleSubmit = vi.fn();
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
        onSubmit={handleSubmit}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Generate Calendar/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);

    // Fill required field 1 (select: skill_level)
    fireEvent.click(screen.getByRole('button', { name: 'Intermediate' }));
    expect(submitBtn.disabled).toBe(true); // boolean 'late_night' is required and not filled yet

    // Fill required field 2 (boolean: late_night)
    const switchBtn = screen.getByRole('switch', { name: 'Include late night social dancing hours?' });
    fireEvent.click(switchBtn);

    // Now all required fields are satisfied
    expect(submitBtn.disabled).toBe(false);

    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledWith({
      skill_level: 'intermediate',
      late_night: true,
    });
  });

  it('pre-fills and auto-updates answers when selecting a persona chip', () => {
    const handleAnswersChange = vi.fn();
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
        personaChips={samplePersonaChips}
        onAnswersChange={handleAnswersChange}
      />
    );

    const personaBtn = screen.getByRole('button', { name: 'Social Party Animal' });
    fireEvent.click(personaBtn);

    expect(handleAnswersChange).toHaveBeenCalledWith({
      skill_level: 'intermediate',
      focus_areas: ['social'],
      late_night: true,
    });

    const submitBtn = screen.getByRole('button', { name: /Generate Calendar/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);
  });
});
