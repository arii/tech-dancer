// impeccable-ignore-file
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { ResponsiveDiagram } from './ResponsiveDiagram';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg data-testid="mock-svg"></svg>' }),
  },
}));

describe('ResponsiveDiagram Component', () => {
  it('renders title and full-screen button correctly', async () => {
    render(
      <ResponsiveDiagram
        title="Form Guide: Calves"
        chart="graph LR; A[Start: Seated] --> B[Place roller under ankles];"
      />
    );

    expect(screen.getByText('Form Guide: Calves')).toBeDefined();
    expect(screen.getByRole('button', { name: /expand diagram/i })).toBeDefined();
  });
});
