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

    // Check for "What we built" and "How we built it" headings
    expect(screen.getByRole('heading', { level: 2, name: /What we built/i })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /How we built it/i })).toBeTruthy();

    // Check for key terms in "What we built" section
    expect(screen.getByText(/Model Context Protocol/i)).toBeTruthy();
    expect(screen.getByText(/Local Developer Tooling/i)).toBeTruthy();

    // Check for key terms in "How we built it" section
    expect(screen.getByText(/Multi-Modal AI Orchestration/i)).toBeTruthy();
    expect(screen.getByText(/RAG & Vector Retrieval/i)).toBeTruthy();
    expect(screen.getByText(/CI\/CD Guardrails/i)).toBeTruthy();
  });
});
