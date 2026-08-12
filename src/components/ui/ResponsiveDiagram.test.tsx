// impeccable-ignore-file
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ResponsiveDiagram } from './ResponsiveDiagram';

describe('ResponsiveDiagram component', () => {
  it('should render title and click/tap to expand', () => {
    render(<ResponsiveDiagram chart="graph TD; A-->B;" title="Test Diagram" />);

    // Check title and expand hint
    expect(screen.getByText('Test Diagram')).toBeDefined();
    expect(screen.getByText('Click/Tap diagram to expand & zoom')).toBeDefined();

    // The modal should not be visible initially
    expect(screen.queryByRole('dialog')).toBeNull();

    // Click to expand
    const trigger = screen.getByTitle('Click/Tap to view full screen');
    fireEvent.click(trigger);

    // The modal should now be visible
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Zoom out' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset zoom' })).toBeDefined();

    // Click close
    const closeBtn = screen.getByRole('button', { name: 'Close full screen view' });
    fireEvent.click(closeBtn);

    // The modal should be closed
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
