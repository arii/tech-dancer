import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { DynamicQuestionnaire } from '@/features/wcs-navigator/components/DynamicQuestionnaire';
import { DiscoveryResponse } from '@/features/wcs-navigator/types/navigator';

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

describe('DynamicQuestionnaire Component', () => {
  afterEach(() => {
    cleanup();
  });

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

    // Select options (radio role)
    expect(screen.getByRole('radio', { name: 'Novice / Newcomer' })).toBeDefined();
    expect(screen.getByRole('radio', { name: 'Intermediate' })).toBeDefined();

    // Multiselect options (checkbox role)
    expect(screen.getByRole('checkbox', { name: 'Footwork & Technique' })).toBeDefined();
    expect(screen.getByRole('checkbox', { name: 'Musicality & Timing' })).toBeDefined();

    // Switch toggle button
    expect(screen.getByRole('switch', { name: 'Include late night social dancing hours?' })).toBeDefined();
  });

  it('renders P0 explainability "Why We Ask This" trigger buttons and toggles context', () => {
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
      />
    );

    const whyAskTriggers = screen.getAllByRole('button', { name: /Why We Ask This/i });
    expect(whyAskTriggers.length).toBe(3);

    // Open first trigger
    fireEvent.click(whyAskTriggers[0]);
    expect(
      screen.getByText(/Scanned 12 workshop tracks across Novice/i)
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
    fireEvent.click(screen.getByRole('radio', { name: /Intermediate/i }));
    expect(submitBtn.disabled).toBe(true); // boolean 'late_night' is required and not filled yet

    // Fill required field 2 (boolean: late_night)
    const switchBtn = screen.getByRole('switch', { name: /Include late night social dancing hours\?/i });
    fireEvent.click(switchBtn);

    // Now all required fields are satisfied
    expect(submitBtn.disabled).toBe(false);

    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledWith({
      skill_level: 'intermediate',
      late_night: true,
    });
  });

  it('initializes with initialAnswers and allows immediate submit if complete', () => {
    const handleSubmit = vi.fn();
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
        initialAnswers={{
          skill_level: 'novice',
          late_night: true,
        }}
        onSubmit={handleSubmit}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Generate Calendar/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledWith({
      skill_level: 'novice',
      late_night: true,
    });
  });
});
