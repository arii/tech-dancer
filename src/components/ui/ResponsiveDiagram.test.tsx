import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ResponsiveDiagram } from './ResponsiveDiagram';

describe('ResponsiveDiagram component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render modal into document.body via portal and support escape key dismissal', () => {
    const { container } = render(<ResponsiveDiagram chart="graph TD; A-->B;" title="Test Diagram" />);

    // Click trigger to expand modal
    const trigger = screen.getByTitle('Click/Tap to view full screen');
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();

    // Verify modal portal is direct child of document.body and not inside local container
    expect(document.body.contains(dialog)).toBe(true);
    expect(container.contains(dialog)).toBe(false);

    // Test Escape key closes modal
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

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
