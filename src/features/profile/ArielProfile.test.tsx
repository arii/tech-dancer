import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ArielProfile from './ArielProfile';

// Mock SEO to avoid helmet provider requirement
vi.mock('@/components/SEO', () => ({
  SEO: () => <div data-testid="mock-seo" />
}));

describe('ArielProfile Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders standardized page header with role and name', () => {
    render(
      <BrowserRouter>
        <ArielProfile />
      </BrowserRouter>
    );

    expect(screen.getByText('Ariel Anders, PhD')).toBeTruthy();
    expect(screen.getByText(/West Coast Swing dancer & roboticist/i)).toBeTruthy();
  });

  it('renders interspersed alternating zigzag sections with unique titles and captions', () => {
    render(
      <BrowserRouter>
        <ArielProfile />
      </BrowserRouter>
    );

    expect(screen.getByText('My Dance Story & Why BoomTick Exists')).toBeTruthy();
    expect(screen.getByText('Style & Visual Expression')).toBeTruthy();
    expect(screen.getByText('Timing & Musicality')).toBeTruthy();
    expect(screen.getByText('Travel & Hotel Points Strategy')).toBeTruthy();

    expect(screen.getByText('First WCS Competition • Los Angeles, CA')).toBeTruthy();
    expect(screen.getByText('Late Night Social Set • Custom LED Bunny Ears')).toBeTruthy();
    expect(screen.getByText('MADjam Social Floor • Late Night Groove')).toBeTruthy();
    expect(screen.getByText('Weekend Socials • High-Energy Extension')).toBeTruthy();
  });

  it('renders social and legal links with proper spacing', () => {
    render(
      <BrowserRouter>
        <ArielProfile />
      </BrowserRouter>
    );

    expect(screen.getByText('INSTAGRAM')).toBeTruthy();
    expect(screen.getByText('LINKEDIN')).toBeTruthy();
    expect(screen.getByText('GITHUB')).toBeTruthy();
    expect(screen.getByText('Privacy')).toBeTruthy();
    expect(screen.getByText('Terms')).toBeTruthy();
  });
});
