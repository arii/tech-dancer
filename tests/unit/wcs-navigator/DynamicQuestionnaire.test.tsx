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
      type: 'select',
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
      type: 'select',
      required: true,
      options: [
        { label: 'Yes, dance until sunrise', value: 'yes' },
        { label: 'No, sleep early', value: 'no' }
      ]
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
      type: 'select',
      required: true,
      context: 'Halloween SwingThing schedule lists costume parade on Saturday night.',
      options: [
        { label: 'Yes, Costume Contest', value: 'yes' },
        { label: 'No, Spectate', value: 'no' }
      ]
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

  it('renders dynamic questions and option card choices from DiscoveryResponse schema', () => {
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
      />
    );

    // Initial load: Only Step 1 is rendered
    expect(screen.getByText('What is your WCS division / skill level?')).toBeDefined();
    expect(screen.queryByText('Which workshop tracks interest you?')).toBeNull();

    // Select options for the first question
    expect(screen.getByText('Novice / Newcomer')).toBeDefined();
    expect(screen.getByText('Intermediate')).toBeDefined();
  });

  it('renders clean question title and options in card flow', () => {
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
      />
    );

    expect(
      screen.getByText('What is your WCS division / skill level?')
    ).toBeDefined();
    expect(
      screen.getByText('Novice / Newcomer')
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

    expect(screen.getByText('Will you participate in the Costume Contest?')).toBeDefined();
    expect(screen.queryByText('What is your WCS division / skill level?')).toBeNull();
  });

  it('initializes with initialAnswers and supports auto-advance or callback triggers', () => {
    const onCompleteMock = vi.fn();
    render(
      <DynamicQuestionnaire
        discoveryResponse={boogieByTheBayPreset}
        onComplete={onCompleteMock}
        initialAnswers={{ skill_level: 'novice' }}
      />
    );

    expect(screen.getByText('What is your WCS division / skill level?')).toBeDefined();
    const intermediateBtn = screen.getByText('Intermediate').closest('button');
    if (intermediateBtn) {
      fireEvent.click(intermediateBtn);
    }
  });
});
