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

    // Initial load: Only Step 1 is rendered
    expect(screen.getByText('What is your WCS division / skill level?')).toBeDefined();
    expect(screen.queryByText('Which workshop tracks interest you?')).toBeNull();

    // Select options (radio role) for the first question
    expect(screen.getByRole('radio', { name: 'Novice / Newcomer' })).toBeDefined();
    const intermediateRadio = screen.getByRole('radio', { name: 'Intermediate' });
    fireEvent.click(intermediateRadio);

    // Advance to Step 2
    const nextBtn1 = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextBtn1);

    // Now Step 2 is active
    expect(screen.getByText('Which workshop tracks interest you?')).toBeDefined();
    expect(screen.queryByText('What is your WCS division / skill level?')).toBeNull();

    // Select workshop option
    const footworkCheckbox = screen.getByRole('checkbox', { name: 'Footwork & Technique' });
    fireEvent.click(footworkCheckbox);

    // Advance to Step 3
    const nextBtn2 = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextBtn2);

    // Now Step 3 is active
    expect(screen.getByText('Include late night social dancing hours?')).toBeDefined();
    expect(screen.getByRole('switch', { name: 'Include late night social dancing hours?' })).toBeDefined();
  });

  it('renders clean question title and options in step flow', () => {
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
      />
    );

    expect(
      screen.getByText('What is your WCS division / skill level?')
    ).toBeDefined();
    expect(
      screen.getByRole('radio', { name: /Novice \/ Newcomer/i })
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

    // Toggle switch and advance to step 2
    fireEvent.click(screen.getByRole('switch', { name: 'Will you participate in the Costume Contest?' }));
    const nextBtn = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextBtn);

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

    // On Step 1: required field
    const intermediateRadio = screen.getByRole('radio', { name: /Intermediate/i });
    fireEvent.click(intermediateRadio);

    // Move to Step 2
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // On Step 2: optional field
    fireEvent.click(screen.getByRole('checkbox', { name: /Footwork & Technique/i }));

    // Move to Step 3 (final step)
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    const submitBtn = screen.getByRole('button', { name: /Generate Calendar/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);

    // Fill required boolean on step 3
    const switchBtn = screen.getByRole('switch', { name: /Include late night social dancing hours\?/i });
    fireEvent.click(switchBtn);

    expect(submitBtn.disabled).toBe(false);
    fireEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledWith({
      skill_level: 'intermediate',
      focus_areas: ['footwork'],
      late_night: true,
    });
  });

  it('initializes with initialAnswers and allows step navigation to submit', () => {
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

    // Step 1 -> Step 2
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    // Step 2 -> Step 3
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    const submitBtn = screen.getByRole('button', { name: /Generate Calendar/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledWith({
      skill_level: 'novice',
      late_night: true,
    });
  });
});
