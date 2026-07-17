import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GitOpsReviewerTool } from './GitOpsReviewerTool';
import { MemoryRouter } from 'react-router-dom';

describe('GitOpsReviewerTool', () => {
  it('renders correctly with expected headings and content sections', () => {
    render(
      <MemoryRouter>
        <GitOpsReviewerTool />
      </MemoryRouter>
    );

    // Check for major heading
    expect(screen.getByText(/Automating the Outer Loop/i)).toBeTruthy();

    // Check for "What we built" and "How we felt it" headings
    expect(screen.getByRole('heading', { level: 2, name: /What we built/i })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /How we felt it/i })).toBeTruthy();

    // Check for key terms in "What we built" section
    expect(screen.getByText(/Context Packaging/i)).toBeTruthy();
    expect(screen.getByText(/Structured Schemas/i)).toBeTruthy();
    expect(screen.getByText(/Playwright Integration/i)).toBeTruthy();

    // Check for key terms in "How we felt it" section
    expect(screen.getByText(/From Noise to Signal/i)).toBeTruthy();
    expect(screen.getByText(/Deterministic Controls/i)).toBeTruthy();
  });
});
